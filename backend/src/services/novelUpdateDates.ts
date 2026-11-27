import { sql } from "kysely";
import type { Db } from "../db/client.js";

/**
 * Inserts stamp dateRevision as well, so a chapter only counts as "revised" when its
 * dateRevision is clearly later than its own dateCreated.
 */
export const REVISION_GRACE_SECONDS = 5;

/**
 * Recompute novels.lastChapterAddedAt / lastChapterRevisedAt from chapters.
 * Call once after a batch of chapter inserts, revisions or deletes (one novel), or without
 * an id to rebuild every novel (import paths, one-time backfill). Returns the novels touched.
 */
export async function refreshNovelUpdateDates(db: Db, idNovel?: number): Promise<number> {
  const where = idNovel === undefined ? sql`` : sql`WHERE n.id = ${idNovel}`;
  const result = await sql`
    UPDATE novels n SET
      n.lastChapterAddedAt = (SELECT MAX(c.dateCreated) FROM chapters c WHERE c.idNovel = n.id),
      n.lastChapterRevisedAt = (
        SELECT MAX(c.dateRevision) FROM chapters c
        WHERE c.idNovel = n.id AND c.dateRevision > c.dateCreated + INTERVAL ${sql.raw(String(REVISION_GRACE_SECONDS))} SECOND
      )
    ${where}
  `.execute(db);
  return Number(result.numAffectedRows ?? 0);
}
