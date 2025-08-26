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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id(); // ID autoincremental
            $table->unsignedBigInteger('id_usuario');   // Usuario que registra el pago
            $table->unsignedBigInteger('id_membresia'); // Membresía asociada al pago
            $table->unsignedBigInteger('id_cliente');   // Cliente que realiza el pago
            $table->decimal('monto', 10, 2);            // Monto pagado
            $table->date('fecha_pago');                 // Fecha del pago
            $table->string('metodo_pago');              // Método de pago (efectivo, tarjeta, etc.)
            $table->enum('estado', ['completado', 'pendiente']) -> default('pendiente'); // Estado del pago
            $table->timestamps();

            // // Relaciones (si existen las otras tablas)
            // $table->foreign('id_usuario')->references('id')->on('users')->onDelete('cascade');
            // $table->foreign('id_membresia')->references('id')->on('membresias')->onDelete('cascade');
            // $table->foreign('id_cliente')->references('id')->on('clientes')->onDelete('cascade');
        });
    }
};