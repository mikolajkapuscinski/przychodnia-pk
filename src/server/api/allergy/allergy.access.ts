import { db } from "~/server/db";

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
