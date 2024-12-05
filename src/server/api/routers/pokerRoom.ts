import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pokerRooms, pokerRoomsInsertSchema } from "~/server/db/schema";

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
});
