import { createTRPCRouter } from "@/server/api/trpc";
import { schoolRouter } from "./routers/schools";
import { userRouter } from "./routers/users";
import { eventRouter } from "./routers/events";
import { paymentRouter } from "./routers/payments";

export const appRouter = createTRPCRouter({
  school: schoolRouter,
  user: userRouter,
  event: eventRouter,
  payment: paymentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
