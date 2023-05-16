-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "accountId" INTEGER;

-- CreateTable
CREATE TABLE "Account" (
    "accountId" SERIAL NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "accountOwner" TEXT NOT NULL,
    "handlerId" INTEGER NOT NULL,
    "foundedIn" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "Employees" INTEGER NOT NULL,
    "billingCountry" TEXT NOT NULL,
    "billingState" TEXT NOT NULL,
    "annualRevenue" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "description" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("accountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountName_key" ON "Account"("accountName");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
