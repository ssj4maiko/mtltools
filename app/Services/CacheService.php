<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use App\Models\Dictionary;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CacheService
{
	public function getDictionary($idDictionary)
	{
		$cache = new CacheDictionary($idDictionary);
		return response($cache->get())->header('Content-Type', 'application/json');
	}
	public function createDictionary($idDictionary)
	{
		$cache = new CacheDictionary($idDictionary, true);
		$filepath = $cache->create();
		return $this->getDictionary($idDictionary);
	}
	public function getChapter($idDictionary, $idNovel, $no, $part)
	{
		$cache = new CacheChapters($idDictionary, $idNovel, $no);
		return $cache->get($part);
	}
	public function createChapter($idDictionary, $idNovel, $no, $part)
	{
		$cache = new CacheChapters($idDictionary, $idNovel, $no, true);
		$cache->del($no);
		return $cache->create($part);
	}
}