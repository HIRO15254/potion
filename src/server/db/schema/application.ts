import { relations } from "drizzle-orm";
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
  type: roomTypeEnum("type").notNull(),

  memo: text("memo"),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const pokerRoomsRelations = relations(pokerRooms, ({ one, many }) => ({
  user: one(users, { fields: [pokerRooms.userId], references: [users.id] }),
  games: many(pokerGames),
}));

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
