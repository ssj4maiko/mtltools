#!/bin/bash
# Build the Angular frontend (AOT, production) in Docker and replace the contents of public/.
# Usage: scripts/frontend-build.sh [--dev]     (--dev = non-production configuration)
# Env:   FRONTEND_OUT=dir   write somewhere else than public/ (e.g. to try a build first)
# public/ (or FRONTEND_OUT) is generated output: everything in it is deleted and rewritten from the build,
# so stale chunks and source maps never accumulate. The directory itself is kept
# (nginx bind-mounts it read-only), only its contents change.
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="${FRONTEND_OUT:-public}"

CONFIG="--configuration production"
[ "${1:-}" = "--dev" ] && CONFIG=""

rm -rf resources/frontend/dist/frontend
docker compose build -q node-app >/dev/null
CURRENT_UID=$(id -u):$(id -g) docker compose run --rm --no-deps --user "$(id -u):$(id -g)" \
  -e HOME=/tmp --entrypoint bash -w /home/node/app node-app -c \
  "[ -d node_modules ] || npm install; npx ng build $CONFIG"

SRC=resources/frontend/dist/frontend/browser
[ -f "$SRC/index.html" ] || { echo "build produced no index.html, public/ left untouched" >&2; exit 1; }
mkdir -p "$OUT"
find "$OUT" -mindepth 1 -delete
cp -R "$SRC"/. "$OUT"/
echo "$OUT now holds $(find "$OUT" -type f | wc -l) files"
