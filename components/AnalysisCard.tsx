import type { AnalysisResult } from '@/types'

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}</span></div>
      <div className="h-2 rounded bg-slate-800"><div className="h-2 rounded bg-accent" style={{ width: `${value}%` }} /></div>
    </div>
  )
}

export function AnalysisCard({ result }: { result: AnalysisResult }) {
  return (
    <section className="card space-y-4">
      <h3 className="text-lg font-semibold">Name analysis</h3>
      <Meter label="Readability" value={result.readability} />
      <Meter label="Memorability" value={result.memorability} />
      <Meter label="Pronounceability" value={result.pronounceability} />
      <Meter label="Distinctiveness" value={result.distinctiveness} />
      <div className="flex flex-wrap gap-2">
        {result.warningTags.map((tag) => <span key={tag} className="rounded-full border border-slate-700 px-2 py-1 text-xs">{tag}</span>)}
      </div>
    </section>
  )
}
