import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";

export const notificationRouter = createTRPCRouter({
  markAllNotification: privateProcedure.mutation(async ({ ctx }) => {
    const accessToken = ctx.session.accessToken;
    const userId = ctx.session.data.id;
    try {
      const result = await getBackendApi(accessToken).post(
        `/notifications/${userId}/mark-all`,
      );
      return result.data;
    } catch (error) {
      console.error("notificationRouter markAllNotification", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to mark all notification",
      });
    }
  }),
});
