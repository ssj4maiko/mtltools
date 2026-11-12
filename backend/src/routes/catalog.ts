import type { FastifyInstance } from "fastify";
import { CatalogService, NotFoundError } from "../services/catalog.js";
import { MetaService, UnknownMetaError } from "../services/meta.js";
import { jsonReply } from "./http.js";

const idParam = { type: "string", pattern: "^[0-9]+$" };

function notFound(reply: any, message: string) {
  return reply.code(404).send({ message });
}

export async function catalogRoutes(
  app: FastifyInstance,
  opts: { catalog: CatalogService; meta: MetaService },
) {
  app.get("/api/novel", async (request, reply) => {
    const rawSearch = (request.query as { search?: string }).search;
    const search = rawSearch === undefined ? undefined : String(rawSearch);
    return jsonReply(reply, await opts.catalog.getNovelsJson(search));
  });

  app.get<{ Params: { idDictionary: string } }>(
    "/api/novel/dictionary/:idDictionary",
    { schema: { params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } } } },
    async (request, reply) => {
      return jsonReply(reply, await opts.catalog.getNovelsByDictionaryJson(Number(request.params.idDictionary)));
    },
  );

  app.get<{ Params: { idNovel: string } }>(
    "/api/novel/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.catalog.getNovelJson(Number(request.params.idNovel)));
      } catch (err) {
        if (err instanceof NotFoundError) return notFound(reply, err.message);
        throw err;
      }
    },
  );

  app.get("/api/dictionary", async (_request, reply) => {
    return jsonReply(reply, await opts.catalog.getDictionariesJson());
  });

  app.get<{ Params: { idNovel: string } }>(
    "/api/dictionary/novel/:idNovel",
    { schema: { params: { type: "object", required: ["idNovel"], properties: { idNovel: idParam } } } },
    async (request, reply) => {
      return jsonReply(reply, await opts.catalog.getDictionariesByNovelJson(Number(request.params.idNovel)));
    },
  );

  app.get<{ Params: { idDictionary: string } }>(
    "/api/dictionary/:idDictionary",
    { schema: { params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } } } },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.catalog.getDictionaryJson(Number(request.params.idDictionary)));
      } catch (err) {
        if (err instanceof NotFoundError) return notFound(reply, err.message);
        throw err;
      }
    },
  );

  app.get<{ Params: { idDictionary: string } }>(
    "/api/category/:idDictionary",
    { schema: { params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } } } },
    async (request, reply) => {
      return jsonReply(reply, await opts.catalog.getCategoriesJson(Number(request.params.idDictionary)));
    },
  );

  app.get<{ Params: { idDictionary: string; idCategory: string } }>(
    "/api/category/:idDictionary/:idCategory",
    {
      schema: {
        params: {
          type: "object",
          required: ["idDictionary", "idCategory"],
          properties: { idDictionary: idParam, idCategory: idParam },
        },
      },
    },
    async (request, reply) => {
      try {
        return jsonReply(
          reply,
          await opts.catalog.getCategoryJson(Number(request.params.idDictionary), Number(request.params.idCategory)),
        );
      } catch (err) {
        if (err instanceof NotFoundError) return notFound(reply, err.message);
        throw err;
      }
    },
  );

  app.get<{ Params: { idDictionary: string; idCategory: string } }>(
    "/api/entry/:idDictionary/:idCategory",
    {
      schema: {
        params: {
          type: "object",
          required: ["idDictionary", "idCategory"],
          properties: { idDictionary: idParam, idCategory: idParam },
        },
      },
    },
    async (request, reply) => {
      return jsonReply(
        reply,
        await opts.catalog.getEntriesJson(Number(request.params.idDictionary), Number(request.params.idCategory)),
      );
    },
  );

  app.get<{ Params: { idDictionary: string; idCategory: string; idEntry: string } }>(
    "/api/entry/:idDictionary/:idCategory/:idEntry",
    {
      schema: {
        params: {
          type: "object",
          required: ["idDictionary", "idCategory", "idEntry"],
          properties: { idDictionary: idParam, idCategory: idParam, idEntry: idParam },
        },
      },
    },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.catalog.getEntryJson(Number(request.params.idEntry)));
      } catch (err) {
        if (err instanceof NotFoundError) return notFound(reply, err.message);
        throw err;
      }
    },
  );

  app.post("/api/meta", async (request, reply) => {
    const body = (request.body ?? {}) as { meta?: unknown };
    const keys = Array.isArray(body.meta) ? body.meta.map((k) => String(k)) : undefined;
    try {
      return jsonReply(reply, await opts.meta.getMetaJson(keys));
    } catch (err) {
      if (err instanceof UnknownMetaError) {
        return reply.code(400).send({ message: err.message });
      }
      throw err;
    }
  });
}
