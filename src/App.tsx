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
    <div className="min-h-screen bg-bg px-3.5 pt-7 pb-16">
      <main className="mx-auto max-w-[920px] border border-line bg-panel">
        <TitleBar />
        <div className={fade}>
          <TabBar active={active} />
        </div>
        <div className="flex flex-col gap-9 px-5 pt-6.5 pb-8.5 sm:px-6.5">
          <About onDone={finishIntro} />
          <div className={`flex flex-col gap-9 ${fade}`}>
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
      <footer className={`mx-auto mt-4 max-w-[920px] text-center text-xs text-dim ${fade}`}>
        © {YEAR} Aboubakary Traore · built with React, TypeScript &amp; Tailwind
      </footer>
    </div>
  )
}
