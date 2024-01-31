import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { getPaginatedDataSchema } from "@repo/validators";
import {
  addWithdrawalSchema,
  withdrawalSchema,
} from "@repo/validators/withdrawal";
import { z } from "zod";

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

  create: adminProcedure
    .input(addWithdrawalSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).post(
          "/withdrawals",
          input,
        );

        return result.data;
      } catch (error) {
        console.error("withdrawalRouter create", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create withdrawal",
        });
      }
    }),

  getTotalAmount: adminProcedure
    .input(withdrawalSchema.pick({ schoolId: true }))
    .output(z.number())
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).get(
          `/withdrawals/total-amount`,
          { data: input },
        );

        return result.data;
      } catch (error) {
        console.error("withdrawalRouter getTotalAmount", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get total amount",
        });
      }
    }),
});
