-- AlterTable
ALTER TABLE "LeadSourcer" ADD COLUMN     "parent" INTEGER,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER',
ADD COLUMN     "token" TEXT;
