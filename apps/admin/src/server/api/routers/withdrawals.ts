import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { getPaginatedDataSchema } from "@repo/validators";

export const withdrawalRouter = createTRPCRouter({
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
        }).get("/withdrawals");

        return result.data;
      } catch (error) {
        console.error("withdrawalRouter getAllPaginated", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get withdrawals",
        });
      }
    }),
});
