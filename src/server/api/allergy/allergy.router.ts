import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { AllergyAccess } from "./allergy.access";

export const allergyRouter = createTRPCRouter({
  getAllergiesForPatient: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const allergyAccess = new AllergyAccess();
      return await allergyAccess.getAllergy(input.patientId);
    }),
});
