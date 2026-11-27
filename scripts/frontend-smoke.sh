#!/bin/bash
# Headless-browser smoke test of a built frontend (Docker only: nginx + Playwright).
# Usage: scripts/frontend-smoke.sh [DIR]   DIR = built frontend (default: public)
# Serves DIR on :8810 and proxies /api, /static and /images to the running prod stack (:8800).
set -euo pipefail
cd "$(dirname "$0")/.."
DIR="$(realpath "${1:-public}")"
PW=1.65.1
CONF=$(mktemp)
cat > "$CONF" <<'N'
events {}
http {
  include /etc/nginx/mime.types;
  server {
    listen 8810;
    root /site;
    location ~ ^/(api|static|images)/ { proxy_pass http://127.0.0.1:8800; }
    location / { try_files $uri $uri/ /index.html; }
  }
}
N
NAME=mtltools-smoke-nginx
docker rm -f $NAME >/dev/null 2>&1 || true
docker run -d --rm --name $NAME --network host -v "$DIR":/site:ro -v "$CONF":/etc/nginx/nginx.conf:ro nginx:1.27 >/dev/null
trap 'docker rm -f $NAME >/dev/null 2>&1; rm -f "$CONF"' EXIT
sleep 1
docker run --rm --network host --ipc=host -v "$PWD/scripts/smoke":/smoke -w /smoke \
  -e SMOKE -e SHOT -e BASE=http://127.0.0.1:8810 -e HOME=/tmp mcr.microsoft.com/playwright:v$PW-noble \
  bash -c "npm install --no-save --silent playwright@$PW >/dev/null 2>&1; node ${SMOKE:-smoke.mjs}"
