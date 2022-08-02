<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTableNovelDictionary extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('novelsDictionaries', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->unsignedSmallInteger('idNovel');
            $table->unsignedSmallInteger('idDictionary');
            $table->foreign('idNovel')->references('id')->on('novels');
            $table->foreign('idDictionary')->references('id')->on('dictionaries');
        });
        $db = DB::table('dictionaries', 'd')
                ->join('novels AS n', 'd.idNovel', '=', 'n.id')
                ->select('d.id as idDictionary', 'n.id as idNovel')
                ->get()
                ->map(function($item){
                    return (array) $item;
                })
                ->toArray();
                
        DB::table('novelsDictionaries')
            ->insert($db);
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('novelsDictionaries');
    }
}
