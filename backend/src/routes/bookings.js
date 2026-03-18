const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorizeChef, authorizeUser } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// ── Create booking ──
router.post('/', authenticate, authorizeUser, async (req, res, next) => {
  try {
    const { chefId, date, message } = req.body;

    if (!chefId || !date) {
      return res.status(400).json({ error: 'Chef ID and date are required.' });
    }

    const bookingDate = new Date(date);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format.' });
    }
    if (bookingDate < new Date()) {
      return res.status(400).json({ error: 'Booking date must be in the future.' });
    }

    const chef = await prisma.chefProfile.findUnique({ where: { id: chefId } });
    if (!chef) {
      return res.status(404).json({ error: 'Chef not found.' });
    }

    // Prevent booking yourself
    if (chef.userId === req.user.id) {
      return res.status(400).json({ error: 'You cannot book yourself.' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        chefId,
        date: bookingDate,
        message: String(message || '').trim().slice(0, 500),
      },
      include: {
        chef: { include: { user: { select: { name: true } } } },
        user: { select: { name: true, email: true } },
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

// ── List bookings ──
router.get('/', authenticate, async (req, res, next) => {
  try {
    let where = {};

    if (req.user.role === 'USER') {
      where.userId = req.user.id;
    } else if (req.user.role === 'CHEF') {
      const profile = await prisma.chefProfile.findUnique({
        where: { userId: req.user.id },
      });
      if (profile) {
        where.chefId = profile.id;
      }
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        chef: { include: { user: { select: { name: true } } } },
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

// ── Update booking status ──
router.put('/:id', authenticate, authorizeChef, async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status must be ACCEPTED or REJECTED.' });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: { chef: true },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    if (booking.chef.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this booking.' });
    }
    if (booking.status !== 'PENDING') {
      return res.status(400).json({ error: `Booking is already ${booking.status.toLowerCase()}.` });
    }

    const updated = await prisma.booking.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        chef: { include: { user: { select: { name: true } } } },
        user: { select: { name: true, email: true } },
      },
    });

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
