// app/api/mock/kyc/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // parse searchParams for page, status, q...
  const data = { items: [ /* sample rows */ ], page: 1, totalPages: 5 };
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json(data);
}
