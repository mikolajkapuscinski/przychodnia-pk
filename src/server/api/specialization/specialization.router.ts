import {
  adminProcedure,
  createTRPCRouter,
  doctorProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { SpecializationAccess } from "./specialization.access";
import { z } from "zod";

const specializationAccess = new SpecializationAccess();

const doctorSpecializationMatch = z.object({
  doctorId: z.string(),
  specializationId: z.string(),
});

export const specializationRouter = createTRPCRouter({
  getAllSpecializations: publicProcedure.query(async () => {
    return await specializationAccess.getAllSpecializations();
  }),

  createSpecialization: adminProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await specializationAccess.createSpecialization(input);
    }),

  assignSpecializationToDoctor: doctorProcedure
    .input(doctorSpecializationMatch)
    .mutation(async ({ input }) => {
      return await specializationAccess.assignSpecializationToDoctor(
        input.doctorId,
        input.specializationId,
      );
    }),

  unassignSpecializationFromDoctor: doctorProcedure
    .input(doctorSpecializationMatch)
    .mutation(async ({ input }) => {
      return await specializationAccess.unassignSpecializationFromDoctor(
        input.doctorId,
        input.specializationId,
      );
    }),
});
