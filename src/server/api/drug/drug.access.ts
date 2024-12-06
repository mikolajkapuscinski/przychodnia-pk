import { db } from "~/server/db";

export const addDrugsToVisit = async (visitId: number, drugIds: number[]) => {
  const updates = drugIds.map((drugId) => {
    return db.drug.update({
      where: { id: drugId },
      data: {
        visits: {
          connect: { id: visitId },
        },
      },
    });
  });

  return await db.$transaction(updates);
};
