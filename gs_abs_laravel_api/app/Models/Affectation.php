<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Affectation extends Model
{
    protected $fillable = ['created_by', 'formateur_id', 'groupe_id', 'active'];

    public function surveillant(){
        return $this->belongsTo(User::class, 'created_by');
    }

    public function formateur(){
        return $this->belongsTo(User::class, 'formateur_id');
    }

    public function groupe(){
        return $this->belongsTo(Groupe::class);
    }
}
