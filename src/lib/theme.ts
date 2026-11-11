export const THEMES = ['phosphor', 'amber', 'mono', 'tokyonight'] as const
export type Theme = (typeof THEMES)[number]

const KEY = 'atraore:theme'

export function isTheme(value: string): value is Theme {
  return (THEMES as readonly string[]).includes(value)
}

export function loadTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved && isTheme(saved)) return saved
  } catch {
    // storage unavailable (private mode, etc.)
  }
  return 'phosphor'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // ignore
  }
}
