import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { initEdgeStoreClient } from "@edgestore/server/core";
import { z } from "zod";

const es = initEdgeStore.create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
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

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export const backendClientES = initEdgeStoreClient({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;
