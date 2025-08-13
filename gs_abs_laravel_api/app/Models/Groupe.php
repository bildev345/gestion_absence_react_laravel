<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    protected $fillable = ['intitule'];

    public function affectations(){
        return $this->hasMany(Affectation::class);
    }

    public function stagiaires(){
        return $this->hasMany(Stagiaire::class);
    }
}
