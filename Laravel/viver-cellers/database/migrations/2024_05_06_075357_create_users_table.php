<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Migration to create the users table and all its fields
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
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('dni')->nullable();
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('rol', ['client', 'nurseryman', 'admin']);
            $table->string('address')->nullable();
            $table->unsignedInteger('project_id_fk')->nullable(); // foreign key of the table projects

            // Conditional restriction to link projects only to users with role 'nurseryman'.
            $table->foreign('project_id_fk')->references('id')->on('projects')->onDelete('restrict')->onUpdate('cascade')->where('rol', 'nurseryman');

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
