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
    Schema::create('clientes', function (Blueprint $table) {
        $table->id(); // ID autoincremental
        $table->integer('cedula');
        $table->string('nombre'); // Nombre del cliente
        $table->string('correo')->unique(); // Correo electrónico
        $table->unsignedBigInteger('id_usuario'); // Relación con usuarios
        $table->timestamps(); // created_at y updated_at

        // Clave foránea (opcional si existe tabla usuarios)
        // $table->foreign('id_usuario')->references('id')->on('usuarios')->onDelete('cascade');
    });
}

public function down()
{
    Schema::dropIfExists('clientes');
}
};