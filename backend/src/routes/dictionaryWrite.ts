import type { FastifyInstance } from "fastify";
import {
  DictionaryWriteService,
  InvalidDictionaryWriteError,
  CategoryNotFoundError,
  EntryNotFoundError,
  DictionaryNotFoundError,
} from "../services/dictionaryWrite.js";
import { jsonReply } from "./http.js";

const idParam = { type: "string", pattern: "^[0-9]+$" };

export async function dictionaryWriteRoutes(app: FastifyInstance, opts: { writes: DictionaryWriteService }) {
  app.put<{ Params: { idDictionary: string } }>(
    "/api/dictionary/fullSave/:idDictionary",
    { schema: { params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } } } },
    async (request, reply) => {
      try {
        return reply.send(await opts.writes.fullSave(Number(request.params.idDictionary), request.body));
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.post("/api/dictionary", async (request, reply) => {
    try {
      return jsonReply(reply, await opts.writes.insertDictionary(request.body));
    } catch (err) {
      return sendWriteError(reply, err);
    }
  });

  app.put<{ Params: { idDictionary: string } }>(
    "/api/dictionary/:idDictionary",
    { schema: { params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } } } },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.writes.updateDictionary(Number(request.params.idDictionary), request.body));
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.delete<{ Params: { idDictionary: string } }>(
    "/api/dictionary/:idDictionary",
    { schema: { params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } } } },
    async (request, reply) => {
      try {
        return reply.send(await opts.writes.deleteDictionary(Number(request.params.idDictionary)));
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.post<{ Params: { idDictionary: string } }>(
    "/api/category/:idDictionary",
    { schema: { params: { type: "object", required: ["idDictionary"], properties: { idDictionary: idParam } } } },
    async (request, reply) => {
      try {
        return jsonReply(reply, await opts.writes.insertCategory(Number(request.params.idDictionary), request.body));
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.put<{ Params: { idDictionary: string; idCategory: string } }>(
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
          await opts.writes.updateCategory(Number(request.params.idDictionary), Number(request.params.idCategory), request.body),
        );
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.delete<{ Params: { idDictionary: string; idCategory: string } }>(
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
        return reply.send(await opts.writes.deleteCategory(Number(request.params.idDictionary), Number(request.params.idCategory)));
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.put<{ Params: { idDictionary: string; idCategory: string } }>(
    "/api/entry/:idDictionary/updatebycategory/:idCategory",
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
        const body = await opts.writes.updateByCategory(
          Number(request.params.idDictionary),
          Number(request.params.idCategory),
          request.body,
        );
        return jsonReply(reply, body);
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.post<{ Params: { idDictionary: string; idCategory: string } }>(
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
      try {
        return jsonReply(
          reply,
          await opts.writes.insertEntry(Number(request.params.idDictionary), Number(request.params.idCategory), request.body),
        );
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.put<{ Params: { idDictionary: string; idCategory: string; idEntry: string } }>(
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
        return jsonReply(
          reply,
          await opts.writes.updateEntry(
            Number(request.params.idDictionary),
            Number(request.params.idCategory),
            Number(request.params.idEntry),
            request.body,
          ),
        );
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );

  app.delete<{ Params: { idDictionary: string; idCategory: string; idEntry: string } }>(
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
        return reply.send(
          await opts.writes.deleteEntry(
            Number(request.params.idDictionary),
            Number(request.params.idCategory),
            Number(request.params.idEntry),
          ),
        );
      } catch (err) {
        return sendWriteError(reply, err);
      }
    },
  );
}

function sendWriteError(reply: { code: (n: number) => { send: (b: unknown) => unknown } }, err: unknown) {
  if (err instanceof DictionaryNotFoundError || err instanceof CategoryNotFoundError || err instanceof EntryNotFoundError) {
    return reply.code(404).send({ message: err.message });
  }
  if (err instanceof InvalidDictionaryWriteError) {
    return reply.code(400).send({ message: err.message });
  }
  throw err;
}
