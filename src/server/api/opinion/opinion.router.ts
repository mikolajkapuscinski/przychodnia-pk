import {
  createTRPCRouter,
  patientProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { getOpinionsForDoctor, getOpinionSummary } from "./opinion.access";
import { assert } from "~/utils/assert";
import { postOpinion } from "./opinion.engine";

export const opinionRouter = createTRPCRouter({
  getOpinionsForDoctor: publicProcedure
    .input(
      z.object({
        doctorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await getOpinionsForDoctor(input.doctorId);
    }),

  getOpinionSummary: publicProcedure.query(async () => {
    return await getOpinionSummary();
  }),

  postOpinion: patientProcedure
    .input(
      z.object({
        doctorId: z.string(),
        text: z.string().optional(),
        rating: z.number().min(0).max(10),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const patientId = ctx.session.user.id;
      assert(patientId);

      await postOpinion(patientId, input);
    }),
});
