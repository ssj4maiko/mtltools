<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AddColumnArcsForChapters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::update('UPDATE chapters
            INNER JOIN novels ON chapters.idNovel = novels.id
            SET dateOriginalRevision = null
            WHERE novels.driver = \'kakuyomu\'
            AND chapters.dateOriginalPost = chapters.dateOriginalRevision;');
        
        Schema::table('chapters', function (Blueprint $table) {
            $table->string('arc', 100)->nullable()->after('no');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('chapters', function (Blueprint $table) {
            $table->dropColumn('arc');
        });
    }
}
