import { NextResponse } from 'next/server'
import { analyzeName } from '@/lib/analyzeName'
import type { NameCheckRequest } from '@/types'

export async function POST(req: Request) {
  const body = (await req.json()) as NameCheckRequest
  if (!body?.name?.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
  }
  return NextResponse.json(analyzeName(body))
}
