import { profile } from '../data/profile'

const TABS = [
  { href: '#about', label: 'about' },
  { href: '#experience', label: 'experience' },
  { href: '#projects', label: 'projects' },
  { href: '#school', label: 'school' },
  { href: '#stack', label: 'stack' },
  { href: '#shell', label: 'shell*' },
]

export function TitleBar() {
  return (
    <div className="flex items-center gap-3 border-b border-line px-3.5 py-2.5">
      <span aria-hidden="true" className="flex gap-[7px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-[11px] rounded-full border border-dim" />
        ))}
      </span>
      <span className="flex-1 text-center text-[13px] text-dim">
        {profile.handle}@atraore: ~ — zsh
      </span>
      <span className="hidden text-[13px] text-dim sm:inline">80×24</span>
    </div>
  )
}

/** tmux-style status bar used as the site nav. */
export function TabBar({ active }: { active: string }) {
  return (
    <nav aria-label="Sections" className="flex flex-wrap border-b border-line text-[13px]">
      {TABS.map((tab, i) => {
        const isActive = active === tab.href.slice(1)
        return (
          <a
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? 'true' : undefined}
            className={`px-3.5 py-2 no-underline hover:opacity-100 ${
              isActive ? 'bg-accent font-bold text-bg' : 'hover:bg-line'
            } ${tab.label === 'shell*' && !isActive ? 'text-accent' : ''}`}
          >
            {i}:{tab.label}
          </a>
        )
      })}
    </nav>
  )
}
