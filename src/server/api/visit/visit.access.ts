import { VisitStatus, type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { assert } from "~/utils/assert";

export class VisitAccess {
  async createVisit(visit: Omit<Prisma.VisitUncheckedCreateInput, "status">) {
    assert(visit.date > new Date(), "Invalid time");

    return await db.visit.create({
      data: { ...visit, status: VisitStatus.SCHEDULED },
    });
  }

  async updateVisit(id: number, visit: Prisma.VisitUpdateInput) {
    return await db.visit.update({
      where: { id },
      data: visit,
    });
  }

  async findVisitById(id: number) {
    const visit = await db.visit.findUnique({
      where: { id },
    });
    assert(visit, "Visit not found");

    return visit;
  }

  async findVisits(where: Prisma.VisitWhereInput) {
    const visits = await db.visit.findMany({
      where,
    });

    return visits;
  }

  async countVisits(where: Prisma.VisitWhereInput) {
    const count = await db.visit.count({
      where,
    });

    return count;
  }
}
