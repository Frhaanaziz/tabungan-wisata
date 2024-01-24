import { initEdgeStore } from "@edgestore/server";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { z } from "zod";

const es = initEdgeStore.create();
/**
 * This is the main router for the Edge Store buckets.
 */
export const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, // 1MB
    })
    .input(
      z.object({
        category: z.string().min(1),
      }),
    )
    .path(({ input }) => [{ category: input.category }]),
});

export const backendClientES = initEdgeStoreClient({
  router: edgeStoreRouter,
});
