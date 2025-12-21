# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy pnpm files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# copy workspace package.json
COPY apps/client/package.json apps/client/package.json

# install deps
RUN pnpm install --frozen-lockfile

# copy everything
COPY . .

# build just the client app
RUN pnpm --filter ./apps/client build

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# copy only what we need
COPY --from=builder /app/apps/client/.next ./.next
COPY --from=builder /app/apps/client/public ./public
COPY --from=builder /app/apps/client/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# start next.js without pnpm workspace CLI
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
