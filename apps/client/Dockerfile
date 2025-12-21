FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies stage
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/
RUN pnpm install --frozen-lockfile --filter=client...

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/client/node_modules ./apps/client/node_modules
COPY . .

# Build with environment variables
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_STRAPI_READ_ONLY
ARG NEXT_PUBLIC_BASE_URL

ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_READ_ONLY=$NEXT_PUBLIC_STRAPI_READ_ONLY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

WORKDIR /app/apps/client
RUN pnpm build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/client/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/client/server.js"]