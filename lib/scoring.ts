import { BAD_CLUSTERS, GENERIC_WORDS } from '@/lib/constants'

export const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

export function scoreReadability(name: string) {
  let score = 82
  if (name.length > 14) score -= 28
  if (!/^[a-z]+$/i.test(name)) score -= 22
  if (/[0-9]/.test(name)) score -= 18
  score -= (name.match(/[^aeiou]{4,}/gi) || []).length * 8
  return clamp(score)
}

export function scorePronounceability(name: string) {
  let score = 76
  const vowels = (name.match(/[aeiou]/gi) || []).length
  const ratio = vowels / Math.max(name.length, 1)
  if (ratio < 0.25 || ratio > 0.7) score -= 16
  BAD_CLUSTERS.forEach((cluster) => {
    if (name.toLowerCase().includes(cluster)) score -= 13
  })
  if (/^[^aeiou]{4,}/i.test(name)) score -= 20
  return clamp(score)
}

export function scoreMemorability(name: string) {
  let score = 74
  if (name.length >= 6 && name.length <= 12) score += 10
  if (/(.)\1\1/.test(name.toLowerCase())) score -= 18
  if (GENERIC_WORDS.some((w) => name.toLowerCase().includes(w))) score -= 16
  if (/[^a-z]/i.test(name)) score -= 10
  return clamp(score)
}

export function scoreDistinctiveness(name: string) {
  let score = 68
  if (!GENERIC_WORDS.some((w) => name.toLowerCase().includes(w))) score += 16
  if (/^[a-z]+$/i.test(name) && name.length >= 6 && name.length <= 11) score += 8
  if (/(ly|ify|ster|hub|labs)$/i.test(name)) score -= 12
  return clamp(score)
}
