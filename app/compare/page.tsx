'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { AnalysisResult } from '@/types'
import { loadSavedNames } from '@/lib/storage'

export default function ComparePage() {
  const [saved, setSaved] = useState<AnalysisResult[]>([])

  useEffect(() => {
    setSaved(loadSavedNames().slice(0, 4))
  }, [])

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <Link href="/" className="text-sm text-accent">← Back</Link>
      <h1 className="text-3xl font-bold">Compare shortlist</h1>
      {!saved.length ? (
        <section className="card text-slate-300">No saved names yet. Save from the homepage to compare 2–4 options.</section>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-left">
                <th className="p-2">Metric</th>
                {saved.map((s) => <th key={s.normalizedName} className="p-2">{s.normalizedName}</th>)}
              </tr>
            </thead>
            <tbody>
              {['verdict', 'readability', 'memorability', 'pronounceability', 'distinctiveness'].map((metric) => (
                <tr key={metric} className="border-b border-slate-800">
                  <td className="p-2 capitalize">{metric}</td>
                  {saved.map((s) => <td key={`${s.normalizedName}-${metric}`} className="p-2">{String((s as never)[metric as never])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
