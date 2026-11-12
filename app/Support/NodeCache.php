<?php

namespace App\Support;

/**
 * Deletes Node's on-disk caches.
 * Needed while Laravel still handles writes.
 * Files live under storage/app/node-cache/ (storage-prod in the prod stack).
 */
class NodeCache
{
    public static function invalidateChapterList(?int $idNovel): void
    {
        if (!$idNovel) {
            return;
        }
        $list = storage_path('app/node-cache/chapter-list/' . $idNovel . '.json');
        if (is_file($list)) {
            @unlink($list);
        }
        $dir = storage_path('app/node-cache/chapter/' . $idNovel);
        self::rmDir($dir);
        // numberChapters (and nested payloads) can change on chapter writes.
        self::invalidateNovelCatalog($idNovel);
    }

    public static function invalidateNovelCatalog(?int $idNovel): void
    {
        self::unlinkRel('novel-list/all.json');
        self::rmDirRel('dictionary-list');
        self::rmDirRel('dictionary');
        self::rmDirRel('novels-by-dictionary');
        if ($idNovel) {
            self::unlinkRel('novel/' . $idNovel . '.json');
            self::unlinkRel('dictionaries-by-novel/' . $idNovel . '.json');
        }
    }

    public static function invalidateDictionary(?int $idDictionary): void
    {
        self::unlinkRel('dictionary-list/all.json');
        self::unlinkRel('novel-list/all.json');
        self::rmDirRel('novel');
        self::rmDirRel('dictionaries-by-novel');
        if ($idDictionary) {
            self::unlinkRel('dictionary/' . $idDictionary . '.json');
            self::unlinkRel('novels-by-dictionary/' . $idDictionary . '.json');
            self::unlinkRel('category-list/' . $idDictionary . '.json');
            self::rmDirRel('category/' . $idDictionary);
            self::rmDirRel('entry-list/' . $idDictionary);
            self::unlinkRel('cache-dictionary/' . $idDictionary . '.json');
        }
    }

    private static function unlinkRel(string $rel): void
    {
        $path = storage_path('app/node-cache/' . $rel);
        if (is_file($path)) {
            @unlink($path);
        }
    }

    private static function rmDirRel(string $rel): void
    {
        self::rmDir(storage_path('app/node-cache/' . $rel));
    }

    private static function rmDir(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }
        $items = @scandir($dir);
        if ($items === false) {
            return;
        }
        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }
            $path = $dir . '/' . $item;
            if (is_dir($path)) {
                self::rmDir($path);
            } else {
                @unlink($path);
            }
        }
        @rmdir($dir);
    }
}
