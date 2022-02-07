<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use App\Models\DictionaryCategory;
use App\Models\DictionaryEntry;
use App\Models\Dictionary;

use Illuminate\Support\Facades\DB;

class MassDictionaryService
{
	
	public function internalCategoryUpdate($idDictionary, $id, $data)
	{
		$category = DictionaryCategory::findOrFail($id);
		$data = DictionaryCategory::prepare($data);
		return $category->update($data);
	}
	public function internalCategoryInsert($idDictionary, $data)
	{
		$data = DictionaryCategory::prepare($data);
		$data['idDictionary'] = $idDictionary;
		$category = DictionaryCategory::create($data);

		return $category->id;
	}

	private $insert = [];
	private $update = [];
	private $delete = [];
	private $affectedCategories = [];
	public function massInsert()
	{
		if (count($this->insert) > 0) {
			DB::table('dictionaryEntries')->insert($this->insert);
			return true;
		}
		return false;
	}
	public function massUpdate()
	{
		foreach ($this->update as $update) {
			$update->save();
		}
		return count($this->update) > 0;
	}
	public function massDelete()
	{
		if (count($this->delete) > 0) {
			DB::table('dictionaryEntries')->whereIn('id', $this->delete)->delete();
			return true;
		}
		return false;
	}
	public function prepare($data, $idDictionary, $idCategory = null)
	{
		foreach ($data as $v) {
			// Insert cases
			if (!isset($v['id'])) {
				if (isset($v['entryOriginal']) || isset($v['entryTranslation'])) {
					$insert = [
						'idDictionary'      =>  $idDictionary,
						'idCategory'        =>  $v['idCategory'] ?? $idCategory,
						'entryOriginal'     =>  $v['entryOriginal'] ?? '',
						'entryTranslation'  =>  $v['entryTranslation'] ?? '',
						'description'       =>  $v['description'] ?? '',
						'length' 	        =>  strlen($v['entryOriginal'] ?? '')
					];
					$this->affectedCategories[$insert['idCategory']] = true;
					$this->insert[] = $insert;
				}
			} else {
				if (isset($v['delete']) && $v['delete']) {
					$this->delete[] = $v['id'];
					$this->affectedCategories[$v['idCategory']] = true;
				}
				elseif (isset($v['update']) && $v['update']) {
					$tmp = DictionaryEntry::find($v['id']);
					$tmp->idCategory = $v['idCategory'] ?? $idCategory;
					$tmp->entryOriginal = $v['entryOriginal'] ?? '';
					$tmp->entryTranslation = $v['entryTranslation'] ?? '';
					$tmp->description = $v['description'] ?? '';
					$tmp->length = strlen($v['entryOriginal'] ?? '');

					$this->update[] = $tmp;
					$this->affectedCategories[$tmp['idCategory']] = true;
				}
			}
		}

		return $data;
	}
	public function updateAllEntries(array $data, $idDictionary, $idCategory)
	{
		$this->prepare($data, $idDictionary, $idCategory);
		$changes = [];
		$changes[] = $this->massInsert();
		$changes[] = $this->massUpdate();
		$changes[] = $this->massDelete();
		$changes = $changes[0] || $changes[1] || $changes[2];

		if ($changes) {
			$Dictionary = Dictionary::updateRevision($idDictionary);
			$return['dateRevision'] = $Dictionary->dateRevision;
			$CacheDictionary = new CacheDictionary($Dictionary->id);
			$CacheDictionary->del();
		} else {
		}

		return array_keys($this->affectedCategories);
	}
	private $clearCache = false;
	public function fullSave(array $categories, string $idDictionary){
		foreach ($categories as $idx => $category) {
			if (!isset($category['id'])) {
				$this->clearCache = true;
				$categories[$idx]['id'] = $this->internalCategoryInsert($idDictionary, [
					'name' => $category['name']
				]);
				$category['id'] = $categories[$idx]['id'];
			}
			$idCategory = $category['id'];
			if (isset($category['update']) && $category['update']) {
				$this->clearCache = true;
				$this->internalCategoryUpdate($idDictionary, $idCategory, [
					'name' => $category['name']
				]);
			}
			if (isset($category['entries'])) {
				$changes = $this->updateAllEntries($category['entries'], $idDictionary, $idCategory, false);
				if (!empty($changes))
					$this->clearCache = true;
			}
		}

		$return = ['changes' => $this->clearCache];

		if ($this->clearCache) {
			$DIC = Dictionary::updateRevision($idDictionary, null);
			$return['dateRevision'] = $DIC->dateRevision;
			$CD = new CacheDictionary($idDictionary);
			$CD->del();
		}

		return $return;
	}
}