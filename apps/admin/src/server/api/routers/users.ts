import { z } from "zod";

import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getAllPaginated: adminProcedure
    .input(
      z.object({
        page: z.coerce.number(),
        take: z.coerce.number().min(1).optional(),
        search: z.string().optional().default(""),
      }),
    )
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
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get users",
        });
      }
    }),

  //   create: adminProcedure
  //     .input(addSchoolSchema)
  //     .mutation(async ({ input, ctx }) => {
  //       const accessToken = ctx.session.accessToken;

  //       try {
  //         const result = await getBackendApi(accessToken).post("/users", input);

  //         return result.data;
  //       } catch (error) {
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: "Failed to create school",
  //         });
  //       }
  //     }),

  //   update: adminProcedure
  //     .input(updateSchoolSchema)
  //     .mutation(async ({ input, ctx }) => {
  //       const { id, ...rest } = input;
  //       const accessToken = ctx.session.accessToken;

  //       try {
  //         const result = await getBackendApi(accessToken).put(
  //           `/schools/${id}`,
  //           rest,
  //         );

  //         return result.data;
  //       } catch (error) {
  //         throw new TRPCError({
  //           code: "INTERNAL_SERVER_ERROR",
  //           message: "Failed to update school",
  //         });
  //       }
  //     }),
});
