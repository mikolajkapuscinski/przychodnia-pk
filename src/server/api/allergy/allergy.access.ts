import "reflect-metadata";
import { db } from "~/server/db";
import { Injectable } from "injection-js";

@Injectable()
export class AllergyAccess {
  async getAllergy(patientId: string) {
    return await db.allergy.findMany({
      where: {
        patient: {
          some: {
            userId: patientId,
          },
        },
      },
    });
  }
}
