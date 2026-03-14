# ChefKart

A premium marketplace connecting food lovers with exceptional personal chefs for unforgettable dining experiences at home.

## Tech Stack

### Frontend
- **Next.js 14** — React framework with App Router
- **TailwindCSS 3** — Utility-first CSS with custom design system
- **Axios** — HTTP client with JWT interceptor
- **React Hot Toast** — Toast notifications
- **React Icons** — Icon library

### Backend
- **Node.js + Express.js** — REST API server
- **Prisma ORM** — Type-safe database toolkit
- **PostgreSQL** — Relational database
- **JWT** — JSON Web Token authentication
- **bcryptjs** — Password hashing
- **Cloudinary** — Image storage (optional)

## Project Structure

```
chefkart/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Database models
│   │   └── seed.js          # Seed data
│   └── src/
│       ├── index.js          # Express server
│       ├── middleware/
│       │   ├── auth.js       # JWT + role authorization
│       │   └── upload.js     # Cloudinary upload
│       └── routes/
│           ├── auth.js       # POST /register, /login, GET /me
│           ├── chefs.js      # GET /, /:id, PUT /profile, POST /photo
│           ├── dishes.js     # GET /, POST /, PUT /:id, DELETE /:id
│           └── bookings.js   # POST /, GET /, PUT /:id
├── frontend/
│   └── src/
│       ├── app/              # Next.js pages
│       ├── components/       # Reusable components
│       ├── context/          # Auth context
│       └── lib/              # API client
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### 1. Clone & Install

```bash
# Backend
cd backend
cp .env.example .env    # Edit database credentials
npm install

# Frontend
cd frontend
npm install
```

### 2. Setup Database

```bash
cd backend

# Create database and run migrations
npx prisma migrate dev --name init

# Seed with sample data
npx prisma db seed
```

### 3. Start Development

```bash
# Terminal 1 — Backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Accounts

All passwords: `password123`

| Role | Email |
|------|-------|
| User | rahul@example.com |
| User | priya@example.com |
| Chef | arjun@example.com |
| Chef | meera@example.com |
| Chef | vikram@example.com |
| Chef | ananya@example.com |

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user/chef |
| POST | `/api/auth/login` | Login & get JWT |
| GET | `/api/auth/me` | Get current user |

### Chefs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chefs` | List chefs (filter: cuisine, rating, search, sortBy) |
| GET | `/api/chefs/:id` | Get chef profile |
| PUT | `/api/chefs/profile` | Update own profile (chef) |
| POST | `/api/chefs/photo` | Upload profile photo (chef) |

### Dishes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dishes` | List dishes (filter: chefId) |
| POST | `/api/dishes` | Create dish (chef) |
| PUT | `/api/dishes/:id` | Update dish (chef) |
| DELETE | `/api/dishes/:id` | Delete dish (chef) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | List bookings (role-filtered) |
| POST | `/api/bookings` | Create booking (user) |
| PUT | `/api/bookings/:id` | Accept/reject booking (chef) |

## Production Deployment

### Environment Variables

**Backend** (`.env`):
```
DATABASE_URL=postgresql://user:pass@host:5432/chefkart
JWT_SECRET=<strong-random-secret>
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

**Frontend** (`.env.local`):
```
NEXT_PUBLIC_API_URL=https://api.your-domain.com/api
```

### Build for Production

```bash
# Backend — runs with Node.js directly
cd backend
NODE_ENV=production node src/index.js

# Frontend — build static assets
cd frontend
npm run build
npm start
```

## Features

- **JWT Authentication** with role-based access (USER / CHEF)
- **Chef Profiles** with experience, cuisine, location, photo, and ratings
- **Dish Management** — full CRUD with categories and pricing
- **Chef Listing** with search, cuisine filters, and sorting
- **Booking System** — request, accept, reject with date/message
- **Chef Dashboard** — manage dishes, handle bookings, edit profile
- **Rate Limiting** — built-in request throttling
- **Input Validation** — server-side sanitization and length checks
- **Responsive Design** — mobile-first with TailwindCSS
- **Error Handling** — global error boundary, 404 page, graceful shutdown

## License

MIT
