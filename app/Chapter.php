<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
	//
	protected $table = 'chapters';
	protected $primaryKey = 'no';
	const CREATED_AT = 'dateCreated';
	const UPDATED_AT = 'dateRevision';

	//Pseudo-column = addSelect(DB::raw('(textOriginal IS NOT NULL) as hasText'))

	protected $fillable = [
		 'idNovel'
		,'no'
		,'title'
		,'textOriginal'
		,'dateRevision'
		,'textCustom'
		,'dateOriginalPost'
		,'dateOriginalRevision'
	];
	public static function prepare($data){

		return $data;
    }
    public function translateText($dictionary){
        $text = $this->textRevision ? $this->textRevision : $this->textOriginal;

        foreach ($dictionary->dictionary_entry as $entry) {
            $text = str_replace($entry->entryOriginal, '[['.$entry->entryTranslation.']]', $text);
        }
        $text = str_replace(']][[', ' ', $text);
        $text = str_replace(']]', '', $text);
        $text = str_replace('[[', '', $text);
        return $text;
    }
}
