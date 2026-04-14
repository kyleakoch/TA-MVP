import { NextResponse } from 'next/server'
import { TLDS } from '@/lib/constants'
import { checkDomain } from '@/lib/domainCheck'

export async function POST(req: Request) {
  const { name } = (await req.json()) as { name?: string }
  const base = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '')
  if (!base) return NextResponse.json({ error: 'Name is required.' }, { status: 400 })

  const domains = await Promise.all(TLDS.map(async (tld) => ({ domain: `${base}.${tld}`, status: await checkDomain(`${base}.${tld}`) })))
  return NextResponse.json(domains)
}
