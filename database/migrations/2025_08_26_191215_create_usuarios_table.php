<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('usuarios', function (Blueprint $table) {
        $table->id(); // ID autoincremental
        $table->integer('cedula');
        $table->string('nombre'); // Nombre del usuario
        $table->string('apellido');
        $table->string('correo');
        $table->string('clave'); // Contraseña
        $table->unsignedBigInteger('id_rol'); // ID del rol
        $table->string('especialidad')->nullable();
        $table->timestamps(); // created_at y updated_at
    });
}

    /**
     * Reverse the migrations.
     */
    public function down()
{
    Schema::dropIfExists('usuarios');
}
};