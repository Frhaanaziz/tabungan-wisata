import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  addPaymentSchema,
  updatePaymentSchema,
} from "@repo/validators/payment";
import { baseUrl } from "@/lib/constant";

export const paymentRouter = createTRPCRouter({
  update: privateProcedure
    .input(updatePaymentSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).put(
          `/payments/${id}`,
          rest,
        );

        return result.data;
      } catch (error) {
        console.error("paymentRouter update", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update payment",
        });
      }
    }),

  create: privateProcedure
    .input(addPaymentSchema)
    .output(
      z.object({
        redirect_url: z.string().url(),
        token: z.string(),
        paymentId: z.string().cuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, amount } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const res = await getBackendApi(accessToken, { baseUrl }).post(
          "/payments",
          {
            userId,
            amount,
          },
        );

        return res.data;
      } catch (error: any) {
        console.error("paymentRouter create", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payment",
        });
      }
    }),

  delete: privateProcedure
    .input(z.string().cuid())
    .mutation(async ({ input: paymentId, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).delete(
          `/payments/${paymentId}`,
        );

        return result.data;
      } catch (error) {
        console.error("paymentRouter delete", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete payment",
        });
      }
    }),
});
