import {
  adminProcedure,
  createTRPCRouter,
  doctorProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  assignSpecializationToDoctor,
  createSpecialization,
  getAllSpecializations,
  unassignSpecializationFromDoctor,
} from "./specialization.access";
import { z } from "zod";

const doctorSpecializationMatch = z.object({
  doctorId: z.string(),
  specializationId: z.string(),
});

export const userRouter = createTRPCRouter({
  getAllSpecializations: publicProcedure.query(async () => {
    return await getAllSpecializations();
  }),

  createSpecialization: adminProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await createSpecialization(input);
    }),

  assignSpecializationToDoctor: doctorProcedure
    .input(doctorSpecializationMatch)
    .mutation(async ({ input }) => {
      return await assignSpecializationToDoctor(
        input.doctorId,
        input.specializationId,
      );
    }),

  unassignSpecializationFromDoctor: doctorProcedure
    .input(doctorSpecializationMatch)
    .mutation(async ({ input }) => {
      return await unassignSpecializationFromDoctor(
        input.doctorId,
        input.specializationId,
      );
    }),
});
