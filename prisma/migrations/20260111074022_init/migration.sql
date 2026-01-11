/*
  Warnings:

  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "hashedPassword" TEXT NOT NULL DEFAULT 'your_default_password_hash_here';

-- DropTable
DROP TABLE "verification";
