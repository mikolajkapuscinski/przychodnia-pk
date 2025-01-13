/*
  Warnings:

  - Added the required column `region` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiseaseRegion" AS ENUM ('HEAD', 'CHEST', 'LEFT_LEG', 'LEFT_ARM', 'RIGHT_LEG', 'RIGHT_ARM', 'THROAT');

-- AlterTable
ALTER TABLE "MedicalHistory" ADD COLUMN     "region" "DiseaseRegion" NOT NULL;

-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "title" TEXT NOT NULL;
