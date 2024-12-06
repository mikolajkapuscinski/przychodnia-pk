import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";

export const getAllSpecializations = async () => {
  return db.specialization.findMany();
};

export const createSpecialization = async (
  data: Prisma.SpecializationCreateInput,
) => {
  return db.specialization.create({
    data,
  });
};

export const assignSpecializationToDoctor = async (
  doctorId: string,
  specializationId: string,
) => {
  await db.doctor.update({
    where: { userId: doctorId },
    data: {
      specialization: {
        connect: { id: specializationId },
      },
    },
  });

  return true;
};

export const unassignSpecializationFromDoctor = async (
  doctorId: string,
  specializationId: string,
) => {
  await db.doctor.update({
    where: { userId: doctorId },
    data: {
      specialization: {
        disconnect: { id: specializationId },
      },
    },
  });

  return true;
};
