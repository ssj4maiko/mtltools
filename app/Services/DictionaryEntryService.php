<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use App\Models\DictionaryEntry;

use Illuminate\Support\Facades\DB;

class DictionaryEntryService
{
	public function getAll($idDictionary, $idCategory)
	{
		return DictionaryEntry::where(['idDictionary' => $idDictionary, 'idCategory' => $idCategory])
			->get();
	}
	public function get($idDictionary, $idCategory, $id)
	{
		return DictionaryEntry::where(['id' => $id])->first();
	}
	public function insert($data,$idDictionary,  $idCategory)
	{
		$data['idDictionary'] = $idDictionary;
		$data['idCategory'] = $idCategory;
		$data['length'] = strlen($data['entryOriginal']);
		return DictionaryEntry::create($data);
	}
	public function update($data,$idDictionary, $idCategory, $id)
	{
		$entry = DictionaryEntry::findOrFail($id);
		$data['length'] = strlen($data['entryOriginal']);
		$entry->update($data);
		return $entry;
	}
	public function delete($idDictionary, $idCategory, $id = null)
	{
		$entries = DictionaryEntry::where('idDictionary',$idDictionary);
		if(is_array($idCategory)){
			$entries->whereIn('idCategory',$idCategory);
		} else {
			$entries->where('idCategory', $idCategory);
		}
		if($id) {
			$entries->where('id',$id);
		}
		if($entries->count() == 0){
			return true;
		}
		return $entries->delete();
	}
	
}