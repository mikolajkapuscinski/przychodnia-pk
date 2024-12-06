import {
  createTRPCRouter,
  patientProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { getOpinionsForDoctor } from "./opinion.access";
import { assert } from "~/utils/assert";
import { postOpinion } from "./opinion.engine";

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
