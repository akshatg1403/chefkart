const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorizeChef } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();
const prisma = new PrismaClient();

// ── List dishes ──
router.get('/', async (req, res, next) => {
  try {
    const { chefId } = req.query;
    const where = chefId ? { chefId } : {};

    const dishes = await prisma.dish.findMany({
      where,
      include: {
        chef: {
          include: { user: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(dishes);
  } catch (error) {
    next(error);
  }
});

// ── Create dish ──
router.post('/', authenticate, authorizeChef, upload.single('image'), async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    const price = parseFloat(req.body.price);
    const category = String(req.body.category || '').trim();

    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'Dish name must be 2-100 characters.' });
    }
    if (isNaN(price) || price <= 0 || price > 100000) {
      return res.status(400).json({ error: 'Price must be between ₹1 and ₹1,00,000.' });
    }

    const profile = await prisma.chefProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Chef profile not found. Please complete your profile first.' });
    }

    const dish = await prisma.dish.create({
      data: {
        chefId: profile.id,
        name,
        price: Math.round(price * 100) / 100,
        category: category.slice(0, 50),
        imageUrl: req.file ? req.file.path : '',
      },
    });

    res.status(201).json(dish);
  } catch (error) {
    next(error);
  }
});

// ── Update dish ──
router.put('/:id', authenticate, authorizeChef, upload.single('image'), async (req, res, next) => {
  try {
    const existingDish = await prisma.dish.findUnique({
      where: { id: req.params.id },
      include: { chef: true },
    });

    if (!existingDish) {
      return res.status(404).json({ error: 'Dish not found.' });
    }
    if (existingDish.chef.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this dish.' });
    }

    const updateData = {};
    if (req.body.name) {
      const name = String(req.body.name).trim();
      if (name.length < 2 || name.length > 100) {
        return res.status(400).json({ error: 'Dish name must be 2-100 characters.' });
      }
      updateData.name = name;
    }
    if (req.body.price) {
      const price = parseFloat(req.body.price);
      if (isNaN(price) || price <= 0 || price > 100000) {
        return res.status(400).json({ error: 'Invalid price.' });
      }
      updateData.price = Math.round(price * 100) / 100;
    }
    if (req.body.category !== undefined) {
      updateData.category = String(req.body.category).trim().slice(0, 50);
    }
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const dish = await prisma.dish.update({
      where: { id: req.params.id },
      data: updateData,
    });

    res.json(dish);
  } catch (error) {
    next(error);
  }
});

// ── Delete dish ──
router.delete('/:id', authenticate, authorizeChef, async (req, res, next) => {
  try {
    const existingDish = await prisma.dish.findUnique({
      where: { id: req.params.id },
      include: { chef: true },
    });

    if (!existingDish) {
      return res.status(404).json({ error: 'Dish not found.' });
    }
    if (existingDish.chef.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this dish.' });
    }

    await prisma.dish.delete({ where: { id: req.params.id } });
    res.json({ message: 'Dish deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
