import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { getPaginatedDataSchema } from "@repo/validators";
import { z } from "zod";
import { userSchema } from "@repo/validators/user";
import { schoolSchema } from "@repo/validators/school";

export const userRouter = createTRPCRouter({
  getAll: adminProcedure
    .output(
      z.array(userSchema.extend({ school: schoolSchema })),
    )
    .query(async ({ ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).get("/users");

        return result.data;
      } catch (error) {
        console.error("userRouter getAll", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get users",
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
        }).get("/users");

        return result.data;
      } catch (error) {
        console.error("userRouter getAllPaginated", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get users",
        });
      }
    }),

  getCountNewUsers: adminProcedure
    .input(z.object({ days: z.coerce.number() }))
    .output(z.coerce.number())
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, input).get(
          "/users/count-new-users",
        );

        return result.data;
      } catch (error) {
        console.error("userRouter getCountNewUsers", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get count new users",
        });
      }
    }),

  getGrowthPercentage: adminProcedure
    .output(z.coerce.number())
    .query(async ({ ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).get(
          "/users/growth-percentage",
        );

        return result.data;
      } catch (error) {
        console.error("userRouter getGrowthPercentage", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get growth percentage",
        });
      }
    }),

  getGrowthCount: adminProcedure
    .input(z.object({ days: z.coerce.number() }))
    .output(z.coerce.number())
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, input).get(
          "/users/growth-count",
        );

        return result.data;
      } catch (error) {
        console.error("userRouter getGrowthCount", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get growth count",
        });
      }
    }),

  getTotalUsers: adminProcedure
    .output(z.coerce.number())
    .query(async ({ ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result =
          await getBackendApi(accessToken).get("/users/total-users");

        return result.data;
      } catch (error) {
        console.error("userRouter getTotalUsers", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get total users",
        });
      }
    }),
});
