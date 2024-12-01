import { z } from "zod";

import {
  createTRPCRouter,
  patientProcedure,
  receptionistProcedure,
} from "~/server/api/trpc";
import { createVisit } from "./visit.access";
import { assert } from "~/utils/assert";

const createVisitInput = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  date: z.date(),
});

export const visitRouter = createTRPCRouter({
  createVisit: patientProcedure
    .input(createVisitInput)
    .mutation(async ({ input, ctx }) => {
      assert(ctx.session.user.id);
      const patientId = ctx.session.user.id;

      return await createVisit({
        ...input,
        patientId,
      });
    }),

  createVisitForSomeone: receptionistProcedure
    .input(
      createVisitInput.extend({
        patientId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await createVisit(input);
    }),
});
