import type { FastifyInstance } from "fastify";
import { CacheDictionaryService, DictionaryNotFoundError } from "../services/cacheDictionary.js";
import { jsonReply } from "./http.js";

const idParam = { type: "string", pattern: "^[0-9]+$" };

export async function cacheDictionaryRoutes(
  app: FastifyInstance,
  opts: { service: CacheDictionaryService },
) {
  const schema = {
    params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } },
  };

  app.get<{ Params: { idDictionary: string } }>(
    "/api/cache/dictionary/:idDictionary",
    { schema },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.service.getJson(Number(request.params.idDictionary)));
      } catch (err) {
        if (err instanceof DictionaryNotFoundError) {
          return reply.code(404).send({ message: "Dictionary not found" });
        }
        throw err;
      }
    },
  );

  app.put<{ Params: { idDictionary: string } }>(
    "/api/cache/dictionary/:idDictionary",
    { schema },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.service.rebuildJson(Number(request.params.idDictionary)));
      } catch (err) {
        if (err instanceof DictionaryNotFoundError) {
          return reply.code(404).send({ message: "Dictionary not found" });
        }
        throw err;
      }
    },
  );
}
