FROM node:20-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 1️⃣ Copy root workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 2️⃣ Copy ONLY workspace package.json files
COPY apps/server/package.json apps/server/package.json

# 3️⃣ Install deps (pnpm now sees the server workspace)
RUN pnpm install --frozen-lockfile

# 4️⃣ Copy the rest of the repo
COPY . .

# 5️⃣ Build Strapi workspace
RUN pnpm --filter ./apps/server build

EXPOSE 1337

# 6️⃣ Start Strapi
CMD ["pnpm", "--filter", "./apps/server", "start"]
    