<?php

use Illuminate\Http\Request;
use App\Http\Controllers\NovelController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['cors'])->group(function(){
	Route::get('novel', 'NovelController@getAll');
	Route::get('novel/{idNovel}', 'NovelController@get');
	Route::post('novel/', 'NovelController@insert');
	Route::put('novel/{idNovel}', 'NovelController@update');
	Route::delete('novel/{idNovel}', 'NovelController@delete');

	Route::get('chapter/{idNovel}', 'ChapterController@getAll');
	Route::get('chapter/auto/{idNovel}', 'ChapterController@importNext');
	Route::get('chapter/{idNovel}/{no}', 'ChapterController@get');
	Route::post('chapter/{idNovel}', 'ChapterController@insert');
	Route::put('chapter/{idNovel}/{no}', 'ChapterController@update');
	Route::delete('chapter/{idNovel}/{no}', 'ChapterController@delete');
});