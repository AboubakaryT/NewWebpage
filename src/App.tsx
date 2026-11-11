import { useCallback, useEffect, useState } from 'react'
import { About, Boot, Contact, Experience, Projects, School, Stack } from './components/Sections'
import { Shell } from './components/Shell'
import { TabBar, TitleBar } from './components/WindowChrome'
import { applyTheme, loadTheme, type Theme } from './lib/theme'

const YEAR = new Date().getFullYear()
const SECTION_IDS =['about', 'experience', 'projects', 'school', 'stack', 'shell']

/** Tracks which section is on screen so the tab bar can highlight it. */
function useActiveSection() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return active
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const active = useActiveSection()
  const [introDone, setIntroDone] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  useEffect(() => applyTheme(theme), [theme])

  const fade = `transition-opacity duration-700 ${introDone ? 'opacity-100' : 'opacity-0'}`

  return (
    <div className="min-h-screen bg-bg pb-10 sm:px-3.5 sm:pt-7 sm:pb-16">
      {/* Full-bleed on phones; framed terminal window from `sm` up. */}
      <main className="mx-auto max-w-[920px] border-line bg-panel sm:border">
        <TitleBar />
        <div className={`sticky top-0 z-10 ${fade}`}>
          <TabBar active={active} />
        </div>
        <div className="flex flex-col gap-8 px-4 pt-6 pb-8 sm:gap-9 sm:px-6.5 sm:pt-6.5 sm:pb-8.5">
          <About onDone={finishIntro} />
          <div className={`flex flex-col gap-8 sm:gap-9 ${fade}`}>
            <Experience />
            <Projects />
            <School />
            <Stack />
            <Contact />
            <Boot />
            <Shell onTheme={setTheme} />
          </div>
        </div>
      </main>
      <footer className={`mx-auto mt-4 max-w-[920px] px-4 text-center text-xs text-dim ${fade}`}>
        © {YEAR} Aboubakary Traore · built with React, TypeScript &amp; Tailwind
      </footer>
    </div>
  )
}
