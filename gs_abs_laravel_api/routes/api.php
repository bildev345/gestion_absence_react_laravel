<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StagiaireController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::get('/affecter', function(Request $req) {
    return "Authorisé";
})->middleware(['auth:sanctum', 'role:surveillant']);


Route::post('/stagiaires/import', [StagiaireController::class, 'import'])
->middleware(['auth:sanctum', 'role:surveillant']);