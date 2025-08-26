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
        Schema::create('clases', function (Blueprint $table) {
            $table->id(); // ID autoincremental
            $table->string('nombre'); // Nombre de la clase
            $table->text('descripcion')->nullable(); // Descripción opcional
            $table->date('hora_inicio'); // Fecha de inicio
            $table->date('hora_fin'); // Fecha de finalización
            $table->integer('capacidad'); // Número máximo de participantes
            $table->unsignedBigInteger('id_usuario');
            $table->unsignedBigInteger('id_cliente');
            $table->timestamps(); // created_at y updated_at
        });
    }
};