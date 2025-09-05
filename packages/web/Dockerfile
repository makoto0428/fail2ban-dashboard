ARG NODE_VERSION=20
ARG PNPM_VERSION=10
FROM node:${NODE_VERSION}

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm i
COPY . .

# Vite dev（既定 5173 を使う）
EXPOSE 5173
