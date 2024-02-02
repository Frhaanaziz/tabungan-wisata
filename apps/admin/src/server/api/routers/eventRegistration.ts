import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { addEventRegistrationSchema } from "@repo/validators/eventRegistration";

export const eventRegistrationRouter = createTRPCRouter({
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
});
