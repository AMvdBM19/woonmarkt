# WoonMarkt VPS Deployment — Claude Code Prompt

Copy everything below the line into your VPS Claude Code session.

---

## Context

You are deploying WoonMarkt, a MERN stack house marketplace app, to production on this VPS. The repo already contains all Docker infrastructure files (Dockerfiles, docker-compose.yml, nginx.conf). The VPS runs nginx-proxy-manager on ports 80/443 for SSL and domain routing.

**Domain:** woonmarkt.monoliet.cloud
**Repo:** https://github.com/AMvdBM19/woonmarkt.git
**VPS directory:** /opt/docker/woonmarkt

## Step-by-step deployment

### 1. Clone or pull the repo

```bash
# If first time:
cd /opt/docker
git clone https://github.com/AMvdBM19/woonmarkt.git
cd woonmarkt

# If already cloned:
cd /opt/docker/woonmarkt
git pull origin main
```

### 2. Create the production .env file

```bash
cp .env.docker.example .env
```

Edit `.env` with real values:

```env
PORT=3001
NODE_ENV=production
MONGO_URI=mongodb://woonmarkt-mongo:27017/house-marketplace
JWT_SECRET=<generate with: openssl rand -base64 32>
OPENAI_API_KEY=<your OpenAI key>
CORS_ORIGINS=https://woonmarkt.monoliet.cloud
LOG_LEVEL=info
```

Generate a JWT secret:
```bash
openssl rand -base64 32
```

### 3. Build and start containers

```bash
docker-compose build --no-cache
docker-compose up -d
```

Wait for startup:
```bash
sleep 15
docker-compose ps
```

All three containers (woonmarkt-backend, woonmarkt-frontend, woonmarkt-mongo) should show `Up (healthy)`.

### 4. Verify health

```bash
# Backend health
curl http://localhost:3010/health
# Expected: {"status":"ok","timestamp":"..."}

# Frontend
curl -s http://localhost:3011/ | head -5
# Expected: HTML content (React app)

# Logs
docker-compose logs --tail=20 woonmarkt-backend
docker-compose logs --tail=20 woonmarkt-frontend
```

### 5. Configure nginx-proxy-manager

Create two proxy host entries in nginx-proxy-manager (accessible at the VPS admin panel):

**Frontend (main site):**
- Domain: `woonmarkt.monoliet.cloud`
- Scheme: `http`
- Forward Hostname/IP: `woonmarkt-frontend`
- Forward Port: `80`
- Enable SSL (Let's Encrypt), Force SSL
- Enable Websockets Support

**Backend API:**
- Domain: `woonmarkt.monoliet.cloud`
- Scheme: `http`
- Forward Hostname/IP: `woonmarkt-backend`
- Forward Port: `3001`
- Custom location: `/api`
- Or use Advanced config with this nginx snippet:

```nginx
location /api/ {
    proxy_pass http://woonmarkt-backend:3001/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 60s;
}

location /uploads/ {
    proxy_pass http://woonmarkt-backend:3001/uploads/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

**IMPORTANT:** For nginx-proxy-manager to resolve container names, the woonmarkt containers must be on the same Docker network as nginx-proxy-manager. Run:

```bash
# Find the nginx-proxy-manager network name
docker network ls | grep -i proxy

# Connect woonmarkt containers to it (replace 'npm_network' with actual name)
docker network connect npm_network woonmarkt-frontend
docker network connect npm_network woonmarkt-backend
```

Or add the external network to docker-compose.yml if needed.

### 6. DNS

Ensure an A record exists:
- `woonmarkt.monoliet.cloud` → VPS IP address

### 7. Final verification

```bash
# Test via domain
curl -I https://woonmarkt.monoliet.cloud
# Expected: 200 OK

curl https://woonmarkt.monoliet.cloud/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

Open in browser:
- https://woonmarkt.monoliet.cloud — should load the React app
- Register → Login → Create listing with image → verify everything works

### Troubleshooting

```bash
# Container won't start
docker-compose logs woonmarkt-backend
docker-compose logs woonmarkt-frontend

# MongoDB connection issues
docker-compose logs woonmarkt-mongo
docker-compose exec woonmarkt-mongo mongosh --eval "db.runCommand('ping')"

# CORS errors in browser
# Update CORS_ORIGINS in .env and restart:
docker-compose up -d woonmarkt-backend

# 502 Bad Gateway
# Check if containers are on the same network as nginx-proxy-manager:
docker network inspect <npm_network_name>

# Rebuild after code changes
git pull origin main
docker-compose build --no-cache
docker-compose up -d
```

### Port mapping reference
- Frontend: host 3011 → container 80 (nginx)
- Backend: host 3010 → container 3001 (Express)
- MongoDB: internal only (no host port exposed)
