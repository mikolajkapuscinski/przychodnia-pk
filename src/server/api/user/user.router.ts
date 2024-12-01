import { z } from "zod";

import {
  accountantProcedure,
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { createUser, findDoctors, findPublicUserByPesel } from "./user.access";
import { Sex, UserRole } from "@prisma/client";

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

export const userRouter = createTRPCRouter({
  registerPatient: publicProcedure
    .input(registerUserInput)
    .mutation(async ({ input }) => {
      return await createUser({
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
      return await createUser(input);
    }),

  findDoctors: adminProcedure.query(async () => {
    return await findDoctors();
  }),

  findByPesel: accountantProcedure
    .input(
      z.object({
        pesel: z.string().length(11),
      }),
    )
    .query(async ({ input }) => {
      return await findPublicUserByPesel(input.pesel);
    }),
});
