import { z } from "zod";

import {
  accountantProcedure,
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { UserAccess } from "./user.access";
import { Sex, UserRole } from "@prisma/client";
import { userInjector } from "./user.module";
import { DoctorEngine } from "./doctor.engine";
import { assert } from "console";
import { compare } from "~/server/utils/hashing.util";
import { AllergyAccess } from "../allergy/allergy.access";
import { MedicalHistoryAccess } from "../medical-history/medical-history.access";

const userAccess = userInjector.get(UserAccess) as UserAccess;
const allergyAccess = userInjector.get(AllergyAccess) as AllergyAccess;
const medicalHistoryAccess = userInjector.get(
  MedicalHistoryAccess,
) as MedicalHistoryAccess;
const doctorEngine = userInjector.get(DoctorEngine) as DoctorEngine;

const registerUserInput = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  pesel: z.string().length(11),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  sex: z.nativeEnum(Sex),
  address: z.string().optional(),
  password: z.string().min(8),
});

const updateUserInput = z.object({
  id: z.string().cuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  sex: z.nativeEnum(Sex),
});

const udatePasswordInput = z.object({
  id: z.string().cuid(),
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});

export const userRouter = createTRPCRouter({
  registerPatient: publicProcedure
    .input(registerUserInput)
    .mutation(async ({ input }) => {
      return await userAccess.createUser({
        ...input,
        role: UserRole.PATIENT,
      });
    }),

  registerStaff: adminProcedure
    .input(
      registerUserInput.extend({
        role: z.nativeEnum(UserRole),
      }),
    )
    .mutation(async ({ input }) => {
      return await userAccess.createUser(input);
    }),

  findDoctors: publicProcedure.query(async () => {
    return await doctorEngine.findDoctorsWithOpinions();
  }),

  getAllDoctorAvailability: publicProcedure.query(async () => {
    return await doctorEngine.getAllDoctorsAvailability();
  }),

  getDoctorAvailability: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      assert(input);
      return await doctorEngine.getDoctorAvailability(input);
    }),

  findById: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async ({ input }) => {
      return await userAccess.findUserById(input.id);
    }),

  findByPesel: accountantProcedure
    .input(
      z.object({
        pesel: z.string().length(11),
      }),
    )
    .query(async ({ input }) => {
      return await userAccess.findPublicUserByPesel(input.pesel);
    }),

  updateUserData: protectedProcedure
    .input(updateUserInput)
    .mutation(async ({ input }) => {
      return await userAccess.updateUser(input.id, input);
    }),

  updateUserPassword: protectedProcedure
    .input(udatePasswordInput)
    .mutation(async ({ input }) => {
      const currentPassHash = (await userAccess.findUserById(input.id))
        .passwordHash;

      console.log(input.currentPassword);

      if (!(await compare(input.currentPassword, currentPassHash)))
        throw new Error("Current password is not matching");
      return await userAccess.updatePassword(input.id, input.newPassword);
    }),

  getMyPatients: protectedProcedure.query(async ({ ctx }) => {
    const doctorId = ctx.session?.user?.id;
    assert(doctorId, "User must be logged in as a doctor.");

    const medicalHistories = await doctorEngine.getVisitsForDoctor(
      doctorId as string,
    );

    const patientIds = Array.from(
      new Set(medicalHistories.map((history) => history.patientId)),
    );

    const patientsData = await Promise.all(
      patientIds.map(async (patientId) => {
        const user = await userAccess.findUserById(patientId);
        const allergies = await allergyAccess.getAllergy(patientId);
        const medicalHistory =
          await medicalHistoryAccess.getMedicalHistory(patientId);

        return {
          id: patientId,
          firstName: user.firstName ?? "Unknown",
          lastName: user.lastName ?? "Unknown",
          pesel: user.pesel ?? "Unknown",
          email: user.email ?? "Unknown",
          phoneNumber: user.phoneNumber ?? "Unknown",
          sex: user.sex ?? "Unknown",
          // birthday: user.birthday ?? "Unknown",
          image: user.image ?? "/default-avatar.png",
          allergies: allergies.length ? allergies.map((a) => a.name) : [],
          medicalHistory: medicalHistory.length
            ? medicalHistory.map((m) => ({
                date: m.diagnosisDate,
                diseaseName: m.diseaseName,
              }))
            : [],
        };
      }),
    );

    return patientsData;
  }),

  getPatientPrescriptions: protectedProcedure.query(async ({ ctx }) => {
    const patientId = ctx.session?.user?.id;
    assert(patientId, "User must be logged in as a patient.");

    return await userAccess.getUserPrescriptions(patientId as string); 
  }),

  getPatientDrugs: protectedProcedure.query(async ({ ctx }) => {
    const patientId = ctx.session?.user?.id;
    assert(patientId, "User must be logged in as a patient.");

    return await userAccess.getUserDrugs(patientId as string); 
  }),
});
