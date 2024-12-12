import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DrugAccess } from "./drug.access";

const drugAccess = new DrugAccess();

export const drugRouter = createTRPCRouter({
  getAllDrugs: publicProcedure.query(async () => {
    return await drugAccess.getAllDrugs();
  }),
});
