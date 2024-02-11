import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { getBackendApi } from "@/lib/axios";
import { TRPCError } from "@trpc/server";
import {
  addEventSchema,
  eventSchema,
  eventSchemaJoined,
  updateEventSchema,
} from "@repo/validators/event";
import { getPaginatedDataSchema } from "@repo/validators";
import { backendClientES } from "@/server/edgestore";
import { deleteFile, uploadFile } from "../shared";
import { File } from "@repo/types";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getById: adminProcedure
    .input(eventSchema.pick({ id: true }))
    .output(eventSchemaJoined)
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).get(
          `/events/${input.id}`,
        );

        return result.data;
      } catch (error) {
        console.error("eventRouter getById", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get event",
        });
      }
    }),

  getAll: adminProcedure.output(z.array(eventSchema)).query(async ({ ctx }) => {
    const accessToken = ctx.session.accessToken;

    try {
      const result = await getBackendApi(accessToken).get("/events");

      return result.data;
    } catch (error) {
      console.error("eventRouter getAll", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get events",
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
        }).get("/events");

        return result.data;
      } catch (error) {
        console.error("eventRouter getAllPaginated", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get events",
        });
      }
    }),

  getCountNewEvents: adminProcedure
    .output(z.coerce.number())
    .input(z.object({ days: z.coerce.number() }))
    .query(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken, input).get(
          "/events/count-new-events",
        );

        return result.data;
      } catch (error) {
        console.error("eventRouter getCountNewEvents", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get count new events",
        });
      }
    }),

  getGrowthPercentage: adminProcedure
    .output(z.coerce.number())
    .query(async ({ ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const result = await getBackendApi(accessToken).get(
          "/events/growth-percentage",
        );

        return result.data;
      } catch (error) {
        console.error("eventRouter getUserGrowthPercentage", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get user growth percentage",
        });
      }
    }),

  create: adminProcedure
    .input(addEventSchema)
    .mutation(async ({ input, ctx }) => {
      const { images, itineraries, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const eventResponse = await getBackendApi(accessToken).post(
          "/events",
          rest,
        );
        const eventId = eventResponse.data.id;

        await itineraries.reduce(async (promise, itinerary) => {
          await promise;
          return getBackendApi(accessToken).post("/itineraries", {
            ...itinerary,
            eventId,
          });
        }, Promise.resolve());

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
        console.error("eventRouter create", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create event",
        });
      }
    }),

  update: adminProcedure
    .input(updateEventSchema)
    .mutation(async ({ input, ctx }) => {
      const { images, itineraries, ...rest } = input;
      const accessToken = ctx.session.accessToken;

      try {
        const { data: eventData } = await getBackendApi(accessToken).put(
          `/events/${input.id}`,
          rest,
        );
        const eventId = eventData.id;

        // Delete itineraries if they are not in the new data
        await Promise.all(
          eventData.itineraries
            .filter(
              (itinerary: any) =>
                !itineraries.some((i: any) => i.id === itinerary.id),
            )
            .map(async (itinerary: any) =>
              getBackendApi(accessToken).delete(`/itineraries/${itinerary.id}`),
            ),
        );

        // Update or create itineraries
        await itineraries.reduce(async (promise, itinerary) => {
          await promise;
          if (itinerary.id) {
            return getBackendApi(accessToken).put(
              `/itineraries/${itinerary.id}`,
              itinerary,
            );
          } else {
            return getBackendApi(accessToken).post("/itineraries", {
              ...itinerary,
              eventId,
            });
          }
        }, Promise.resolve());

        // Upload images
        const filesResponse = await Promise.all(
          images
            .filter((image) => {
              if (!eventData.images.length) return true;
              return !eventData.images.some(
                (oldImage: File) => oldImage.url === image.url,
              );
            })
            .map(async (image) =>
              uploadFile({ accessToken, file: image, eventId }),
            ),
        );

        return { ...eventData, images: filesResponse };
      } catch (error) {
        console.error("eventRouter update", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update event",
        });
      }
    }),

  delete: adminProcedure
    .input(eventSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      const accessToken = ctx.session.accessToken;

      try {
        const { data } = await getBackendApi(accessToken).delete(
          `/events/${input.id}`,
        );

        await Promise.all(
          data.images.map(async (image: File) => {
            deleteFile({ accessToken, file: image });
          }),
        );

        return data;
      } catch (error) {
        console.error("eventRouter delete", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete event",
        });
      }
    }),
});
