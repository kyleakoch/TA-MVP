export type DomainStatus = 'likely_available' | 'likely_taken' | 'unknown'
export type Verdict = 'Open' | 'Crowded' | 'Tense' | 'Blocked'

export interface NameCheckRequest {
  name: string
  category?: 'saas' | 'game' | 'agency' | 'local-business' | 'studio' | 'product'
  tone?: 'premium' | 'playful' | 'weird' | 'minimal' | 'futuristic' | 'rugged'
}

export interface DomainResult {
  domain: string
  status: DomainStatus
}

export interface AnalysisResult {
  normalizedName: string
  verdict: Verdict
  verdictReason: string
  readability: number
  memorability: number
  pronounceability: number
  distinctiveness: number
  warningTags: string[]
  strengths: string[]
  suggestions: string[]
  categoryFit: string[]
  toneFit: string[]
  taglines: string[]
  domains: DomainResult[]
  externalChecks: {
    label: string
    url: string
  }[]
}
