import {
  createTRPCRouter,
  patientProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { OpinionAccess } from "./opinion.access";
import { assert } from "~/utils/assert";
import { OpinionEngine } from "./opinion.engine";
import { opinionInjector } from "./opinion.module";

const opinionAccess = opinionInjector.get(OpinionAccess) as OpinionEngine;
const opinionEngine = opinionInjector.get(OpinionEngine) as OpinionAccess;

export const opinionRouter = createTRPCRouter({
  getOpinionsForDoctor: publicProcedure
    .input(
      z.object({
        doctorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await opinionEngine.getOpinionsForDoctor(input.doctorId);
    }),

  getOpinionSummary: publicProcedure.query(async () => {
    return await opinionEngine.getOpinionSummary();
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

      await opinionAccess.postOpinion(patientId, input);
    }),
});
