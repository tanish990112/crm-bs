import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

// initialize the Prisma Client
const prisma = new PrismaClient();

export const ConfigData = {
  leadSource: [
    { label: 'UpWork ' },
    { label: 'LinkedIn ' },
    { label: 'Google ' },
    { label: 'SEO Tool ' },
    { label: 'External Referral' },
  ],

  leadStatus: [
    {
      label: 'Attempted to Contact',
      info: 'Lead is validated based  on their background, has indicated interest in what we have to offer and is otherwise more likely to become a customer.',
    },
    {
      label: 'Contact in Future',
      info: 'Lead which has a common scope of work and can now be converted into an active customer.',
    },
    {
      label: 'In communication',
      info: 'Sales qualified lead to which we have quoted budget and timelines.',
    },
    {
      label: 'Junk Lead',
      info: 'Lead which has mutually agreed to the terms and quotations, and the decision is pending.',
    },
    {
      label: 'Lost Lead',
      info: 'Lead which is ready for collaboration, documentation is pending.',
    },
    {
      label: 'Not Contacted',
      info: 'Lead with which we have closed the deal.',
    },
    {
      label: 'Pre-Qualified',
      info: 'Lead which has lost interest or not proceeding with our services.',
    },
    {
      label: 'Unqualified',
      info: 'Lead which does not qualify based on background, or has no interest in our services.',
    },
  ],

  industry: [
    { label: 'IT Services and Consulting' },
    { label: 'Software Development' },
    { label: 'Outsourcing' },
    { label: 'Government/Military' },
    { label: 'Large Enterprise' },
    { label: 'Hiring Platform' },
  ],
  role: [
    { label: 'USER', info: 'Can perform CRUD operations on his own records.' },
    {
      label: 'STAFF',
      info: 'Can perform CRUD operations on his own + associated users with him.',
    },
    {
      label: 'ADMIN',
      info: 'Can perform CRUD operations on his own + all the other users within the system.',
    },
  ],
};

export const adminData = {
  email: 'admin@bonamisoftware.com',
  phone: '9999999999',
  name: 'Admin Singh',
  role: 'ADMIN',
  password: 'admin@123',
};

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
  const admin = await prisma.leadSourcer.upsert({
    where: {
      email: adminData.email,
    },
    update: {},
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
