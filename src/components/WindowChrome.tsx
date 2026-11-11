import { useEffect, useRef } from 'react'
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
      <span className="min-w-0 flex-1 truncate text-center text-[13px] text-dim">
        {profile.handle}@atraore: ~ — zsh
      </span>
      <span className="hidden text-[13px] text-dim sm:inline">80×24</span>
    </div>
  )
}

/**
 * tmux-style status bar used as the site nav. Sticks to the top while you scroll;
 * on phones it stays one row and scrolls sideways instead of wrapping.
 */
export function TabBar({ active }: { active: string }) {
  const navRef = useRef<HTMLElement>(null)

  // Keep the highlighted tab visible inside the sideways-scrolling bar.
  useEffect(() => {
    const nav = navRef.current
    const tab = nav?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!nav || !tab) return
    const left = tab.offsetLeft - nav.clientWidth / 2 + tab.clientWidth / 2
    nav.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  return (
    <nav
      ref={navRef}
      aria-label="Sections"
      className="sticky top-0 z-10 flex overflow-x-auto border-b border-line bg-panel text-[13px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((tab, i) => {
        const isActive = active === tab.href.slice(1)
        return (
          <a
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? 'true' : undefined}
            className={`flex min-h-11 shrink-0 items-center px-3.5 whitespace-nowrap no-underline hover:opacity-100 sm:min-h-0 sm:py-2 ${
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
