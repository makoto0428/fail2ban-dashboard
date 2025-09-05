# Fail2ban Dashboard

> OSS-friendly, playful visualization tool for Fail2ban logs.

## Features (planned)
- Heatboard: today's attacks summary (card + chart)
- Ban/Unban timeline visualization
- GeoIP / ASN ranking
- Threat Critters (gamification visualization)
- Slack/Discord/Webhook notifications

## Tech stack
- **Backend**: Node.js + Express
- **Frontend**: Vue 3 + Vite
- **Package manager**: pnpm (monorepo)
- **Container**: Docker Compose (dev/prod)
- **CI**: GitHub Actions (lint, build, test)

## Repository structure
```
.
├── packages/
│   ├── api/      # Express backend (API)
│   └── web/      # Vue frontend (Vite)
├── .github/      # Actions workflows
├── docker-compose.yml
└── README.md
```

## Development setup

### Requirements
- Node.js v20 LTS
- pnpm v10
- Docker & Docker Compose
- (optional) VSCode Remote-SSH for remote dev

### Local development (host machine)
```bash
corepack enable
corepack use pnpm@10
pnpm i -w
pnpm -r i
pnpm dev
```
Access: http://localhost:5173 (web), http://localhost:3000 (api)

### Docker Compose (dev)
```bash
docker compose up --build
```
- Web: http://localhost:5173 (Linux) / http://localhost:5174 (Windows Remote-SSH)
- API: http://localhost:3000 (Linux) / http://localhost:3001 (Windows Remote-SSH)

### VSCode Remote-SSH port forwarding
- 3000 → 3001
- 5173 → 5174

### Troubleshooting
- `vite proxy error ECONNREFUSED 127.0.0.1:3000` → set `VITE_API_HOST=api` in `.env` under docker compose
- `docker: permission denied` → add your user to the `docker` group

## Development status
✅ Base environment ready (Node.js + Vue3 + Express)
🚧 Next: Implement Heatboard (summary cards + charts)

## License
MIT
