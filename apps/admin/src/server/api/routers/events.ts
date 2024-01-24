import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import { addEventSchema, updateEventSchema } from "@repo/validators/event";
import { getPaginatedDataSchema } from "@repo/validators";
import { backendClientES } from "@/server/edgestore";

export const eventRouter = createTRPCRouter({
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
        }).get("/events");

        return result.data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get events",
        });
      }
    }),

  create: adminProcedure
    .input(addEventSchema)
    .mutation(async ({ input, ctx }) => {
      const { images, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const eventResponse = await getBackendApi(accessToken).post(
          "/events",
          rest,
        );
        const eventId = eventResponse.data.id;

        const imagesResponse = await Promise.all(
          images.map(async (image) => {
            const result = await getBackendApi(accessToken).post("/files", {
              ...image,
              eventId,
            });
            return result.data;
          }),
        );

        await Promise.all(
          images.map(async (image) => {
            backendClientES.publicImages.confirmUpload({
              url: image.url,
            });
          }),
        );

        return { ...eventResponse.data, images: imagesResponse };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create event",
        });
      }
    }),

  update: adminProcedure
    .input(updateEventSchema)
    .mutation(async ({ input, ctx }) => {
      const { images, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const eventResponse = await getBackendApi(accessToken).put(
          `/events/${input.id}`,
          rest,
        );
        const eventId = eventResponse.data.id;

        const imagesResponse = await Promise.all(
          images.map(async (image) => {
            const result = await getBackendApi(accessToken).post("/files", {
              ...image,
              eventId,
            });
            return result.data;
          }),
        );

        await Promise.all(
          images.map(async (image) => {
            backendClientES.publicImages.confirmUpload({
              url: image.url,
            });
          }),
        );

        await Promise.all(
          eventResponse.data.images.map(async (image: any) => {
            backendClientES.publicImages.deleteFile({
              url: image.url,
            });
          }),
        );

        await Promise.all(
          eventResponse.data.images.map(async (image: any) =>
            getBackendApi(accessToken).delete(`/files/${image.id}`),
          ),
        );

        return { ...eventResponse.data, images: imagesResponse };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update event",
        });
      }
    }),
});
