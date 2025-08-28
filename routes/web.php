<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UsuarioController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/registro-usuario', function () {
    return Inertia::render('registro-usuario/Registro');
});

Route::resource('usuarios', UsuarioController::class);