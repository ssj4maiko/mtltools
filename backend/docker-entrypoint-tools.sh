#!/bin/sh
set -e
cd /app

# Named volume at /app/node_modules can lag behind a bind-mounted package-lock.json.
if [ ! -x node_modules/.bin/vitest ] || [ ! -f node_modules/.package-lock.stamp ] || ! cmp -s package-lock.json node_modules/.package-lock.stamp; then
  if [ -w . ]; then
    npm ci
    cp -f package-lock.json node_modules/.package-lock.stamp
  else
    echo "backend-tools: node_modules is stale and /app is not writable; rebuild the tools image" >&2
    exit 1
  fi
fi

ensure_dist() {
  if [ ! -f dist/cli.js ] || [ ! -f dist/server.js ]; then
    npm run build
    return
  fi
  # Rebuild when bind-mounted src is newer than the compiled CLI.
  if [ -d src ] && [ -n "$(find src -name '*.ts' -newer dist/cli.js -print -quit)" ]; then
    npm run build
  fi
}

# Keep dist current whenever src is bind-mounted (compiled CLI by default).
# `tsx watch` in dev-on still runs TypeScript directly; a stale dist is harmless there.
ensure_dist

exec "$@"
