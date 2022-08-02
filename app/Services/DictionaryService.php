<?php
namespace App\Services;

use App\Models\Dictionary;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class DictionaryService
{
	public function getAll($search = []):Collection {
		$dicts = Dictionary::with(['countCategories']);
		if (empty($search)) {
			$result = $dicts->get();
		} else {
			$result = $dicts->where('name', 'LIKE', '%' . $search['search'] . '%')
				->get();
		}
		return $result;
	}
	public function get($id):Dictionary {
		return Dictionary::with('novel', 'countCategories')->find($id);
	}
	public function getByNovel($idNovel):Collection {
		return Dictionary::whereHas('novel',function(Builder $query) use ($idNovel){
			$query->where('idNovel', $idNovel);
		})
		->with('countCategories')
		->get();
	}
	public function insert($data):Dictionary {
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
	public function update($data, $id): Dictionary {
		$Dictionary = Dictionary::findOrFail($id);
		$data['dictionary'] = Dictionary::prepare($data['dictionary']);
		$Dictionary->update($data['dictionary']);
		if (isset($data['novels'])) {
			$Dictionary->setNovels($data['novels']);
		}
		return $Dictionary->load('novel','countCategories');
	}
	public function delete($id): bool {
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