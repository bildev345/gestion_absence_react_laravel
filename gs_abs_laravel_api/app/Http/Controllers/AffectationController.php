<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Http\Requests\StoreAffectationRequest;
use App\Http\Requests\UpdateAffectationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AffectationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //$paramsArray = $request->input();
        $query = Affectation::query();
        //Recherche
        /*if($request->has('search')){
            $query->where('nom', 'like', $request->search.'%')
            ->orWhere('prenom', 'like', $request->search.'%'); 
        }*/

        //Filter
        if($request->has('active')){
            $query->where('active', $request->active);
        }else if($request->has('formateur_id')){
            $query->where('formateur_id', $request->formateur_id);
        }

        //Tri
        /*$sortColumn = $request->input('sort_by', 'nom');
        $sortDirection = $request->input('sort_dir', 'asc');
        $query->orderBy($sortColumn, $sortDirection);*/
        
        //pagination
        $perPage = $request->input('per_page', 5);
        return $query->with(['groupe', 'formateur'])->paginate($perPage);
 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $affectations = $request->input();
        DB::beginTransaction();
        try {
            foreach($affectations as $affectation){
                Affectation::create([
                    "created_by" => Auth::id(),
                    "formateur_id" => $affectation["formateur_id"],
                    "groupe_id" => $affectation["groupe_id"]
                ]);
            }
            DB::commit();
            return response()->json(['success' => 'Les affectations sont faites avec succès.']);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json(['error' => 'Une ou plusieurs affectations sont déjà actives!!!'], 500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Affectation $affectation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAffectationRequest $request, Affectation $affectation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affectation $affectation)
    {
        //
    }
}
