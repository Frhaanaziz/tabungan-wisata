import { deleteFileSchema } from "@repo/validators/file";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";

export const fileRouter = createTRPCRouter({
  delete: adminProcedure
    .input(deleteFileSchema)
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).delete(
          `/files/${input.id}`,
        );

        return result.data;
      } catch (error) {
        console.error("fileRouter delete", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete file",
        });
      }
    }),
});
