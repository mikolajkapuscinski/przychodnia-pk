import { Inject } from "injection-js";
import { type Prisma } from "@prisma/client";
import { MedicalHistoryAccess } from "./medical-history.access";
import { assert } from "~/utils/assert";

export class MedicalHistoryEngine {
  constructor(private medicalHistoryAccess: MedicalHistoryAccess) {}

  static get parameters() {
    return [new Inject(MedicalHistoryAccess)];
  }

  async updateMedicalHistoryByDoctor(
    doctorId: string,
    input: Prisma.MedicalHistoryUpdateInput & { id: number },
  ) {
    const { id, ...data } = input;

    const medicalHistory =
      await this.medicalHistoryAccess.findMedicalHistoryById(id);
    assert(medicalHistory.doctorId === doctorId, "Not authorized");

    return await this.medicalHistoryAccess.updateMedicalHistory(id, data);
  }
}
