import { createTRPCRouter } from "./trpc";
import { appRouter as router } from "./routers/_app";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  app: router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
