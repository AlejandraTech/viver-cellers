<?php
/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * File with all the api paths of the project
 */
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateProfile']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/checkout', [PaymentController::class, 'checkout']);
    // otras rutas protegidas
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

//Route to display all project
Route::prefix('project')->group(function () {
    Route::get('/', [ProjectController::class, 'getAll']);
    Route::get('/information', [ProjectController::class, 'index']);
    Route::get('/details/{id}', [ProjectController::class, 'showProject']);
    Route::post('/', [ProjectController::class, 'store']);
    Route::delete('/{id}', [ProjectController::class, 'destroy']);
    Route::put('/{id}', [ProjectController::class, 'update']);
});

//Route to display all product
Route::prefix('product')->group(function () {
    Route::get('/information', [ProductController::class, 'index']);
    Route::get('/category', [ProductController::class, 'indexCategory']);
    Route::get('/variety', [ProductController::class, 'indexVariety']);
    Route::get('/details/{id}', [ProductController::class, 'showProduct']);
    Route::get('/', [ProductController::class, 'getAll']);
    Route::post('/', [ProductController::class, 'store']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
    Route::put('/{id}', [ProductController::class, 'update']);
});
