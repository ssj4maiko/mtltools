import type { FastifyInstance } from "fastify";
import { jsonReply } from "./http.js";
import {
  KakuyomuUpdateService,
  DriverNotSupportedError,
  KnownChapterMissingError,
  KakuyomuJobConflictError,
} from "../services/kakuyomuUpdate.js";
import { ChapterNotFoundError, NovelNotFoundError } from "../services/chapterList.js";
import type { KakuyomuJobStore } from "../services/kakuyomuJob.js";

const idParam = { type: "string", pattern: "^[0-9]+$" };

export async function kakuyomuUpdateRoutes(
  app: FastifyInstance,
  opts: { updater: KakuyomuUpdateService; jobs: KakuyomuJobStore },
) {
  app.get<{ Params: { idNovel: string } }>(
    "/api/chapter/autoUpdate/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    async (request, reply) => {
      const idNovel = Number(request.params.idNovel);
      try {
        const body = await opts.updater.autoUpdate(idNovel);
        if (reply.raw.writableEnded) return;
        return jsonReply(reply, body);
      } catch (err) {
        return sendUpdateError(reply, err);
      }
    },
  );

  app.get<{ Params: { idNovel: string } }>(
    "/api/chapter/autoIndex/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    async (request, reply) => {
      try {
        const body = await opts.updater.importIndex(Number(request.params.idNovel));
        return jsonReply(reply, body);
      } catch (err) {
        return sendUpdateError(reply, err);
      }
    },
  );

  app.get<{ Params: { idNovel: string; no: string } }>(
    "/api/chapter/:idNovel/:no/updateChapter",
    {
      schema: {
        params: {
          type: "object",
          required: ["idNovel", "no"],
          properties: { idNovel: idParam, no: idParam },
        },
      },
    },
    async (request, reply) => {
      try {
        const body = await opts.updater.updateChapter(Number(request.params.idNovel), Number(request.params.no));
        if (reply.raw.writableEnded) return;
        return jsonReply(reply, body);
      } catch (err) {
        return sendUpdateError(reply, err);
      }
    },
  );

  const jobByNovel = async (
    request: { params: { idNovel: string } },
    reply: { code: (n: number) => { send: (b: unknown) => unknown }; send: (b: unknown) => unknown },
  ) => {
    const job = opts.jobs.getByNovel(Number(request.params.idNovel));
    if (!job) return reply.code(404).send({ message: "No update job for this novel" });
    return reply.send(job.snapshot());
  };

  app.get<{ Params: { idNovel: string } }>(
    "/api/jobs/kakuyomu/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    jobByNovel,
  );

  app.get<{ Params: { idNovel: string } }>(
    "/api/jobs/syosetu/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    jobByNovel,
  );

  app.get<{ Params: { jobId: string } }>("/api/jobs/:jobId", async (request, reply) => {
    const job = opts.jobs.getById(request.params.jobId);
    if (!job) return reply.code(404).send({ message: "Job not found" });
    return reply.send(job.snapshot());
  });

  app.get<{ Params: { jobId: string } }>("/api/jobs/:jobId/events", async (request, reply) => {
    const job = opts.jobs.getById(request.params.jobId);
    if (!job) return reply.code(404).send({ message: "Job not found" });
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    });
    const write = (snap: unknown) => {
      reply.raw.write(`data: ${JSON.stringify(snap)}\n\n`);
    };
    write(job.snapshot());
    const off = job.onUpdate(write);
    request.raw.on("close", off);
    await job.finished.catch(() => undefined);
    write(job.snapshot());
    reply.raw.end();
  });
}

function sendUpdateError(reply: { raw: { writableEnded: boolean }; code: (n: number) => { send: (b: unknown) => unknown } }, err: unknown) {
  if (reply.raw.writableEnded) return;
  if (err instanceof NovelNotFoundError || err instanceof ChapterNotFoundError) {
    return reply.code(404).send({ message: err.message });
  }
  if (err instanceof DriverNotSupportedError) {
    return reply.code(501).send({
      message: "Only Syosetu and Kakuyomu autoUpdate/updateChapter are on the Node backend so far",
      driver: err.driver,
    });
  }
  if (err instanceof KakuyomuJobConflictError) {
    return reply.code(409).send({ message: err.message, job: err.running });
  }
  if (err instanceof KnownChapterMissingError) {
    return reply.code(500).send({ message: err.message, no: err.no, noCode: err.noCode });
  }
  throw err;
}
