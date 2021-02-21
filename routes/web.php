<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('/ini', function () {
    phpinfo();
});

Route::get('/printing', 'App\Http\Controllers\PrintController@index');
Route::post('/print', 'App\Http\Controllers\PrintController@printFile');
