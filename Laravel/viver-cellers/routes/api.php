<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Ruta para el registro de usuarios
Route::post('/register', [AuthController::class, 'register'])->name('register');

// Ruta para mostrar todas las provincias
Route::get('/provinces', [AuthController::class, 'getProvinces'])->name('provinces');

// Ruta para todos los usuarios
Route::prefix('users')->group(function () {
    Route::get('/', [AuthController::class, 'getAll']);
    Route::get('/roles', [AuthController::class, 'getRoles'])->name('roles');
    Route::post('/', [AuthController::class, 'store']);
    Route::delete('/{id}', [AuthController::class, 'destroy']);
    Route::put('/{id}', [AuthController::class, 'update']);
});
