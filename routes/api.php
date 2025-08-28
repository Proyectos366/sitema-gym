<?php

use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\LoginController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/registro', [UsuarioController::class, 'store']); 
Route::post('/login', [LoginController::class, 'login']); 