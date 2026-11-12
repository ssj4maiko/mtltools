<?php
namespace App\Services;

use App\Models\Chapter;
use App\Support\NodeCache;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ChapterService
{
	public function getAll($idNovel, $search = []): Collection
	{
		/** @var Chapter $chapter */
		// hasText is a STORED generated column (textOriginal IS NOT NULL); computing it inline forced
		// InnoDB to read every LONGTEXT of the novel (step0 2026-11-12).
		$chapter = Chapter::select('idNovel', 'noCode', 'arc', 'no', 'title', 'dateCreated', 'dateRevision', 'dateOriginalPost', 'dateOriginalRevision', 'hasText')
			->where(['idNovel' => $idNovel]);
		if (!empty($search)) {
			$likeQuery = '%' . $search['search'] . '%';
			$chapter->where(function ($query) use ($likeQuery) {
				$query->where('title', 'LIKE', $likeQuery)
					->orWhere('textRevision', 'LIKE', $likeQuery)
					->orWhere(function ($query) use ($likeQuery) {
						$query->where('textOriginal', 'LIKE', $likeQuery)
							->WhereNull('textRevision');
					});
			});
		}
		return $chapter->get();
	}
	public function get($idNovel, $no): Chapter
	{
		// select * already includes the generated hasText column; lookup uses PRIMARY KEY (idNovel, no).
		return Chapter::where(['idNovel' => $idNovel, 'no' => $no])
			->first();
	}
	public function insert($chapter, $idNovel): Chapter
	{
		$data = Chapter::prepare($chapter);
		$created = Chapter::create($data);
		NodeCache::invalidateChapterList((int) $idNovel);
		return $created;
	}
	public function update($chapter, $idNovel, $no): Chapter
	{
		$chapter = Chapter::where(['idNovel' => $idNovel, 'no' => $no])->findOrFail();
		$data = Chapter::prepare($chapter);
		$chapter->update($data);
		NodeCache::invalidateChapterList((int) $idNovel);

		return $chapter;
	}
	public function delete($idNovel, $no = null): bool
	{
		$chapters = Chapter::where('idNovel', $idNovel);
		if ($no) {
			$chapters->where('no', $no);
		}
		$deleted = $chapters->delete();
		NodeCache::invalidateChapterList((int) $idNovel);
		return $deleted;
	}
	public function getAllWithNoText($idNovel): Collection
	{
		/** @var Chapter $chapter */
		$chapter = Chapter::where(['idNovel' => $idNovel])
			->where('hasText', 0);
		return $chapter->get();
	}

}