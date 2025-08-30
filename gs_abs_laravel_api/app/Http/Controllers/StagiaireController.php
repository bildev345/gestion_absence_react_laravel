<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImportStagiairesRequest;
use App\Models\Stagiaire;
use App\Http\Requests\StoreStagiaireRequest;
use App\Http\Requests\UpdateStagiaireRequest;
use App\Models\Groupe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //$paramsArray = $request->input();
        $query = Stagiaire::query();
        //Recherche
        if($request->has('search')){
            $query->where('nom', 'like', $request->search.'%')
            ->orWhere('prenom', 'like', $request->search.'%'); 
        }

        //Filter
        if($request->has('autorise')){
            $query->where('autorise', $request->autorise);
        }else if($request->has('groupe_id')){
            $query->where('groupe_id', $request->groupe_id);
        }

        //Tri
        /*$sortColumn = $request->input('sort_by', 'nom');
        $sortDirection = $request->input('sort_dir', 'asc');
        $query->orderBy($sortColumn, $sortDirection);*/
        
        //pagination
        $perPage = $request->input('per_page', 10);
        return $query->with('groupe')->paginate($perPage);
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStagiaireRequest $request)
    {
        $stagiaire = Stagiaire::create($request->all());
        if($stagiaire){
            return response()->json([
                'message' => 'le stagiaire à été crée avec succés.',
            ]);
        }
        return response()->json([
            'errors' => [
                'message' => 'Une erreur survenue lors de la création d\'un nouveau stagiaire.'
            ]
        ], 500);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $stagiaire = Stagiaire::find($id);
        if($stagiaire){
            return response()->json([
                'stagiaire' => $stagiaire
            ]);
        }else{
            return response()->json([
                'message' => 'Aucun stagiaire trouvé'
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStagiaireRequest $request, Stagiaire $stagiaire)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        if(Stagiaire::destroy($id)){
            return response()->json([
                'message' => 'stagiaire est supprimé avec succès'
            ]);
        }
        return response()->json([
            'error' => 'Erreur survenue lors de la suppression'
        ], 500);
    }

    public function import(ImportStagiairesRequest $request)
    {
        //dd($request->file('excelFile'));
        DB::beginTransaction();
        try{
            $file = $request->file('excelFile');
            $spreadsheet = IOFactory::load($file->getPathname());
            $sheetNames = $spreadsheet->getSheetNames();
    
            foreach($sheetNames as $sheetIndex => $nomGroupe){
                $groupe = Groupe::firstOrCreate(
                    ['intitule' => $nomGroupe],

                );
    
                //charger uniquement la feuille spécifique
                $sheetData = $spreadsheet->getSheet($sheetIndex)->toArray();
                
                //skiper l'entete de la feuille
                array_shift($sheetData);
    
                foreach($sheetData as $row){
                    $dateNaissance = null;
                    if(is_numeric($row[3])){
                        $dateNaissance = Date::excelToDateTimeObject($row[3])->format('Y-m-d');
                    }else if(strtotime($row[3])){
                        $dateNaissance = date('Y-m-d', strtotime($row[3]));
                    }else{
                        continue;
                    }
                    Stagiaire::updateOrCreate(
                        [
                            'CEF' => $row[0]
                        ],
                        [
                        "nom" => $row[1],
                        "prenom" => $row[2],
                        "date_naissance" => $dateNaissance,
                        "groupe_id" => $groupe->id,
                        ]
                );
                }
            }
            DB::commit();
            return response()->json(['message' => 'Import faite avec succés'], 200);

        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['message' => 'Import est échoué : '.$e->getMessage()], 500);    
        }   
       
    }
}
