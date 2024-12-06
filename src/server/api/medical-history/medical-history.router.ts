import {
  createTRPCRouter,
  doctorProcedure,
  patientProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { assert } from "~/utils/assert";
import {
  createMedicalHistory,
  getMedicalHistory,
} from "./medical-history.access";
import { updateMedicalHistoryByDoctor } from "./medical-history.engine";

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

export const medicalHistoryRouter = createTRPCRouter({
  getMyMedicalHistory: patientProcedure.query(async ({ ctx }) => {
    const patientId = ctx.session.user.id;
    assert(patientId);

    return await getMedicalHistory(patientId);
  }),

  getPatientMedicalHistory: doctorProcedure
    .input(patientId)
    .query(async ({ input }) => {
      return await getMedicalHistory(input.patientId);
    }),

  addMedicalHistory: doctorProcedure
    .input(medicalHistoryInput)
    .mutation(async ({ input, ctx }) => {
      const doctorId = ctx.session.user.id;
      assert(doctorId);

      return await createMedicalHistory({ doctorId, ...input });
    }),

  updateMedicalHistory: doctorProcedure
    .input(updateMedicalHistoryInput)
    .mutation(async ({ input, ctx }) => {
      const doctorId = ctx.session.user.id;
      assert(doctorId);

      return await updateMedicalHistoryByDoctor(doctorId, input);
    }),
});
