import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { getAllergy } from "./allergy.access";

export const allergyRouter = createTRPCRouter({
  getAllergiesForPatient: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getAllergy(input.patientId);
    }),
});
