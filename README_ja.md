# Fail2ban Dashboard

> OSSコミュニティ向け、遊び心ある Fail2ban ログ可視化ツール。

## 今後の予定機能
- Heatboard: 本日の攻撃サマリ（カード + グラフ）
- Ban/Unban のタイムライン可視化
- GeoIP / ASN ランキング
- Threat Critters（ゲーミフィケーション可視化）
- Slack/Discord/Webhook 通知連携

## 技術スタック
- **バックエンド**: Node.js + Express
- **フロントエンド**: Vue 3 + Vite
- **パッケージ管理**: pnpm (モノレポ構成)
- **コンテナ**: Docker Compose (開発/本番)
- **CI**: GitHub Actions (lint, build, test)

## リポジトリ構成
```
.
├── packages/
│   ├── api/      # Express バックエンド (API)
│   └── web/      # Vue フロントエンド (Vite)
├── .github/      # Actions workflows
├── docker-compose.yml
└── README.md
```

## 開発環境セットアップ

### 前提環境
- Node.js v20 LTS
- pnpm v10
- Docker & Docker Compose
- (任意) VSCode Remote-SSH

### ローカル開発（ホスト環境）
```bash
corepack enable
corepack use pnpm@10
pnpm i -w
pnpm -r i
pnpm dev
```
アクセス: http://localhost:5173 (Web), http://localhost:3000 (API)

### Docker Compose（開発用）
```bash
docker compose up --build
```
- Web: http://localhost:5173 (Linux) / http://localhost:5174 (Windows Remote-SSH)
- API: http://localhost:3000 (Linux) / http://localhost:3001 (Windows Remote-SSH)

### VSCode Remote-SSH ポート転送例
- 3000 → 3001
- 5173 → 5174

### トラブルシュート
- `vite proxy error ECONNREFUSED 127.0.0.1:3000` → docker compose 利用時は `.env` に `VITE_API_HOST=api` を設定
- `docker: permission denied` → ユーザーを `docker` グループに追加

## 開発状況
✅ ベース環境整備完了 (Node.js + Vue3 + Express)
🚧 次: Heatboard（サマリカード + グラフ）の実装

## ライセンス
MIT
