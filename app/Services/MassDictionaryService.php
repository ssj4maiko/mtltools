<?php
namespace App\Services;

use App\Models\CacheDictionary;
use App\Models\DictionaryCategory;
use App\Models\DictionaryEntry;
use App\Models\Dictionary;

use Illuminate\Support\Facades\DB;

class MassDictionaryService
{
	/**
	 * When doing a Full Save, you have to insert new Categories and getting their Id so as to use it on the entries
	 *
	 * @param int $idDictionary
	 * @param int $id
	 * @param array $data
	 * @return int
	 */	
	public function internalCategoryInsert($idDictionary, $data):int
	{
		$data = DictionaryCategory::prepare($data);
		$data['idDictionary'] = $idDictionary;
		$category = DictionaryCategory::create($data);

		return $category->id;
	}
	/**
	 * Updating categories during Full Save.
	 *
	 * @param int $idDictionary
	 * @param int $id
	 * @param array $data
	 * @return bool
	 */
	public function internalCategoryUpdate($idDictionary, $id, $data):bool
	{
		$category = DictionaryCategory::findOrFail($id);
		$data = DictionaryCategory::prepare($data);
		return $category->update($data);
	}

	private $insert = [];
	private $update = [];
	private $delete = [];
	private $affectedCategories = [];
	public function massInsert()
	{
		if (count($this->insert) > 0) {
			DB::table('dictionaryEntries')->insert($this->insert);
			$this->insert = [];
			return true;
		}
		return false;
	}
	public function massUpdate()
	{
		foreach ($this->update as $update) {
			$update->save();
		}
		$count = count($this->update) > 0;
		$this->update = [];
		return $count;
	}
	public function massDelete()
	{
		if (count($this->delete) > 0) {
			DB::table('dictionaryEntries')->whereIn('id', $this->delete)->delete();
			$this->delete = [];
			return true;
		}
		return false;
	}
	/**
	 * Fills in the mass Insert, Update and Delte arrays. It works in 2 contexts: Full Save and per Category.
	 * Per Category allows to move an entry to another category/ It retuns the same $entries. There is no real reason for that though.
	 *
	 * @param array $entries
	 * @param int $idDictionary
	 * @param int $idCategory
	 * @return array
	 */
	public function prepareCategory(array $entries, $idDictionary, $idCategory = null):void
	{
		foreach ($entries as $v) {
			// Insert cases
			if (!isset($v['id'])) {
				if (isset($v['entryOriginal']) || isset($v['entryTranslation'])) {
					$insert = [
						'idDictionary'      =>  $idDictionary,
						'idCategory'        =>  $v['idCategory'] ?? $idCategory,
						'entryOriginal'     =>  $v['entryOriginal'] ?? '',
						'entryTranslation'  =>  $v['entryTranslation'] ?? '',
						'sufix'  			=>  isset($v['sufix']) && $v['sufix'] 	!= 'null' ? $v['sufix'] : null,
						'prefix'  			=>  isset($v['prefix']) && $v['prefix'] != 'null' ? $v['prefix'] : null,
						'description'       =>  $v['description'] ?? ''
					];
					$insert['simplified'] = preg_replace('/[\p{P}]/u', '', $v['entryOriginal']);
					$insert['length'] = strlen($insert['simplified']);
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
					$tmp->sufix =	isset($v['sufix']) && $v['sufix'] 	!= 'null' ? $v['sufix'] : null;
					$tmp->prefix =	isset($v['prefix']) && $v['prefix'] != 'null' ? $v['prefix'] : null;
					$tmp->simplified = preg_replace('/[\p{P}]/u', '', $v['entryOriginal']);
					$tmp->length = strlen($tmp->simplified);
					$this->update[] = $tmp;
					$this->affectedCategories[$tmp['idCategory']] = true;
				}
			}
		}
	}
	/**
	 * Mass Insert/Update/Delete of everything. And deletes Dicitonary Cache is something is done.
	 * Returns the categories with entries affected. The value is not really used, but it is used to determine if there was any change in the first place.
	 *
	 * @param array $entries
	 * @param integer $idDictionary
	 * @param integer $idCategory
	 * @return array
	 */
	public function updateAllEntries(array $entries, $idDictionary, $idCategory):array
	{
		$this->prepareCategory($entries, $idDictionary, $idCategory);
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
	/**
	 * Saves all Categories and Entries passed. Structure is dictated by the frontend
	 *
	 * @param array $categories
	 * @param string $idDictionary
	 * @return [changes:bool, ?dateRevision:string]
	 */
	public function fullSave(array $categories, string $idDictionary):array{
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
				if (!empty($changes)) {
					$this->clearCache = true;
				}
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