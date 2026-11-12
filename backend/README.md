# mtltools Node backend

Phase 2 of the Laravel-to-Node rewrite. This service serves:

```
GET /api/chapter/{idNovel}
GET /api/chapter/{idNovel}/{no}
```

JSON bodies are kept byte-for-byte identical to Laravel (PHP `json_encode` defaults: compact, escaped slashes, `\uXXXX` for non-ASCII). The chapter list never selects `text*` columns. Single-chapter responses include `textOriginal` / `textRevision` / `textCustom` only when those values are present. Responses are cached as files under `storage-prod/app/node-cache/chapter-list/{idNovel}.json` and `storage-prod/app/node-cache/chapter/{idNovel}/{no}.json`. `?search=` on the list bypasses the cache. Chapter text is never held in an in-memory LRU.

A missing chapter or novel returns 404 (Laravel may 500 on a missing chapter; Node does not copy that).

All dev and test commands run in Docker. Host Node is not required. Integration tests use a compose-managed MariaDB (`testdb`); Testcontainers is not used.

## Commands

From the repo root:

```bash
# build the tools image (after Dockerfile or package-lock changes)
docker compose -f docker-compose.backend.yml build

# unit + integration (no novel content; live site tests excluded)
docker compose -f docker-compose.backend.yml run --rm tools npm test

# typecheck
docker compose -f docker-compose.backend.yml run --rm tools npm run typecheck

# opt-in canaries against public Syosetu and Kakuyomu pages (see below)
docker compose -f docker-compose.backend.yml run --rm tools npm run test:live

# live compare against Laravel (prod stack must be up; bodies stay in memory)
docker compose -f docker-compose.backend.yml -f docker-compose.backend.compare.yml \
  run --rm tools npm test -- test/contract/compareLaravel.test.ts

# smoke the cache-purge CLI against a throwaway dir in the tools container
docker compose -f docker-compose.backend.yml run --rm tools npx tsx src/cli.ts cache-purge --novel=1

# purge a novel's list and single-chapter cache in production
docker compose -f docker-compose.prod.yml --project-name mtltools-prod \
  exec backend node dist/cli.js cache-purge --novel=ID
```

`scripts/backend-tools.sh` wraps the same commands (`test`, `test:live`, `test:compare`, `typecheck`, `cache-purge`, `cache-purge:tools`).

Live site canaries (public works only; polite delays; story text is asserted in memory and never written): `npm run test:live` in the tools container as above.

The epub scrapper's `execute.sh` should call the production `cache-purge` compose command after a load, not a host `node` binary.

## Rollback

In `.docker/prod/nginx.conf`, comment out this include and reload nginx:

```
include /etc/nginx/nginx-node-chapter-list.conf;
```

`GET /api/chapter/{id}` and `GET /api/chapter/{id}/{no}` go back to Laravel. Leave the backend container running or stop it; it is not required once the include is commented out.
