<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;


Route::get('/', function () {
    return view('welcome');
});
Route::get('/', function(){ return view('app'); });
Route::get('/students', [StudentController::class, 'index']);
Route::post('/students', [StudentController::class, 'store']);