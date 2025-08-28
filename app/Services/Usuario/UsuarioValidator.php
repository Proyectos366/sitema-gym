<?php

namespace App\Services\Usuario;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UsuarioValidator
{
//     public static function limpiarCedula($cedula)
// {
//     // Eliminar espacios, puntos, guiones y convertir a mayúsculas
//     $cedula = strtoupper(trim($cedula));
//     $cedula = str_replace(['.', '-', ' '], '', $cedula);

//     // Extraer solo los dígitos
//     $soloNumeros = preg_replace('/\D/', '', $cedula);

//     // Retornar como entero si hay números, si no, null
//     return $soloNumeros !== '' ? intval($soloNumeros) : null;
// }


public static function limpiarCedula($cedula)
{
    // Eliminar todo lo que no sea número
    $soloNumeros = preg_replace('/\D/', '', $cedula);

    // Retornar como entero si hay números, si no, lanzar excepción o retornar null
    return $soloNumeros !== '' ? intval($soloNumeros) : null;
}

public static function validar(array $data)
{
    // Validar que la cédula exista
    if (!isset($data['cedula'])) {
        throw ValidationException::withMessages([
            'cedula' => ['La cédula es requerida.'],
        ]);
    }

    // Limpiar la cédula
    $cedulaLimpia = self::limpiarCedula($data['cedula']);

    if (!$cedulaLimpia) {
        throw ValidationException::withMessages([
            'cedula' => ['La cédula no tiene un formato válido.'],
        ]);
    }

    // Reemplazar la cédula original con la versión limpia (entero)
    $data['cedula'] = $cedulaLimpia;

    // Validar los demás campos
    $validator = Validator::make($data, [
        'cedula' => 'required|numeric|min:1000000|max:99999999',
        'nombre' => 'required|string|max:255',
        'apellido' => 'required|string|max:255',
        'correo' => 'required|email|unique:users,email',
        'especialidad' => 'required|string|max:255',
        'claveUno' => 'required|string|min:8|max:16',
        'claveDos' => 'required|string|min:8|max:16|same:claveUno',
    ], [
        'claveDos.same' => 'Las contraseñas no coinciden.',
    ]);

    if ($validator->fails()) {
        throw new ValidationException($validator);
    }

    // Obtener los datos validados
    $validated = $validator->validated();

    // Retornar el array completo, incluyendo la cédula limpia
    return $validated;
}
}