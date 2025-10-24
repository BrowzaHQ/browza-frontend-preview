import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { KycItemSchema, KycItem } from '@/types/kyc';

// Use a module-scoped store to mirror the list handler's data.
// In real apps you'd centralize this module; for demo we keep it minimal.
const store = getStore();

export async function POST(req: NextRequest, context: { params: { id: string } }) {
  await sleep(250);
  const id = context.params.id;

  // Optional reason
  const body = await req.json().catch(() => ({}));
  const reason = z.object({ reason: z.string().optional() }).parse(body).reason ?? '';

  const idx = store.DATA.findIndex((i) => i.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated: KycItem = { ...store.DATA[idx], status: 'approved', notes: reason || '' };
  store.DATA[idx] = updated;

  return NextResponse.json(updated);
}

// --------------- shared mock state ---------------
function getStore() {
  // @ts-ignore
  if (!globalThis.__KYC_STORE__) {
    // Lazy import to avoid duplication across routes
    // @ts-ignore
    globalThis.__KYC_STORE__ = { DATA: [] as KycItem[] };
  }
  // @ts-ignore
  return globalThis.__KYC_STORE__ as { DATA: KycItem[] };
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }
