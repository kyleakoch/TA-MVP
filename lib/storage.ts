import type { AnalysisResult } from '@/types'

const KEY = 'thats-available-shortlist'

export function loadSavedNames(): AnalysisResult[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as AnalysisResult[]
  } catch {
    return []
  }
}

export function saveName(result: AnalysisResult) {
  const current = loadSavedNames()
  const deduped = [result, ...current.filter((item) => item.normalizedName !== result.normalizedName)].slice(0, 12)
  localStorage.setItem(KEY, JSON.stringify(deduped))
}
