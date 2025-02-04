import { integer, pgTable, timestamp, varchar,boolean } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { paymentTable } from "./paymentSchema";
import { notificationsTable } from "./notificationsSchema";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  phone:varchar({ length: 255 }).notNull().unique(), 
  password: varchar({ length: 255 }).notNull(),
  paymentId: integer("payment_id"),
  created_at:timestamp("created_at").notNull().defaultNow(),
  updated_at:timestamp("updated_at").notNull().defaultNow(),
  account_status:boolean().notNull().default(false),
});

export const userRelations = relations(usersTable, ({one,many}) => ({
    payments:many(paymentTable),
    notifications:many(notificationsTable),
})); 

export type userSelectType = InferSelectModel<typeof usersTable>;

export type userInsertType = InferSelectModel<typeof usersTable>;