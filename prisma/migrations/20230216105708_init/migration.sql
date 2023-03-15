-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "leadId" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "employeeRatio" TEXT NOT NULL,
    "leadSource" TEXT NOT NULL,
    "employeeCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "leadStatus" TEXT NOT NULL,
    "hourlyRate" DECIMAL(65,30) NOT NULL,
    "deployedCount" INTEGER,
    "country" TEXT NOT NULL,
    "annualRevenue" DECIMAL(65,30) NOT NULL,
    "vendorManagement" TEXT NOT NULL,
    "address" TEXT NOT NULL DEFAULT 'N/A',
    "description" TEXT NOT NULL DEFAULT 'N/A',
    "leadSourcerUserId" INTEGER NOT NULL,
    "accountStatus" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "leadId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "typeOfActivity" TEXT NOT NULL,
    "activityTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "leadId" TEXT NOT NULL,
    "contactFirstName" TEXT NOT NULL,
    "contactLastName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "skypeId" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadSourcer" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "LeadSourcer_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT,
    "information" TEXT,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_leadId_key" ON "Lead"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "LeadSourcer_email_key" ON "LeadSourcer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LeadSourcer_phone_key" ON "LeadSourcer"("phone");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_leadSourcerUserId_fkey" FOREIGN KEY ("leadSourcerUserId") REFERENCES "LeadSourcer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("leadId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "LeadSourcer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("leadId") ON DELETE RESTRICT ON UPDATE CASCADE;
