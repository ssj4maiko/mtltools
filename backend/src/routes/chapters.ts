import type { FastifyInstance } from "fastify";
import {
  ChapterListService,
  ChapterNotFoundError,
  NovelNotFoundError,
} from "../services/chapterList.js";
import {
  ChapterWriteService,
  ChapterConflictError,
  InvalidChapterWriteError,
} from "../services/chapterWrite.js";
import { jsonReply } from "./http.js";

const idParam = { type: "string", pattern: "^[0-9]+$" };

export async function chapterRoutes(
  app: FastifyInstance,
  opts: { service: ChapterListService; writes: ChapterWriteService },
) {
  app.get<{ Params: { idNovel: string }; Querystring: { search?: string } }>(
    "/api/chapter/:idNovel",
    {
      schema: {
        params: {
          type: "object",
          required: ["idNovel"],
          properties: { idNovel: idParam },
        },
      },
    },
    async (request, reply) => {
      const idNovel = Number(request.params.idNovel);
      const rawSearch = request.query.search;
      const search = rawSearch === undefined ? undefined : String(rawSearch);
      try {
        const body = await opts.service.getListJson(idNovel, search);
        return jsonReply(reply, body);
      } catch (err) {
        return sendChapterError(reply, err);
      }
    },
  );

  app.post<{ Params: { idNovel: string } }>(
    "/api/chapter/:idNovel",
    {
      schema: {
        params: {
          type: "object",
          required: ["idNovel"],
          properties: { idNovel: idParam },
        },
      },
    },
    async (request, reply) => {
      try {
        const body = await opts.writes.insert(Number(request.params.idNovel), request.body);
        return jsonReply(reply, body);
      } catch (err) {
        return sendChapterError(reply, err);
      }
    },
  );

  app.get<{ Params: { idNovel: string; no: string } }>(
    "/api/chapter/:idNovel/:no",
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
        const body = await opts.service.getChapterJson(Number(request.params.idNovel), Number(request.params.no));
        return jsonReply(reply, body);
      } catch (err) {
        return sendChapterError(reply, err);
      }
    },
  );

  app.put<{ Params: { idNovel: string; no: string } }>(
    "/api/chapter/:idNovel/:no",
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
        const body = await opts.writes.update(Number(request.params.idNovel), Number(request.params.no), request.body);
        return jsonReply(reply, body);
      } catch (err) {
        return sendChapterError(reply, err);
      }
    },
  );

  app.delete<{ Params: { idNovel: string; no: string } }>(
    "/api/chapter/:idNovel/:no",
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
        const deleted = await opts.writes.delete(Number(request.params.idNovel), Number(request.params.no));
        return reply.send(deleted);
      } catch (err) {
        return sendChapterError(reply, err);
      }
    },
  );
}

function sendChapterError(
  reply: { code: (n: number) => { send: (b: unknown) => unknown } },
  err: unknown,
) {
  if (err instanceof NovelNotFoundError || err instanceof ChapterNotFoundError) {
    return reply.code(404).send({ message: err instanceof NovelNotFoundError ? "Novel not found" : "Chapter not found" });
  }
  if (err instanceof InvalidChapterWriteError) {
    return reply.code(400).send({ message: err.message });
  }
  if (err instanceof ChapterConflictError) {
    return reply.code(409).send({ message: err.message, no: err.no });
  }
  throw err;
}
