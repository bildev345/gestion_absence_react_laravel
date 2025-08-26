<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStagiaireRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'CEF' => 'required|string|size:13',
            'nom' => 'required|string|max:256',
            'prenom' => 'required|string|max:256',
            'date_naissance' => 'required|date',
            'groupe_id' => 'required|exists:groupes,id'
        ];
    }

    public function messages()
    {
        return [
            'CEF.required' => 'Le CEF est obligatoire.',
            'CEF.string' => 'Le CEF doit etre une chaine de caractères.',
            'CEF.size' => 'Le CEF doit comporter exactement 13 caractères.',
            'nom.required' => 'Le Nom est obligatoire.',
            'nom.string' => 'Le Nom doit etre une chaine de caractères.',
            'nom.max' => 'Le Nom ne doit pas dépasser 256 caractères.',
            'prenom.required' => 'Le Prènom est obligatoire.',
            'prenom.string' => 'Le Prènom doit etre une chaine de caractères.',
            'prenom.max' => 'Le Prènom ne doit pas dépasser 256 caractères.',
            'date_naissance.required' => 'La date de naissance est obligatoire.',
            'date_naissance.date' => 'La date de naissance est invalide.',
            'groupe_id.required' => 'Le groupe est obligatoire.',
            'groupe_id.exists' => 'Le groupe que vous avez selectionné n\'existe pas.'
        ];
    }
}
