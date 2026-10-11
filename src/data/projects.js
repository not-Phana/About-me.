/**
 * CENTRALIZED PROJECT DATA — PHANA KUROSAKI (PK / KON)
 * ---------------------------------------------------------------------------
 * Edit this file to add new projects, update statuses, change descriptions,
 * or toggle which projects appear in the "Featured" and "Currently Building"
 * sections. No architectural changes are required when adding entries here.
 *
 * Fields marked with `null` (such as `liveUrl` or `repoUrl` on local builds)
 * are intentionally left unpopulated until a public repository or deployment
 * is published. The UI handles `null` links gracefully and honestly.
 */

export const PROJECT_CATEGORIES = [
  'All Projects',
  'Websites',
  'Developer Tools',
  'AI Experiments',
  'Games',
  'Other Experiments',
];

export const PROJECTS = [
  {
    id: 'pk-khmer-type',
    index: '01',
    name: 'PK Khmer Type',
    subtitle: 'Khmer Standard, Khmer NiDA & English Typing Studio',
    category: 'Websites',
    status: 'Live · Active Development',
    statusTone: 'live', // 'live' | 'building' | 'experiment'
    featured: true,
    currentlyBuilding: true,
    createdDate: '2026-09-20',
    updatedDate: '2026-10-11',
    repoUrl: 'https://github.com/phanaach4889/PK-Khmer-Type',
    liveUrl: 'https://phanaach4889.github.io/PK-Khmer-Type/',
    secondaryLinks: [
      {
        label: 'Launch Deck',
        url: 'https://phanaach4889.github.io/PK-Khmer-Type/launch/',
      },
      {
        label: 'Mastery Dashboard',
        url: 'https://phanaach4889.github.io/PK-Khmer-Type/dashboard.html',
      },
      {
        label: '3D Keycap Docs',
        url: 'https://phanaach4889.github.io/PK-Khmer-Type/Documents/',
      },
    ],
    shortDescription:
      'A standalone bilingual typing-learning web application built to help people master Khmer Standard, Khmer NiDA, and English QWERTY keyboard layouts through 218 structured lessons.',
    overview:
      'PK Khmer Type (v2.4 Pro Studio Edition) is a zero-dependency browser typing studio built specifically for mastering the Khmer abugida script alongside English QWERTY. It combines a 40-level progressive curriculum with an interactive mechanical keyboard simulator, dual-hand 3D kinematic finger guides, procedural Web Audio switch synthesis, and real-time local telemetry.',
    whyIBuiltIt:
      'Typing in Khmer has a steep learning curve because consonants, dependent vowels, and Coeng subscript stacks sit across four modifier layers (Base, Shift, Ctrl, AltGr). I built PK Khmer Type so learners in Cambodia and anywhere else have a clean, structured, ad-free place to practice both Khmer NiDA and Khmer Standard layouts from the home row up.',
    features: [
      'Three complete keyboard layouts: Khmer Standard, Official Khmer NiDA, and English (US) QWERTY',
      '40 structured levels, 218 progressive lessons, and 664+ typing exercises with strict key unlocking',
      'Dual-hand translucent 3D kinematic finger guide showing exact target keys and modifier holds',
      'Live Mastery & Telemetry Dashboard (dashboard.html) with per-key accuracy/latency heatmaps and JSON backup',
      'Adaptive practice engine and spaced-repetition weak-key drills generated from local stroke telemetry',
      'Temple Trial & Typing Race mode with adaptive bot pacers',
      'Procedural Web Audio mechanical switch synthesizer (Topre, Holy Panda, Cherry MX Blue, Linear)',
      'Zero-Lag Performance Mode and 8 studio color themes with bilingual UI (English / Khmer)',
    ],
    technologies: [
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3 Custom Properties',
      'Web Audio API',
      'Three.js (3D Keycap Docs)',
      'LocalStorage Telemetry',
      'PWA / Offline File Protocol',
    ],
    challengesAndImprovements:
      'Handling physical Windows AltGr key events without ghost-triggering the Ctrl layer required custom event filtering in the input engine. Next steps include expanding full-sentence Khmer literature drills and refining mobile/tablet on-screen keyboard ergonomics.',
    whatComesNext:
      'Expanding advanced Khmer NiDA prose passages, refining per-key latency charts in the mastery dashboard, and keeping offline file:/// bundles fast on older laptops.',
    coverImage: './assets/pk-khmer-type-main.png',
    gallery: [
      {
        src: './assets/pk-khmer-type-main.png',
        caption: 'PK Khmer Type Studio interface with dual-hand 3D kinematic finger guides',
      },
      {
        src: './assets/pk-khmer-type-standard.png',
        caption: 'Khmer Standard keyboard layout inspection view',
      },
      {
        src: './assets/pk-khmer-type-nida.png',
        caption: 'Khmer NiDA Unicode keyboard layout view',
      },
      {
        src: './assets/pk-khmer-type-english.png',
        caption: 'English (US) QWERTY keyboard layout track',
      },
    ],
    previewType: 'khmer-type',
  },
  {
    id: 'neon-protocol-overdrive',
    index: '02',
    name: 'NEON PROTOCOL // OVERDRIVE',
    subtitle: 'HTML5 Canvas & WebAudio Cyber-Arena Action Game (PK-game)',
    category: 'Games',
    status: 'Live on GitHub Pages',
    statusTone: 'live',
    featured: true,
    currentlyBuilding: false,
    createdDate: '2026-10-09',
    updatedDate: '2026-10-10',
    repoUrl: 'https://github.com/phanaach4889/PK-game',
    liveUrl: 'https://phanaach4889.github.io/PK-game/',
    secondaryLinks: [],
    shortDescription:
      'A zero-dependency 60 FPS HTML5 Canvas and procedural WebAudio cyber-arena game featuring 6 tactical abilities, live mid-combat contracts, and custom vector geometry.',
    overview:
      'Hosted in the PK-game repository, NEON PROTOCOL // OVERDRIVE is a fast-paced browser action game built entirely with HTML5 Canvas, vanilla JavaScript, and a procedural WebAudio synth engine—using 100% custom vector SVG and canvas geometry with zero external game engine dependencies.',
    whyIBuiltIt:
      'I wanted to push my understanding of game loops, 2D physics, collision math, particle systems, and procedural audio synthesis directly in the browser without relying on heavy external libraries.',
    features: [
      '4,200 x 4,200 multi-sector open cyber-grid running at 60 FPS on HTML5 Canvas',
      '6 active tactical abilities: Dimension Rift Katana (with parry riposte), Omega Ion Laser, Chrono-Stasis Dome, Phantom Squadron clone swap, Seraphim Overdrive, and Phase-Rift Siphon Dash',
      'Procedural 4-track multi-BPM WebAudio synthesizer engine generated in real time',
      '4 dynamic mid-combat Cyber-Contracts (Neon Drift Slalom, Orbital Payload Heist, VIP Nemesis Bounty, Katana Blitz)',
      '7 interactive world structures and 3 selectable threat protocols (Overclock, Nightmare, Godslayer)',
    ],
    technologies: [
      'HTML5 Canvas',
      'JavaScript',
      'Web Audio API',
      'Custom SVG Vector Geometry',
      'GitHub Actions CI/CD',
    ],
    challengesAndImprovements:
      'Keeping frame times consistent during dense bullet-hell waves required pooling projectiles and optimizing canvas draw calls. Future iterations will explore persistent upgrade trees and boss phase variations.',
    whatComesNext:
      'Balancing enemy wave scaling in Godslayer mode and adding controller/gamepad input mapping.',
    coverImage: './assets/neon-protocol-logo.svg',
    gallery: [
      {
        src: './assets/neon-protocol-logo.svg',
        caption: 'NEON PROTOCOL // OVERDRIVE master vector emblem from the PK-game repository',
      },
    ],
    previewType: 'neon-game',
  },
  {
    id: 'pk-icons-studio',
    index: '03',
    name: 'PK Icons Studio',
    subtitle: '24x24 Stroke SVG Icon Library & Interactive Customizer',
    category: 'Developer Tools',
    status: 'Live · Expanding',
    statusTone: 'live',
    featured: true,
    currentlyBuilding: true,
    createdDate: '2026-09-22',
    updatedDate: '2026-09-22',
    repoUrl: 'https://github.com/phanaach4889/PK-icons',
    liveUrl: 'https://phanaach4889.github.io/PK-icons/',
    secondaryLinks: [],
    shortDescription:
      'A pixel-perfect 24x24 stroke SVG icon collection (50 icons) and interactive browser gallery with live stroke customization, search, and batch ZIP export.',
    overview:
      'PK Icons Studio is an icon asset collection and browser-based customization tool built for my own projects and anyone else who wants crisp, consistent vector icons without emoji clutter. Every icon is crafted on a 24x24 grid with 2px round-cap strokes.',
    whyIBuiltIt:
      'Across all my projects, I follow a strict zero-emoji rule and rely on clean inline SVG icons. I built PK Icons so I could maintain a reusable, consistent icon library and quickly copy raw SVG markup or export bundles.',
    features: [
      '50 handcrafted 24x24 SVG icons across developer, AI, analytics, interface, and system categories',
      'Interactive gallery (index.html) with real-time size, stroke-width, and color customizer',
      'Instant search by icon name or semantic use-case tags',
      'One-click inline SVG copy and batch ZIP download export',
      'JavaScript module export (index.js) mapping all 50 icons as reusable SVG strings',
    ],
    technologies: [
      'SVG Vector Design',
      'JavaScript',
      'HTML5',
      'CSS3',
    ],
    challengesAndImprovements:
      'Currently available and usable on GitHub Pages, though still actively growing. Planned improvements include direct JSX/Vue component copy modes and additional icon categories.',
    whatComesNext:
      'Adding React JSX one-click copy templates and expanding the icon set beyond the initial 50 vectors.',
    coverImage: null,
    gallery: [],
    previewType: 'pk-icons',
  },
  {
    id: 'pk-studio-code',
    index: '04',
    name: 'PK Studio Code',
    subtitle: 'Browser & Desktop Code Editor Environment with Monaco & Gemini AI',
    category: 'Developer Tools',
    status: 'In Development · Local Build',
    statusTone: 'building',
    featured: false,
    currentlyBuilding: true,
    createdDate: '2026-09-08',
    updatedDate: '2026-09-14',
    repoUrl: null, // Missing information marked clearly: public repo not published yet
    liveUrl: null, // Missing information marked clearly: local workspace build
    secondaryLinks: [],
    shortDescription:
      'An in-development code editor environment built on Microsoft Monaco Editor featuring an integrated REPL terminal, AST diagnostics panel, plugin bus, and KON AI assistance.',
    overview:
      'PK Studio Code is my ongoing developer tool project exploring how a lightweight, browser-capable IDE works under the hood. Rather than reskinning an existing app, I built the workspace shell around the Monaco Editor engine with custom file tabs, a plugin event bus, a local SSE live server, and optional Google Gemini API integration.',
    whyIBuiltIt:
      'I wanted to understand how modern code editors manage multi-file state, syntax diagnostics, terminal command execution, and AI-assisted code diffs.',
    features: [
      'Microsoft Monaco Editor integration with multi-tab model state, bracket colorization, and minimap',
      'Integrated interactive terminal REPL supporting built-in commands (run, node, python simulation, theme, plugins)',
      'Real-time Diagnostic Problems Panel synced with editor markers and 1-click AI Fix / Troubleshoot triggers',
      'Extensible PKPluginSystem with lifecycle hooks (fileOpened, fileSaved, editorChanged, beforeRun)',
      '5 custom editor themes (PK Future, PK Cyberpunk, PK Night City, PK Neon, PK Quantum)',
      'Zero-dependency local Node.js development server (live_server.js) with Server-Sent Events hot reload',
    ],
    technologies: [
      'JavaScript',
      'Monaco Editor',
      'Node.js (SSE Live Server)',
      'HTML5 / CSS3',
      'Google Gemini API',
    ],
    challengesAndImprovements:
      'Currently a local workspace build (not yet published to a public GitHub repository). Coordinating cursor undo/redo history across virtual files and sandboxing browser code execution taught me a lot about editor internals.',
    whatComesNext:
      'Cleaning up the local workspace architecture, decoupling the standalone static demo from local Node filesystem routes, and publishing the source repository to GitHub.',
    coverImage: null,
    gallery: [],
    previewType: 'studio-code',
  },
  {
    id: 'kon-ai-companion',
    index: '05',
    name: 'KON (PK Intelligence)',
    subtitle: 'Personal AI Coding Companion & Code Workbench Experiment',
    category: 'AI Experiments',
    status: 'Experiment · In Development',
    statusTone: 'experiment',
    featured: false,
    currentlyBuilding: true,
    createdDate: '2026-09-08',
    updatedDate: '2026-09-14',
    repoUrl: null, // Local prototype; public repo not published yet
    liveUrl: null,
    secondaryLinks: [],
    shortDescription:
      'A personal AI coding assistant experiment designed around explaining code, debugging errors, and helping me understand software architecture while building.',
    overview:
      'Named after my online nickname (KON), this project is an experimental AI workstation and backend service I built to explore streaming LLM APIs, code context attachment, and structured developer prompts (Explain Code, Debug & Fix, Refactor Architecture, Generate Tests).',
    whyIBuiltIt:
      'My goal with AI is to use it to work better while still understanding how things work. I built KON as a personal sandbox to learn how token streaming (Server-Sent Events), prompt engineering, and backend API routing work in practice.',
    features: [
      'Express.js backend proxy (/api/ai/kon) keeping API keys on the server rather than exposed in client code',
      'Server-Sent Events (SSE) progressive token streaming with Markdown and syntax-highlighted code blocks',
      'Active Code Workbench allowing file context attachment and 1-click diagnostic prompts',
      'Multi-provider routing experiments (Gemini Flash and OpenRouter models)',
    ],
    technologies: [
      'JavaScript',
      'Node.js & Express',
      'Server-Sent Events (SSE)',
      'HTML5 / CSS3',
      'REST APIs',
    ],
    challengesAndImprovements:
      'KON is an active personal experiment running locally on my machine, not a commercial or hosted SaaS product. Because it requires a local Node backend and API credentials, there is no public live link yet.',
    whatComesNext:
      'Refining session memory storage and integrating KON more cleanly with PK Studio Code.',
    coverImage: null,
    gallery: [],
    previewType: 'kon-ai',
  },
  {
    id: 'phana-coffee-shop',
    index: '06',
    name: 'Phana Coffee Shop',
    subtitle: 'Multi-Page Web Design & Interactive Menu Showcase',
    category: 'Websites',
    status: 'Published · Early Project',
    statusTone: 'live',
    featured: false,
    currentlyBuilding: false,
    createdDate: '2026-01-15',
    updatedDate: '2026-09-15',
    repoUrl: 'https://github.com/phanaach4889/Phana-cofee-shop',
    liveUrl: 'https://phana-cofee-shop.vercel.app',
    secondaryLinks: [],
    shortDescription:
      'One of my first complete web projects—a multi-page coffee shop website with interactive menu filtering, gallery views, and responsive layouts deployed on Vercel.',
    overview:
      'Created when I first joined GitHub in January 2026 and iterated on through September 2026, Phana Coffee Shop is a multi-page frontend website where I practiced HTML structure, CSS layout techniques, JavaScript DOM filtering, and deploying static sites to Vercel.',
    whyIBuiltIt:
      'Every developer starts by building concrete websites from scratch to learn how pages, navigation, responsive styling, and deployment pipelines fit together. This project was my proving ground for core web fundamentals.',
    features: [
      'Multi-page architecture covering Home, Menu, Gallery, About, Testimonials, and Contact views',
      'Interactive JavaScript menu category filtering and item cards',
      'Responsive CSS styling and custom visual gallery script',
      'Live deployment hosted on Vercel linked directly from GitHub',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Vercel Deployment',
    ],
    challengesAndImprovements:
      'Looking back at this early project shows how far my code organization and UI design have progressed. I keep it live and public as an honest milestone of where my web development journey began.',
    whatComesNext:
      'Preserved as an early milestone repository.',
    coverImage: './assets/phana-coffee-shop.jpg',
    gallery: [],
    previewType: 'coffee-shop',
  },
  {
    id: 'pk-music-desktop',
    index: '07',
    name: 'PK Music (Desktop v0.1)',
    subtitle: 'Offline Windows Electron Audio Player & 10-Band WebAudio Equalizer',
    category: 'Other Experiments',
    status: 'Prototype · Local v0.1',
    statusTone: 'experiment',
    featured: false,
    currentlyBuilding: false,
    createdDate: '2026-08-28',
    updatedDate: '2026-08-29',
    repoUrl: null, // Local prototype in E:\Code\pk-music-electron
    liveUrl: null,
    secondaryLinks: [],
    shortDescription:
      'A local Windows desktop music player prototype built with Electron and Web Audio API featuring folder scanning, ID3/FLAC tag parsing, a real 10-band equalizer, and .lrc synced lyrics.',
    overview:
      'PK Music v0.1 is an offline desktop application experiment built with Electron. It scans local music folders on Windows, extracts embedded metadata and cover art via music-metadata, streams audio through a custom pkmedia:// protocol, and processes sound through a real 10-band BiquadFilterNode equalizer.',
    whyIBuiltIt:
      'I wanted to build a real desktop application that interacts safely with the local filesystem (using Electron contextIsolation and preload bridges) and uses real Web Audio signal processing instead of decorative UI sliders.',
    features: [
      'Recursive local folder scanner reading MP3, FLAC, WAV, M4A, OGG, and OPUS tags via music-metadata',
      'Locked-down custom pkmedia:// protocol keeping raw filesystem access out of the renderer process',
      'Real 10-band Web Audio API BiquadFilterNode equalizer plus Bass Boost, Vocal Boost, and compressor normalization',
      'Real-time AnalyserNode audio visualizer and time-synced .lrc lyric file parser',
      'Persistent local JSON library storage in %APPDATA%/PK Music/library.json',
    ],
    technologies: [
      'Electron',
      'Node.js',
      'Web Audio API',
      'JavaScript',
      'HTML5 / CSS3',
    ],
    challengesAndImprovements:
      'Currently a v0.1 local prototype: playlists, dedicated album grid views, and Windows OS media transport keys are not wired up yet, and formats like WMA/ALAC require a future ffmpeg integration.',
    whatComesNext:
      'Wiring playlist persistence and Windows media key shortcuts before publishing a public repository.',
    coverImage: null,
    gallery: [],
    previewType: 'pk-music',
  },
  {
    id: 'pk-desktop-clock',
    index: '08',
    name: 'Arachne Desktop Clock',
    subtitle: 'Electron + React + TypeScript Alarm, Timer & Stopwatch Utility',
    category: 'Other Experiments',
    status: 'Prototype · Local Build',
    statusTone: 'experiment',
    featured: false,
    currentlyBuilding: false,
    createdDate: '2026-08-26',
    updatedDate: '2026-08-28',
    repoUrl: null, // Local prototype in E:\Code\clock
    liveUrl: null,
    secondaryLinks: [],
    shortDescription:
      'A compact desktop utility built with Electron, React, and TypeScript providing persistent alarms, countdown timer presets, lap stopwatch, and system tray integration.',
    overview:
      'Built while practicing React and TypeScript inside an Electron desktop wrapper, this utility combines a live digital clock, multiple persisted alarms with snooze/dismiss, countdown timers, and a lap stopwatch that minimizes cleanly to the Windows system tray.',
    whyIBuiltIt:
      'To practice combining React state hooks, TypeScript interfaces, Vite bundling, and Electron main/renderer IPC communication in a small, self-contained utility.',
    features: [
      'Live digital clock with always-on-top window toggle',
      'Multiple persisted alarms with OS notification triggers and custom alarm tone',
      'Countdown timer with quick presets and stopwatch with lap recording',
      'System tray integration allowing background operation when the window is closed',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Electron',
      'Vite',
    ],
    challengesAndImprovements:
      'Local desktop utility prototype used on my own PC; not yet published as a public GitHub release.',
    whatComesNext:
      'Refining custom timer sound selection and packaging a lightweight portable build.',
    coverImage: null,
    gallery: [],
    previewType: 'desktop-clock',
  },
];
