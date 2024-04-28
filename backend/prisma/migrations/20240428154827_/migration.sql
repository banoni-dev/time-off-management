/*
  Warnings:

  - Added the required column `type` to the `timeOffHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timeOffHistory" ADD COLUMN     "type" TEXT NOT NULL;
