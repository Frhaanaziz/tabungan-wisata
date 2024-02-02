import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { authRouter } from "./routers/auth";
import { eventRouter } from "./routers/events";
import { paymentRouter } from "./routers/payments";
import { schoolRouter } from "./routers/school";
import { eventRegistrationRouter } from "./routers/eventRegistration";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
  event: eventRouter,
  payment: paymentRouter,
  school: schoolRouter,
  eventRegistration: eventRegistrationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
