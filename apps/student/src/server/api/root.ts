import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { authRouter } from "./routers/auth";
import { eventRouter } from "./routers/events";
import { paymentRouter } from "./routers/payments";
import { schoolRouter } from "./routers/school";
import { notificationRouter } from "./routers/notification";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  event: eventRouter,
  payment: paymentRouter,
  school: schoolRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
