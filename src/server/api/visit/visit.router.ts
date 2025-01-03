import { ReflectiveInjector } from "injection-js";
import { z } from "zod";
import {
  createTRPCRouter,
  doctorProcedure,
  patientProcedure,
  protectedProcedure,
  receptionistProcedure,
} from "~/server/api/trpc";
import { VisitAccess } from "./visit.access";
import { assert } from "~/utils/assert";
import { VisitStatus } from "@prisma/client";
import { DrugAccess } from "../drug/drug.access";
import { ManageVisitEngine } from "./manage-visit.engine";
import { UserAccess } from "../user/user.access";
import { AllergyAccess } from "../allergy/allergy.access";
import { title } from "process";

export const visitElements = [
  VisitAccess,
  ManageVisitEngine,
  DrugAccess,
  UserAccess,
  AllergyAccess,
];

export const visitInjector = ReflectiveInjector.resolveAndCreate(visitElements);

const createVisitInput = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  date: z.date(),
  title: z.string(),
});

const visitIdInput = z.object({
  id: z.number(),
});

const visitAccess = visitInjector.get(VisitAccess) as VisitAccess;
const drugAccess = visitInjector.get(DrugAccess) as DrugAccess;
const manageVisitEngine = visitInjector.get(
  ManageVisitEngine,
) as ManageVisitEngine;
const userAccess = visitInjector.get(UserAccess) as UserAccess;
const allergyAccess = visitInjector.get(AllergyAccess) as AllergyAccess;

export const visitRouter = createTRPCRouter({
  createVisit: patientProcedure
    .input(createVisitInput)
    .mutation(async ({ input, ctx }) => {
      assert(ctx.session.user.id);
      const patientId = ctx.session.user.id;

      return await visitAccess.createVisit({
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
      return await visitAccess.createVisit(input);
    }),

  cancelVisit: protectedProcedure
    .input(visitIdInput)
    .mutation(async ({ input, ctx }) => {
      const visit = await visitAccess.findVisitById(input.id);
      const { id: userId, role } = ctx.session.user;
      assert(userId && role);

      return await manageVisitEngine.cancelVisit(visit, userId, role);
    }),

  startVisit: doctorProcedure
    .input(visitIdInput)
    .mutation(async ({ input }) => {
      return await visitAccess.updateVisit(input.id, {
        status: VisitStatus.ONGOING,
      });
    }),

  finishVisit: doctorProcedure
    .input(
      visitIdInput.extend({
        prescription: z.string(),
        drugIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ input }) => {
      const visit = await visitAccess.updateVisit(input.id, {
        prescription: input.prescription,
        status: VisitStatus.FINISHED,
      });

      await drugAccess.addDrugsToVisit(visit.id, input.drugIds);

      return true;
    }),

  getDoctorsVisits: protectedProcedure
    .input(
      z.object({
        doctorId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const visits = await visitAccess.findVisits({
        doctorId: input.doctorId,
      });

      const visitsWithPatientData = await Promise.all(
        visits.map(async (visit) => {
          const patientData = await userAccess.findUserById(visit.patientId);
          const doctorData = await userAccess.findUserById(visit.doctorId);
          const patientAllergies = await allergyAccess.getAllergy(
            patientData.id,
          );

          return {
            ...visit,
            patient: patientData,
            doctor: doctorData,
            allergies: patientAllergies,
          };
        }),
      );

      return visitsWithPatientData;
    }),
});
