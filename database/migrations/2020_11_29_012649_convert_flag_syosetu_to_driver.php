<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class ConvertFlagSyosetuToDriver extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('novels', function (Blueprint $table) {
            $table->string('driver')->after('nameCustom')->nullable();
        });

        DB::table('novels')
            ->where('flagSyosetu',1)
            ->update(['driver' => 'syosetu']);
        /*
        Schema::table('novels', function (Blueprint $table) {
            $table->dropColumn('flagSyosetu');
        });
        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        /*
        Schema::table('novels', function (Blueprint $table) {
            $table->unsignedTinyInteger('flagSyosetu')->default(0)->after('nameCustom');
        });
        */
        DB::table('novels')
            ->where('driver', 'syosetu')
            ->update(['flagSyosetu' => 1]);

        Schema::table('novels', function (Blueprint $table) {
            $table->dropColumn('driver');
        });
    }
}
