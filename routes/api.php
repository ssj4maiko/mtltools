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



	Route::get('dictionary/createCache/{idNovel}/{idDictionary}', 'DictionaryController@createCache');
	Route::get('dictionary/cache/{idNovel}/{idDictionary}', 'DictionaryController@getCache');
    Route::put('dictionary/fullSave/{idNovel}/{idDictionary}', 'DictionaryController@fullSave');

	Route::get('dictionary/{idNovel}', 'DictionaryController@getAll');
	Route::get('dictionary/{idNovel}/{idDictionary}', 'DictionaryController@get');
	Route::post('dictionary/{idNovel}', 'DictionaryController@insert');
	Route::put('dictionary/{idNovel}/{idDictionary}', 'DictionaryController@update');
	Route::delete('dictionary/{idNovel}/{idDictionary}', 'DictionaryController@delete');

	Route::get('category/{idDictionary}', 'DictionaryCategoryController@getAll');
	Route::get('category/{idDictionary}/{idCategory}', 'DictionaryCategoryController@get');
	Route::post('category/{idDictionary}', 'DictionaryCategoryController@insert');
	Route::put('category/{idDictionary}/{idCategory}', 'DictionaryCategoryController@update');
	Route::delete('category/{idDictionary}/{idCategory}', 'DictionaryCategoryController@delete');

	Route::get('entry/{idCategory}', 'DictionaryEntryController@getAll');
	Route::post('entry/updatecategory/{idCategory}', 'DictionaryEntryController@updateCategory');
	Route::get('entry/{idCategory}/{idEntry}', 'DictionaryEntryController@get');
	Route::post('entry/{idCategory}', 'DictionaryEntryController@insert');
	Route::put('entry/{idCategory}/{idEntry}', 'DictionaryEntryController@update');
	Route::delete('entry/{idCategory}/{idEntry}', 'DictionaryEntryController@delete');
});
