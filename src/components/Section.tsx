import type { ReactNode } from 'react'

type Props = {
  id?: string
  label: string
  command: string
  children: ReactNode
}

/** A block that looks like a command followed by its output. */
export function Section({ id, label, command, children }: Props) {
  return (
    <section id={id} aria-label={label} className="flex scroll-mt-16 flex-col gap-3.5">
      <Prompt>{command}</Prompt>
      {children}
    </section>
  )
}

export function Prompt({ children }: { children: ReactNode }) {
  return (
    <div>
      <span className="text-accent" aria-hidden="true">
        ❯
      </span>{' '}
      {children}
    </div>
  )
}

/** Two-column row: a name on the left, details on the right. Stacks on phones. */
export function Row({ name, nameClass, children }: { name: string; nameClass: string; children: ReactNode }) {
  return (
    <div className="grid gap-x-5 gap-y-1.5 sm:grid-cols-[200px_minmax(0,1fr)]">
      <span className={`font-bold ${nameClass}`}>{name}</span>
      <div>{children}</div>
    </div>
  )
}
