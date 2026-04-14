import type { AnalysisResult } from '@/types'

export function ResultSummary({ result }: { result: AnalysisResult }) {
  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{result.normalizedName}</h2>
        <span className="rounded-full border border-slate-600 px-3 py-1 text-sm">{result.verdict}</span>
      </div>
      <p className="mt-3 text-slate-300">{result.verdictReason}</p>
      <p className="mt-3 text-xs text-amber-300">This is an early signal tool, not legal advice. Confirm trademark and rights status before launch.</p>
    </section>
  )
}
