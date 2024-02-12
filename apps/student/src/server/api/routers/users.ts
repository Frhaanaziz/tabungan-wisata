import { getBackendApi } from "@/lib/axios";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getNestErrorMessage } from "@repo/utils";
import {
  getPaginatedDataSchema,
  paginatedDataUtilsSchema,
} from "@repo/validators";
import { AddSchoolCodeSchema } from "@repo/validators/auth";
import { notificationSchema } from "@repo/validators/notification";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  updateSchool: privateProcedure
    .input(AddSchoolCodeSchema)
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.data;
      const accessToken = ctx.session.accessToken;
      try {
        const result = await getBackendApi(accessToken).patch(
          `/users/${user.id}/school`,
          input,
        );
        return result.data;
      } catch (error) {
        console.error("userRouter updateSchool", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),

  getBalance: privateProcedure.output(z.number()).query(async ({ ctx }) => {
    const user = ctx.session.data;
    const accessToken = ctx.session.accessToken;
    try {
      const result = await getBackendApi(accessToken).get(
        `/users/${user.id}/balance`,
      );
      return result.data;
    } catch (error) {
      console.error("userRouter getBalance", error);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: getNestErrorMessage(error),
      });
    }
  }),

  getNotificationsPaginated: privateProcedure
    .input(getPaginatedDataSchema)
    .output(
      paginatedDataUtilsSchema.extend({ content: z.array(notificationSchema) }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.session.data;
      const accessToken = ctx.session.accessToken;
      try {
        const result = await getBackendApi(accessToken, input).get(
          `/users/${user.id}/notifications`,
        );
        return result.data;
      } catch (error) {
        console.error("userRouter getNotificationsPaginated", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),
});
