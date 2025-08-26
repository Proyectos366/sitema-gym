<?php

namespace App\Http\Controllers\Api;

use App\Services\Usuario\UsuarioValidator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


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

        return response()->json([
            'status' => 'ok',
            'message' => 'Usuario creado',
            'usuarios' => [],
        ]);
    } catch (ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'errors' => $e->errors(),
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