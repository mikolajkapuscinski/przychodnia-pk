import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createUser } from "./user.access";
import { Sex, UserRole } from "@prisma/client";
import { assert } from "~/utils/assert";

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

  registerStaff: protectedProcedure
    .input(
      registerUserInput.extend({
        role: z.nativeEnum(UserRole),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      assert(
        ctx.session.user.role === UserRole.ADMIN,
        "Only admins can create staff users",
      );

      return await createUser(input);
    }),
});
