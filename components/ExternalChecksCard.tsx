import type { AnalysisResult } from '@/types'

export function ExternalChecksCard({ links }: { links: AnalysisResult['externalChecks'] }) {
  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">External checks</h3>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-accent">
            {l.label}
          </a>
        ))}
      </div>
    </section>
  )
}
