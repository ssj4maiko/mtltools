<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Chapter extends Model
{
	//
	protected $table = 'chapters';
	protected $primaryKey = ['idNovel','no'];
	const CREATED_AT = 'dateCreated';
	const UPDATED_AT = 'dateRevision';
	public $incrementing = false;

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

/**
 * Set the keys for a save update query.
 *
 * @param  \Illuminate\Database\Eloquent\Builder  $query
 * @return \Illuminate\Database\Eloquent\Builder
 */
protected function setKeysForSaveQuery(Builder $query)
{
    $keys = $this->getKeyName();
    if(!is_array($keys)){
        return parent::setKeysForSaveQuery($query);
    }

    foreach($keys as $keyName){
        $query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
    }

    return $query;
}

/**
 * Get the primary key value for a save query.
 *
 * @param mixed $keyName
 * @return mixed
 */
protected function getKeyForSaveQuery($keyName = null)
{
    if(is_null($keyName)){
        $keyName = $this->getKeyName();
    }

    if (isset($this->original[$keyName])) {
        return $this->original[$keyName];
    }

    return $this->getAttribute($keyName);
}
}
