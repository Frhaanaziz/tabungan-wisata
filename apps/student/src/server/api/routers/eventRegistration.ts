import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { eventRegistrationSchema } from "@repo/validators/eventRegistration";
import { z } from "zod";
import { eventSchema } from "@repo/validators/event";

export const eventRegistrationRouter = createTRPCRouter({
  getBySchoolId: privateProcedure
    .input(eventRegistrationSchema.pick({ schoolId: true }))
    .output(
      z.array(
        eventRegistrationSchema.extend({
          event: eventSchema.omit({ images: true, itineraries: true }),
        }),
      ),
    )
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, input).get(
          "/event-registrations",
        );

        return result.data;
      } catch (error) {
        console.error("eventRegistrationRouter getBySchoolId", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get event registration",
        });
      }
    }),
});
