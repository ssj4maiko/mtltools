<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\DictionaryController;
use App\Http\Controllers\DictionaryCategoryController;
use App\Http\Controllers\DictionaryEntryController;
use App\Http\Controllers\CacheController;
use App\Http\Controllers\MetaController;

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
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});
*/

Route::middleware(['cors'])->group(function(){
	Route::group(['prefix' => 'novel'], function () {
		Route::get(		'/',											[NovelController::class, 		'getAll']);
		Route::get(		'/dictionary/{idDictionary}',					[NovelController::class, 	    'getByDictionary']);
		Route::get(		'/{idNovel}',									[NovelController::class, 		'get']);
		Route::post(	'/',											[NovelController::class, 		'insert']);
		Route::put(		'/{idNovel}',									[NovelController::class, 		'update']);
		Route::delete(	'/{idNovel}',									[NovelController::class, 		'delete']);
	});

	Route::group(['prefix' => 'chapter'], function () {
		Route::get(		'/auto/{idNovel}',							[ChapterController::class, 'importNext']);
		Route::get(		'/autoIndex/{idNovel}',						[ChapterController::class, 'importIndex']);
		Route::get(		'/autoUpdate/{idNovel}',					[ChapterController::class, 'updateIndex']);
		Route::get(		'/{idNovel}',								[ChapterController::class, 'getAll']);
		Route::get(		'/{idNovel}/{no}',							[ChapterController::class, 'get']);
		Route::get(		'/{idNovel}/{no}/updateChapter',			[ChapterController::class, 'updateChapter']);
		Route::post(	'/{idNovel}',								[ChapterController::class, 'insert']);
		Route::put(		'/{idNovel}/{no}',							[ChapterController::class, 'update']);
		Route::delete(	'/{idNovel}/{no}',							[ChapterController::class, 'delete']);
	});
	
	Route::group(['prefix' => 'dictionary'], function () {
		Route::put(		'/fullSave/{idDictionary}',				[DictionaryController::class, 'fullSave']);
		Route::get(		'/',									[DictionaryController::class, 'getAll']);
		Route::get(		'/novel/{idNovel}',						[DictionaryController::class, 'getByNovel']);
		Route::get(		'/{idDictionary}',						[DictionaryController::class, 'get']);
		Route::post(	'/',									[DictionaryController::class, 'insert']);
		Route::put(		'/{idDictionary}',						[DictionaryController::class, 'update']);
		Route::delete(	'/{idDictionary}',						[DictionaryController::class, 'delete']);
	});
	
	Route::group(['prefix' => 'category'], function () {
		Route::get(		'/{idDictionary}',							[DictionaryCategoryController::class, 'getAll']);
		Route::get(		'/{idDictionary}/{idCategory}',				[DictionaryCategoryController::class, 'get']);
		Route::post(	'/{idDictionary}',							[DictionaryCategoryController::class, 'insert']);
		Route::put(		'/{idDictionary}/{idCategory}',				[DictionaryCategoryController::class, 'update']);
		Route::delete(	'/{idDictionary}/{idCategory}',				[DictionaryCategoryController::class, 'delete']);
	});
	Route::group(['prefix' => 'entry'], function () {
		Route::get(		'/{idDictionary}/{idCategory}',								[DictionaryEntryController::class, 'getAll']);
		Route::put(		'/{idDictionary}/updatebycategory/{idCategory}',			[DictionaryEntryController::class, 'updateByCategory']);
		Route::get(		'/{idDictionary}/{idCategory}/{idEntry}',					[DictionaryEntryController::class, 'get']);
		Route::post(	'/{idDictionary}/{idCategory}',								[DictionaryEntryController::class, 'insert']);
		Route::put(		'/{idDictionary}/{idCategory}/{idEntry}',					[DictionaryEntryController::class, 'update']);
		Route::delete(	'/{idDictionary}/{idCategory}/{idEntry}',					[DictionaryEntryController::class, 'delete']);
	});
	Route::group(['prefix' => 'cache'], function () {
		Route::group(['prefix' => 'dictionary'], function () {
			Route::get('/{idDictionary}',										[CacheController::class, 'getDictionary']);
			Route::put('/{idDictionary}',										[CacheController::class, 'createDictionary']);
		});
		Route::group(['prefix' => 'chapter'], function () {
			Route::get('/{idDictionary}/{idChapter}/{noChapter}/{part?}',		[CacheController::class, 'getChapter']);
			Route::put('/{idDictionary}/{idChapter}/{noChapter}/{part?}',		[CacheController::class, 'createChapter']);
		});
	});
	Route::post('/meta',		[MetaController::class, 'getMeta']);

});
