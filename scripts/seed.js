const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    console.error('Error: Please define ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in your .env file before running seed.');
    process.exit(1);
  }

  console.log(`Seeding initial admin account: ${email}...`);

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
    },
    create: {
      email,
      passwordHash,
    },
  });

  console.log(`Successfully seeded AdminUser (ID: ${admin.id})`);

  // Seed default Settings if empty
  const existingSettings = await prisma.settings.findFirst();
  if (!existingSettings) {
    await prisma.settings.create({
      data: {
        phone1: '+918604415736',
        phone2: '+917905766423',
        email: 'shivangikamkalakendra@gmail.com',
        instagram: '@Shivangikam_kala_kendra',
        address: 'New Colony, Kakarmatta, Near I.A.I.T College, BLW, Varanasi, Uttar Pradesh',
      },
    });
    console.log('Seeded default site Settings.');
  }
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
