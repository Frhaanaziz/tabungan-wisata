import { getBackendApi } from "@/lib/axios";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getNestErrorMessage } from "@repo/utils";
import { AddSchoolCodeSchema } from "@repo/validators/auth";
import { TRPCError } from "@trpc/server";

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
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),

  // getAllPaginated: adminProcedure
  //   .input(
  //     z.object({
  //       page: z.coerce.number(),
  //       take: z.coerce.number().min(1).optional(),
  //       search: z.string().optional().default(""),
  //     }),
  //   )
  //   .query(async ({ input, ctx }) => {
  //     const accessToken = ctx.session.accessToken;
  //     const { page, take, search } = input;
  //     try {
  //       const result = await getBackendApi(accessToken, {
  //         page,
  //         take,
  //         search,
  //       }).get("/users");
  //       return result.data;
  //     } catch (error) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to get users",
  //       });
  //     }
  //   }),
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
