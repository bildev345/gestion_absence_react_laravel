<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImportStagiairesRequest;
use App\Models\Stagiaire;
use App\Http\Requests\StoreStagiaireRequest;
use App\Http\Requests\UpdateStagiaireRequest;
use App\Models\Groupe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class StagiaireController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStagiaireRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Stagiaire $stagiaire)
    {
        //
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
    public function destroy(Stagiaire $stagiaire)
    {
        //
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
                        "created_by" => Auth::id()
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
