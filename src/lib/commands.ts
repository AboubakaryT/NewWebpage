import { experience, profile, projects, school, stack } from '../data/profile'
import { THEMES, isTheme, type Theme } from './theme'

export type CommandResult =
  | { kind: 'out'; text: string }
  | { kind: 'err'; text: string }
  | { kind: 'clear' }
  | { kind: 'theme'; theme: Theme; text: string }
  | { kind: 'open'; href: string; text: string }

const strip = (s: string) => s.replaceAll('**', '')
const pad = (s: string, n: number) => s.padEnd(n, ' ')

const HELP = [
  'available commands:',
  '  whoami         who is this',
  '  about          the short version',
  '  experience     where I’ve worked',
  '  projects       things I’ve built',
  '  school         education + leadership',
  '  stack          languages and tools',
  '  contact        how to reach me',
  '  open <name>    open github | linkedin | resume | email',
  `  theme <name>   ${THEMES.join(' | ')}`,
  '  clear          clear the screen',
].join('\n')

const outputs: Record<string, () => string> = {
  help: () => HELP,
  whoami: () => `${profile.name.toLowerCase()} (${profile.nickname}) — ${profile.tagline}`,
  about: () => profile.about,
  experience: () => {
    const w = Math.max(...experience.map((e) => e.slug.length)) + 3
    return experience
      .map((e) => `${pad(e.slug + '/', w)}${e.role.split(' · ')[0]} · ${e.location} · ${e.dates}${e.note ? ` (${e.note})` : ''}`)
      .join('\n')
  },
  projects: () => {
    const w = Math.max(...projects.map((p) => p.slug.length)) + 3
    return projects.map((p) => `${pad(p.slug, w)}${strip(p.summary)}`).join('\n')
  },
  school: () =>
    `${school.school} — ${school.degree}, ${school.focus} · ${school.grad}\n${school.leadership.join(' · ')}`,
  stack: () => {
    const w = Math.max(...stack.map((g) => g.label.length)) + 5
    return stack.map((g) => `${pad(`[${g.label}]`, w)}${g.items.join('  ')}`).join('\n')
  },
  contact: () =>
    [
      `email      ${profile.contact.email}`,
      `github     ${profile.contact.github.replace('https://', '')}`,
      `linkedin   ${profile.contact.linkedin.replace('https://www.', '')}`,
    ].join('\n'),
  ls: () => 'about.txt  experience/  projects/  school.conf  stack  contact',
  pwd: () => `/home/${profile.handle}`,
  nvim: () => 'btw, I use Neovim.',
  vim: () => 'btw, I use Neovim.',
  exit: () => "There is no escape. Try 'help'.",
}

const openTargets: Record<string, string> = {
  github: profile.contact.github,
  linkedin: profile.contact.linkedin,
  resume: profile.contact.resume,
  email: `mailto:${profile.contact.email}`,
}

export const COMMAND_NAMES = [...Object.keys(outputs), 'open', 'theme', 'clear', 'sudo']

export function runCommand(raw: string): CommandResult {
  const [name = '', ...args] = raw.trim().split(/\s+/)
  const cmd = name.toLowerCase()
  const arg = args.join(' ').toLowerCase()

  if (cmd === 'clear') return { kind: 'clear' }
  if (cmd === 'sudo') return { kind: 'err', text: 'Nice try. This incident will be reported.' }

  if (cmd === 'theme') {
    if (!arg) return { kind: 'out', text: `usage: theme <${THEMES.join(' | ')}>` }
    if (!isTheme(arg)) return { kind: 'err', text: `theme: unknown theme '${arg}'` }
    return { kind: 'theme', theme: arg, text: `theme set to ${arg}` }
  }

  if (cmd === 'open') {
    const href = openTargets[arg]
    if (!href) return { kind: 'out', text: `usage: open <${Object.keys(openTargets).join(' | ')}>` }
    return { kind: 'open', href, text: `opening ${arg}…` }
  }

  const fn = outputs[cmd]
  if (fn) return { kind: 'out', text: fn() }
  return { kind: 'err', text: `zsh: command not found: ${name}` }
}

/** Completes the first word against known commands; returns null if not unique. */
export function complete(partial: string): string | null {
  const p = partial.trim().toLowerCase()
  if (!p || p.includes(' ')) return null
  const hits = COMMAND_NAMES.filter((c) => c.startsWith(p))
  return hits.length === 1 ? hits[0] : null
}
