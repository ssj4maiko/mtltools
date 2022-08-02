<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExampleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public static $wrap = false;
    public function toArray($request)
    {
        foreach($this as $idx => $val){
            return [
                'data' =>  $val,
                'meta' => [
                    'something_else'   =>  $val
                ]
            ];
        }
    }
}
