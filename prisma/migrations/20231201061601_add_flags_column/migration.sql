-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "flags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "flags" TEXT[] DEFAULT ARRAY[]::TEXT[];
