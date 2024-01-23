import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { getPaginatedDataSchema } from "@repo/validators";
import { z } from "zod";

export const paymentRouter = createTRPCRouter({
  getAllPaginated: privateProcedure
    .input(getPaginatedDataSchema.extend({ userId: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      const { userId, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, rest).get(
          `/users/${userId}/payments`,
        );

        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get payments",
        });
      }
    }),
});
