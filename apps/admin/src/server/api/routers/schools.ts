import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { addSchoolSchema, updateSchoolSchema } from "@repo/validators/school";

export const schoolRouter = createTRPCRouter({
  getAll: adminProcedure.query(async ({ ctx }) => {
    const accessToken = ctx.session.accessToken;

    try {
      const result = await getBackendApi(accessToken).get("/schools");

      return result.data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get schools",
      });
    }
  }),

  getAllPaginated: adminProcedure
    .input(
      z.object({
        page: z.coerce.number(),
        take: z.coerce.number().min(1).optional(),
        search: z.string().optional().default(""),
      }),
    )
    // add output validation
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update school",
        });
      }
    }),
});
