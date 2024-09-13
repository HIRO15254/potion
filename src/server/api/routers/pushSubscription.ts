import {z} from "zod";

import {createTRPCRouter, protectedProcedure,} from "~/server/api/trpc";

export const pushSubscriptionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      endpoint: z.string().min(1),
      keys: z.object({
        p256dh: z.string().min(1),
        auth: z.string().min(1),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.pushSubscription.create({
        data: {
          endpoint: input.endpoint,
          keys_auth: input.keys.auth,
          keys_p256dh: input.keys.p256dh,
          user: { connect: { id: ctx.session.user.id } },
        }
      })
    }),
  delete: protectedProcedure
    .input(z.object({
      endpoint: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.pushSubscription.delete({
        where: {
          endpoint: input.endpoint,
        }
      })
    }),
  mySubscriptions: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.pushSubscription.findMany({
      where: {
        userId: ctx.session.user.id,
      }
    }).then((subs) => subs.map((sub) => ({
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.keys_p256dh,
        auth: sub.keys_auth,
      }
    })))
  }),
});
