/*
  Warnings:

  - You are about to drop the `timeOffCredit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `timeOffCredit` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "timeOffCredit" DROP CONSTRAINT "timeOffCredit_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "timeOffCredit" INTEGER NOT NULL;

-- DropTable
DROP TABLE "timeOffCredit";
