import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { eventSchema } from "@repo/validators/event";
import { fileSchema } from "@repo/validators/file";

export const eventRouter = createTRPCRouter({
  getOne: privateProcedure
    .input(z.string())
    .output(
      eventSchema.extend({
        images: z.array(fileSchema),
      }),
    )
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const eventId = input;

      try {
        const result = await getBackendApi(accessToken).get(
          `/events/${eventId}`,
        );

        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get event",
        });
      }
    }),
});
