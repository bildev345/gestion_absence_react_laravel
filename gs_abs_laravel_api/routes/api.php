<?php

use App\Http\Controllers\AffectationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GroupeController;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout' , [AuthController::class, 'logout'])
->middleware('auth:sanctum');

Route::get('/affecter', function(Request $req) {
    return "Authorisé";
})->middleware(['auth:sanctum', 'role:surveillant']);


Route::post('/stagiaires/import', [StagiaireController::class, 'import'])
->middleware(['auth:sanctum', 'role:surveillant']);

Route::apiResource('stagiaires', StagiaireController::class)
->middleware(['auth:sanctum', 'role:surveillant']);

Route::apiResource('groupes', GroupeController::class)
->middleware(['auth:sanctum', 'role:surveillant']);

Route::get('/paginatedGr', [GroupeController::class, 'paginatedGroupes'])
->middleware('auth:sanctum');

Route::apiResource('affectations', AffectationController::class)
->middleware(['auth:sanctum', 'role:surveillant']);

Route::get('/formateurs', [UserController::class, 'index'])
->middleware(['auth:sanctum, role:surveillant']);