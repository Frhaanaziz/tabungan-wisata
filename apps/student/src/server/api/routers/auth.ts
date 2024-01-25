import { getBackendApi } from "@/lib/axios";
import { baseUrl } from "@/lib/constant";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getNestErrorMessage } from "@repo/utils";
import { signUpSchema } from "@repo/validators/auth";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ input }) => {
    try {
      const result = await getBackendApi(undefined, { baseUrl }).post(
        "/auth/signup",
        input,
      );
      return result.data;
    } catch (error) {
      console.error("authRouter signUp", error);
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: getNestErrorMessage(error),
      });
    }
  }),
});
