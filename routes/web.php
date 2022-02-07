<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\front\NovelController as FrontNovelController;

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
Route::any('/novel/{query}',[IndexController::class, 'home'])
    ->where('query', '.*');
Route::any('/dictionary/{query}', [IndexController::class, 'home'])
    ->where('query', '.*');
Route::any('/dashboard', [IndexController::class, 'home']);

Route::get('static/{idNovel}/{idDictionary}/{noChapter}/{part?}', [FrontNovelController::class, 'getChapter']);
Route::get('/', [IndexController::class, 'home']);
