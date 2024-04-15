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

Route::get('/usuarios', [AuthController::class, 'getAll'])->name('usuarios');


//
// Route::prefix('person')->group(function () {
//     Route::get('/',[ PersonController::class, 'getAll']);
//     Route::post('/',[ PersonController::class, 'create']);
//     Route::delete('/{id}',[ PersonController::class, 'delete']);
//     Route::get('/{id}',[ PersonController::class, 'get']);
//     Route::put('/{id}',[ PersonController::class, 'update']);
// });
