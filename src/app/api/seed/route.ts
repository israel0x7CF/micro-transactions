import { seedDatabase } from '@/app/server-actions/seed';
import { NextResponse } from 'next/server'


export async function GET() {
  const result = await seedDatabase();
  return NextResponse.json(result);
}
