# ARG で Node/Pnpm を切替できる
ARG NODE_VERSION=20
ARG PNPM_VERSION=10
FROM node:${NODE_VERSION}

WORKDIR /app

# pnpm 有効化
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# 依存解決のために package.json だけ先にコピー（キャッシュ層）
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i

# 残りをコピー（開発はボリュームで上書きされる）
COPY . .

# API ポートは .env の PORT（既定 3000）
EXPOSE 3000
