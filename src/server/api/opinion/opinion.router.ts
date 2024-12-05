import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { getOpinionsForDoctor } from "./opinion.access";

export const userRouter = createTRPCRouter({
  getOpinionsForDoctor: publicProcedure
    .input(
      z.object({
        doctorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getOpinionsForDoctor(input.doctorId);
    }),
});
