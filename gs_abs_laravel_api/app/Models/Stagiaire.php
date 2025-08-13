<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stagiaire extends Model
{
    protected $fillable = ['CEF', 'nom', 'prenom', 'date_naissance', 'autorise', 'groupe_id'];

    public function absences(){
        return $this->hasMany(Absence::class);
    }

    public function groupe(){
        return $this->belongsTo(Groupe::class);
    }
}
