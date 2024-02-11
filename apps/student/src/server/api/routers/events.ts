import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { eventSchema, eventSchemaJoined } from "@repo/validators/event";

export const eventRouter = createTRPCRouter({
  getOne: privateProcedure
    .input(z.string())
    .output(eventSchemaJoined)
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const eventId = input;

      try {
        const result = await getBackendApi(accessToken).get(
          `/events/${eventId}`,
        );

        return result.data;
      } catch (error) {
        console.error("eventRouter getOne", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get event",
        });
      }
    }),

  getHighlighted: privateProcedure
    .output(z.array(eventSchema))
    .query(async ({ ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, {
          highlighted: "true",
        }).get(`/events`);

        return result.data;
      } catch (error) {
        console.error("eventRouter getHighlighted", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get highlighted events",
        });
      }
    }),
});
