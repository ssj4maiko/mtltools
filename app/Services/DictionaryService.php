<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use App\Models\DictionaryCategory;
use App\Models\DictionaryEntry;
use App\Models\Dictionary;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class DictionaryService
{
	public function getAll($search = [])
	{
		$dicts = Dictionary::with('countCategories');
		if (empty($search)) {
			return $dicts->get();
		} else {
			return $dicts->where('name', 'LIKE', '%' . $search['search'] . '%')
				->get();
		}
	}
	public function get($id){
		return Dictionary::with('novel', 'countCategories')->find($id);
	}
	public function getByNovel($idNovel){
		return Dictionary::whereHas('novel',function(Builder $query) use ($idNovel){
			$query->where('idNovel', $idNovel);
		})
		->with('countCategories')
		->get();
	}
	public function insert($data){
		$Dictionary = Dictionary::create($data['dictionary']);
		if (isset($data['novels'])) {
			$Dictionary->setNovels($data['novels']);
		}

		$CategoryService = app(DictionaryCategoryService::class);
		$CategoryService->insert([
			'name'	=>	'default'
		], $Dictionary->id);

		return $Dictionary->load('novel','countCategories');
	}
	public function update($data, $id)
	{
		$Dictionary = Dictionary::findOrFail($id);
		$data['dictionary'] = Dictionary::prepare($data['dictionary']);
		$Dictionary->update($data['dictionary']);
		if (isset($data['novels'])) {
			$Dictionary->setNovels($data['novels']);
		}
		return $Dictionary->load('novel','countCategories');
	}
	public function delete($id)
	{
		$dict = Dictionary::find($id);
		/** @var DictionaryCategoryService $DictionaryCategoryService */
		$DictionaryCategoryService = app(DictionaryCategoryService::class);
		if($DictionaryCategoryService->delete($dict->id)){
			$dict->novel()->detach();
			return $dict->delete();
		}
		return false;
	}
}