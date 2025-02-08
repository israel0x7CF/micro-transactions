import {
  integer,
  pgTable,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { paymentTable } from "./paymentSchema";
import { notificationsTable } from "./notificationsSchema";
import { roleSchema } from "./roleSchema";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),

  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  avatar: varchar({ length: 1024 }).notNull(),
  account_status: boolean().notNull().default(false),
  role: integer("role_id").references(() => roleSchema.id),
});

export const userRelations = relations(usersTable, ({ one, many }) => ({
  payments: many(paymentTable),
  notifications: many(notificationsTable),
}));

export type userSelectType = InferSelectModel<typeof usersTable>;

export type userInsertType = InferInsertModel<typeof usersTable>;
