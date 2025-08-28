<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $fillable = [
        'cedula',
        'nombre',
        'apellido',
        'correo',
        'clave',
        'id_rol',
        'especialidad',
    ];
}