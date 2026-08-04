const NAME_KEY = 'portfolio-visitor-name'

/** The visitor's self-chosen display name, remembered across visits. */
export function getStoredName(): string | null {
  try {
    return localStorage.getItem(NAME_KEY)
  } catch {
    return null
  }
}

export function setStoredName(name: string): void {
  try {
    localStorage.setItem(NAME_KEY, name)
  } catch {
    /* ignore */
  }
}

/** Deterministic color from the site's cursor palette, keyed by name —
 *  so the same person's initials render in the same color everywhere. */
const PALETTE = [
  'var(--figma-cursor-red)',
  'var(--figma-cursor-orange)',
  'var(--figma-cursor-yellow)',
  'var(--figma-cursor-green)',
  'var(--figma-cursor-blue)',
  'var(--figma-cursor-purple)',
]

export function colorForName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0
  return PALETTE[hash % PALETTE.length]
}

export function initialsForName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}
