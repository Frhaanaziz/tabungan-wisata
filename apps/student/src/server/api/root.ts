import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { authRouter } from "./routers/auth";
import { eventRouter } from "./routers/events";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  event: eventRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
