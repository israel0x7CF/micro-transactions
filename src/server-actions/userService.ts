"use server"
import { promises } from "dns";
import { db } from "../app/db"
import { userInsertType, userSelectType, usersTable } from "../app/db/schema/userSchema"
import { eq } from "drizzle-orm";

export async function createUser(user:userInsertType):Promise<userSelectType | null>{
    const insert = await db.insert(usersTable).values(user).returning();

    if(insert){
        user.role = 2
        //further mutations can be done here
        return insert[0]
    }
    return null

}
export async function editUserData(user:Partial<userSelectType>,userId:number):Promise<Partial<userSelectType> | null>{
    
        const updateUser = await db.update(usersTable).set(user).where(eq(usersTable.id,userId))

        if(updateUser){
            return user
        }   
        return null;
}

export async function deactivateAccount(userId:number):Promise<boolean>{
    const deactivatedUser:{updatedId:number} [] = await db.update(usersTable).set({account_status:true})
    .where(eq(usersTable.id,userId))
    .returning({updatedId:usersTable.id})

    return deactivatedUser.length > 0 ? true:false;
}

export async function getUsers():Promise<userSelectType[] | null>{
    const data =  await db.select().from(usersTable)
    if(data){
        return data
    }
    return null
}