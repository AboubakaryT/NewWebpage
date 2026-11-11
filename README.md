# atraore-terminal

Terminal-style portfolio for Aboubakary Traore. React + TypeScript + Tailwind CSS v4, built with Vite.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Where things live

```
src/
  data/profile.ts         ← all content (experience, projects, school, stack, links). Edit this.
  lib/commands.ts         ← what each shell command prints
  lib/theme.ts            ← theme names + saving the choice in localStorage
  components/
    WindowChrome.tsx      ← title bar + tmux-style tab nav
    Section.tsx           ← Section / Prompt / Row building blocks
    Sections.tsx          ← About, Experience, Projects, School, Stack, Contact
    Shell.tsx             ← the interactive shell (history, tab-complete, Ctrl+L)
    Rich.tsx              ← highlights **numbers** in text
  index.css               ← Tailwind import + theme color variables
```

In `profile.ts`, wrap a number in `**double asterisks**` to highlight it (visible in the `tokyonight` theme).

## Shell commands

`help`, `whoami`, `about`, `experience`, `projects`, `school`, `stack`, `contact`,
`open <github|linkedin|resume|email>`, `theme <phosphor|amber|mono|tokyonight>`, `clear`.
Arrow keys browse history, Tab completes a command name, Ctrl+L clears.

## TODO

- [ ] Add repo links for `http-server-c`, `esp32-telemetry` and `chain-fee-scraper` in `src/data/profile.ts` (currently `#`).
- [ ] Put your resume at `public/resume.pdf`.
# NewWebpage
