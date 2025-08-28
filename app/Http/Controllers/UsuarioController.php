<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function store(Request $request)
    {
        // Validación de datos
        $request->validate([
            'cedula' => 'required|integer|unique:usuarios',
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios',
            'clave' => 'required|string|min:6',
            'id_rol' => 'required|integer',
            'especialidad' => 'nullable|string|max:255',
        ]);

        // Crear y guardar el usuario
        Usuario::create([
            'cedula' => $request->cedula,
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'clave' => Hash::make($request->clave), // Encriptar la clave
            'id_rol' => $request->id_rol,
            'especialidad' => $request->especialidad,
        ]);

        // Redireccionar con mensaje de éxito
        return redirect()->route('usuarios.index')->with('success', 'Usuario creado exitosamente.');
    }
}