import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

export const ConfigData = {
  leadSource: ['UpWork', 'LinkedIn', 'Google', 'SEO Tool', 'External Referral'],

  leadStatus: [
    'Attempted to Contact',
    'Contact in Future',
    'In communication',
    'Junk Lead',
    'Lost Lead',
    'Not Contacted',
    'Pre-Qualified',
    'Not Qualified',
    'New Entry',
  ],

  industry: [
    'IT Services and Consulting',
    'Software Development',
    'Outsourcing',
    'Government/Military',
    'Large Enterprise',
    'Hiring Platform',
  ],
};

async function main() {
  // create two dummy articles
  const configSeedData = Object.keys(ConfigData);
  let current = 0;
  while (current < configSeedData.length) {
    for await (const conf of ConfigData[configSeedData[current]]) {
      const config = await prisma.config.upsert({
        where: { label: conf },
        update: {},
        create: {
          label: conf,
          type: configSeedData[current],
        },
      });
      console.log(config);
    }
    current++;
  }
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
