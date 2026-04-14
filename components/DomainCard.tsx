import type { DomainResult } from '@/types'

const label = { likely_available: 'likely available', likely_taken: 'likely taken', unknown: 'unknown' }

export function DomainCard({ domains }: { domains: DomainResult[] }) {
  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">Domain pulse</h3>
      <ul className="space-y-2 text-sm">
        {domains.map((d) => (
          <li key={d.domain} className="flex items-center justify-between rounded-lg border border-slate-800 px-3 py-2">
            <span>{d.domain}</span>
            <span className="text-slate-300">{label[d.status]}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
