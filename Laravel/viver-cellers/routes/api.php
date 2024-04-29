<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
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

// Login and registration controller
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);
});

// Route to display all provinces
Route::get('/provinces', [AuthController::class, 'getProvinces'])->name('provinces');

// Route for all users
Route::prefix('users')->group(function () {
    Route::get('/', [AuthController::class, 'getAll']);
    Route::get('/roles', [AuthController::class, 'getRoles'])->name('roles');
    Route::post('/', [AuthController::class, 'store']);
    Route::delete('/{id}', [AuthController::class, 'destroy']);
    Route::put('/{id}', [AuthController::class, 'update']);
});

Route::get('/project-info', [ProjectController::class, 'index']);
Route::get('/projectDetails/{id}', [ProjectController::class, 'showProject']);

//Route to display all project
Route::prefix('project')->group(function () {
    Route::get('/', [ProjectController::class, 'getAll']);
    Route::post('/', [ProjectController::class, 'store']);
    Route::delete('/{id}', [ProjectController::class, 'destroy']);
    Route::put('/{id}', [ProjectController::class, 'update']);
});
