FROM node:20-alpine

# Install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk add --no-cache python3 make g++ sqlite wget

WORKDIR /app

ENV NODE_ENV=production

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/

# Install all dependencies
RUN pnpm install --frozen-lockfile --filter=server...

# Copy server application
COPY apps/server ./apps/server

# Build Strapi
WORKDIR /app/apps/server
RUN pnpm build

# Create necessary directories
RUN mkdir -p .tmp/data public/uploads

# Add non-root user
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi && \
    chown -R strapi:strapi /app

USER strapi

EXPOSE 1337

CMD ["pnpm", "start"]