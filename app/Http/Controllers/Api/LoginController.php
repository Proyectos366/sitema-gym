<?php

namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Usuario;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos
        // $request->validate([
        //     'correo' => 'required|email|unique:users,email',
        //     'clave' => 'required'
        // ]);

        // Buscar el usuario
        $user = Usuario::where('correo', $request->correo)->first();

        // Verificar contraseña
        if (!$user || !Hash::check($request->clave, $user->clave)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // Autenticar al usuario
        // Auth::login($user);

        // Retornar respuesta
        return response()->json([
            'status' => 'ok',
            'message' => 'Login exitoso',
            'redirect' => '/dashboard',
            'usuario' => $user->only(['id', 'nombre', 'correo'])
        ]);
    }
}