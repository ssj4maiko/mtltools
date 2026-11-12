import type { FastifyInstance } from "fastify";
import {
  ChapterListService,
  ChapterNotFoundError,
  NovelNotFoundError,
} from "../services/chapterList.js";
import { jsonReply } from "./http.js";

export async function chapterRoutes(app: FastifyInstance, opts: { service: ChapterListService }) {
  app.get<{ Params: { idNovel: string }; Querystring: { search?: string } }>(
    "/api/chapter/:idNovel",
    {
      schema: {
        params: {
          type: "object",
          required: ["idNovel"],
          properties: { idNovel: { type: "string", pattern: "^[0-9]+$" } },
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
        if (err instanceof NovelNotFoundError) {
          return reply.code(404).send({ message: "Novel not found" });
        }
        throw err;
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
          properties: {
            idNovel: { type: "string", pattern: "^[0-9]+$" },
            no: { type: "string", pattern: "^[0-9]+$" },
          },
        },
      },
    },
    async (request, reply) => {
      const idNovel = Number(request.params.idNovel);
      const no = Number(request.params.no);
      try {
        const body = await opts.service.getChapterJson(idNovel, no);
        return jsonReply(reply, body);
      } catch (err) {
        if (err instanceof NovelNotFoundError || err instanceof ChapterNotFoundError) {
          return reply.code(404).send({ message: "Chapter not found" });
        }
        throw err;
      }
    },
  );
}
