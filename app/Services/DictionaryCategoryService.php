<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use App\Models\DictionaryCategory;

use Illuminate\Support\Facades\DB;

class DictionaryCategoryService
{
	public function getAll($idDictionary, $idCategories = [])
	{
		$cats = DictionaryCategory::where(['idDictionary' => $idDictionary])
			->with('countEntries');
		if(!empty($idCategories)){
			$cats->whereIn('id',$idCategories);
		}
		return $cats->get();
	}
	public function get($idDictionary, $id)
	{
		return DictionaryCategory::where(['idDictionary' => $idDictionary, 'id' => $id])
			->with('countEntries')
			->limit(1)
			->first();
	}
	public function insert($data, $idDictionary){
		$data['idDictionary'] = $idDictionary;
		$category = DictionaryCategory::create($data);
		return $category->load('countEntries');
	}
	public function update($data, $idDictionary, $id)
	{
		$category = DictionaryCategory::findOrFail($id);
		$data = DictionaryCategory::prepare($data);
		$category->update($data);

		return $category->load('countEntries');
	}
	public function delete($idDictionary, $id = null)
	{
		$cats = DictionaryCategory::where(['idDictionary' => $idDictionary]);
		if($id){
			$cats->where('id',$id);
		}
		$categoriesIds = $cats->get()
							  ->map(function ($category) {
								return $category->id;
							  })
							  ->toArray();
		/** @var DictionaryEntryService $DictionaryEntryService */
		$DictionaryEntryService = app(DictionaryEntryService::class);
		if ($DictionaryEntryService->delete($idDictionary, $categoriesIds)) {
			if ($cats->count() == 0) {
				return true;
			}
			return $cats->delete();
		}
		return false;
	}
}