// All site content lives here. Edit this file to update the page and the shell.
// In bullets and descriptions, wrap a number in **double asterisks** to highlight it.

export type Experience = {
  slug: string
  company: string
  role: string
  location: string
  dates: string
  note?: string
  bullets: string[]
}

export type ProjectLink = { label: string; href: string }

export type Project = {
  slug: string
  summary: string
  tech: string[]
  links: ProjectLink[]
}

export const profile = {
  name: 'Aboubakary Traore',
  nickname: 'abou',
  handle: 'aboubakary',
  tagline: 'software engineer · systems & embedded',
  about:
    "CS student at the University at Buffalo, concentrating in software systems. I like working close to the metal — C++ firmware on an ESP32, an HTTP server in C from raw sockets up — and I've shipped real-time backend and frontend work at Liberty Mutual and Zof AI. Next stop: Pinterest's Backend Platform team.",

  contact: {
    email: 'atraore.dev@gmail.com',
    github: 'https://github.com/AboubakaryT',
    linkedin: 'https://www.linkedin.com/in/aboubakary/',
    // Drop your resume into /public as resume.pdf
    resume: '/resume.pdf',
  },
}

export const experience: Experience[] = [
  {
    slug: 'pinterest',
    company: 'Pinterest',
    role: 'Incoming Software Engineer Intern · Backend Platform',
    location: 'Palo Alto, CA',
    dates: 'May–Aug 2027',
    bullets: [],
  },
  {
    slug: 'ub-sae',
    company: 'UB Society of Automotive Engineers',
    role: 'Embedded Software Engineer',
    location: 'Buffalo, NY',
    dates: 'Sep 2026–present',
    bullets: [
      'Object-oriented C++ firmware for an ESP32 car telemetry system with **10** sensor units (temp, GPS, IMU, suspension, drivetrain).',
      'Interrupt-driven Hall-effect RPM measurement with debouncing and a **20**-sample moving average.',
      'Logging pipeline across I2C, SPI, UART, ADC and GPIO interrupts — **20** telemetry fields to SD.',
    ],
  },
  {
    slug: 'liberty-mutual',
    company: 'Liberty Mutual',
    role: 'Software Engineer Intern',
    location: 'Plano, TX',
    dates: 'Jun–Aug 2026',
    bullets: [
      'Live voice-to-voice call translation under **2s** end-to-end over a bidirectional WebSocket pipeline, for **300+** agents.',
      'Sub-**500ms** live captions that flag low-confidence phrases.',
      'LangChain call summaries with PII redaction posted to ServiceNow — ticket logging time down **70%**.',
    ],
  },
  {
    slug: 'zof-ai',
    company: 'Zof AI',
    role: 'Software Engineer Intern',
    location: 'Remote',
    dates: 'Jun–Sep 2025',
    bullets: [
      'Shipped **20+** production pages for an AI verification platform used by **500+** business clients.',
      'Dashboards with **35%** faster load; **25+** reusable React/TypeScript components.',
    ],
  },
]

export const projects: Project[] = [
  {
    slug: 'http-server-c',
    summary: 'An HTTP server written in C from raw sockets up.',
    tech: ['C', 'in progress'],
    links: [{ label: 'code', href: 'https://github.com/AboubakaryT/HTTPServer' }],
  },
  {
    slug: 'esp32-telemetry',
    summary: 'Car telemetry firmware for UB SAE — **10** sensors, **5** hardware interfaces, SD logging.',
    tech: ['C++', 'ESP32'],
    links: [],
  },
  {
    slug: 'hack-your-heart',
    summary:
      'HackMIT health-monitoring app pairing hardware sensors with live data visualization. Led a four-person team.',
    tech: ['Hardware', 'IoT', 'React'],
    links: [
      { label: 'code', href: 'https://github.com/shaunika1/hackmit2025' },
      { label: 'demo', href: 'https://www.youtube.com/watch?v=TgkCfh6O53s' },
    ],
  },
  {
    slug: 'chain-fee-scraper',
    summary:
      'Scraped fees for ~**4,250** transactions across Solana, Polygon and Tron; date-cached price lookups cut API calls ~**90%**.',
    tech: ['Python', 'Selenium', 'Beautiful Soup'],
    links: [{ label: 'code', href: 'https://github.com/AboubakaryT/chain-fee-scraper' }],
  },
  {
    slug: 'project-eliza',
    summary: 'A recreation of ELIZA, one of the earliest chatbots, using rule-based pattern matching.',
    tech: ['Python', 'NLP'],
    links: [{ label: 'code', href: 'https://github.com/AboubakaryT/Project_Eliza' }],
  },
  {
    slug: 'monster-hunter-cards',
    summary: 'Compact stat-card web app for Monster Hunter monsters.',
    tech: ['React'],
    links: [{ label: 'live', href: 'https://aboubakaryt.github.io/Monster-Hunter-Stat-Cards/' }],
  },
]

export const school = {
  school: 'University at Buffalo',
  degree: 'B.S. Computer Science',
  focus: 'Software Systems',
  grad: 'May 2028',
  coursework: [
    'Systems Programming',
    'Distributed Systems',
    'Computer Organization',
    'DS&A',
    'OOP',
    'Linear Algebra',
  ],
  leadership: ['VP, UB ACM — 609 members, 10 events'],
}

export const stack: { label: string; items: string[]; primary?: boolean }[] = [
  { label: 'languages', items: ['C++', 'C', 'Go', 'Python', 'TypeScript', 'SQL'], primary: true },
  { label: 'frameworks & libraries', items: ['React', 'Node.js', 'Express.js'] },
  { label: 'databases & dev tools', items: ['PostgreSQL', 'Git', 'GitHub', 'Neovim'] },
]
