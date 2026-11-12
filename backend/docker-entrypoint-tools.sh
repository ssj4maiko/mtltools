#!/bin/sh
set -e
cd /app
# Named volume at /app/node_modules can lag behind a bind-mounted package-lock.json.
if [ ! -x node_modules/.bin/vitest ] || [ ! -f node_modules/.package-lock.stamp ] || ! cmp -s package-lock.json node_modules/.package-lock.stamp; then
  npm ci
  cp -f package-lock.json node_modules/.package-lock.stamp
fi
exec "$@"
