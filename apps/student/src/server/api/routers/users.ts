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
        console.error("userRouter updateSchool", error);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: getNestErrorMessage(error),
        });
      }
    }),

  getBalance: privateProcedure.query(async ({ ctx }) => {
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
});
