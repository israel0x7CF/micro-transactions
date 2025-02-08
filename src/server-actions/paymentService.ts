"use server"

import { paymentInsertType, paymentSelectType, paymentTable } from "../app/db/schema/paymentSchema";
import { db } from "../app/db";
import { serverActionResponse } from "../app/types/types";
import { usersTable } from "../app/db/schema/userSchema";
import { eq } from "drizzle-orm";
import { initializeChapaTransaction } from "../app/utils/chappaPayment";

export async function createPayments(paymentData:paymentInsertType):Promise<serverActionResponse<paymentSelectType>>{
    let paymentResponse: serverActionResponse<paymentSelectType> = {
        status: false, // Default false
        data: {} as paymentSelectType, // Ensure it is typed correctly
    };
    const paymentUser = await db.select().from(usersTable).where(eq(usersTable.id , paymentData.userId))
    const chappaResponse = await initializeChapaTransaction(paymentData,paymentUser[0])
  
    paymentData.transactionRef = chappaResponse.txRef
    paymentData.status = chappaResponse.status
    
    const paymentStatus = await db.insert(paymentTable)
    .values(paymentData)
    .returning()

    if(paymentStatus){

        paymentResponse.status = true
        paymentResponse.data = paymentStatus[0]
         return paymentResponse;
    }
    paymentResponse.data = null,
    paymentResponse.status = false
    return paymentResponse;
}