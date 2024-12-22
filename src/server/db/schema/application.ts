import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "~/server/db/schema/auth";

export const createApplicationTable = pgTableCreator((name) => `app_${name}`);

export const roomTypeEnum = pgEnum("room_type", ["live", "online"]);

export const pokerRooms = createApplicationTable("room", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),

  name: varchar("name", { length: 255 }).notNull(),
  iconUrl: varchar("icon_url", { length: 255 }),
  headerUrl: varchar("header_url", { length: 255 }),
  type: roomTypeEnum("type").notNull(),

  memo: text("memo"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const pokerRoomsRelations = relations(pokerRooms, ({ one, many }) => ({
  user: one(users, { fields: [pokerRooms.userId], references: [users.id] }),
  games: many(pokerGames),
}));
export const pokerRoomsOrder = createApplicationTable("room_order", {
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id)
    .primaryKey(),
  order: integer("order").array().notNull(),
});
export const pokerRoomsInsertSchema = createInsertSchema(pokerRooms);
export const pokerRoomsSelectSchema = createSelectSchema(pokerRooms);

export const pokerGames = createApplicationTable("game", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  roomId: integer("room_id")
    .notNull()
    .references(() => pokerRooms.id),

  gameName: varchar("game_name", { length: 255 }).notNull(),
  limit: varchar("limit", { length: 255 }).notNull(),

  firstBlind: integer("first_blind"),
  secondBlind: integer("second_blind"),
  thirdBlind: integer("third_blind"),
  fourthBlind: integer("fourth_blind"),
  ante: integer("ante"),

  memo: text("memo"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const pokerGamesRelations = relations(pokerGames, ({ one, many }) => ({
  user: one(users, { fields: [pokerGames.userId], references: [users.id] }),
  room: one(pokerRooms, {
    fields: [pokerGames.roomId],
    references: [pokerRooms.id],
  }),
  sessions: many(pokerSessions),
}));
export const pokerGamesInsertSchema = createInsertSchema(pokerGames);
export const pokerGamesSelectSchema = createSelectSchema(pokerGames);

export const currency = createApplicationTable("currency", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  order: integer("order").notNull(),

  name: varchar("name", { length: 255 }).notNull(),
  value: integer("value").notNull().default(0),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const currencyRelations = relations(currency, ({ one }) => ({
  user: one(users, { fields: [currency.userId], references: [users.id] }),
}));
export const currencyInsertSchema = createInsertSchema(currency);
export const currencySelectSchema = createSelectSchema(currency);

export const currencyTransaction = createApplicationTable(
  "currency_transaction",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    currencyId: integer("currency_id")
      .notNull()
      .references(() => currency.id),
    currencyAmount: integer("currency_amount").notNull(),

    date: timestamp("date", { withTimezone: true }).notNull(),

    title: varchar("title", { length: 255 }).notNull(),
    memo: text("memo"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
);
export const currencyTransactionRelations = relations(
  currencyTransaction,
  ({ one }) => ({
    user: one(users, {
      fields: [currencyTransaction.userId],
      references: [users.id],
    }),
    currency: one(currency, {
      fields: [currencyTransaction.currencyId],
      references: [currency.id],
    }),
  }),
);
export const currencyTransactionInsertSchema =
  createInsertSchema(currencyTransaction);
export const currencyTransactionSelectSchema =
  createSelectSchema(currencyTransaction);

export const pokerSessions = createApplicationTable("session", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  gameId: integer("game_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
export const pokerSessionsRelations = relations(pokerSessions, ({ one }) => ({
  user: one(users, { fields: [pokerSessions.userId], references: [users.id] }),
  game: one(pokerGames, {
    fields: [pokerSessions.gameId],
    references: [pokerGames.id],
  }),
}));
export const pokerSessionsInsertSchema = createInsertSchema(pokerSessions);
export const pokerSessionsSelectSchema = createSelectSchema(pokerSessions);
