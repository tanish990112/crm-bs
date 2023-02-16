/*
  Warnings:

  - Made the column `accountStatus` on table `Lead` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "accountStatus" SET NOT NULL;
