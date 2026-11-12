FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Dev/test image: run via docker compose -f docker-compose.backend.yml
FROM deps AS tools
WORKDIR /app
COPY docker-entrypoint-tools.sh /usr/local/bin/backend-tools-entrypoint
RUN chmod +x /usr/local/bin/backend-tools-entrypoint \
    && mkdir -p /tmp/node-cache
COPY tsconfig.json vitest.config.ts vitest.live.config.ts ./
COPY src ./src
COPY test ./test
ENV NODE_ENV=development
ENV CACHE_DIR=/tmp/node-cache
ENTRYPOINT ["/usr/local/bin/backend-tools-entrypoint"]
CMD ["npm", "test"]

FROM deps AS build
WORKDIR /app
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache wget \
    && mkdir -p /app/cache \
    && chown -R node:node /app/cache
COPY --from=build --chown=node:node /app/package.json /app/package-lock.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "dist/server.js"]
