<?php

namespace App\Services;

use App\Models\Novel;
use App\Models\Chapter;
use App\Models\Dictionary;
use App\Models\DictionaryCategory;
use App\Models\DictionaryEntry;
use App\Transformers\NovelTransformer;
use App\Transformers\ChapterTransformer;
use App\Transformers\DictionaryTransformer;
use App\Transformers\DictionaryCategoryTransformer;
use App\Transformers\DictionaryEntryTransformer;
use League\Fractal\Serializer\ArraySerializer;



class TransformerService
{
	public function returnSingleNovel(Novel $item)
	{
		return \fractal($item, new NovelTransformer());
	}
	public function returnMultipleNovel($items)
	{
		return \fractal()
			->collection($items, new NovelTransformer())
			->serializeWith(new ArraySerializer)
			->toArray()['data'];
	}

	public function returnSingleChapter(Novel $novel, Chapter $chapter)
	{
		return \fractal($chapter, new ChapterTransformer($novel->startDriver()));
	}
	public function returnMultipleChapter(Novel $novel, $chapters)
	{
		return \fractal()
			->collection($chapters, new ChapterTransformer($novel->startDriver()))
			->serializeWith(new ArraySerializer)
			->toArray()['data'];
	}

	public function returnSingleDictionary(Dictionary $item)
	{
		return \fractal($item, new DictionaryTransformer());
	}
	public function returnMultipleDictionary($items)
	{
		return \fractal()
			->collection($items, new DictionaryTransformer())
			->serializeWith(new ArraySerializer)
			->toArray()['data'];
	}

	public function returnSingleCategory(DictionaryCategory $item)
	{
		return \fractal($item, new DictionaryCategoryTransformer());
	}
	public function returnMultipleCategory($items)
	{
		return \fractal()
			->collection($items, new DictionaryCategoryTransformer())
			->serializeWith(new ArraySerializer)
			->toArray()['data'];
	}

	public function returnSingleEntry(DictionaryEntry $item)
	{
		return \fractal($item, new DictionaryEntryTransformer());
	}
	public function returnMultipleEntry($items)
	{
		return \fractal()
			->collection($items, new DictionaryEntryTransformer())
			->serializeWith(new ArraySerializer)
			->toArray()['data'];
	}
}
