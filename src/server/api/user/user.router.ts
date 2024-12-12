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

const userAccess = userInjector.get(UserAccess) as UserAccess;
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
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  sex: z.nativeEnum(Sex),
});

const udatePasswordInput = z.object({
  id: z.string().uuid(),
  password: z.string().min(8),
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
    return await userAccess.findDoctors();
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
      return await userAccess.updatePassword(input.id, input.password);
    }),
});
