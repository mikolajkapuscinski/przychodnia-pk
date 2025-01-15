/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Drug_name_idx" ON "Drug"(lower("name"));

-- CreateIndex
CREATE INDEX "MedicalHistory_diseaseName_idx" ON "MedicalHistory"(lower("diseaseName"));

-- CreateIndex
CREATE INDEX "MedicalHistory_region_idx" ON "MedicalHistory"("region");

-- CreateIndex
CREATE INDEX "Opinion_doctorId_idx" ON "Opinion"("doctorId");

-- CreateIndex
CREATE INDEX "Specialization_name_idx" ON "Specialization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "User_firstName_idx" ON "User"("firstName");

-- CreateIndex
CREATE INDEX "Visit_patientId_idx" ON "Visit"("patientId");

-- CreateIndex
CREATE INDEX "Visit_doctorId_idx" ON "Visit"("doctorId");

-- CreateIndex
CREATE INDEX "Visit_status_idx" ON "Visit"("status");
