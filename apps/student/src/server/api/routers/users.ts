import { getBackendApi } from "@/lib/axios";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { backendClientES } from "@/server/edgestore";
import { getNestErrorMessage } from "@repo/utils";
import {
  getPaginatedDataSchema,
  paginatedDataUtilsSchema,
} from "@repo/validators";
import { AddSchoolCodeSchema } from "@repo/validators/auth";
import { notificationSchema } from "@repo/validators/notification";
import { PaymentStatus, paymentSchema } from "@repo/validators/payment";
import {
  createUserPasswordSchema,
  updateUserPasswordSchema,
  userSchema,
} from "@repo/validators/user";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { baseUrl } from "@/lib/constant";

export const userRouter = createTRPCRouter({
  updateSchool: privateProcedure
    .input(AddSchoolCodeSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.data.id;
      const accessToken = ctx.session.accessToken;
      try {
        const result = await getBackendApi(accessToken).patch(
          `/users/${userId}/school`,
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
    const userId = ctx.session.data.id;
    const accessToken = ctx.session.accessToken;
    try {
      const result = await getBackendApi(accessToken).get(
        `/users/${userId}/balance`,
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
      const userId = ctx.session.data.id;
      const accessToken = ctx.session.accessToken;
      try {
        const result = await getBackendApi(accessToken, input).get(
          `/users/${userId}/notifications`,
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

  getAllPayments: privateProcedure
    .input(z.object({ status: z.nativeEnum(PaymentStatus).optional() }))
    .output(z.array(paymentSchema))
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.data.id;
      const accessToken = ctx.session.accessToken;

      const params = input.status ? { filter: `status:${input.status}` } : {};

      try {
        const result = await getBackendApi(accessToken, params).get(
          `/users/${userId}/payments`,
        );

        return result.data;
      } catch (error) {
        console.error("paymentRouter getAll", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get payments",
        });
      }
    }),

  createPassword: privateProcedure
    .input(createUserPasswordSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.data.id;
      const accessToken = ctx.session.accessToken;
      try {
        const result = await getBackendApi(accessToken).post(
          `/users/${userId}/password`,
          input,
        );

        return result.data;
      } catch (error) {
        console.error("userRouter createPassword", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),

  updateName: privateProcedure
    .input(userSchema.pick({ name: true }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.data;
      const accessToken = ctx.session.accessToken;
      try {
        const result = await getBackendApi(accessToken).patch(
          `/users/${user.id}/name`,
          input,
        );

        return result.data;
      } catch (error) {
        console.error("userRouter updateName", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),

  updateImage: privateProcedure
    .input(
      z.object({
        image: z.string().url().nullable(),
        oldImage: z.string().url().nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.data.id;
      const accessToken = ctx.session.accessToken;
      const { oldImage, image } = input;
      try {
        const result = await getBackendApi(accessToken).patch(
          `/users/${userId}/image`,
          { image },
        );

        if (oldImage) {
          await backendClientES.publicImages.deleteFile({
            url: oldImage,
          });
        }

        return result.data;
      } catch (error) {
        console.error("userRouter updateImage", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),

  updateEmail: privateProcedure
    .input(userSchema.pick({ email: true }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.data.id;
      const accessToken = ctx.session.accessToken;

      const payload = { ...input, userId, baseUrl };
      try {
        const result = await getBackendApi(accessToken).post(
          `/verifications/verify-updated-email`,
          payload,
        );
        return result.data;
      } catch (error) {
        console.error("userRouter updateEmail", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),

  updatePassword: privateProcedure
    .input(updateUserPasswordSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.data.id;
      const accessToken = ctx.session.accessToken;
      try {
        const result = await getBackendApi(accessToken).patch(
          `/users/${userId}/password`,
          input,
        );

        return result.data;
      } catch (error) {
        console.error("userRouter updatePassword", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),
});
