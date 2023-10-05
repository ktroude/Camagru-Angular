/*
  Warnings:

  - You are about to drop the column `isEmailconfirmed` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "isEmailconfirmed",
ADD COLUMN     "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false;
