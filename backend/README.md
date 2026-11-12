# mtltools Node backend

Phase 2 of the Laravel-to-Node rewrite. This service serves:

```
GET /api/chapter/{idNovel}
GET /api/chapter/{idNovel}/{no}
```

JSON bodies are kept byte-for-byte identical to Laravel (PHP `json_encode` defaults: compact, escaped slashes, `\uXXXX` for non-ASCII). The chapter list never selects `text*` columns. Single-chapter responses include `textOriginal` / `textRevision` / `textCustom` only when those values are present. Responses are cached as files under `storage-prod/app/node-cache/chapter-list/{idNovel}.json` and `storage-prod/app/node-cache/chapter/{idNovel}/{no}.json`. `?search=` on the list bypasses the cache. Chapter text is never held in an in-memory LRU.

A missing chapter or novel returns 404 (Laravel may 500 on a missing chapter; Node does not copy that).

## Commands

```bash
npm test          # unit + Testcontainers integration (no novel content; live site tests excluded)
npm run test:live # opt-in canaries against public Syosetu and Kakuyomu pages (see below)
npm run build
```

Live compare against Laravel (bodies stay in memory, nothing is written to the repo):

```bash
MTLTOOLS_LARAVEL_COMPARE=1 npm test -- test/contract/compareLaravel.test.ts
```

Live site canaries (public works only; polite delays; story text is asserted in memory and never written):

```bash
npm run test:live
```

Purge a novel's list and single-chapter cache (also called from Laravel write paths and the epub scrapper):

```bash
docker compose -f docker-compose.prod.yml exec backend node dist/cli.js cache-purge --novel=ID
```

## Rollback

In `.docker/prod/nginx.conf`, comment out this include and reload nginx:

```
include /etc/nginx/nginx-node-chapter-list.conf;
```

`GET /api/chapter/{id}` and `GET /api/chapter/{id}/{no}` go back to Laravel. Leave the backend container running or stop it; it is not required once the include is commented out.
