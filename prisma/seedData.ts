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
    { label: 'Online call' },
    { label: 'Description' },
    { label: 'Dev Screening' },
    { label: 'Technical Interview' },
    { label: 'Face to Face meeting' },
  ],

  accountRating: [
    { label: 'None' },
    { label: 'Active' },
    { label: 'Inactive' },
    { label: 'Project Cancelled' },
    { label: 'Dropped' },
  ],

  accountType: [
    { label: 'None' },
    { label: 'Client' },
    { label: 'End Client' },
  ],

  accountIndustry: [
    { label: 'None' },
    { label: 'IT Services and Consulting' },
    { label: 'Software Development' },
    { label: 'Outsourcing' },
    { label: 'Hospitals and Health Care' },
    { label: 'Advertising Services' },
    { label: 'Finance' },
    { label: 'Government/Military' },
    { label: 'Large Enterprise' },
    { label: 'ManagementISV' },
    { label: 'MSP(Management Service Provider)' },
    { label: 'Network Equipment Enterprise' },
    { label: 'Non-managementISV' },
    { label: 'Optical Netwrrking' },
    { label: 'Service Provider' },
    { label: 'Small/Medium Enterprise' },
    { label: 'Storage Equipment' },
    { label: 'Storage Service Provider' },
    { label: 'Systems Integrator' },
    { label: 'Wireless Industry' },
  ],

  accountOwner: [{ label: 'Bonami Software' }],
};

export const adminData = {
  email: process.env.ADMIN_EMAIL,
  phone: process.env.ADMIN_PHONE,
  name: process.env.ADMIN_NAME,
  role: process.env.ADMIN_ROLE,
  password: process.env.ADMIN_PASSWORD,
};
