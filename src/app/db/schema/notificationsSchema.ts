
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable,text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./userSchema";


export const notificationsTable = pgTable("notifications", {
    id:integer().primaryKey().generatedAlwaysAsIdentity(),
    text:text().notNull(),
    userId:integer("user_id").notNull(),
    created_at:timestamp("created_at").notNull().defaultNow(),
    updated_at:timestamp("updated_at").notNull().defaultNow()
})

export const notificationsRelations = relations(notificationsTable, ({one,many}) => ({
    user:one(usersTable,{
        fields:[notificationsTable.userId],
        references:[usersTable.id]
    })
}));

export type notificationsSelectType =InferSelectModel<typeof notificationsTable>;
//omiting auto generated fields
export type notificationsInsertType = InferInsertModel<typeof notificationsTable>;