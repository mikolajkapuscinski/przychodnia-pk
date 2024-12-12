import "reflect-metadata";
import { Injectable } from "injection-js";
import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { assert } from "~/utils/assert";

@Injectable()
export class MedicalHistoryAccess {
  async getMedicalHistory(patientId: string) {
    return await db.medicalHistory.findMany({
      where: {
        patientId,
      },
    });
  }

  async createMedicalHistory(data: Prisma.MedicalHistoryUncheckedCreateInput) {
    return db.medicalHistory.create({
      data,
    });
  }

  async updateMedicalHistory(
    id: number,
    data: Prisma.MedicalHistoryUpdateInput,
  ) {
    return db.medicalHistory.update({
      where: { id },
      data,
    });
  }

  async findMedicalHistoryById(id: number) {
    const medicalHistory = await db.medicalHistory.findUnique({
      where: { id },
    });
    assert(medicalHistory, "Medical history not found");

    return medicalHistory;
  }
}
