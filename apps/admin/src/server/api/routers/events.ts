import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { addEventSchema, updateEventSchema } from "@repo/validators/event";

export const eventRouter = createTRPCRouter({
  getAllPaginated: adminProcedure
    .input(
      z.object({
        page: z.coerce.number(),
        take: z.coerce.number().min(1).optional(),
        search: z.string().optional().default(""),
      }),
    )
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const { page, take, search } = input;

      try {
        const result = await getBackendApi(accessToken, {
          page,
          take,
          search,
        }).get("/events");

        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get events",
        });
      }
    }),

  create: adminProcedure
    .input(addEventSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).post("/events", input);

        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create event",
        });
      }
    }),

  update: adminProcedure
    .input(updateEventSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).put(
          `/events/${input.id}`,
          input,
        );

        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update event",
        });
      }
    }),
});
