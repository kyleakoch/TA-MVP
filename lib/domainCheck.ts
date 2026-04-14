import type { DomainStatus } from '@/types'

type DnsResponse = { Status?: number; Answer?: Array<{ data?: string }> }

async function queryRecord(domain: string, type: 'A' | 'AAAA' | 'CNAME'): Promise<DomainStatus> {
  const url = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return 'unknown'

    const payload = (await res.json()) as DnsResponse
    if (payload.Answer?.some((a) => !!a.data)) return 'likely_taken'
    if (payload.Status === 0 || payload.Status === 3) return 'likely_available'
    return 'unknown'
  } catch {
    return 'unknown'
  }
}

export async function checkDomain(domain: string): Promise<DomainStatus> {
  const results = await Promise.all([queryRecord(domain, 'A'), queryRecord(domain, 'AAAA'), queryRecord(domain, 'CNAME')])
  if (results.includes('likely_taken')) return 'likely_taken'
  if (results.every((r) => r === 'likely_available')) return 'likely_available'
  return 'unknown'
}
