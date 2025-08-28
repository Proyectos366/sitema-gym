<?php

namespace App\Http\Controllers\Api;

use App\Services\Usuario\UsuarioValidator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;


class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        $validated = UsuarioValidator::validar($request->all());

        print_r($validated);

        Usuario::create([
            'cedula' => $validated['cedula'],
            'nombre' => $validated['nombre'],
            'apellido' => $validated['apellido'],
            'correo' => $validated['correo'],
            'especialidad' => $validated['especialidad'],
            'clave' => Hash::make($validated['claveUno']),
            'id_rol' => 1,
        ]);

        return response()->json([
            'status' => 'ok',
            'message' => 'Usuario creado',
            'redirect' => '/',
            'usuarios' => [], // Puedes retornar el usuario si lo deseas
        ]);
    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Los datos enviados no son válidos.',
            'errors' => $e->errors(), // Esto te da los mensajes específicos
        ], 422);
    }

  
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}