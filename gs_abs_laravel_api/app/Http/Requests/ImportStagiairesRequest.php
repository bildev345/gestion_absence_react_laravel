<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportStagiairesRequest extends FormRequest
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
            'excelFile' => 'required|mimes:xlsx,xls|max:100'
        ];
    }
    public function messages()
    {
        return [
            'excelFile.required' => 'Veuillez choisir un fichier excel',
            'excelFile.mimes' => 'Le format de fichier est invalide',
            'excelFile.max' => 'la taille du fichier ne doit pas dépasser 100 KO'
        ];
    }
}
