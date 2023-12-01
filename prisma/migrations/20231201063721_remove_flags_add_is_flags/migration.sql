/*
  Warnings:

  - You are about to drop the column `flags` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `flags` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "flags";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "flags";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "color" TEXT,
ADD COLUMN     "isFlag" BOOLEAN NOT NULL DEFAULT false;
