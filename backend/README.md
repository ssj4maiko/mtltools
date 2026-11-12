# mtltools Node backend

Phase 1 of the Laravel-to-Node rewrite. Today this service only serves:

```
GET /api/chapter/{idNovel}
```

The JSON body is kept byte-for-byte identical to Laravel (PHP `json_encode` defaults: compact, escaped slashes, `\uXXXX` for non-ASCII). Chapter text is never selected for this list. Responses are cached as files under `storage-prod/app/node-cache/chapter-list/{idNovel}.json`. `?search=` bypasses the cache.

## Commands

```bash
npm test          # unit + Testcontainers integration (no novel content)
npm run build
```

Live compare against Laravel (bodies stay in memory, nothing is written to the repo):

```bash
MTLTOOLS_LARAVEL_COMPARE=1 npm test -- test/contract/compareLaravel.test.ts
```

Purge a novel's list cache (also called from Laravel write paths and the epub scrapper):

```bash
docker compose -f docker-compose.prod.yml exec backend node dist/cli.js cache-purge --novel=ID
```

## Rollback

In `.docker/prod/nginx.conf`, comment out this include and reload nginx:

```
include /etc/nginx/nginx-node-chapter-list.conf;
```

`GET /api/chapter/{id}` goes back to Laravel. Leave the backend container running or stop it; it is not required once the include is commented out.
