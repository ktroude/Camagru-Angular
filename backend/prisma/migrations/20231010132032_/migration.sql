-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_commentId_fkey";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "commentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
