-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_postId_fkey";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
