import type { FastifyInstance } from "fastify";
import { NotFoundError } from "../services/catalog.js";
import {
  InvalidNovelWriteError,
  NovelCodeConflictError,
  NovelWriteService,
} from "../services/novelWrite.js";
import { jsonReply } from "./http.js";

const idParam = { type: "string", pattern: "^[0-9]+$" };

export async function novelWriteRoutes(app: FastifyInstance, opts: { writes: NovelWriteService }) {
  app.post("/api/novel", async (request, reply) => {
    try {
      return jsonReply(reply, await opts.writes.insert(request.body));
    } catch (err) {
      return sendWriteError(reply, err);
    }
  });

  app.put<{ Params: { idNovel: string } }>(
    "/api/novel/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.writes.update(Number(request.params.idNovel), request.body));
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.delete<{ Params: { idNovel: string } }>(
    "/api/novel/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    async (request, reply) => {
      try {
        return reply.send(await opts.writes.delete(Number(request.params.idNovel)));
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );
}

function sendWriteError(reply: { code: (n: number) => { send: (b: unknown) => unknown } }, err: unknown) {
  if (err instanceof NotFoundError) {
    return reply.code(404).send({ message: err.message });
  }
  if (err instanceof NovelCodeConflictError) {
    return reply.code(409).send({ message: err.message, code: err.code });
  }
  if (err instanceof InvalidNovelWriteError) {
    return reply.code(400).send({ message: err.message });
  }
  throw err;
}
