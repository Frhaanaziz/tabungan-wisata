import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { authRouter } from "./routers/auth";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
