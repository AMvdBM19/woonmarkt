# House Marketplace API

A simple REST API for a house marketplace where users can list houses for rent, sale, or exchange. Built with Node.js, Express, and MongoDB.

## Getting Started

### 1. Clone the repo and go to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Then open `.env` and set:
- `MONGO_URI` — your MongoDB connection string (default works if you have MongoDB running locally)
- `JWT_SECRET` — any random string, used to sign tokens (e.g. `mysecretkey123`)
- `OPENAI_API_KEY` — your OpenAI API key (only needed for the AI endpoint)

### 4. Start the server

```bash
npm run dev
```

The server will run on `http://localhost:3001` by default.

---

## API Endpoints

### Auth Routes

| Method | Route               | Auth? | Description              | Request Body                                                  |
|--------|----------------------|-------|--------------------------|---------------------------------------------------------------|
| POST   | `/api/auth/register` | No    | Create a new account     | `{ "name": "John", "email": "john@mail.com", "password": "123456" }` |
| POST   | `/api/auth/login`    | No    | Login, get a JWT token   | `{ "email": "john@mail.com", "password": "123456" }`          |

### House Routes

| Method | Route              | Auth? | Description                          | Request Body                                                                                       |
|--------|--------------------|-------|--------------------------------------|----------------------------------------------------------------------------------------------------|
| GET    | `/api/houses`      | No    | Get all houses                       | —                                                                                                  |
| GET    | `/api/houses/:id`  | No    | Get a single house by ID             | —                                                                                                  |
| POST   | `/api/houses`      | Yes   | Create a new listing                 | `{ "title": "Nice Apt", "description": "Cozy place", "type": "rent", "price": 1200, "location": "Amsterdam" }` |
| PUT    | `/api/houses/:id`  | Yes   | Update your listing                  | Any fields you want to update, e.g. `{ "price": 1500 }`                                           |
| DELETE | `/api/houses/:id`  | Yes   | Delete your listing                  | —                                                                                                  |

**Query filters** for `GET /api/houses`:
- `?type=rent` — filter by type (`rent`, `sale`, or `exchange`)
- `?location=amsterdam` — search by location (case-insensitive)
- You can combine them: `?type=rent&location=amsterdam`

### AI Route

| Method | Route                        | Auth? | Description                        | Request Body                                  |
|--------|------------------------------|-------|------------------------------------|-----------------------------------------------|
| POST   | `/api/ai/improve-description`| No    | Improve a house description with AI | `{ "description": "big house with garden" }`  |

---

## Authentication

For protected routes, include the JWT token in your request headers like this:

```
Authorization: Bearer <your_token_here>
```

You get the token back when you register or login. Store it in your frontend (e.g. localStorage) and send it with every protected request.

---

## Response Shapes

### Auth (register & login)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "6612f...",
    "name": "John",
    "email": "john@mail.com"
  }
}
```

### House object

```json
{
  "_id": "6612f...",
  "title": "Nice Apartment",
  "description": "A cozy place in the city center",
  "type": "rent",
  "price": 1200,
  "location": "Amsterdam",
  "owner": {
    "_id": "6612f...",
    "name": "John",
    "email": "john@mail.com"
  },
  "createdAt": "2024-04-07T..."
}
```

### GET /api/houses returns an array of house objects.

### AI improve-description

```json
{
  "improvedDescription": "Discover this spacious home featuring a beautiful garden..."
}
```

---

## Error Responses

All errors come back as:

```json
{
  "message": "Some error message here"
}
```

Common status codes:
- `400` — bad request (missing fields, user already exists, etc.)
- `401` — not authorized (missing or invalid token)
- `403` — forbidden (you're not the owner of that listing)
- `404` — not found
- `500` — server error

---

## Quick Start for Frontend Devs

The backend runs on `http://localhost:3001`. If you're using Create React App on port 3000, CORS is already enabled so you can call the API directly.

### Base URL

```js
const API = "http://localhost:3001/api";
```

### Register a user

```js
const res = await fetch(`${API}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Jane",
    email: "jane@mail.com",
    password: "123456",
  }),
});
const data = await res.json();
// data = { token: "eyJhb...", user: { id, name, email } }

// Save the token for later
localStorage.setItem("token", data.token);
```

### Login

```js
const res = await fetch(`${API}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "jane@mail.com",
    password: "123456",
  }),
});
const data = await res.json();
localStorage.setItem("token", data.token);
```

### Get all houses (public, no token needed)

```js
const res = await fetch(`${API}/houses`);
const houses = await res.json();
// houses = [ { _id, title, description, type, price, location, owner: { name, email }, createdAt }, ... ]
```

### Get houses with filters

```js
// Filter by type, location, or both
const res = await fetch(`${API}/houses?type=rent&location=amsterdam`);
const houses = await res.json();
```

### Get a single house

```js
const res = await fetch(`${API}/houses/${houseId}`);
const house = await res.json();
```

### Create a house listing (needs token)

```js
const token = localStorage.getItem("token");

const res = await fetch(`${API}/houses`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    title: "Nice Apartment",
    description: "Cozy place downtown",
    type: "rent",       // "rent", "sale", or "exchange"
    price: 1200,
    location: "Amsterdam",
  }),
});
const newHouse = await res.json();
```

### Update a house listing (needs token, owner only)

```js
const token = localStorage.getItem("token");

const res = await fetch(`${API}/houses/${houseId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ price: 1500 }),  // send only the fields you want to change
});
const updatedHouse = await res.json();
```

### Delete a house listing (needs token, owner only)

```js
const token = localStorage.getItem("token");

const res = await fetch(`${API}/houses/${houseId}`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const result = await res.json();
// result = { message: "House deleted" }
```

### AI: Improve a description

```js
const res = await fetch(`${API}/ai/improve-description`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    description: "big house with garden near park",
  }),
});
const data = await res.json();
// data = { improvedDescription: "Discover this spacious home..." }
```

### Handling errors

Every error response has the same shape, so you can handle them all the same way:

```js
const res = await fetch(`${API}/some-endpoint`, { ... });
const data = await res.json();

if (!res.ok) {
  // data.message will tell you what went wrong
  console.error(data.message);
  // e.g. "Please fill in all fields", "Not authorized, no token", "House not found"
  return;
}

// success — use data
```

---

## Notes

- Make sure the backend is running (`npm run dev`) before testing from the frontend
- The AI endpoint requires a valid OpenAI API key in the backend `.env`
- For development, use `npm run dev` (auto-restarts on file changes with nodemon)
- The token expires after 7 days — after that the user needs to login again
