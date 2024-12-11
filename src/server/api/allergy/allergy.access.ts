import { db } from "~/server/db";

export const getAllergy = async (patientId: string) => {
  return await db.allergy.findMany({
    where: {
      patient: {
        some: {
          userId: patientId,
        },
      },
    },
  });
};
