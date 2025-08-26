<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function registro(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|max:255|unique:users',
            'claveUno' => 'required|string|min:6',
            'claveDos' => 'required|string|min:6',
        ]);

        // if ($request->claveUno !== $request->claveDos) {
        //     return response()->json(['error' => 'Las contraseñas no coinciden'], 422);
        // }

        $user = User::create([
            'nombre' => $request->nombre,
            'correo' => $request->correo,
            'clave' => Hash::make($request->claveUno),
        ]);

        return response()->json(['usuarios' => $user], 201);
    }
}