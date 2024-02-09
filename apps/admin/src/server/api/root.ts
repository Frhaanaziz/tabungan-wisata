import { createTRPCRouter } from "@/server/api/trpc";
import { schoolRouter } from "./routers/schools";
import { userRouter } from "./routers/users";
import { eventRouter } from "./routers/events";
import { paymentRouter } from "./routers/payments";
import { withdrawalRouter } from "./routers/withdrawals";
import { eventRegistrationRouter } from "./routers/eventRegistration";
import { fileRouter } from "./routers/file";

export const appRouter = createTRPCRouter({
  school: schoolRouter,
  user: userRouter,
  event: eventRouter,
  payment: paymentRouter,
  withdrawal: withdrawalRouter,
  eventRegistration: eventRegistrationRouter,
  file: fileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
