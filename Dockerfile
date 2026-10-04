# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NODE_USE_SYSTEM_CA=1
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*

FROM base AS dependencies
RUN npm install --global pnpm@11.25.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS builder
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY . .
# No database secrets at build time.
RUN pnpm run build

# Explicit deployment job target; never invoked by application startup.
FROM dependencies AS migration-dependencies
# Both packages are self-contained. Keep UI/build/test tooling out of the job.
RUN mkdir -p /migration/node_modules/@next && cp -RL node_modules/postgres /migration/node_modules/postgres && cp -RL node_modules/@next/env /migration/node_modules/@next/env

FROM base AS migrator
RUN groupadd --gid 1001 nodejs && useradd --uid 1001 --gid nodejs --create-home rootapp
COPY --from=migration-dependencies /migration/node_modules ./node_modules
COPY package.json ./
COPY scripts/migrate.mjs ./scripts/migrate.mjs
COPY db/connection.mjs ./db/connection.mjs
COPY drizzle/postgresql ./drizzle/postgresql
ENV NODE_ENV=production
USER rootapp
CMD ["node", "scripts/migrate.mjs"]

FROM base AS runner
RUN groupadd --gid 1001 nodejs && useradd --uid 1001 --gid nodejs --create-home rootapp
COPY --from=builder --chown=rootapp:nodejs /app/.next/standalone ./
COPY --from=builder --chown=rootapp:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=rootapp:nodejs /app/public ./public
ENV NODE_ENV=production HOSTNAME=0.0.0.0 PORT=3000
USER rootapp
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
