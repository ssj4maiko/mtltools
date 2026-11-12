#!/bin/sh
# Thin wrappers around docker compose for backend tests and the cache-purge CLI.
# Run from anywhere; no host Node is required.
set -e
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT"
COMPOSE="docker compose -f docker-compose.backend.yml"
PROD="docker compose -f docker-compose.prod.yml --project-name mtltools-prod"
cmd=${1:-test}
shift || true
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
  cache-purge)
    # Prod cache (the path execute.sh should use).
    $PROD exec -T backend node dist/cli.js cache-purge "$@"
    ;;
  cache-purge:tools)
    # Throwaway dir inside the tools container, for CLI smoke tests.
    $COMPOSE run --rm tools npx tsx src/cli.ts cache-purge "$@"
    ;;
  *)
    echo "Usage: $0 test | test:live | test:compare | typecheck | cache-purge --novel=ID|--all | cache-purge:tools --novel=ID|--all" >&2
    exit 2
    ;;
esac
