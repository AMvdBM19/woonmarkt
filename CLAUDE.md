# CLAUDE.md — woonmarkt

## Purpose
MERN stack house marketplace app — React frontend, Express/MongoDB backend, OpenAI AI features.
Live at https://woonmarkt.monoliet.cloud.

## Stack
- Frontend: React 19 (CRA), built and served by nginx in Docker
- Backend: Node 18, Express, Mongoose, Multer, JWT auth, OpenAI SDK
- Database: MongoDB 7 (Docker volume, no host port exposed)
- Infra: Docker Compose, routed through nginx-proxy-manager on the `web` network

## Key Paths
- `/opt/docker/woonmarkt/`                   — repo root (React frontend source)
- `/opt/docker/woonmarkt/backend/`           — Express API
- `/opt/docker/woonmarkt/backend/server.js`  — entrypoint; has /health route + CORS_ORIGINS support
- `/opt/docker/woonmarkt/nginx.conf`         — frontend nginx; proxies /api + /uploads to backend
- `/opt/docker/woonmarkt/docker-compose.yml` — defines all three services
- `/opt/docker/woonmarkt/.env`               — secrets (gitignored; never edit without instruction)

## How to Run
```bash
cd /opt/docker/woonmarkt
docker compose up -d            # start all containers
docker compose ps               # check status
curl http://localhost:3010/health  # backend health check → {"status":"ok","timestamp":"..."}
```

## How to Deploy
```bash
cd /opt/docker/woonmarkt
git pull origin main
docker compose build --no-cache
docker compose up -d
```

## Notes
- NPM proxy host: `woonmarkt.monoliet.cloud` → `woonmarkt-frontend:80` (http, on `web` network)
- Frontend nginx handles `/api/` and `/uploads/` proxying to `woonmarkt-backend:3001` — no second NPM host needed
- Backend port 3010 is exposed to host for health checks only
- Image uploads persisted in Docker volume `woonmarkt-uploads`
- MongoDB data in Docker volume `woonmarkt-mongo-data` — never `docker volume rm` these
- CORS restricted to `https://woonmarkt.monoliet.cloud` via `CORS_ORIGINS` in `.env`
- Docker infrastructure (Dockerfiles, docker-compose.yml, nginx.conf) lives on the VPS only — not in the GitHub repo

## Documentation Protocol
When asked to update this file, follow the Update Protocol in
~/.claude/commands/update-docs.md. Show a diff before saving.

---

## Changelog
- 2026-05-14: Initial version — Docker infrastructure created from scratch, all containers live, site online
