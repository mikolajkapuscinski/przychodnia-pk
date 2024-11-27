import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createUser } from "./user.access";
import { UserRole } from "@prisma/client";
import { assert } from "~/utils/assert";

export const userRouter = createTRPCRouter({
  registerPatient: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ input }) => {
      return await createUser({
        ...input,
        role: UserRole.PATIENT,
      });
    }),

  registerStaff: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
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
