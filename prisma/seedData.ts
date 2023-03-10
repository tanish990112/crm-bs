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

  activityType: [
    { label: 'Call' },
    { label: 'Face to Face meeting' },
    { label: 'Online call' },
  ],
};

export const adminData = {
  email: process.env.ADMIN_EMAIL,
  phone: process.env.ADMIN_PHONE,
  name: process.env.ADMIN_NAME,
  role: process.env.ADMIN_ROLE,
  password: process.env.ADMIN_PASSWORD,
};
