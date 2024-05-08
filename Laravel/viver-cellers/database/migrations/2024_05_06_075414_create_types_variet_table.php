<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Migration to create the types_variet table and all its fields
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
        Schema::create('types_variet', function (Blueprint $table) {
            $table->increments('id');
            $table->string('variety');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types_variet');
    }
};
