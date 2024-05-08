<?php

/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Migration to create the orders table and all its fields
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('id_user_fk');
            $table->foreign('id_user_fk')->references('id')->on('users');
            $table->integer('price');
            $table->text('address');
            $table->string('payment_token');
            $table->unsignedInteger('order_status_id');
            $table->foreign('order_status_id')->references('id')->on('order_statuses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
