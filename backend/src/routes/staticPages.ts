import type { FastifyInstance } from "fastify";
import { StaticPageService } from "../services/staticPages.js";
import { DictionaryNotFoundError } from "../services/cacheDictionary.js";
import { NovelNotFoundError } from "../services/chapterList.js";

function htmlReply(reply: { header: Function; send: Function }, body: string) {
  return reply
    .header("Content-Type", "text/html; charset=UTF-8")
    .header("Cache-Control", "no-cache, private")
    .send(body);
}

type StaticParams = {
  idNovel: string;
  idDictionary: string;
  no: string;
  part?: string;
};

const params = {
  type: "object",
  required: ["idNovel", "idDictionary", "no"],
  properties: {
    idNovel: { type: "string", pattern: "^[0-9]+$" },
    idDictionary: { type: "string", pattern: "^[0-9]+$" },
    no: { type: "string", pattern: "^[0-9]+$" },
    part: { type: "string", pattern: "^[0-9]+$" },
  },
};

export async function staticPageRoutes(app: FastifyInstance, opts: { service: StaticPageService }) {
  const handler = async (request: { params: StaticParams }, reply: { header: Function; send: Function; code: Function }) => {
    const idNovel = Number(request.params.idNovel);
    const idDictionary = Number(request.params.idDictionary);
    const no = Number(request.params.no);
    const part = request.params.part ? Number(request.params.part) : 1;
    try {
      const body = await opts.service.getHtml(idNovel, idDictionary, no, part);
      return htmlReply(reply, body);
    } catch (err) {
      if (err instanceof NovelNotFoundError || err instanceof DictionaryNotFoundError) {
        return reply.code(404).send({ message: "Not found" });
      }
      throw err;
    }
  };

  const config = { schema: { params } };
  app.get<{ Params: StaticParams }>("/static/:idNovel/:idDictionary/:no", config, handler);
  app.get<{ Params: StaticParams }>("/static/:idNovel/:idDictionary/:no/", config, handler);
  app.get<{ Params: StaticParams }>("/static/:idNovel/:idDictionary/:no/:part", config, handler);
  app.get<{ Params: StaticParams }>("/static/:idNovel/:idDictionary/:no/:part/", config, handler);
}
