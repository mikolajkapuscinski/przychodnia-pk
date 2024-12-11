import {
  adminProcedure,
  createTRPCRouter,
  doctorProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { addDrugsToVisit, getAllDrugs } from "./drug.access";
import { z } from "zod";

export const drugRouter = createTRPCRouter({
  getAllDrugs: publicProcedure.query(async () => {
    return await getAllDrugs();
  }),
});
