/*
  Warnings:

  - Added the required column `name` to the `LeadSourcer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeadSourcer" ADD COLUMN     "name" TEXT NOT NULL;
