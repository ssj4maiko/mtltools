import type { FastifyInstance } from "fastify";
import { ChapterListService, NovelNotFoundError } from "../services/chapterList.js";

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
        return reply
          .header("Content-Type", "application/json")
          .header("Cache-Control", "no-cache, private")
          .header("Access-Control-Allow-Origin", "*")
          .send(body);
      } catch (err) {
        if (err instanceof NovelNotFoundError) {
          return reply.code(404).send({ message: "Novel not found" });
        }
        throw err;
      }
    },
  );
}
