# mtltools Node backend

This service serves the Laravel-to-Node cutover routes that have already moved:

```
GET /api/chapter/{idNovel}
GET /api/chapter/{idNovel}/{no}
GET /api/novel
GET /api/novel/{id}
GET /api/novel/dictionary/{id}
GET /api/dictionary
GET /api/dictionary/{id}
GET /api/dictionary/novel/{id}
GET /api/category/{idDictionary}
GET /api/category/{idDictionary}/{idCategory}
GET /api/entry/{idDictionary}/{idCategory}
GET /api/entry/{idDictionary}/{idCategory}/{idEntry}
POST /api/meta
GET /api/cache/dictionary/{id}
PUT /api/cache/dictionary/{id}
GET /static/{idNovel}/{idDictionary}/{no}
GET /static/{idNovel}/{idDictionary}/{no}/{part}
```

JSON bodies are kept byte-for-byte identical to Laravel (PHP `json_encode` defaults: compact, escaped slashes, `\uXXXX` for non-ASCII). The chapter list never selects `text*` columns. Single-chapter responses include `textOriginal` / `textRevision` / `textCustom` only when those values are present. Responses are cached as files under `storage-prod/app/node-cache/` (chapter lists, single chapters, catalog reads, and `cache-dictionary/{id}.json`). `?search=` on the chapter or novel list bypasses the cache. Chapter text and dictionary blobs are never held in an in-memory LRU.

`GET /static/{idNovel}/{idDictionary}/{no}/{part?}` serves the same HTML Laravel already wrote under `storage-prod/app/public/chapters/{idDictionary}/{idNovel}/{no}-{part}.html`. A cache miss generates Blade-identical chapter, wait, or stop HTML (`Chapter::translateText`, `fixRuby`, `IMAGES_BASE_URL` prefixing of `/images/` URLs, and `APP_URL` for the wait-page fanfare asset), writes the chapter page to that path, and drops the text from RAM. Wait and stop pages are not cached. `cache-purge --novel` / `--dictionary` also removes the matching static HTML, as does `App\Support\NodeCache`.

A missing chapter, novel, dictionary, category, or entry returns 404 (Laravel may 500 on a missing row; Node does not copy that). `GET /api/entry/{idDictionary}/{idCategory}/{idEntry}` looks up the entry by id only, matching Laravel.

All dev and test commands run in Docker. Host Node is not required. Integration tests use a compose-managed MariaDB (`testdb`); Testcontainers is not used.

Production and the tools CLI run the **compiled** `dist/` output (`node dist/server.js`, `node dist/cli.js`). A separate dev override bind-mounts `backend/src` and runs `tsx watch` when you want fast updates behind the same nginx on :8800.

## Commands

From the repo root (or via `scripts/backend-tools.sh <command>`):

```bash
# build the tools image (after Dockerfile or package-lock changes)
docker compose -f docker-compose.backend.yml build
# same: ./scripts/backend-tools.sh build

# unit + integration (no novel content; live site tests excluded)
docker compose -f docker-compose.backend.yml run --rm tools npm test
# same: ./scripts/backend-tools.sh test

# typecheck
docker compose -f docker-compose.backend.yml run --rm tools npm run typecheck

# opt-in canaries against public Syosetu and Kakuyomu pages (see below)
docker compose -f docker-compose.backend.yml run --rm tools npm run test:live

# live compare against Laravel (prod stack must be up; bodies stay in memory)
docker compose -f docker-compose.backend.yml -f docker-compose.backend.compare.yml \
  run --rm tools npm test -- test/contract/compareLaravel.test.ts

# smoke the cache-purge CLI against a throwaway dir (compiled dist, not tsx)
docker compose -f docker-compose.backend.yml run --rm tools node dist/cli.js cache-purge --novel=1

# purge production caches (compiled CLI in the prod backend container)
docker compose -f docker-compose.prod.yml --project-name mtltools-prod \
  exec backend node dist/cli.js cache-purge --novel=ID
docker compose -f docker-compose.prod.yml --project-name mtltools-prod \
  exec backend node dist/cli.js cache-purge --dictionary=ID

# rebuild and redeploy the compiled prod backend (nginx keeps pointing at `backend`)
./scripts/backend-tools.sh deploy

# temporarily replace the prod backend with tsx watch + bind-mounted src
./scripts/backend-tools.sh dev-on
# ...edit backend/src, requests to :8800 hot-reload...
./scripts/backend-tools.sh dev-off   # back to the compiled image
```

`scripts/backend-tools.sh` wraps: `test`, `test:live`, `test:compare`, `typecheck`, `build`, `cache-purge`, `cache-purge:tools`, `deploy`, `dev-on`, `dev-off`.

Live site canaries (public works only; polite delays; story text is asserted in memory and never written): `npm run test:live` in the tools container as above.

The epub scrapper's `execute.sh` should call the production `cache-purge` compose command after a load, not a host `node` binary. Laravel write paths call `App\Support\NodeCache` so catalog and chapter files stay consistent during the dual-run.

## Rollback

In `.docker/prod/nginx.conf`, comment out the matching include and reload nginx:

```
include /etc/nginx/nginx-node-chapter-list.conf;
include /etc/nginx/nginx-node-catalog.conf;
include /etc/nginx/nginx-node-static.conf;
```

The first include covers `GET /api/chapter/{id}` and `GET /api/chapter/{id}/{no}`. The second covers the catalog reads, `POST /api/meta`, and `GET/PUT /api/cache/dictionary/{id}`. The third covers `GET /static/{novel}/{dict}/{chapter}/`. Each can be rolled back independently. Leave the backend container running or stop it; it is not required once all Node includes are commented out.
