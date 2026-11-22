import type { FastifyInstance } from "fastify";
import { WeeklyUpdateAlreadyRunningError, type WeeklyUpdateService } from "../services/weeklyUpdate.js";

/**
 * Internal only: nginx does not proxy /api/internal, and the backend port is bound to 127.0.0.1.
 * POST ?dryRun=1 only lists what would be updated.
 */
export async function weeklyUpdateRoutes(app: FastifyInstance, opts: { weekly: WeeklyUpdateService }) {
  app.post<{ Querystring: { dryRun?: string } }>("/api/internal/weekly-update", async (request, reply) => {
    if (request.query.dryRun === "1" || request.query.dryRun === "true") {
      const plan = await opts.weekly.plan();
      return reply.send({
        dryRun: true,
        total: plan.candidates.length,
        counts: plan.counts,
        skippedManual: plan.skippedManual,
        skippedOtherDriver: plan.skippedOtherDriver,
        novels: plan.candidates,
      });
    }
    try {
      const summary = await opts.weekly.start();
      return reply.code(202).send(summary);
    } catch (err) {
      if (err instanceof WeeklyUpdateAlreadyRunningError) {
        const cur = opts.weekly.status ? await opts.weekly.status() : null;
        return reply.code(409).send({ message: err.message, alreadyRunning: true, current: cur });
      }
      throw err;
    }
  });

  app.get("/api/internal/weekly-update", async (_request, reply) => {
    return reply.send(await opts.weekly.status());
  });
}
