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

	Route::get('chapter/auto/{idNovel}', 'ChapterController@importNext');
	Route::get('chapter/autoIndex/{idNovel}', 'ChapterController@importIndex');
	Route::get('chapter/autoUpdate/{idNovel}', 'ChapterController@updateIndex');

	Route::get('chapter/{idNovel}', 'ChapterController@getAll');
	Route::get('chapter/{idNovel}/{no}', 'ChapterController@get');
	Route::post('chapter/{idNovel}', 'ChapterController@insert');
	Route::put('chapter/{idNovel}/{no}', 'ChapterController@update');
	Route::delete('chapter/{idNovel}/{no}', 'ChapterController@delete');



	Route::get('dictionary/{idNovel}', 'DictionaryController@getAll');
	Route::get('dictionary/{idNovel}/{no}', 'DictionaryController@get');
	Route::post('dictionary/{idNovel}', 'DictionaryController@insert');
	Route::put('dictionary/{idNovel}/{no}', 'DictionaryController@update');
	Route::delete('dictionary/{idNovel}/{no}', 'DictionaryController@delete');

	Route::get('category/{idNovel}', 'DictionaryCategoryController@getAll');
	Route::get('category/{idNovel}/{no}', 'DictionaryCategoryController@get');
	Route::post('category/{idNovel}', 'DictionaryCategoryController@insert');
	Route::put('category/{idNovel}/{no}', 'DictionaryCategoryController@update');
	Route::delete('category/{idNovel}/{no}', 'DictionaryCategoryController@delete');

	Route::get('entry/{idNovel}', 'DictionaryEntryController@getAll');
	Route::post('entry/updatecategory/{idNovel}', 'DictionaryEntryController@updateCategory');
	Route::get('entry/{idNovel}/{no}', 'DictionaryEntryController@get');
	Route::post('entry/{idNovel}', 'DictionaryEntryController@insert');
	Route::put('entry/{idNovel}/{no}', 'DictionaryEntryController@update');
	Route::delete('entry/{idNovel}/{no}', 'DictionaryEntryController@delete');
});
