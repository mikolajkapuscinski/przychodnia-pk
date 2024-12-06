import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { assert } from "~/utils/assert";

export const getMedicalHistory = async (patientId: string) => {
  return await db.medicalHistory.findMany({
    where: {
      patientId,
    },
  });
};

export const createMedicalHistory = async (
  data: Prisma.MedicalHistoryUncheckedCreateInput,
) => {
  return db.medicalHistory.create({
    data,
  });
};

export const updateMedicalHistory = async (
  id: number,
  data: Prisma.MedicalHistoryUpdateInput,
) => {
  return db.medicalHistory.update({
    where: { id },
    data,
  });
};

export const findMedicalHistoryById = async (id: number) => {
  const medicalHistory = await db.medicalHistory.findUnique({
    where: { id },
  });
  assert(medicalHistory, "Medical history not found");

  return medicalHistory;
};
