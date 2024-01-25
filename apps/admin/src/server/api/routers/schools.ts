import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { addSchoolSchema, updateSchoolSchema } from "@repo/validators/school";
import { getPaginatedDataSchema } from "@repo/validators";

export const schoolRouter = createTRPCRouter({
  getAll: adminProcedure.query(async ({ ctx }) => {
    const accessToken = ctx.session.accessToken;

    try {
      const result = await getBackendApi(accessToken).get("/schools");

      return result.data;
    } catch (error) {
      console.error("schoolRouter getAll", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get schools",
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
        }).get("/schools");

        return result.data;
      } catch (error) {
        console.error("schoolRouter getAllPaginated", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get schools",
        });
      }
    }),

  create: adminProcedure
    .input(addSchoolSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).post("/schools", input);

        return result.data;
      } catch (error) {
        console.error("schoolRouter create", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create school",
        });
      }
    }),

  update: adminProcedure
    .input(updateSchoolSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).put(
          `/schools/${id}`,
          rest,
        );

        return result.data;
      } catch (error) {
        console.error("schoolRouter update", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update school",
        });
      }
    }),
});
