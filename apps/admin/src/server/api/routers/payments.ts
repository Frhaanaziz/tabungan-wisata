import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { getPaginatedDataSchema } from "@repo/validators";
import { z } from "zod";
import { paymentSchema } from "@repo/validators/payment";
import { userSchema } from "@repo/validators/user";
import { Payment } from "@repo/types";

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

  getCompletedPayments: adminProcedure
    .input(z.object({ take: z.coerce.number() }))
    .output(
      z.array(
        paymentSchema.extend({
          user: userSchema,
        }),
      ),
    )
    .query(async ({ input, ctx }) => {
      const { take } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, {
          take,
          completed: true,
        }).get("/payments");

        return result.data;
      } catch (error) {
        console.error("paymentRouter getRecentTransactions", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get recent transactions",
        });
      }
    }),

  getRevenue: adminProcedure
    .input(z.object({ days: z.coerce.number() }))
    .output(z.coerce.number())
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;
      const { days } = input;

      try {
        const payments = (
          await getBackendApi(accessToken, {
            days,
            completed: true,
          }).get("/payments")
        ).data as Payment[];

        const revenue = payments
          .map((payment) => payment.amount)
          .reduce((a, b) => a + b, 0);

        return revenue;
      } catch (error) {
        console.error("paymentRouter getRevenue", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get revenue",
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

  getGrowthPercentage: adminProcedure
    .output(z.coerce.number())
    .query(async ({ ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).get(
          "/payments/growth-percentage",
        );

        return result.data;
      } catch (error) {
        console.error("paymentRouter getGrowthPercentage", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get growth percentage",
        });
      }
    }),

  getCountNewPayments: adminProcedure
    .output(z.coerce.number())
    .input(z.object({ days: z.coerce.number() }))
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, input).get(
          "/payments/count-new-payments",
        );

        return result.data;
      } catch (error) {
        console.error("paymentRouter getCountNewPayments", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get count new payments",
        });
      }
    }),
});
