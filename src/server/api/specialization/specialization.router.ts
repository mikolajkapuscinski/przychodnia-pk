import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllSpecializations } from "./specialization.access";

export const userRouter = createTRPCRouter({
  getAllSpecializations: publicProcedure.query(async () => {
    return await getAllSpecializations();
  }),
});
