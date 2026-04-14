'use client'

import Link from 'next/link'
import type { AnalysisResult } from '@/types'

export function CompareDrawer({ saved }: { saved: AnalysisResult[] }) {
  if (!saved.length) return null
  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Saved shortlist ({saved.length})</h3>
        <Link href="/compare" className="rounded-lg border border-slate-700 px-3 py-2 text-sm hover:border-accent">Open compare</Link>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {saved.slice(0, 6).map((item) => <span key={item.normalizedName} className="rounded-full border border-slate-700 px-2 py-1">{item.normalizedName}</span>)}
      </div>
    </section>
  )
}
