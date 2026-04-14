'use client'

import { useState } from 'react'
import type { NameCheckRequest } from '@/types'

const categories = ['', 'saas', 'game', 'agency', 'local-business', 'studio', 'product'] as const
const tones = ['', 'premium', 'playful', 'weird', 'minimal', 'futuristic', 'rugged'] as const

export function NameForm({ onSubmit, loading }: { onSubmit: (value: NameCheckRequest) => void; loading: boolean }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<NameCheckRequest['category']>()
  const [tone, setTone] = useState<NameCheckRequest['tone']>()

  return (
    <form
      className="card space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name, category, tone })
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type a name, e.g. Pendenza"
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-lg outline-none ring-accent focus:ring-2"
        required
      />
      <div className="grid gap-3 md:grid-cols-2">
        <select className="rounded-lg border border-slate-700 bg-slate-950 p-3" onChange={(e) => setCategory((e.target.value || undefined) as NameCheckRequest['category'])}>
          {categories.map((c) => (
            <option key={c} value={c}>{c || 'Category (optional)'}</option>
          ))}
        </select>
        <select className="rounded-lg border border-slate-700 bg-slate-950 p-3" onChange={(e) => setTone((e.target.value || undefined) as NameCheckRequest['tone'])}>
          {tones.map((t) => (
            <option key={t} value={t}>{t || 'Tone (optional)'}</option>
          ))}
        </select>
      </div>
      <button disabled={loading} className="rounded-xl bg-accent px-5 py-3 font-semibold text-white disabled:opacity-70">
        {loading ? 'Checking...' : 'Check name'}
      </button>
    </form>
  )
}
