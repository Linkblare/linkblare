import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { CollectionRouter } from "./routers/collection";
import ItemRouter from "./routers/item";
import UserRouter from "./routers/user";
import TagRouter from "./routers/tags";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  collection: CollectionRouter,
  items: ItemRouter,
  user: UserRouter,
  tags: TagRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
