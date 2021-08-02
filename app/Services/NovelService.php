<?php
namespace App\Services;

use App\Models\CacheChapters;
use App\Models\CacheDictionary;
use App\Models\Novel;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Support\Facades\DB;

class NovelService
{
	public function getAll($search = [])
	{
		if(empty($search)){
			return Novel::all();
		} else {
			return Novel::where('nameCustom','LIKE','%'.$search['search'].'%')
						->orWhere('nameCustom', 'LIKE', '%' . $search['search'] . '%')
						->get();
		}
	}
	public function get(int $id)
	{
		return Novel::with('dictionary', 'dictionary.countCategories')->find($id);
	}
	public function getByDictionary($idDictionary)
	{
		return Novel::whereHas('dictionary', function (Builder $query) use ($idDictionary) {
			$query->where('idDictionary', $idDictionary);
		})->get();
	}
	public function insert($data)
	{
		$data['novel'] = Novel::prepare($data['novel']);
		/** @var Novel $novel */
		$novel = Novel::create($data['novel']);
		if (isset($data['dictionaries'])) {
			$novel->setDictionaries($data['dictionaries']);
		}

		return $novel->load('dictionary');
	}
	public function update($data, $id)
	{
		/** @var Novel $novel */
		$novel = Novel::findOrFail($id);
		$data['novel'] = Novel::prepare($data['novel']);
		$novel->update($data['novel']);
		if(isset($data['dictionaries'])){
			$novel->setDictionaries($data['dictionaries']);
		}
		return $novel->load('dictionary');
	}
	public function delete($id)
	{
		$novel = Novel::find($id);
		$novel->dictionary()->detach();
		/** @var ChapterService $chapterService */
		$chapterService = app(ChapterService::class);
		$chapterService->delete($novel->id);
		return $novel->delete();
	}
	
}