# Woonmarkt

Luxury real estate platform for high-end properties across the Netherlands and Europe. Built with React, Node.js, Express, and MongoDB with Google Maps integration and AI-powered search.

## Features

- Curated luxury property listings with rich detail (bedrooms, bathrooms, sqm, amenities, year built)
- Image gallery with multiple photos per property
- Google Maps embed on property detail pages with exact coordinates
- Google Places API address autocomplete (backend proxy)
- AI-powered natural language search ("modern penthouse with sea view in Rotterdam")
- AI description enhancement for listing copywriting
- User authentication with JWT
- Featured properties highlighting
- Advanced filtering (city, type, price range, bedrooms)
- Responsive luxury design with serif typography and elegant dark palette

## Tech Stack

**Frontend:** React 19, React Router 7, Google Maps Embed API, Google Fonts (Playfair Display + Inter)

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Google Maps API

**AI:** OpenAI API (GPT-3.5-turbo)

**Infrastructure:** Docker, nginx, nginx-proxy-manager

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key
- Google Maps API key (for address features and map embeds)

### 1. Install dependencies

```bash
# Frontend (from root)
npm install

# Backend
cd backend
npm install
```

### 2. Set up environment variables

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your MongoDB URI, JWT secret, OpenAI API key, and Google Maps API key.

For the frontend, create `.env.local`:
```
REACT_APP_API_URL=/api
REACT_APP_GOOGLE_MAPS_KEY=your_key_here
```

### 3. Seed the database

```bash
cd backend
npm run seed
```

This populates 10 luxury properties with demo data. Login credentials: `estates@woonmarkt.nl` / `Luxury2024!`

### 4. Run the app

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (from root)
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:3001`.

### Docker Deployment

```bash
cp .env.docker.example .env
# Fill in your secrets
docker-compose build --no-cache
docker-compose up -d
```

## Project Structure

```
woonmarkt/
├── backend/
│   ├── controllers/     # Route handlers (auth, houses, ai)
│   ├── middleware/       # Auth middleware
│   ├── models/          # Mongoose schemas (User, House)
│   ├── routes/          # API routes (auth, houses, ai, maps)
│   ├── uploads/         # Uploaded images
│   ├── seed.js          # Database seeder with luxury properties
│   └── server.js        # Entry point
├── src/
│   ├── components/      # Navbar, HouseCard
│   ├── pages/           # Home, Login, Register, AddHouse, EditHouse, HouseDetails, Listings
│   ├── api.js           # API helper functions
│   ├── App.js           # Router setup
│   └── index.css        # Global styles & CSS variables
├── docker-compose.yml   # 3-service orchestration
├── Dockerfile.backend   # Multi-stage Node.js build
├── Dockerfile.frontend  # Multi-stage React + nginx build
└── nginx.conf           # SPA routing, caching, security headers
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Houses
- `GET /api/houses` - Get all houses (filters: `type`, `location`, `city`, `minPrice`, `maxPrice`, `bedrooms`, `featured`)
- `GET /api/houses/:id` - Get single house with full details
- `POST /api/houses` - Create listing (auth required, multipart form)
- `PUT /api/houses/:id` - Update listing (owner only)
- `DELETE /api/houses/:id` - Delete listing (owner only)

### AI
- `POST /api/ai/improve-description` - Enhance property description
- `POST /api/ai/search` - Natural language search with automatic filter extraction

### Maps
- `GET /api/maps/autocomplete?input=` - Address autocomplete proxy
- `GET /api/maps/place-details?placeId=` - Place details proxy
- `GET /api/maps/geocode?address=` - Geocoding proxy

## Deployment

Live at: `https://woonmarkt.monoliet.cloud`

Pull changes and rebuild:
```bash
cd /opt/docker/woonmarkt
git pull
docker-compose build --no-cache
docker-compose up -d
# Seed if needed:
docker exec woonmarkt-backend node seed.js
```
