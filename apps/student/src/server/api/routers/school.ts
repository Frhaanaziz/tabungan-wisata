import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { schoolSchema } from "@repo/validators/school";
import { z } from "zod";
import { eventSchema } from "@repo/validators/event";

export const schoolRouter = createTRPCRouter({
  getEvents: privateProcedure
    .input(schoolSchema.pick({ id: true }))
    .output(z.array(eventSchema.omit({ itineraries: true })))
    .query(async ({ ctx, input }) => {
      const { id: schoolId } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).get(
          `/schools/${schoolId}/events`,
        );

        return result.data;
      } catch (error) {
        console.error("schoolRouter getEvents", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get events for school",
        });
      }
    }),
});
