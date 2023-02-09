-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "leadId" TEXT NOT NULL,
    "linkedinUrl" TEXT NOT NULL,
    "employeeRatio" DECIMAL(65,30) NOT NULL,
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
    "leadSourcerUserId" INTEGER,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
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
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "LeadSourcer_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_leadId_key" ON "Lead"("leadId");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_leadSourcerUserId_fkey" FOREIGN KEY ("leadSourcerUserId") REFERENCES "LeadSourcer"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("leadId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("leadId") ON DELETE RESTRICT ON UPDATE CASCADE;
