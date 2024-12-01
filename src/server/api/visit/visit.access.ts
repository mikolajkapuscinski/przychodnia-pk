import { VisitStatus, type Prisma } from "@prisma/client";
import { db } from "~/server/db";
import { assert } from "~/utils/assert";

export const createVisit = async (
  visit: Omit<Prisma.VisitUncheckedCreateInput, "status">,
) => {
  assert(visit.date > new Date(), "Invalid time");

  return await db.visit.create({
    data: { ...visit, status: VisitStatus.SCHEDULED },
  });
};

export const findVisitById = async (id: number) => {
  return await db.visit.findUnique({
    where: { id },
  });
};
