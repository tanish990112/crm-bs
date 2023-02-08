/*
  Warnings:

  - You are about to drop the column `vendorManagment` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `vendorManagement` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "vendorManagment",
ADD COLUMN     "vendorManagement" TEXT NOT NULL;
