<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CacheDictionary extends Model
{
    private $idDictionary = null;
    public function __construct(int $idDictionary,$forceCache = false){
        $this->setIdDictionary($idDictionary);
        $this->forceCache = $forceCache;
    }
    public function setIdDictionary(int $idDictionary){
        $this->idDictionary = $idDictionary;
    }

    private const CACHEFOLDER = 'public/cache/';
    private $forceCache = false;

    public function create()
    {
        $dictionary = Dictionary::find($this->idDictionary);
        if ($dictionary) {
            $files = Storage::files(self::CACHEFOLDER);
            $cacheName = self::CACHEFOLDER . $this->idDictionary . '.json';
            $dateName = self::CACHEFOLDER . $this->idDictionary . '.txt';

            if (!$this->forceCache) {
                $key = array_filter($files, function ($el) use ($dictionary) {
                    return strpos($el, self::CACHEFOLDER . $dictionary->id) === 0;
                });

                // Found the cache for the current novel-dictionary
                if (!empty($key)) {
                    $date = Storage::get($dateName);
                    // There has been no update, so there is nothing to do
                    if ($date == $dictionary->dateRevision)
                        return Storage::url($cacheName);
                }
            }

            $entries = Dictionary::with(['countCategories','dictionaryCategory', 'dictionaryCategory.countEntries', 'dictionaryEntry'])
                ->where('id', $this->idDictionary)
                ->first();
            Storage::put($dateName, $dictionary->dateRevision);
            Storage::put($cacheName, $entries);

            return Storage::url($cacheName);
        }
        throw new \Throwable("No Dictionary found", 1);
    }

    public function get()
    {
        $cacheName = self::CACHEFOLDER . $this->idDictionary . '.json';
        if (Storage::exists($cacheName)) {
            return Storage::get($cacheName);
        } else {
            $this->forceCache = true;
            $this->create($this->idDictionary);
            return Storage::get($cacheName);
        }
    }
    public function del()
    {
        $cacheName = self::CACHEFOLDER . $this->idDictionary . '.json';
        $CacheChapters = new CacheChapters($this->idDictionary);
        $CacheChapters->del($this->idDictionary);
        return Storage::delete($cacheName);
    }
}
