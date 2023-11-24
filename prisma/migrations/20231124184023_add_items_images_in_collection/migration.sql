-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "thumbnailGrid" JSONB[] DEFAULT ARRAY[]::JSONB[];
