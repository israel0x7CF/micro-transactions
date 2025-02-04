"use server"
import { db } from "@/app/db";
import { paymentTable } from "@/app/db/schema/paymentSchema";
import { usersTable } from "@/app/db/schema/userSchema";


export async function seedDatabase() {
  console.log("🌱 Seeding database...");

  // Insert users
  const insertedUsers = await db.insert(usersTable).values([
    { name: "John Doe", age: 30, email: "john@example.com", phone: "1234567890", password: "hashed_password" },
    { name: "Jane Smith", age: 25, email: "jane@example.com", phone: "0987654321", password: "hashed_password" },
    { name: "Alice Johnson", age: 35, email: "alice@example.com", phone: "1122334455", password: "hashed_password" },
  ]).returning();

  console.log("✅ Users Inserted:", insertedUsers);

  // Insert payments for each user
  const insertedPayments = await db.insert(paymentTable).values([
    { paymentDate: new Date().toISOString().split('T')[0], status: true, amount: 100, userId: insertedUsers[0].id },
    { paymentDate: new Date().toISOString().split('T')[0], status: false, amount: 200, userId: insertedUsers[1].id },
    { paymentDate: new Date().toISOString().split('T')[0], status: true, amount: 300, userId: insertedUsers[2].id },
  ]).returning();

  console.log("✅ Payments Inserted:", insertedPayments);
  console.log("🎉 Seeding Complete!");
}

// Run seed function
seedDatabase().catch(console.error);
