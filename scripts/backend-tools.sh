#!/bin/sh
# Thin wrappers around docker compose for backend tests, the cache-purge CLI,
# compiled prod deploys, and a tsx-watch dev swap behind nginx.
# Run from anywhere; no host Node is required.
set -e
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT"
COMPOSE="docker compose -f docker-compose.backend.yml"
PROD="docker compose -f docker-compose.prod.yml --project-name mtltools-prod"
PROD_DEV="$PROD -f docker-compose.backend.dev.yml"
cmd=${1:-test}
shift || true

wait_backend() {
  # Health is published only on the host loopback port.
  i=0
  while [ "$i" -lt 40 ]; do
    if curl -fsS -o /dev/null http://127.0.0.1:8801/health; then
      echo "backend is healthy on 127.0.0.1:8801"
      return 0
    fi
    i=$((i + 1))
    sleep 0.5
  done
  echo "backend did not become healthy on 127.0.0.1:8801" >&2
  $PROD ps backend || true
  $PROD logs --tail=80 backend || true
  return 1
}

case "$cmd" in
  test)
    $COMPOSE run --rm tools npm test "$@"
    ;;
  test:live)
    $COMPOSE run --rm tools npm run test:live "$@"
    ;;
  test:compare)
    $COMPOSE -f docker-compose.backend.compare.yml run --rm tools npm test -- test/contract/compareLaravel.test.ts "$@"
    ;;
  typecheck)
    $COMPOSE run --rm tools npm run typecheck "$@"
    ;;
  build)
    $COMPOSE build tools
    ;;
  cache-purge)
    # Prod cache (the path execute.sh should use). Compiled CLI only.
    $PROD exec -T backend node dist/cli.js cache-purge "$@"
    ;;
  cache-purge:tools)
    # Throwaway dir inside the tools container, for CLI smoke tests.
    # Compiles dist if bind-mounted src is newer, then runs the compiled CLI.
    $COMPOSE run --rm tools node dist/cli.js cache-purge "$@"
    ;;
  deploy)
    $PROD build backend
    $PROD up -d --no-deps --force-recreate backend
    # Recreate nginx so new Node location includes (volume mounts) take effect.
    $PROD up -d --no-deps --force-recreate nginx
    wait_backend
    ;;
  dev-on|dev)
    $COMPOSE build tools
    $PROD_DEV up -d --no-deps --force-recreate backend
    wait_backend
    echo "dev mode: nginx :8800 is proxying to tsx watch (bind-mounted backend/src)"
    ;;
  dev-off)
    $PROD up -d --no-deps --force-recreate backend
    wait_backend
    echo "compiled mode: nginx :8800 is proxying to mtltools-prod-backend (dist)"
    ;;
  *)
    echo "Usage: $0 test | test:live | test:compare | typecheck | build | cache-purge --novel=ID|--dictionary=ID|--all | cache-purge:tools --novel=ID|--all | deploy | dev-on | dev-off" >&2
    exit 2
    ;;
esac
