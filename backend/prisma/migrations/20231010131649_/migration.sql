/*
  Warnings:

  - You are about to drop the column `likes` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sendEmail" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
