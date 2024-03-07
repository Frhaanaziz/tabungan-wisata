import { getBackendApi } from "@/lib/axios";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { eventSchema } from "@repo/validators/event";
import { baseEventRegistrationSchema } from "@repo/validators/eventRegistration";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const schoolRouter = createTRPCRouter({
  getEventRegistrations: privateProcedure
    .output(z.array(baseEventRegistrationSchema.extend({ event: eventSchema })))
    .query(async ({ ctx }) => {
      const session = ctx.session;
      const user = ctx.session.data;
      if (!user.schoolId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Please choose a school first",
        });

      try {
        const { data } = await getBackendApi(session.accessToken).get(
          `/schools/${user.schoolId}/eventRegistrations`,
        );

        return data;
      } catch (error) {
        console.error("schoolRouter getEventRegistrations", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get event registrations",
        });
      }
    }),
});
