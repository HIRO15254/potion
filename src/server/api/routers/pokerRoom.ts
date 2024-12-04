import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pokerRooms, pokerRoomsInsertSchema } from "~/server/db/schema";

export const pokerRoomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(pokerRoomsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(pokerRooms).values({
        userId: ctx.session.user.id,
        name: input.name,
        type: input.type,
      });
    }),
  update: protectedProcedure
    .input(
      z
        .object({ id: z.number() })
        .merge(pokerRoomsInsertSchema.pick({ name: true, type: true })),
    )
    .mutation(async ({ ctx, input }) => {
      const target = await ctx.db.query.pokerRooms.findFirst({
        where: eq(pokerRooms.id, input.id),
      });
      if (!target || target.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "PokerRoom not found",
        });
      }
      await ctx.db
        .update(pokerRooms)
        .set(input)
        .where(eq(pokerRooms.id, input.id));
    }),
});
