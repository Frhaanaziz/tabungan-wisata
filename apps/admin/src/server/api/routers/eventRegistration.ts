import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import {
  addEventRegistrationSchema,
  updateEventRegistrationSchema,
} from "@repo/validators/eventRegistration";
import { getPaginatedDataSchema } from "@repo/validators";

export const eventRegistrationRouter = createTRPCRouter({
  getAllPaginated: adminProcedure
    .input(getPaginatedDataSchema)
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const { page, take, search } = input;

      try {
        const result = await getBackendApi(accessToken, {
          page,
          take,
          search,
        }).get("/event-registrations");

        return result.data;
      } catch (error) {
        console.error("eventRegistrationRouter getAllPaginated", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get events registrations",
        });
      }
    }),

  create: adminProcedure
    .input(addEventRegistrationSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).post(
          "/event-registrations",
          input,
        );

        return result.data;
      } catch (error) {
        console.error("eventRegistrationRouter create", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create event registration",
        });
      }
    }),

  update: adminProcedure
    .input(updateEventRegistrationSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const { id, ...rest } = input;

      try {
        const result = await getBackendApi(accessToken).put(
          `/event-registrations/${id}`,
          rest,
        );

        return result.data;
      } catch (error) {
        console.error("eventRegistrationRouter update", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update event registration",
        });
      }
    }),
});
