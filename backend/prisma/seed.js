const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Admin
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@test.com',
      password: hashedPassword, // 123456
      role: 'admin',
    },
  });

  // Usuario normal
  await prisma.user.create({
    data: {
      name: 'User',
      email: 'user@test.com',
      password: hashedPassword, // 123456
      role: 'user',
    },
  });

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());