import { TRPCError } from "@trpc/server";
import { and, count, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  pokerRooms,
  pokerRoomsInsertSchema,
  pokerRoomsOrder,
  pokerRoomsSelectSchema,
} from "~/server/db/schema";

export const pokerRoomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(pokerRoomsInsertSchema.omit({ userId: true }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(pokerRooms).values({
        userId: ctx.session.user.id,
        ...input,
      });
    }),

  update: protectedProcedure
    .input(
      pokerRoomsInsertSchema
        .omit({ userId: true })
        .partial()
        .required({ id: true }),
    )
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

  delete: protectedProcedure
    .input(pokerRoomsSelectSchema.pick({ id: true }).required())
    .mutation(async ({ ctx, input }) => {
      const target = await ctx.db.query.pokerRooms.findFirst({
        where: eq(pokerRooms.id, input.id),
      });
      if (!target || target.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }
      await ctx.db.delete(pokerRooms).where(eq(pokerRooms.id, input.id));
    }),

  get: protectedProcedure
    .input(pokerRoomsSelectSchema.partial())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.pokerRooms.findMany({
        where: and(
          eq(pokerRooms.userId, ctx.session.user.id),
          input.id ? eq(pokerRooms.id, input.id) : undefined,
        ),
      });
    }),

  /**
   * Get all poker rooms
   */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const orderResult = await ctx.db.query.pokerRoomsOrder.findFirst({
      where: eq(pokerRoomsOrder.userId, ctx.session.user.id),
    });
    const data = await ctx.db.query.pokerRooms.findMany({
      where: eq(pokerRooms.userId, ctx.session.user.id),
    });
    const order = orderResult?.order ?? [];
    const newOrder = order
      .concat(data.filter((d) => !order.includes(d.id)).map((d) => d.id))
      .filter((id) => data.some((d) => d.id === id));
    if (orderResult === undefined) {
      await ctx.db.insert(pokerRoomsOrder).values({
        userId: ctx.session.user.id,
        order: newOrder,
      });
    } else {
      await ctx.db
        .update(pokerRoomsOrder)
        .set({ order: newOrder })
        .where(eq(pokerRoomsOrder.userId, ctx.session.user.id));
    }
    return newOrder
      .map((id) => data.find((d) => d.id === id))
      .filter((d) => d !== undefined);
  }),

  getById: protectedProcedure
    .input(pokerRoomsSelectSchema.partial().required({ id: true }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.pokerRooms.findFirst({
        where: and(
          eq(pokerRooms.userId, ctx.session.user.id),
          eq(pokerRooms.id, input.id),
        ),
      });
    }),

  detail: protectedProcedure
    .input(pokerRoomsSelectSchema.pick({ id: true }).required())
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.pokerRooms.findFirst({
        where: and(
          eq(pokerRooms.userId, ctx.session.user.id),
          eq(pokerRooms.id, input.id),
        ),
      });
    }),
});
