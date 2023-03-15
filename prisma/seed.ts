import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { ConfigData, adminData } from './seedData';

// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const configSeedData = Object.keys(ConfigData);
  let current = 0;
  while (current < configSeedData.length) {
    for await (const conf of ConfigData[configSeedData[current]]) {
      const config = await prisma.config.upsert({
        where: { label: conf.label },
        update: { information: conf.info },
        create: {
          label: conf.label,
          type: configSeedData[current],
          information: conf.info ? conf.info : null,
        },
      });
      console.log(config);
    }
    current++;
  }
  const hashedPassword = await bcrypt.hash(adminData.password, 10);
  adminData.password = hashedPassword;
  const admin = await prisma.users.upsert({
    where: {
      email: adminData.email,
    },
    update: { ...adminData },
    create: { ...adminData },
  });
  console.log(admin);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
