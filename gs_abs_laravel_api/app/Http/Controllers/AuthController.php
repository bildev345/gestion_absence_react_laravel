<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {

  public function login(Request $req) {
    $credentiels = $req->only('email','password');
    if(!Auth::attempt($credentiels)){
       return response()->json([
          'message' => 'Invalid credentials'
       ], 401);
    }
    $user = Auth::user();
    $token = $user->createToken($user->nom)->plainTextToken;
    return response()->json(compact('user','token'));
  }
}