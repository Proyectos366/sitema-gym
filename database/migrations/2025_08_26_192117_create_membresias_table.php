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
    Schema::create('membresias', function (Blueprint $table) {
        $table->id(); // ID autoincremental
        $table->string('nombre'); // Nombre de la membresía
        $table->text('descripcion')->nullable(); // Descripción
        $table->string('tipo');
        $table->date('fecha_inicio');
        $table->date('fecha_fin');
        $table->unsignedBigInteger('id_usuario'); // Relación con usuarios
        $table->enum('estado', ['activa', 'vencida', 'pendiente']) -> default('pendiente');
        $table->timestamps(); // created_at y updated_at

        // Clave foránea (opcional si existe tabla usuarios)
        // $table->foreign('id_usuario')->references('id')->on('usuarios')->onDelete('cascade');
    });
}

public function down()
{
    Schema::dropIfExists('membresias');
}
};