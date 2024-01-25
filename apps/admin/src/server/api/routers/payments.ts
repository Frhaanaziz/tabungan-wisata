import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { getPaginatedDataSchema } from "@repo/validators";

export const paymentRouter = createTRPCRouter({
  getAll: adminProcedure.query(async ({ ctx }) => {
    const accessToken = ctx.session.accessToken;

    try {
      const result = await getBackendApi(accessToken).get("/payments");

      return result.data;
    } catch (error) {
      console.error("paymentRouter getAll", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get payments",
      });
    }
  }),

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
        }).get("/payments");

        return result.data;
      } catch (error) {
        console.error("paymentRouter getAllPaginated", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get payments",
        });
      }
    }),
});
