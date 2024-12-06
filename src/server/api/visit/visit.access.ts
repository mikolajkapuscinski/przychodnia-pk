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

export const updateVisit = async (
  id: number,
  visit: Prisma.VisitUpdateInput,
) => {
  return await db.visit.update({
    where: { id },
    data: visit,
  });
};

export const findVisitById = async (id: number) => {
  const visit = await db.visit.findUnique({
    where: { id },
  });
  assert(visit, "Visit not found");

  return visit;
};

export const findVisits = async (where: Prisma.VisitWhereInput) => {
  const visit = await db.visit.findMany({
    where,
  });

  return visit;
};

export const countVisits = async (where: Prisma.VisitWhereInput) => {
  const count = await db.visit.count({
    where,
  });

  return count;
};
