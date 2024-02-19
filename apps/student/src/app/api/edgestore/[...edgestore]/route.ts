import { edgeStoreRouter } from "@/server/edgestore";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
