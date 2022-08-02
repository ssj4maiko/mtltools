<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class IsolateDictionaryFromNovel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dictionaries', function (Blueprint $table) {
            $table->dropForeign(['idNovel']);
            $table->string('name',255)->after('id');
            $table->smallIncrements('id')->nullable()->change();
        });
        $db = DB::table('dictionaries','d')
                ->join('novels AS n','d.idNovel','=','n.id')
                ->update([
                    'd.name'  =>  DB::raw("CONCAT_WS(' - ',`n`.`nameCustom`,`d`.`language`)")
                ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dictionaries', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->foreign('idNovel')->references('id')->on('novels');
        });
    }
}
