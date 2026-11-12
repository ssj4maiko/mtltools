<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Chapters performance (applied by hand to the MK-II prod DB on 2026-11-12, reproduced here so fresh setups match).
 *
 *  - PRIMARY KEY (idNovel, no): prod had drifted to a surrogate `temp_duplicate_id` PK with no index on
 *    (idNovel, no), so every chapter query was a full scan of the LONGTEXT table.
 *  - `hasText` STORED generated column (textOriginal IS NOT NULL) + index (idNovel, hasText): computing it
 *    inline forced InnoDB to read every chapter text. Generated, so raw INSERTs (epub-chapter-scrapper) keep working.
 *  - `dateCreated` without ON UPDATE CURRENT_TIMESTAMP (MySQL/MariaDB adds it implicitly to the first TIMESTAMP
 *    column when explicit_defaults_for_timestamp is off, which reset the creation date on every update).
 *
 * Idempotent: every change is guarded by information_schema checks, so it is a no-op on a DB that already matches.
 */
return new class extends Migration
{
    /**
     * The ALTER TABLE clauses still needed on the current database (empty array = nothing to do).
     */
    public static function plannedClauses(): array
    {
        $db = DB::getDatabaseName();

        $cols = collect(DB::select(
            "SELECT COLUMN_NAME, IS_NULLABLE, EXTRA FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'chapters'",
            [$db]
        ))->keyBy('COLUMN_NAME');
        $pk = collect(DB::select(
            "SELECT COLUMN_NAME FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'chapters' AND INDEX_NAME = 'PRIMARY' ORDER BY SEQ_IN_INDEX",
            [$db]
        ))->pluck('COLUMN_NAME')->all();
        $indexes = collect(DB::select(
            "SELECT DISTINCT INDEX_NAME FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'chapters'",
            [$db]
        ))->pluck('INDEX_NAME')->all();

        $clauses = [];

        // No columns visible: table missing, or `migrate --pretend` (selects return nothing). Nothing to plan.
        if ($cols->isEmpty()) {
            return $clauses;
        }

        if ($pk !== ['idNovel', 'no']) {
            $dupes = DB::selectOne('SELECT COUNT(*) AS c FROM (SELECT 1 FROM chapters GROUP BY idNovel, `no` HAVING COUNT(*) > 1) d')->c ?? 0;
            if ($dupes > 0) {
                throw new RuntimeException("chapters has {$dupes} duplicate (idNovel, no) pairs; resolve them before running this migration.");
            }
            if (!empty($pk)) {
                $clauses[] = 'DROP PRIMARY KEY';
            }
            if (isset($cols['temp_duplicate_id'])) {
                $clauses[] = 'DROP COLUMN temp_duplicate_id';
            }
            if (($cols['idNovel']->IS_NULLABLE ?? 'NO') === 'YES') {
                $clauses[] = 'MODIFY idNovel smallint(5) unsigned NOT NULL';
            }
            if (($cols['no']->IS_NULLABLE ?? 'NO') === 'YES') {
                $clauses[] = 'MODIFY `no` smallint(5) unsigned NOT NULL';
            }
            $clauses[] = 'ADD PRIMARY KEY (idNovel, `no`)';
        }

        if (isset($cols['dateCreated']) && stripos($cols['dateCreated']->EXTRA, 'on update') !== false) {
            $clauses[] = 'MODIFY dateCreated timestamp NOT NULL DEFAULT current_timestamp()';
        }

        if (!isset($cols['hasText'])) {
            $clauses[] = 'ADD COLUMN hasText tinyint(1) AS (textOriginal IS NOT NULL) STORED';
        }

        if (!in_array('chapters_idnovel_hastext', $indexes, true)) {
            $clauses[] = 'ADD KEY chapters_idnovel_hastext (idNovel, hasText)';
        }

        return $clauses;
    }

    public function up()
    {
        $clauses = self::plannedClauses();
        if (!empty($clauses)) {
            DB::statement('ALTER TABLE chapters ' . implode(', ', $clauses));
        }
    }

    /**
     * Only removes the generated column and its index; the primary key and the dateCreated fix are kept
     * (they are corrections, and the original create_all_tables migration already defines that primary key).
     */
    public function down()
    {
        $db = DB::getDatabaseName();
        $indexes = collect(DB::select(
            "SELECT DISTINCT INDEX_NAME FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'chapters'",
            [$db]
        ))->pluck('INDEX_NAME')->all();
        $hasColumn = (DB::selectOne(
            "SELECT COUNT(*) AS c FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'chapters' AND COLUMN_NAME = 'hasText'",
            [$db]
        )->c ?? 0) > 0;

        $clauses = [];
        if (in_array('chapters_idnovel_hastext', $indexes, true)) {
            $clauses[] = 'DROP KEY chapters_idnovel_hastext';
        }
        if ($hasColumn) {
            $clauses[] = 'DROP COLUMN hasText';
        }
        if (!empty($clauses)) {
            DB::statement('ALTER TABLE chapters ' . implode(', ', $clauses));
        }
    }
};
