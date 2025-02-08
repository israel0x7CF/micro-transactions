import { integer, pgTable,varchar } from "drizzle-orm/pg-core";

export const roleSchema = pgTable('roles',{
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    role:varchar({length:255}).notNull()
})