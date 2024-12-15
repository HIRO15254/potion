import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  pokerRooms,
  pokerRoomsInsertSchema,
  pokerRoomsSelectSchema,
} from "~/server/db/schema";

export const pokerRoomRouterSchema = {
  create: pokerRoomsInsertSchema.omit({ userId: true }),
  update: pokerRoomsInsertSchema
    .omit({ userId: true })
    .partial()
    .required({ id: true }),
  get: pokerRoomsSelectSchema.partial(),
  getById: pokerRoomsSelectSchema.partial().required({ id: true }),
};

export const pokerRoomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(pokerRoomRouterSchema.create)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(pokerRooms).values({
        userId: ctx.session.user.id,
        ...input,
      });
    }),

  update: protectedProcedure
    .input(pokerRoomRouterSchema.update)
    .mutation(async ({ ctx, input }) => {
      const target = await ctx.db.query.pokerRooms.findFirst({
        where: eq(pokerRooms.id, input.id),
      });
      if (!target || target.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
      await ctx.db
        .update(pokerRooms)
        .set(input)
        .where(eq(pokerRooms.id, input.id));
    }),

  get: protectedProcedure
    .input(pokerRoomRouterSchema.get)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.pokerRooms.findMany({
        where: and(
          eq(pokerRooms.userId, ctx.session.user.id),
          input.id ? eq(pokerRooms.id, input.id) : undefined,
        ),
      });
    }),

  getById: protectedProcedure
    .input(pokerRoomRouterSchema.getById)
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.pokerRooms.findFirst({
        where: and(
          eq(pokerRooms.userId, ctx.session.user.id),
          eq(pokerRooms.id, input.id),
        ),
      });
    }),
});
