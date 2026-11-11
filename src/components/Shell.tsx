import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { complete, runCommand } from '../lib/commands'
import type { Theme } from '../lib/theme'

type Line = { id: number; kind: 'cmd' | 'out' | 'err'; text: string }

let nextId = 0
const line = (kind: Line['kind'], text: string): Line => ({ id: nextId++, kind, text })

export function Shell({ onTheme }: { onTheme: (t: Theme) => void }) {
  const [lines, setLines] = useState<Line[]>(() => [line('out', "Welcome. Type 'help' to see what you can run.")])
  const [input, setInput] = useState('')
  const [past, setPast] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1) // -1 = not browsing history
  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const ran = useRef(false)

  // Keep the newest output in view, but don't scroll on first render.
  useEffect(() => {
    if (ran.current) endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [lines])

  function submit() {
    const cmd = input.trim()
    setInput('')
    setCursor(-1)
    if (!cmd) return
    ran.current = true
    setPast((p) => [cmd, ...p].slice(0, 50))

    const result = runCommand(cmd)
    if (result.kind === 'clear') {
      setLines([])
      return
    }
    if (result.kind === 'theme') onTheme(result.theme)
    if (result.kind === 'open') window.open(result.href, result.href.startsWith('mailto:') ? '_self' : '_blank', 'noopener')

    const outKind = result.kind === 'err' ? 'err' : 'out'
    setLines((l) => [...l, line('cmd', cmd), line(outKind, result.text)])
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(cursor + 1, past.length - 1)
      if (next >= 0) {
        setCursor(next)
        setInput(past[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = cursor - 1
      setCursor(Math.max(next, -1))
      setInput(next >= 0 ? past[next] : '')
    } else if (e.key === 'Tab') {
      const hit = complete(input)
      if (hit) {
        e.preventDefault()
        setInput(hit + ' ')
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <section id="shell" aria-label="Interactive shell" className="flex scroll-mt-6 flex-col gap-2.5 border-t border-dashed border-line pt-6">
      <div className="text-[13px] text-dim">
        ── interactive shell · type <span className="text-accent">help</span> · ↑↓ history · tab to complete ──
      </div>

      {/* Clicking anywhere in the output focuses the prompt, like a real terminal. */}
      <div className="flex cursor-text flex-col gap-0.5" onClick={() => inputRef.current?.focus()} aria-live="polite">
        {lines.map((l) =>
          l.kind === 'cmd' ? (
            <div key={l.id} className="mt-2 whitespace-pre-wrap">
              <span className="text-accent">❯</span> {l.text}
            </div>
          ) : (
            <div key={l.id} className={`whitespace-pre-wrap ${l.kind === 'err' ? 'text-err' : ''}`}>
              {l.text}
            </div>
          ),
        )}
        <div ref={endRef} />
      </div>

      <form
        className="mt-2 flex items-center gap-2.5"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <label htmlFor="cmd" className="text-accent">
          ❯<span className="sr-only">Command</span>
        </label>
        <input
          ref={inputRef}
          id="cmd"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="help"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none placeholder:text-dim/60"
        />
        <button type="submit" className="min-h-11 cursor-pointer bg-accent px-4 text-[13px] text-bg hover:opacity-90">
          run ⏎
        </button>
      </form>
    </section>
  )
}
