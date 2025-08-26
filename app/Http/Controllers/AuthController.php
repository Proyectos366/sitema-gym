<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'correo' => 'required|string|email|max:255|unique:users',
            'clave1' => 'required|string|min:6',
            'clave2' => 'required|string|min:6',
        ]);

        if ($request->clave1 !== $request->clave2) {
            return response()->json(['error' => 'Las contraseñas no coinciden'], 422);
        }

        $user = User::create([
            'nombre' => $request->nombre,
            'correo' => $request->correo,
            'clave' => Hash::make($request->clave1),
        ]);

        return response()->json(['user' => $user], 201);
    }
}