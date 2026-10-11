/**
 * DEVELOPER PROFILE, PHILOSOPHY & VERIFIED JOURNEY DATA
 * ---------------------------------------------------------------------------
 * Edit this file to update personal bio details, philosophy statements,
 * verified timeline milestones, or social links.
 */

export const PROFILE = {
  fullName: 'Phana Kurosaki',
  displayName: 'Phana',
  nickname: 'KON',
  brand: 'PK',
  tagline: 'Independent builder · Always learning.',
  heroHeadlineMain: 'I build ideas into',
  heroHeadlineAccent: 'things you can use.',
  heroSubheadline: 'Software, experiments, and projects by Phana Kurosaki.',
  heroSummary:
    "I'm an independent builder who enjoys creating software, websites, developer tools, and interactive projects. I use AI to help me build, learn, and solve problems while continuing to understand the work behind what I create.",
  githubUsername: 'phanaach4889',
  githubUrl: 'https://github.com/phanaach4889',
  githubBio: 'Building something good for my society.',
  aboutHeading: 'Learning by building. Improving with every project.',
  aboutParagraphs: [
    "I'm Phana Kurosaki (also known online as KON), an independent builder interested in software, web development, developer tools, and games.",
    'I enjoy turning ideas into working projects, testing what is possible, and improving things when they break. AI is part of my workflow, but my goal is to understand the technology and become more capable through the process.',
    "This website is where I share what I'm building, what I've learned, and what I want to create next.",
  ],
  philosophy: [
    {
      index: '01',
      statement: 'Build real things.',
      detail: 'Start from a blank folder and turn ideas into working software people can actually open and use.',
    },
    {
      index: '02',
      statement: 'Understand how they work.',
      detail: 'Look under the hood of editors, audio engines, keyboard layouts, and state management instead of treating code as a black box.',
    },
    {
      index: '03',
      statement: 'Learn from mistakes.',
      detail: 'When a layout breaks, an event handler misfires, or a build fails, trace the root cause and fix it properly.',
    },
    {
      index: '04',
      statement: 'Improve through iteration.',
      detail: 'Every version is a stepping stone—from my first HTML coffee shop page to a 218-lesson Khmer typing studio.',
    },
    {
      index: '05',
      statement: 'Use tools to become more capable.',
      detail: 'Use AI as a collaborator to move faster and explore deeper concepts while staying in control of the architecture.',
    },
  ],
  /**
   * Verified milestones sourced directly from GitHub repository timestamps,
   * commits, and documented local workspace builds.
   */
  journeyMilestones: [
    {
      date: 'January 2026',
      code: '2026-01-15',
      title: 'Joined GitHub & Shipped Phana Coffee Shop',
      category: 'First Public Repo',
      description:
        'Created the phanaach4889 GitHub account and published my first multi-page frontend website (Phana-cofee-shop), practicing HTML, CSS, JavaScript filtering, and Vercel deployment.',
      link: 'https://github.com/phanaach4889/Phana-cofee-shop',
    },
    {
      date: 'August 2026',
      code: '2026-08-26',
      title: 'Desktop App Experiments with Electron & Web Audio',
      category: 'Local Prototypes',
      description:
        'Built local Windows desktop prototypes including an Electron + React + TypeScript clock/timer utility and PK Music v0.1 with local folder scanning and a 10-band Web Audio equalizer.',
      link: null,
    },
    {
      date: 'September 2026',
      code: '2026-09-08',
      title: 'Exploring Developer Tools: PK Studio Code & KON',
      category: 'IDE & AI Experiments',
      description:
        'Started prototyping PK Studio Code around the Microsoft Monaco Editor and testing KON, a personal AI coding assistant workbench using local Express SSE streaming.',
      link: null,
    },
    {
      date: 'September 2026',
      code: '2026-09-20',
      title: 'Created PK Khmer Type & PK Icons Studio',
      category: 'Public Releases',
      description:
        'Launched PK Khmer Type to help people learn Khmer Standard, Khmer NiDA, and English touch-typing, followed two days later by PK Icons Studio with 50 custom 24x24 stroke SVG icons.',
      link: 'https://github.com/phanaach4889/PK-Khmer-Type',
    },
    {
      date: 'October 2026',
      code: '2026-10-10',
      title: 'PK Khmer Type v2.4 Studio & NEON PROTOCOL // OVERDRIVE',
      category: 'Latest Builds',
      description:
        'Expanded PK Khmer Type to 40 levels / 218 lessons with a live mastery heatmap dashboard and 3D hand guides, and shipped NEON PROTOCOL // OVERDRIVE (PK-game) on GitHub Pages.',
      link: 'https://github.com/phanaach4889/PK-game',
    },
  ],
  exploringTopics: [
    'Khmer script input ergonomics & Unicode normalization',
    'React, Vite & modular component architecture',
    'Browser code editors (Monaco) & AST diagnostics',
    'HTML5 Canvas 60 FPS game loops & procedural Web Audio synthesis',
    'AI-assisted software engineering & developer workflows',
  ],
};
