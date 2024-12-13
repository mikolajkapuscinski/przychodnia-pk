import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";

export class OpinionAccess {
  async createOpinion(data: Prisma.OpinionUncheckedCreateInput) {
    return db.opinion.create({
      data,
    });
  }

  async getOpinionsForDoctor(doctorId: string) {
    return db.opinion.findMany({
      where: {
        doctorId,
      },
    });
  }

  async getOpinionSummary() {
    const opinions = await db.opinion.groupBy({
      by: ["doctorId"],
      _count: {
        rating: true,
      },
      _sum: {
        rating: true,
      },
    });

    return opinions.reduce(
      (acc, opinion) => {
        acc[opinion.doctorId] = {
          rating: (opinion._sum.rating ?? 0) / opinion._count.rating,
          count: opinion._count.rating,
        };
        return acc;
      },
      {} as Record<string, OpinionSummary>,
    );
  }
}

interface OpinionSummary {
  rating: number;
  count: number;
}
