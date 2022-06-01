<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use Illuminate\Http\Response;

class CacheService
{
	public function getDictionary($idDictionary):Response
	{
		$cache = new CacheDictionary($idDictionary);
		return response($cache->get())->header('Content-Type', 'application/json');
	}
	public function createDictionary($idDictionary): Response
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