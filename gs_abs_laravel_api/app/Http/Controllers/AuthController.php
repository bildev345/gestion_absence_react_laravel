<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
  public function register(Request $req) {
    $data = $req->validate([
      'nom' => 'required|max:255',
      'prenom' => 'required|max:255',
      'email' => 'required|email|unique:users',
      'role'=>'required|in:surveillant,formateur',
      'password' => 'required|confirmed'
    ], [
       'nom.required' => 'le champ nom est obligatoire',
       'nom.max' => 'le nom ne doit pas dépasser 256 caractères',
       'prenom.required' => 'le champ prénom est obligatoire',
       'prenom.max' => 'le prénom ne doit pas dépasser 256 caractères',
       'email.required' => 'le champ email est obligatoire',
       'email.email' => 'le format d\'email n\'est pas valide',
       'email.unique' => 'cet email est déjà utilisé',
       'role.required' => 'le role est obligatoire',
       'role.in' => 'le role doit etre soit surveillant soit formateur',
       'password.required' => 'le mot de passe est obligatoire',
       'password.confirmed' => 'les mots de passe ne sont pas identiques',

    ]);
    $data['password'] = Hash::make($data['password']);
    $user = User::create($data);
    $token = $user->createToken($req->nom)->plainTextToken;
    return response()->json(compact('user','token'));
  }

  public function login(Request $req) {
    $credentiels = $req->only('email','password');
    if(!Auth::attempt($credentiels)){
       return response()->json([
          'error' => 'Invalid credentials'
       ], 401);
    }
    $user = Auth::user();
    $token = $user->createToken($user->nom)->plainTextToken;
    return response()->json(compact('user','token'));
  }
}