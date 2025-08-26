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
    Schema::create('inscripciones', function (Blueprint $table) {
        $table->id(); // ID autoincremental
        $table->unsignedBigInteger('id_usuario'); // ID del usuario que registra
        $table->unsignedBigInteger('id_cliente'); // ID del cliente inscrito
        $table->unsignedBigInteger('id_clase');   // ID de la clase
        $table->string('estado')->default('pendiente'); // Estado de la inscripción
        $table->timestamps();

        // // Relaciones (si existen las otras tablas)
        // $table->foreign('id_usuario')->references('id')->on('users')->onDelete('cascade');
        // $table->foreign('id_cliente')->references('id')->on('clientes')->onDelete('cascade');
        // $table->foreign('id_clase')->references('id')->on('clases')->onDelete('cascade');
    });
}
};