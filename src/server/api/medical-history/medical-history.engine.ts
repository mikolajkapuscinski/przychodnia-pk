import { type Prisma } from "@prisma/client";
import {
  findMedicalHistoryById,
  updateMedicalHistory,
} from "./medical-history.access";
import { assert } from "~/utils/assert";

export const updateMedicalHistoryByDoctor = async (
  doctorId: string,
  input: Prisma.MedicalHistoryUpdateInput & { id: number },
) => {
  const { id, ...data } = input;

  const medicalHistory = await findMedicalHistoryById(id);
  assert(medicalHistory.doctorId === doctorId, "Not authorized");

  return await updateMedicalHistory(id, data);
};
