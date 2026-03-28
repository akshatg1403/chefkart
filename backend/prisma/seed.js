const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding ChefKart database...');

  // Clean existing data
  await prisma.booking.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.chefProfile.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('password123', 12);

  // Create Users
  const user1 = await prisma.user.create({
    data: { name: 'Rahul Sharma', email: 'rahul@example.com', password, role: 'USER' },
  });
  const user2 = await prisma.user.create({
    data: { name: 'Priya Patel', email: 'priya@example.com', password, role: 'USER' },
  });

  // Create Chefs
  const chef1User = await prisma.user.create({
    data: { name: 'Chef Arjun Kapoor', email: 'arjun@example.com', password, role: 'CHEF' },
  });
  const chef2User = await prisma.user.create({
    data: { name: 'Chef Meera Nair', email: 'meera@example.com', password, role: 'CHEF' },
  });
  const chef3User = await prisma.user.create({
    data: { name: 'Chef Vikram Singh', email: 'vikram@example.com', password, role: 'CHEF' },
  });
  const chef4User = await prisma.user.create({
    data: { name: 'Chef Ananya Desai', email: 'ananya@example.com', password, role: 'CHEF' },
  });

  // Create Chef Profiles
  const chef1 = await prisma.chefProfile.create({
    data: {
      userId: chef1User.id,
      experience: 12,
      cuisine: 'North Indian',
      location: 'Delhi',
      photoUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop',
      description: 'Award-winning chef specializing in traditional North Indian cuisine with a modern twist. Trained at Le Cordon Bleu and has worked in 5-star hotels across India.',
      rating: 4.8,
      totalRatings: 156,
    },
  });

  const chef2 = await prisma.chefProfile.create({
    data: {
      userId: chef2User.id,
      experience: 8,
      cuisine: 'South Indian',
      location: 'Bangalore',
      photoUrl: 'https://images.unsplash.com/photo-1556911073-52527ac43761?w=400&h=400&fit=crop',
      description: 'Passionate about authentic South Indian flavors. Specializes in Kerala and Tamil Nadu cuisines with organic, locally-sourced ingredients.',
      rating: 4.6,
      totalRatings: 98,
    },
  });

  const chef3 = await prisma.chefProfile.create({
    data: {
      userId: chef3User.id,
      experience: 15,
      cuisine: 'Mughlai',
      location: 'Mumbai',
      photoUrl: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop',
      description: 'Master of Mughlai cuisine with 15 years of experience. Known for exquisite biryanis, kebabs, and royal Mughal recipes passed down through generations.',
      rating: 4.9,
      totalRatings: 234,
    },
  });

  const chef4 = await prisma.chefProfile.create({
    data: {
      userId: chef4User.id,
      experience: 6,
      cuisine: 'Continental',
      location: 'Pune',
      photoUrl: 'https://images.unsplash.com/photo-1585358682246-23acb1561f6b?w=400&h=400&fit=crop',
      description: 'Creative chef blending Continental and Indian flavors. Specializes in fusion cuisine, artisan breads, and gourmet desserts.',
      rating: 4.5,
      totalRatings: 67,
    },
  });

  // Create Dishes
  // Chef 1 - North Indian
  await prisma.dish.createMany({
    data: [
      { chefId: chef1.id, name: 'Butter Chicken', price: 450, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop' },
      { chefId: chef1.id, name: 'Dal Makhani', price: 320, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop' },
      { chefId: chef1.id, name: 'Paneer Tikka', price: 380, category: 'Starter', imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop' },
      { chefId: chef1.id, name: 'Naan Basket', price: 180, category: 'Bread', imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop' },
    ],
  });

  // Chef 2 - South Indian
  await prisma.dish.createMany({
    data: [
      { chefId: chef2.id, name: 'Masala Dosa', price: 220, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eb5eadfeee?w=400&h=300&fit=crop' },
      { chefId: chef2.id, name: 'Kerala Fish Curry', price: 520, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop' },
      { chefId: chef2.id, name: 'Idli Sambar', price: 180, category: 'Breakfast', imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop' },
    ],
  });

  // Chef 3 - Mughlai
  await prisma.dish.createMany({
    data: [
      { chefId: chef3.id, name: 'Hyderabadi Biryani', price: 550, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop' },
      { chefId: chef3.id, name: 'Seekh Kebab', price: 420, category: 'Starter', imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop' },
      { chefId: chef3.id, name: 'Shahi Paneer', price: 400, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop' },
      { chefId: chef3.id, name: 'Gulab Jamun', price: 200, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1666190094762-18a4f1a022c9?w=400&h=300&fit=crop' },
    ],
  });

  // Chef 4 - Continental
  await prisma.dish.createMany({
    data: [
      { chefId: chef4.id, name: 'Truffle Pasta', price: 650, category: 'Main Course', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop' },
      { chefId: chef4.id, name: 'Caesar Salad', price: 350, category: 'Starter', imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop' },
      { chefId: chef4.id, name: 'Tiramisu', price: 400, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
    ],
  });

  // Create sample bookings
  await prisma.booking.create({
    data: {
      userId: user1.id,
      chefId: chef1.id,
      date: new Date('2026-03-20'),
      status: 'ACCEPTED',
      message: 'Birthday party for 10 people. Need North Indian thali.',
    },
  });

  await prisma.booking.create({
    data: {
      userId: user1.id,
      chefId: chef3.id,
      date: new Date('2026-03-25'),
      status: 'PENDING',
      message: 'Dinner for 6. Looking for authentic Mughlai spread.',
    },
  });

  await prisma.booking.create({
    data: {
      userId: user2.id,
      chefId: chef2.id,
      date: new Date('2026-04-01'),
      status: 'PENDING',
      message: 'South Indian breakfast for family gathering, 15 people.',
    },
  });

  await prisma.booking.create({
    data: {
      userId: user2.id,
      chefId: chef4.id,
      date: new Date('2026-03-28'),
      status: 'REJECTED',
      message: 'Continental dinner for anniversary.',
    },
  });

  console.log('✅ Seed data created successfully!');
  console.log('📋 Test accounts:');
  console.log('   Users: rahul@example.com / priya@example.com');
  console.log('   Chefs: arjun@example.com / meera@example.com / vikram@example.com / ananya@example.com');
  console.log('   Password for all: password123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
