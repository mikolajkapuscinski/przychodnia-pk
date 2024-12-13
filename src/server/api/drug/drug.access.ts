import { db } from "~/server/db";

export class DrugAccess {
  async addDrugsToVisit(visitId: number, drugIds: number[]) {
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
  }

  async getAllDrugs() {
    return await db.drug.findMany({});
  }
}
