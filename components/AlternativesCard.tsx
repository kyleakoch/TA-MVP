'use client'

export function AlternativesCard({ suggestions }: { suggestions: string[] }) {
  return (
    <section className="card">
      <h3 className="mb-3 text-lg font-semibold">Alternatives</h3>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((s) => (
          <button key={s} onClick={() => navigator.clipboard.writeText(s)} className="rounded-lg border border-slate-700 px-3 py-2 text-left text-sm hover:border-accent">
            {s}
          </button>
        ))}
      </div>
    </section>
  )
}
