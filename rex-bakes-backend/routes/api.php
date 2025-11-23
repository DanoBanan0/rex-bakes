<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DessertController;
use App\Http\Controllers\Api\OrderController;

// --- Rutas Públicas ---
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Catálogo público (cualquiera puede ver los postres)
Route::get('desserts', [DessertController::class, 'index']);
Route::get('desserts/{id}', [DessertController::class, 'show']);

// --- Rutas Protegidas (Requieren Token) ---
Route::group([
    'middleware' => 'auth:api',
], function () {
    // Auth
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);

    // Users (Gestión de usuarios)
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    // Desserts (Gestión de postres - Solo Admin debería poder, pero por ahora protegido con auth)
    Route::post('desserts', [DessertController::class, 'store']);
    Route::put('desserts/{id}', [DessertController::class, 'update']);
    Route::delete('desserts/{id}', [DessertController::class, 'destroy']);

    // Orders (Gestión de pedidos)
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::put('orders/{id}', [OrderController::class, 'update']);
    Route::delete('orders/{id}', [OrderController::class, 'destroy']);
});
