<?php
namespace App\Services;

use App\Models\Chapter;
use Illuminate\Support\Facades\DB;

class ChapterService {
	public function getAll($idNovel, $search = [])
	{
		/** @var Chapter $chapter */
		$chapter = Chapter::select('idNovel', 'no', 'title', 'dateCreated', 'dateRevision', 'dateOriginalPost', 'dateOriginalRevision')
			->addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))
			->where(['idNovel' => $idNovel]);
		if(!empty($search)){
			$likeQuery = '%'.$search['search'].'%';
			$chapter->where(function($query) use ($likeQuery) {
				$query->where('title','LIKE', $likeQuery)
					  ->orWhere('textCustom','LIKE', $likeQuery)
					  ->orWhere(function($query) use ($likeQuery){
						$query->where('textOriginal','LIKE', $likeQuery)
							  ->WhereNull('textCustom');
					  });
			});
		}
		return $chapter->get();
	}
	public function get($idNovel, $no)
	{
		return Chapter::select()->addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))
			->where(['idNovel' => $idNovel, 'no' => $no])
			->first();
	}
	public function insert($chapter, $idNovel)
	{
		$data = Chapter::prepare($chapter);
		return Chapter::create($data);
	}
	public function update($chapter, $idNovel, $no)
	{
		$chapter = Chapter::where(['idNovel' => $idNovel, 'no' => $no])->findOrFail();
		$data = Chapter::prepare($chapter);
		$chapter->update($data);

		return $chapter;
	}
	public function delete($idNovel, $no = null)
	{
		$chapters = Chapter::where('idNovel',$idNovel);
		if($no){
			$chapters->where('no',$no);
		}
		return $chapters->delete();
	}
}