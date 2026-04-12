# WoonMarkt API

REST API for the WoonMarkt house marketplace. Built with Node.js, Express, and MongoDB.

## Setup

```bash
npm install
cp .env.example .env
# Fill in your MONGO_URI, JWT_SECRET, and OPENAI_API_KEY
npm run dev
```

Server runs on `http://localhost:3001`.

## API Endpoints

### Auth

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create account (`name`, `email`, `password`) |
| POST | `/api/auth/login` | Login (`email`, `password`) |

Both return `{ token, user: { _id, name, email } }`.

Rate limited to 20 requests per 15 minutes.

### Houses

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/houses` | No | Get all houses |
| GET | `/api/houses/:id` | No | Get single house |
| POST | `/api/houses` | Yes | Create listing |
| PUT | `/api/houses/:id` | Yes | Update listing (owner only) |
| DELETE | `/api/houses/:id` | Yes | Delete listing (owner only) |

**Filters** for `GET /api/houses`:
- `?type=rent` (rent, sale, exchange)
- `?location=amsterdam` (case-insensitive search)

**Image upload:** POST and PUT accept `multipart/form-data` with an optional `image` field (jpg, png, webp, max 5MB). Uploaded images are served at `/uploads/<filename>`.

### AI

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/ai/improve-description` | Improve a listing description with AI |
| POST | `/api/ai/search` | Natural language house search |

**AI Search** takes `{ "query": "affordable house in Rotterdam" }` and returns `{ filters, houses }` where filters are the extracted search parameters.

## Authentication

Include the JWT token in protected requests:

```
Authorization: Bearer <token>
```

Tokens expire after 7 days.

## Error Responses

```json
{ "message": "Error description here" }
```

Status codes: 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 429 (rate limited), 500 (server error).
