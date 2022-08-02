<?php
namespace App\Services;

use App\Models\DictionaryEntry;
use Illuminate\Database\Eloquent\Collection;

class DictionaryEntryService
{
	public function getAll($idDictionary, $idCategory):Collection {
		return DictionaryEntry::where(['idDictionary' => $idDictionary, 'idCategory' => $idCategory])
			->get();
	}
	public function get($idDictionary, $idCategory, $id):DictionaryEntry {
		return DictionaryEntry::where(['id' => $id])->first();
	}
	public function insert($data,$idDictionary,  $idCategory): DictionaryEntry {
		$data['idDictionary'] = $idDictionary;
		$data['idCategory'] = $idCategory;
		$data['simplified'] = preg_replace('/[\p{P}]/u', '', $data['entryOriginal']);
		$data['length'] = strlen($data['simplified']);
		if ($data['sufix'] == 'null') $data['sufix'] = null;
		if ($data['prefix'] == 'null') $data['prefix'] = null;
		return DictionaryEntry::create($data);
	}
	public function update($data,$idDictionary, $idCategory, $id): DictionaryEntry {
		$entry = DictionaryEntry::findOrFail($id);
		$data['simplified'] = preg_replace('/[\p{P}]/u', '', $data['entryOriginal']);
		$data['length'] = strlen($data['simplified']);
		if($data['sufix'] == 'null') $data['sufix'] = null;
		if($data['prefix'] == 'null') $data['prefix'] = null;
		$entry->update($data);
		return $entry;
	}
	public function delete($idDictionary, $idCategory, $id = null): bool {
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