<?php

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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('id_province_fk');
            $table->foreign('id_province_fk')->references('id')->on('provinces');
            $table->string('name');
            $table->string('dni')->nullable();
            $table->string('lastname');
            $table->string('email');
            $table->string('password');
            $table->enum('rol', ['client', 'nurseryman', 'admin']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
