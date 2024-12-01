import { z } from "zod";

import {
  createTRPCRouter,
  doctorProcedure,
  patientProcedure,
  protectedProcedure,
  receptionistProcedure,
} from "~/server/api/trpc";
import { createVisit, findVisitById, updateVisit } from "./visit.access";
import { assert } from "~/utils/assert";
import { VisitStatus } from "@prisma/client";
import { cancelVisit } from "./manage-visit.engine";

const createVisitInput = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  date: z.date(),
});

const visitIdInput = z.object({
  id: z.number(),
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

  cancelVisit: protectedProcedure
    .input(visitIdInput)
    .mutation(async ({ input, ctx }) => {
      const visit = await findVisitById(input.id);
      const { id: userId, role } = ctx.session.user;
      assert(userId && role);

      return await cancelVisit(visit, userId, role);
    }),

  startVisit: doctorProcedure
    .input(visitIdInput)
    .mutation(async ({ input }) => {
      return await updateVisit(input.id, { status: VisitStatus.ONGOING });
    }),

  finishVisit: doctorProcedure
    .input(visitIdInput)
    .mutation(async ({ input }) => {
      // TODO
      return await updateVisit(input.id, { status: VisitStatus.ONGOING });
    }),
});
