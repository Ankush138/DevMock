# DevMock — Developer API Mocking Platform

DevMock lets developers create mock JSON API endpoints and expose them through live URLs for frontend testing.

## Stack
- React + Vite
- Express.js
- MongoDB + Mongoose
- Plain CSS
- JWT authentication
- Docker + Docker Compose
- Render/Railway-friendly backend and Vercel/Netlify-friendly frontend

## Features
- Register/login
- Create, edit, delete mock endpoints
- Raw JSON validation
- Dynamic public GET URLs
- Dashboard with copyable URLs
- Request counter and last-access timestamp
- Health endpoint
- CORS support
- Security middleware and rate limiting
- MongoDB persistence

## Local setup

### 1. Backend
```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Set `MONGODB_URI` and `JWT_SECRET` in `.env`.

### 2. Frontend
```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Open the Vite URL shown in the terminal.

## API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/endpoints`
- `POST /api/endpoints`
- `PUT /api/endpoints/:id`
- `DELETE /api/endpoints/:id`
- `GET /mock/:userId/:path`
- `GET /health`

Example public endpoint:
`https://YOUR_BACKEND/mock/USER_ID/api/users`

## Deployment

### MongoDB
Create a MongoDB Atlas cluster and database user. Copy the connection string into `MONGODB_URI`.

### Backend
Deploy `server` to Render, Railway, or another Node host.

Build command:
```bash
npm install
```

Start command:
```bash
npm start
```

Environment variables:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`

### Frontend
Deploy `client` to Vercel or Netlify.

Build command:
```bash
npm run build
```

Output:
```text
dist
```

Environment variable:
`VITE_API_URL=https://YOUR_BACKEND`

## Docker
From the project root:
```bash
docker compose up --build
```

The client is exposed on port 5173 and API on port 5000.

## Claude Code
Open the project folder and run:
```bash
claude
```

Then paste the prompt in `CLAUDE_PROMPT.md`. Claude Code can inspect the repository and make changes with your approval. Official setup docs: https://code.claude.com/docs/en/quickstart
