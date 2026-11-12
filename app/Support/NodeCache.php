<?php

namespace App\Support;

/**
 * Deletes Node's on-disk chapter-list cache. Needed while Laravel still handles writes.
 * Files live at storage/app/node-cache/chapter-list/{idNovel}.json (storage-prod in the prod stack).
 */
class NodeCache
{
    public static function invalidateChapterList(?int $idNovel): void
    {
        if (!$idNovel) {
            return;
        }
        $path = storage_path('app/node-cache/chapter-list/' . $idNovel . '.json');
        if (is_file($path)) {
            @unlink($path);
        }
    }
}
