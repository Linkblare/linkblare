/*
  Warnings:

  - You are about to drop the column `thumbnailGrid` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "thumbnailGrid",
ADD COLUMN     "itemsImages" JSONB[] DEFAULT ARRAY[]::JSONB[];
