/*
  Warnings:

  - You are about to drop the column `name` on the `Config` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `Config` will be added. If there are existing duplicate values, this will fail.
  - Made the column `label` on table `Config` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "name",
ALTER COLUMN "label" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Config_label_key" ON "Config"("label");
