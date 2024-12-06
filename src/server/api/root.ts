import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./user/user.router";
import { opinionRouter } from "./opinion/opinion.router";
import { specializationRouter } from "./specialization/specialization.router";
import { visitRouter } from "./visit/visit.router";
import { medicalHistoryRouter } from "./medical-history/medical-history.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  opinion: opinionRouter,
  specialization: specializationRouter,
  visit: visitRouter,
  medicalHistory: medicalHistoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
