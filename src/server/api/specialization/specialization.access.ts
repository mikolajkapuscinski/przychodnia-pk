import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";

export class SpecializationAccess {
  async getAllSpecializations() {
    return db.specialization.findMany();
  }

  async createSpecialization(data: Prisma.SpecializationCreateInput) {
    return db.specialization.create({
      data,
    });
  }

  async assignSpecializationToDoctor(
    doctorId: string,
    specializationId: string,
  ) {
    await db.doctor.update({
      where: { userId: doctorId },
      data: {
        specialization: {
          connect: { id: specializationId },
        },
      },
    });

    return true;
  }

  async unassignSpecializationFromDoctor(
    doctorId: string,
    specializationId: string,
  ) {
    await db.doctor.update({
      where: { userId: doctorId },
      data: {
        specialization: {
          disconnect: { id: specializationId },
        },
      },
    });

    return true;
  }
}
