import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "~/server/db/schema/auth";

export const createApplicationTable = pgTableCreator((name) => `app_${name}`);

export const sessionTypeEnum = pgEnum("session_type", ["live", "online"]);

export const pokerSessions = createApplicationTable("session", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  roomId: integer("room_id").notNull(),
  type: sessionTypeEnum("type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const pokerSessionsRelations = relations(pokerSessions, ({ one }) => ({
  user: one(users, { fields: [pokerSessions.userId], references: [users.id] }),
  room: one(pokerRooms, {
    fields: [pokerSessions.roomId],
    references: [pokerRooms.id],
  }),
}));

export const pokerRooms = createApplicationTable("room", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const pokerRoomsRelations = relations(pokerRooms, ({ many }) => ({
  sessions: many(pokerSessions),
}));
