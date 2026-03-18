const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const chefRoutes = require('./routes/chefs');
const dishRoutes = require('./routes/dishes');
const bookingRoutes = require('./routes/bookings');

const app = express();

// ── Security & CORS ──
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Simple rate limiter (in-memory, use Redis in prod) ──
const rateLimitMap = new Map();
const rateLimit = (windowMs = 60000, maxRequests = 100) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }
    
    const timestamps = rateLimitMap.get(ip).filter(t => t > windowStart);
    
    if (timestamps.length >= maxRequests) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);
    next();
  };
};

// Apply rate limiting
app.use('/api/auth', rateLimit(60000, 20)); // Auth: 20 req/min
app.use('/api', rateLimit(60000, 100));     // General: 100 req/min

// ── Request logging (dev) ──
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (req.path !== '/api/health') {
        console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
      }
    });
    next();
  });
}

// ── Routes ──
app.use('/api/auth', authRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'ChefKart API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }

  // Prisma error handling
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'A record with this data already exists.' });
  }
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found.' });
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum size is 5MB.' });
  }

  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message || 'Internal Server Error',
  });
});

// ── Graceful shutdown ──
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 ChefKart API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down...');
  server.close(() => process.exit(0));
});
