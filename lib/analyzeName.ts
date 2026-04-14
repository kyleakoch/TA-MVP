import type { AnalysisResult, NameCheckRequest, Verdict } from '@/types'
import { TLDS, GENERIC_WORDS } from '@/lib/constants'
import { generateSuggestions } from '@/lib/generateSuggestions'
import { scoreDistinctiveness, scoreMemorability, scorePronounceability, scoreReadability } from '@/lib/scoring'

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, ' ')
}

function statusFromScore(score: number): Verdict {
  if (score >= 75) return 'Open'
  if (score >= 60) return 'Crowded'
  if (score >= 45) return 'Tense'
  return 'Blocked'
}

export function analyzeName(req: NameCheckRequest): AnalysisResult {
  const normalizedName = normalizeName(req.name)
  const simpleName = normalizedName.toLowerCase().replace(/[^a-z]/g, '')

  const readability = scoreReadability(simpleName)
  const memorability = scoreMemorability(simpleName)
  const pronounceability = scorePronounceability(simpleName)
  const distinctiveness = scoreDistinctiveness(simpleName)

  const blend = Math.round((readability + memorability + pronounceability + distinctiveness) / 4)
  const verdict = statusFromScore(blend)

  const warningTags: string[] = []
  if (GENERIC_WORDS.some((w) => simpleName.includes(w))) warningTags.push('generic tech word')
  if (/(labs|studio|hq|systems)$/i.test(simpleName)) warningTags.push('high collision suffix')
  if (simpleName.length > 14) warningTags.push('overlong name')
  if (/[0-9]/.test(normalizedName)) warningTags.push('hard-to-spell number substitutions')
  if (!warningTags.length) warningTags.push('very brandable')

  const strengths: string[] = []
  if (distinctiveness >= 70) strengths.push('Distinctive shape')
  if (pronounceability >= 70) strengths.push('Pronounceable flow')
  if (memorability >= 70) strengths.push('Memorable rhythm')

  const verdictReason =
    verdict === 'Open'
      ? 'Promising name. Distinctive sound and viable ownership paths.'
      : verdict === 'Crowded'
        ? 'Usable, but noisy. Similar naming patterns are common.'
        : verdict === 'Tense'
          ? 'Interesting, but friction is building across clarity and ownership.'
          : 'This path looks constrained. Try a tighter or more distinctive variation.'

  const externalChecks = [
    { label: 'Google exact phrase', url: `https://www.google.com/search?q=${encodeURIComponent(`"${normalizedName}"`)}` },
    { label: 'USPTO search', url: 'https://tmsearch.uspto.gov/' },
    { label: 'GitHub search', url: `https://github.com/search?q=${encodeURIComponent(normalizedName)}&type=repositories` },
    { label: 'Steam search', url: `https://store.steampowered.com/search/?term=${encodeURIComponent(normalizedName)}` },
    { label: 'X profile search', url: `https://x.com/search?q=${encodeURIComponent(normalizedName)}` }
  ]

  const domains = TLDS.map((tld) => ({ domain: `${simpleName}.${tld}`, status: 'unknown' as const }))

  return {
    normalizedName,
    verdict,
    verdictReason,
    readability,
    memorability,
    pronounceability,
    distinctiveness,
    warningTags,
    strengths,
    suggestions: generateSuggestions(simpleName, 18),
    categoryFit: req.category ? [`Aligned with ${req.category} positioning`] : ['Flexible across categories'],
    toneFit: req.tone ? [`Fits ${req.tone} tone direction`] : ['Neutral tone; can be styled multiple ways'],
    taglines: [
      `${normalizedName}: fast signal before you build.`,
      `Validate ${normalizedName} before you fall in love with it.`,
      `${normalizedName} starts with naming clarity.`
    ],
    domains,
    externalChecks
  }
}
