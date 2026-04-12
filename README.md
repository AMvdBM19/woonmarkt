# WoonMarkt

A full-stack house marketplace where users can list homes for rent, sale, or exchange. Built with React, Node.js, Express, and MongoDB.

## Features

- User registration and login with JWT authentication
- Create, edit, and delete house listings
- Upload images for listings
- Search and filter houses by city and type
- AI-powered natural language search (e.g. "cheap house in Rotterdam for rent")
- AI description improvement for listings
- Responsive UI with glassmorphism design

## Tech Stack

**Frontend:** React 19, React Router 7

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer

**AI:** OpenAI API (GPT-3.5-turbo)

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key

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

Edit `backend/.env` with your MongoDB URI, JWT secret, and OpenAI API key.

### 3. Run the app

Open two terminals:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (from root)
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:3001`.

## Project Structure

```
woonmarkt/
├── backend/
│   ├── controllers/     # Route handlers
│   ├── middleware/       # Auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded images
│   └── server.js        # Entry point
├── src/
│   ├── components/      # Navbar, HouseCard
│   ├── pages/           # Home, Login, Register, AddHouse, EditHouse, HouseDetails, Listings
│   ├── api.js           # API helper functions
│   ├── App.js           # Router setup
│   └── index.js         # Entry point
└── public/
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Houses
- `GET /api/houses` - Get all houses (supports `?type=` and `?location=` filters)
- `GET /api/houses/:id` - Get single house
- `POST /api/houses` - Create listing (auth required, supports image upload)
- `PUT /api/houses/:id` - Update listing (owner only)
- `DELETE /api/houses/:id` - Delete listing (owner only)

### AI
- `POST /api/ai/improve-description` - Improve a house description
- `POST /api/ai/search` - Natural language search
