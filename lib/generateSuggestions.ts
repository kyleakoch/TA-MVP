const prefixes = ['get', 'use', 'try', 'hey', 'go']
const suffixes = ['hq', 'labs', 'works', 'studio', 'app', 'co', 'play', 'systems']

function tighten(name: string) {
  return name.replace(/(.)\1+/g, '$1')
}

export function generateSuggestions(name: string, limit = 16) {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  const title = base.charAt(0).toUpperCase() + base.slice(1)

  const set = new Set<string>([
    ...prefixes.map((p) => `${p}${title}`),
    ...suffixes.map((s) => `${title}${s}`),
    tighten(title),
    `${title}ly`,
    `${title}io`,
    `${title}One`,
    `${title}Forge`,
    `${title}Pilot`
  ])

  return [...set]
    .filter((s) => s.length >= 4)
    .sort((a, b) => Math.abs(a.length - 9) - Math.abs(b.length - 9))
    .slice(0, limit)
}
