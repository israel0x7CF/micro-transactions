import { seedRoles } from '@/server-actions/seed';
import { NextResponse } from 'next/server'


export async function GET() {
  // const result = await seedDatabase();
  const result = await seedRoles();
  return NextResponse.json(result);
}
