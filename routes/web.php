<?php

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
Route::any('/novel/{query}','IndexController@home')
    ->where('query', '.*');

Route::get('static/{idNovel}/{idDictionary}/{noChapter}/{part?}', 'front\NovelController@getChapter');
Route::get('/', 'IndexController@home');
