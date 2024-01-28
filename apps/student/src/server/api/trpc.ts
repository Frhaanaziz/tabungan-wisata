import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { checkAccessToken } from "@repo/utils";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerAuthSession();

  return {
    session,
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (
    !ctx.session ||
    !ctx.session.user ||
    !ctx.session.data ||
    !ctx.session.accessToken
  )
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authorized" });

  const isAunthenticated = checkAccessToken(ctx.session.accessToken);
  if (!isAunthenticated)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "INVALID_ACCESS_TOKEN",
    });

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: {
        ...ctx.session,
        user: ctx.session.user,
        data: ctx.session.data,
        accessToken: ctx.session.accessToken,
      },
    },
  });
});

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(enforceUserIsAuthed);

export const createTRPCRouter = t.router;
