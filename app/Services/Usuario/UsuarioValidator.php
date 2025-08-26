<?php

namespace App\Services\Usuario;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UsuarioValidator
{
    public static function validar(array $data)
    {
        $validator = Validator::make($data, [
            'nombre' => 'required|string|max:255',
            'correo' => 'required|email|unique:users,email',
            'claveUno' => 'required|string|min:8|max:16',
            'claveDos' => 'required|string|min:8|max:16|same:claveUno',
        ], [
            'claveDos.same' => 'Las contraseñas no coinciden.',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        return $validator->validated();
    }
}