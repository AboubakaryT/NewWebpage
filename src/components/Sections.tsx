import { useEffect, useState, type ReactNode } from 'react'
import { experience, profile, projects, school, stack } from '../data/profile'
import { Rich } from './Rich'
import { Prompt, Row, Section } from './Section'

export function Boot() {
  const lines = ['Mounted /home/' + profile.handle, 'Started portfolio.service', 'Reached target low-level']
  return (
    <div className="flex flex-col text-[13px] text-dim" aria-hidden="true">
      {lines.map((l) => (
        <span key={l} className="whitespace-pre">
          [  <span className="text-str">OK</span>  ] {l}
        </span>
      ))}
    </div>
  )
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Types the name out on load, then calls onDone so the rest of the page can fade in. */
export function About({ onDone }: { onDone: () => void }) {
  const full = profile.name
  const [count, setCount] = useState(() => (prefersReducedMotion() ? full.length : 0))
  const done = count >= full.length

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 250)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 400 : 75)
    return () => clearTimeout(t)
  }, [count, done, onDone])

  const shown = full.slice(0, count)
  const [first, ...rest] = shown.split(' ')

  return (
    <section id="about" aria-label="About" className="flex scroll-mt-6 flex-col gap-3.5">
      <Prompt>whoami</Prompt>
      <h1
        aria-label={full}
        className="min-h-[2em] text-[clamp(34px,7vw,68px)] leading-none font-extrabold tracking-tight text-accent"
      >
        <span aria-hidden="true">
          {first}
          {shown.includes(' ') && <br />}
          {rest.join(' ')}
          <span className="ml-1.5 inline-block h-[1.1em] w-[0.6em] animate-blink bg-accent align-[-0.18em]" />
        </span>
      </h1>
      <div className={`flex flex-col gap-3.5 transition-opacity duration-700 ${done ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-dim">
          {profile.tagline} · goes by <span className="text-fg">{profile.nickname}</span>
        </p>
        <Prompt>cat about.txt</Prompt>
        <p className="max-w-[68ch]">{profile.about}</p>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <Section id="experience" label="Experience" command="ls -l ~/experience">
      <div className="flex flex-col gap-5.5">
        {experience.map((e) => (
          <Row key={e.slug} name={`${e.slug}/`} nameClass="text-dir">
            <span>{e.role}</span>
            <br />
            <span className="text-dim">
              {[e.company, e.location, e.dates, e.note].filter(Boolean).join(' · ')}
            </span>
            {e.bullets.length > 0 && (
              <ul className="mt-1.5 flex flex-col gap-1">
                {e.bullets.map((b) => (
                  <li key={b} className="pl-[2ch] -indent-[2ch]">
                    - <Rich text={b} />
                  </li>
                ))}
              </ul>
            )}
          </Row>
        ))}
      </div>
    </Section>
  )
}

export function Projects() {
  return (
    <Section id="projects" label="Projects" command="ls ~/projects">
      <div className="flex flex-col gap-4.5">
        {projects.map((p) => (
          <Row key={p.slug} name={p.slug} nameClass="text-key">
            <Rich text={p.summary} />
            <br />
            <span className="text-dim">{p.tech.join(' · ')}</span>
            {p.links.map((l) => (
              <span key={l.label}>
                {' · '}
                <a href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {l.label}
                </a>
              </span>
            ))}
          </Row>
        ))}
      </div>
    </Section>
  )
}

export function School() {
  const str = (s: string) => <span className="text-str">"{s}"</span>
  const list = (items: string[]) => (
    <>
      [
      {items.map((s, i) => (
        <span key={s}>
          {str(s)}
          {i < items.length - 1 ? ', ' : ''}
        </span>
      ))}
      ]
    </>
  )
  const rows: [string, ReactNode][] = [
    ['school', str(school.school)],
    ['degree', str(school.degree)],
    ['focus', str(school.focus)],
    ['grad', str(school.grad)],
    ['coursework', list(school.coursework)],
    ['leadership', list(school.leadership)],
  ]
  return (
    <Section id="school" label="School" command="cat school.conf">
      <div className="flex flex-col border-l-2 border-line pl-4">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[11ch_minmax(0,1fr)]">
            <span>
              <span className="text-key">{k}</span>
            </span>
            <span>
              <span className="text-dim">= </span>
              {v}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Stack() {
  return (
    <Section id="stack" label="Tech stack" command="stack --list">
      <div className="flex flex-col gap-3">
        {stack.map((g) => (
          <div key={g.label} className="grid gap-x-5 gap-y-1.5 sm:grid-cols-[200px_minmax(0,1fr)]">
            <span className="text-dim">[{g.label}]</span>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className={`border px-2.5 py-0.5 ${g.primary ? 'border-accent text-accent' : 'border-line'}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Contact() {
  const { email, github, linkedin, resume } = profile.contact
  return (
    <Section label="Contact" command="cat contact">
      <div className="flex flex-wrap gap-x-6.5 gap-y-2.5">
        <a href={`mailto:${email}`}>{email}</a>
        <a href={linkedin} target="_blank" rel="noreferrer">
          linkedin
        </a>
        <a href={github} target="_blank" rel="noreferrer">
          github
        </a>
        <a href={resume} target="_blank" rel="noreferrer">
          resume.pdf
        </a>
      </div>
    </Section>
  )
}
