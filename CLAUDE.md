# ChefKart

Premium marketplace connecting food lovers with personal chefs for home dining experiences.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TailwindCSS 3, Axios, React Hot Toast
- **Backend**: Node.js + Express.js, Prisma ORM, PostgreSQL, JWT auth, bcryptjs
- **Image Storage**: Cloudinary
- **Deployment**: Render (backend + PostgreSQL), Vercel (frontend)

## Project Structure

```
chefkart/
├── backend/           # Express REST API (port 5000)
│   ├── prisma/        # schema.prisma, seed.js
│   └── src/
│       ├── index.js   # App entry, middleware, rate limiting, error handling
│       ├── middleware/ # auth.js (JWT + role), upload.js (Cloudinary)
│       └── routes/    # auth, chefs, dishes, bookings
├── frontend/          # Next.js app (port 3000)
│   └── src/
│       ├── app/       # Pages: home, chefs, chefs/[id], login, register, dashboard, bookings
│       ├── components/ # Navbar.jsx
│       ├── context/   # AuthContext.js (JWT + localStorage)
│       └── lib/       # api.js (Axios instance with interceptors)
└── render.yaml        # Render deployment blueprint
```

## Development Setup

```bash
# Backend
cd backend
cp .env.example .env       # Configure DATABASE_URL, JWT_SECRET, Cloudinary keys
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev                 # Starts on :5000

# Frontend
cd frontend
npm install
npm run dev                 # Starts on :3000
```

## Key Commands

| Command | Location | Purpose |
|---------|----------|---------|
| `npm run dev` | backend | Start Express with nodemon |
| `npm start` | backend | Production start |
| `npm run seed` | backend | Seed database |
| `npx prisma studio` | backend | Visual database browser |
| `npx prisma migrate dev` | backend | Run migrations |
| `npm run dev` | frontend | Start Next.js dev server |
| `npm run build` | frontend | Production build |
| `npm run lint` | frontend | ESLint |

## Database Models

- **User** — id (UUID), name, email, password, role (USER/CHEF)
- **ChefProfile** — 1:1 with User; experience, cuisine, location, photoUrl, description, rating
- **Dish** — belongs to ChefProfile; name, price, category, imageUrl
- **Booking** — links User to ChefProfile; date, status (PENDING/ACCEPTED/REJECTED), message

## API Routes

All routes prefixed with `/api`:
- `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- `GET /chefs` (filters: cuisine, rating, search, sortBy), `GET /chefs/:id`, `PUT /chefs/profile`, `POST /chefs/photo`
- `GET /dishes`, `POST /dishes`, `PUT /dishes/:id`, `DELETE /dishes/:id`
- `GET /bookings`, `POST /bookings`, `PUT /bookings/:id`

## Auth Flow

- JWT tokens (7-day expiry) stored in localStorage (`chefkart_token`, `chefkart_user`)
- Axios interceptor auto-attaches Bearer token; clears auth on 401
- Two roles: **USER** (book chefs) and **CHEF** (manage dishes, accept/reject bookings)
- Middleware: `authenticate` (JWT verify), `authorizeChef`, `authorizeUser`

## Environment Variables

**Backend (.env)**: `DATABASE_URL`, `JWT_SECRET`, `PORT`, `NODE_ENV`, `FRONTEND_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

**Frontend (.env.local)**: `NEXT_PUBLIC_API_URL`

## Demo Accounts

Password for all: `password123`
- Users: rahul@example.com, priya@example.com
- Chefs: arjun@example.com, meera@example.com, vikram@example.com, ananya@example.com

## Deployment

- **Backend**: Render free tier (render.yaml blueprint), auto-seeds on deploy
- **Frontend**: Vercel (https://frontend-mu-rosy-75.vercel.app)
- **Database**: Render PostgreSQL free tier

## Design System

- Luxury aesthetic: gold (#C4932A), charcoal (#2A2520), cream (#FFFDF7), saffron, paprika, sage
- Fonts: Cormorant Garamond (display), Syne (body)
- Custom CSS classes in globals.css: `btn-gold`, `btn-outline`, `card`, `card-hover`, `tag-*`, `field`, `heading-display`
- Animations: reveal, reveal-up, reveal-scale, shimmer, float

## Conventions

- Backend uses CommonJS (`require`/`module.exports`)
- Frontend uses ES modules with `'use client'` directive on interactive pages
- UUID primary keys throughout
- Prisma handles all database queries (no raw SQL)
- Input validation done manually in route handlers (no validation library)
- Rate limiting: 20 req/min on auth routes, 100 req/min globally (in-memory)
- Error handling: Prisma errors mapped to HTTP status codes in global handler
- npm install with `--legacy-peer-deps` may be needed for frontend
