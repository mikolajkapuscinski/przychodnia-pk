import "reflect-metadata";
import {
  createTRPCRouter,
  doctorProcedure,
  patientProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { assert } from "~/utils/assert";
import { MedicalHistoryAccess } from "./medical-history.access";
import { MedicalHistoryEngine } from "./medical-history.engine";
import { medicalHistoryInjector } from "./medical-history.module";

const patientId = z.object({
  patientId: z.string(),
});

const medicalHistoryInput = z.object({
  patientId: z.string(),
  diseaseName: z.string(),
  diagnosisDate: z.date(),
  recoveryDate: z.date().optional(),
});

export const updateMedicalHistoryInput = z.object({
  id: z.number(),
});

const medicalHistoryAccess = medicalHistoryInjector.get(
  MedicalHistoryAccess,
) as MedicalHistoryAccess;
const medicalHistoryEngine = medicalHistoryInjector.get(
  MedicalHistoryEngine,
) as MedicalHistoryEngine;

export const medicalHistoryRouter = createTRPCRouter({
  getMyMedicalHistory: patientProcedure.query(async ({ ctx }) => {
    const patientId = ctx.session.user.id;
    assert(patientId);

    return await medicalHistoryAccess.getMedicalHistory(patientId);
  }),

  getPatientMedicalHistory: doctorProcedure
    .input(patientId)
    .query(async ({ input }) => {
      return await medicalHistoryAccess.getMedicalHistory(input.patientId);
    }),

  addMedicalHistory: doctorProcedure
    .input(medicalHistoryInput)
    .mutation(async ({ input, ctx }) => {
      const doctorId = ctx.session.user.id;
      assert(doctorId);

      return await medicalHistoryAccess.createMedicalHistory({
        doctorId,
        ...input,
      });
    }),

  updateMedicalHistory: doctorProcedure
    .input(updateMedicalHistoryInput)
    .mutation(async ({ input, ctx }) => {
      const doctorId = ctx.session.user.id;
      assert(doctorId);

      return await medicalHistoryEngine.updateMedicalHistoryByDoctor(
        doctorId,
        input,
      );
    }),
});
