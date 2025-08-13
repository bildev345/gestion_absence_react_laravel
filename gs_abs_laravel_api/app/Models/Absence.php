<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    protected $fillable = ['stagiaire_id', 'created_by', 'heure_debut', 'heure_fin', 'raison'];

    public function stagiaire(){
        return $this->belongsTo(Stagiaire::class);
    }
    public function formateur(){
        return $this->belongsTo(User::class, 'created_by');
    }
}
