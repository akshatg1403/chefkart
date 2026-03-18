const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorizeChef } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();
const prisma = new PrismaClient();

// ── List all chefs ──
router.get('/', async (req, res, next) => {
  try {
    const { cuisine, rating, search, sortBy } = req.query;

    const where = {};

    if (cuisine) {
      where.cuisine = { contains: cuisine, mode: 'insensitive' };
    }

    if (rating) {
      const parsedRating = parseFloat(rating);
      if (!isNaN(parsedRating)) {
        where.rating = { gte: parsedRating };
      }
    }

    if (search) {
      where.OR = [
        { cuisine: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    let orderBy = { rating: 'desc' };
    if (sortBy === 'experience') orderBy = { experience: 'desc' };
    if (sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const chefs = await prisma.chefProfile.findMany({
      where,
      orderBy,
      include: {
        user: { select: { id: true, name: true, email: true } },
        dishes: true,
        _count: { select: { bookings: true } },
      },
    });

    res.json(chefs);
  } catch (error) {
    next(error);
  }
});

// ── Get single chef ──
router.get('/:id', async (req, res, next) => {
  try {
    const chef = await prisma.chefProfile.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        dishes: { orderBy: { createdAt: 'desc' } },
        _count: { select: { bookings: true } },
      },
    });

    if (!chef) {
      return res.status(404).json({ error: 'Chef not found.' });
    }

    res.json(chef);
  } catch (error) {
    next(error);
  }
});

// ── Update chef profile ──
router.put('/profile', authenticate, authorizeChef, async (req, res, next) => {
  try {
    const { experience, cuisine, location, description } = req.body;

    const updateData = {};
    if (experience !== undefined) {
      const exp = parseInt(experience);
      if (isNaN(exp) || exp < 0 || exp > 70) {
        return res.status(400).json({ error: 'Experience must be 0-70 years.' });
      }
      updateData.experience = exp;
    }
    if (cuisine !== undefined) updateData.cuisine = String(cuisine).trim().slice(0, 100);
    if (location !== undefined) updateData.location = String(location).trim().slice(0, 100);
    if (description !== undefined) updateData.description = String(description).trim().slice(0, 2000);

    const profile = await prisma.chefProfile.update({
      where: { userId: req.user.id },
      data: updateData,
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    res.json(profile);
  } catch (error) {
    next(error);
  }
});

// ── Upload chef photo ──
router.post('/photo', authenticate, authorizeChef, upload.single('photo'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const profile = await prisma.chefProfile.update({
      where: { userId: req.user.id },
      data: { photoUrl: req.file.path },
    });

    res.json({ photoUrl: profile.photoUrl });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
