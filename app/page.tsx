'use client'

import { useEffect, useState } from 'react'
import type { AnalysisResult, DomainResult, NameCheckRequest } from '@/types'
import { NameForm } from '@/components/NameForm'
import { ResultSummary } from '@/components/ResultSummary'
import { DomainCard } from '@/components/DomainCard'
import { AnalysisCard } from '@/components/AnalysisCard'
import { AlternativesCard } from '@/components/AlternativesCard'
import { ExternalChecksCard } from '@/components/ExternalChecksCard'
import { CompareDrawer } from '@/components/CompareDrawer'
import { loadSavedNames, saveName } from '@/lib/storage'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [saved, setSaved] = useState<AnalysisResult[]>([])

  useEffect(() => {
    setSaved(loadSavedNames())
  }, [])

  async function runCheck(payload: NameCheckRequest) {
    setLoading(true)
    try {
      const baseRes = await fetch('/api/analyze-name', { method: 'POST', body: JSON.stringify(payload) })
      const base = (await baseRes.json()) as AnalysisResult
      const domainRes = await fetch('/api/check-domain', { method: 'POST', body: JSON.stringify({ name: base.normalizedName }) })
      const domains = (await domainRes.json()) as DomainResult[]
      const merged = { ...base, domains }
      setResult(merged)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <header className="space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent">That&apos;s Available</p>
        <h1 className="text-4xl font-bold">Name it. Check it. Keep moving.</h1>
        <p className="mx-auto max-w-3xl text-slate-300">Fast signal on domains, naming quality, and crowding—before you waste time building around the wrong name.</p>
      </header>
      <NameForm onSubmit={runCheck} loading={loading} />

      {result ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <ResultSummary result={result} />
          <DomainCard domains={result.domains} />
          <AnalysisCard result={result} />
          <ExternalChecksCard links={result.externalChecks} />
          <div className="lg:col-span-2"><AlternativesCard suggestions={result.suggestions} /></div>
          <button
            className="rounded-xl border border-slate-700 px-4 py-3 text-sm hover:border-accent lg:col-span-2"
            onClick={() => {
              saveName(result)
              setSaved(loadSavedNames())
            }}
          >
            Save to shortlist
          </button>
        </div>
      ) : (
        <section className="card text-center text-slate-300">Type a name and get a fast signal on whether it has room to exist.</section>
      )}

      <CompareDrawer saved={saved} />
    </main>
  )
}
