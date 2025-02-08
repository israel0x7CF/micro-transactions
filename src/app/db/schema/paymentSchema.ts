import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { integer,pgTable,text,date,boolean, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./userSchema";



export const paymentTable = pgTable("payment", {
    paymentId: integer().primaryKey().generatedAlwaysAsIdentity(),
    paymentDate: date().notNull(),
    status:boolean().notNull(),//completed or not
    amount: integer().notNull(),
    userId:integer("user_id").notNull(),
    transactionRef:text(),
    created_at:timestamp("created_at").notNull().defaultNow(),
    updated_at:timestamp("updated_at").notNull().defaultNow()
});

export const paymentRelations = relations(paymentTable, ({one,many}) => ({
    user:one(usersTable,{
        fields:[paymentTable.userId],
        references:[usersTable.id]
    }),

}));

export type paymentSelectType= InferSelectModel<typeof paymentTable>;
export type paymentInsertType = InferInsertModel<typeof paymentTable>; 