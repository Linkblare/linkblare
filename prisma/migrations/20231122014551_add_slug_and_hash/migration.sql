-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "hash" TEXT,
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "hash" TEXT,
ADD COLUMN     "slug" TEXT;
