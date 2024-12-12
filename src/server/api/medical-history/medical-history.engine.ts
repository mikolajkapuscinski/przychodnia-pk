import "reflect-metadata";
import { Injectable, type Injector } from "injection-js";
import { type Prisma } from "@prisma/client";
import { MedicalHistoryAccess } from "./medical-history.access";
import { assert } from "~/utils/assert";
import { DI } from "~/server/di";

@Injectable()
export class MedicalHistoryEngine extends DI {
  private medicalHistoryAccess: MedicalHistoryAccess;

  constructor(inj: Injector) {
    super(inj);

    this.medicalHistoryAccess =
      this.get<MedicalHistoryAccess>(MedicalHistoryAccess);
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
