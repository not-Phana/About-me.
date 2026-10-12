import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import {
  PKMonogram,
  IconGitHub,
  IconFacebook,
  IconMessageSquare,
  IconMail,
  IconKeyboard,
  IconGamepad,
  IconGrid,
  IconCode,
  IconCpu,
  IconArrowUpRight,
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconAlert,
  IconShield,
  IconFileText,
} from './Icons';

const FOOTER_TECH_DOSSIERS = [
  {
    id: 'github-workspace',
    index: 'SPEC 01',
    category: 'CODE REPOSITORIES',
    name: 'GitHub Open-Source Architecture',
    subtitle: 'Zero templates, real commit history, and public code verification.',
    description:
      'Every project in this portfolio is an authentic, publicly inspectable build hosted on GitHub (github.com/not-Phana). Built from scratch without pre-packaged templates. The site continuously queries GitHub\'s REST API for live commit counts, language breakdowns, and public release branches.',
    pills: ['8 Repositories', 'Zero Templates', 'GitHub REST API', 'Public Git Clones'],
    link: 'https://github.com/not-Phana',
    linkLabel: 'Open GitHub Profile',
    icon: IconGitHub,
    status: 'ACTIVE SYNC',
  },
  {
    id: 'khmer-nida',
    index: 'SPEC 02',
    category: 'LINGUISTIC ERGONOMICS',
    name: 'Khmer NiDA & Standard Typing Mechanics',
    subtitle: 'Abugida cluster stacking, Coeng subscripts, and 4-layer ergonomics.',
    description:
      'Khmer is an ancient Austroasiatic abugida script where consonants attach dependent vowels in four directions and stack subjoined Coeng consonants. The NiDA layout structures stacking logically: typing base consonant + Coeng marker [J] (្) + subjoined consonant (e.g. [K] ក + [J] ្ + [K] ក produces ក្ក). PK Khmer Type delivers 40 levels, 218 lessons, 3D kinematic hand guides, and real-time Unicode normalization.',
    pills: ['NiDA Subscript [J]', 'Khmer Standard', '40 Levels / 218 Lessons', 'Unicode Normalization'],
    link: 'https://not-phana.github.io/PK-Khmer-Type/',
    linkLabel: 'Launch Khmer Studio',
    icon: IconKeyboard,
    status: 'SHIPPED V2.4',
  },
  {
    id: 'neon-canvas',
    index: 'SPEC 03',
    category: 'REAL-TIME GRAPHICS',
    name: 'NEON PROTOCOL // Canvas & Web Audio',
    subtitle: 'Zero-dependency 60 FPS cyber-arena loop with procedural audio.',
    description:
      'A zero-dependency browser game running on a pure 60 FPS HTML5 Canvas loop across a 4,200 x 4,200 coordinate cyber-grid. Instead of loading external audio files, all sound effects, lasers, hums, and dynamic combat beats are synthesized procedurally in real time through the browser\'s native Web Audio API oscillators.',
    pills: ['60 FPS Canvas Loop', 'Web Audio Oscillators', '4200x4200 Cyber-Grid', 'Zero Game Engines'],
    link: 'https://not-phana.github.io/PK-game/',
    linkLabel: 'Launch Neon Protocol',
    icon: IconGamepad,
    status: 'LIVE ON PAGES',
  },
  {
    id: 'pk-icons',
    index: 'SPEC 04',
    category: 'VECTOR GEOMETRY',
    name: 'PK Icons Studio & Zero-Emoji Philosophy',
    subtitle: '50 handcrafted 24x24 stroke SVG icons designed to replace generic emojis.',
    description:
      'Standard Unicode emojis render unpredictably across Apple, Windows, and Android, and clash with high-density architectural interfaces. PK Icons Studio is a proprietary library of 50 pixel-perfect 24x24 vector SVG stroke icons built to enforce a strict Zero-Emoji policy with dark-mode-optimized stroke geometry (stroke-width=2.2).',
    pills: ['50 Custom Vectors', '24x24 Pixel Grid', 'Strict Zero-Emoji Policy', 'Live Stroke Customizer'],
    link: 'https://not-phana.github.io/PK-icons/',
    linkLabel: 'Open PK Icons Studio',
    icon: IconGrid,
    status: 'EXPANDING',
  },
  {
    id: 'studio-code',
    index: 'SPEC 05',
    category: 'DEVELOPER WORKBENCH',
    name: 'PK Studio Code & KON (PK Intelligence)',
    subtitle: 'Microsoft Monaco Editor workbench with local Express SSE streaming.',
    description:
      'Experiments in developer productivity. PK Studio Code embeds the Microsoft Monaco Editor engine with an interactive REPL terminal, custom event bus, and AST diagnostic tables. KON is an AI pair-programmer workbench using local Server-Sent Events (SSE) streaming on port 5000 so LLM tokens stream smoothly without exposing API credentials.',
    pills: ['Monaco Editor Core', 'Node.js SSE Streaming', 'AST Diagnostic Tables', 'PKPluginSystem Bus'],
    link: '#console',
    linkLabel: 'Inspect Console Specs',
    icon: IconCode,
    status: 'IN DEVELOPMENT',
  },
  {
    id: 'incubation-lab',
    index: 'SPEC 06',
    category: 'R&D INCUBATOR',
    name: 'Incubation Lab // Future Tooling & WASM',
    subtitle: 'Offline-first WebAssembly engines, mechanical sound synthesis, and AI agents.',
    description:
      'Slot 09 in the project directory is an active research incubator for classified next-generation experiments. Currently prototyping Rust compiled to WebAssembly for client-side cryptographic hashing, high-performance canvas visualizers, and offline-first developer utilities. Features multi-mode radar and oscilloscope previews.',
    pills: ['WebAssembly (WASM)', 'Rust Toolchains', '60 FPS Oscilloscope', 'Tactical Radar Scan'],
    link: '#projects',
    linkLabel: 'Explore Slot 09',
    icon: IconCpu,
    status: 'DESIGN PHASE',
  },
  {
    id: 'ai-cognitive-pipeline',
    index: 'SPEC 07',
    category: 'AGENTIC ENGINEERING',
    name: 'Autonomous AI Agents & Cognitive Pipeline',
    subtitle: 'Pairing biological human vision with Antigravity, Codex execution, and Claude Code roadmap.',
    description:
      'Software engineering has evolved into an alliance between human architecture and synthetic execution. Antigravity (Google DeepMind) executes autonomous terminal commands, inspects live viewports via Edge CDP, and validates Vite builds. Codex (OpenAI) synthesizes algorithmic pipelines and Khmer NiDA Unicode tables. Claude Code (Anthropic) is queued on the engineering roadmap as a future autonomous CLI agent for deep multi-file AST refactoring. Conversational chatbots (Gemini, Claude, ChatGPT) assist with ideation and prompt crafting, while human architect Phana Kurosaki maintains total creative direction, verification, and code ownership.',
    pills: ['Google DeepMind Antigravity', 'OpenAI Codex', 'Claude Code (Future Roadmap)', 'Human-Directed Architecture'],
    link: '#contributors',
    linkLabel: 'Inspect 8 Collaborators',
    icon: IconCode,
    status: 'ACTIVE PIPELINE',
  },
];

const LEGAL_COMPLIANCE_CLAUSES = [
  {
    id: 'trademarks',
    num: 'CLAUSE 01',
    category: 'TRADEMARK FAIR USE',
    statute: '15 U.S.C. § 1115(b)(4)',
    title: 'Nominative Fair Use & Third-Party Trademark Ownership',
    summary:
      'All third-party trademarks, product names, logos, and brand symbols displayed across this portfolio belong strictly to their respective registered owners. Any reference in this portfolio constitutes Nominative Fair Use solely for descriptive identification and technical compatibility.',
    details: [
      'GitHub and the GitHub Octocat logo are registered trademarks of GitHub, Inc., a subsidiary of Microsoft Corporation.',
      'Microsoft, Monaco Editor, Windows, and Visual Studio Code are registered trademarks of Microsoft Corporation in the United States and other jurisdictions.',
      'Meta, Facebook, and Messenger are registered trademarks or service marks of Meta Platforms, Inc.',
      'Google, Gmail, Chrome, Chromium, Gemini, Antigravity, and Google DeepMind are trademarks or registered trademarks of Google LLC / Alphabet Inc.',
      'Anthropic, Claude, and Claude Code are trademarks or service marks of Anthropic PBC in the United States and other jurisdictions.',
      'OpenAI, ChatGPT, and Codex are trademarks or service marks of OpenAI OpCo, LLC in the United States and other jurisdictions.',
      'React is open-source software maintained by Meta Open Source; Vite is maintained by Evan You and Vite Contributors; Electron is a project of the OpenJS Foundation.',
      'Disclaimer of Affiliation: Phana Kurosaki (PK) is an independent software developer. Neither this portfolio nor any hosted projects are sponsored, endorsed, certified, or formally affiliated with GitHub, Microsoft, Meta, Google, Alphabet, Google DeepMind, Anthropic, OpenAI, or any other trademark owner mentioned herein.',
    ],
    pills: ['Nominative Fair Use', 'No Endorsement Implied', 'Independent Development', '15 U.S.C. § 1115(b)(4)'],
    badge: 'DISCLAIMER ACTIVE',
    icon: IconShield,
    externalLink: 'https://www.uspto.gov/trademarks',
    externalLinkLabel: 'USPTO Fair Use Standards',
  },
  {
    id: 'khmer-nida',
    num: 'CLAUSE 02',
    category: 'CULTURAL HERITAGE STANDARDS',
    statute: 'Royal Government of Cambodia / NiDA Standard',
    title: 'Khmer NiDA Keyboard Layout & National Digital Standards',
    summary:
      'PK Khmer Type is an independent, non-commercial cultural typing trainer created to advance Khmer Unicode digital literacy. The keyboard layout adheres to the national Khmer NiDA standard developed for the Royal Government of Cambodia.',
    details: [
      'Standard Attribution: The Khmer NiDA layout was formalized under the leadership of the National Information Communications Technology Development Authority (NiDA) under the Royal Government of Cambodia, in partnership with the Open Forum of Cambodia (KhmerOS initiative).',
      'Orthographic Integrity: The typing engine respects traditional Khmer abugida orthography, correctly sequencing consonant stems, independent vowels, dependent vowels (srak nissay), and subjoined Coeng consonants (cheung aksar) mediated by the subscript shifter key [J] (U+17D2).',
      'Educational & Non-Commercial Notice: PK Khmer Type is offered freely worldwide for educational, cultural preservation, and digital typing speed training. It is an independent project and does not claim ownership or official government agency status.',
    ],
    pills: ['Khmer NiDA Standard', 'KhmerOS Heritage', 'Subscript Coeng [J]', 'Non-Commercial Open Access'],
    badge: 'CULTURAL ATTRIBUTION',
    icon: IconKeyboard,
    externalLink: 'https://not-phana.github.io/PK-Khmer-Type/',
    externalLinkLabel: 'Launch PK Khmer Type Trainer',
  },
  {
    id: 'met-museum-cc0',
    num: 'CLAUSE 03',
    category: 'PUBLIC DOMAIN ARTWORK',
    statute: 'Creative Commons Zero (CC0 1.0 Universal)',
    title: 'The Metropolitan Museum of Art Open Access (CC0 1.0)',
    summary:
      'The classical Hellenic bust of Epicurus presented in the hero visualizer is utilized pursuant to The Metropolitan Museum of Art Open Access policy and dedicated to the worldwide public domain under Creative Commons Zero (CC0 1.0 Universal).',
    details: [
      'Artifact Identification: Marble bust of Epicurus. Roman Imperial period, ca. 2nd century A.D. Pentelic marble, H. 18 1/2 in. (47 cm).',
      'Accession & Provenance: Accession Number 11.90. The Metropolitan Museum of Art, New York (Rogers Fund, 1911).',
      'Public Domain Dedication: Under The Met Open Access initiative, high-resolution imagery of artworks in the public domain is placed into the public domain under CC0 1.0 Universal. Users may copy, modify, distribute, and perform the work without asking permission.',
      'Institutional Recognition: Sincere academic and artistic gratitude is expressed to The Metropolitan Museum of Art for their stewardship in making global cultural treasures open to all.',
    ],
    pills: ['The Met Open Access', 'Acc. No. 11.90', 'CC0 1.0 Universal', 'Public Domain Dedication'],
    badge: 'CC0 PUBLIC DOMAIN',
    icon: IconGrid,
    externalLink: 'https://www.metmuseum.org/art/collection/search/247993',
    externalLinkLabel: 'View Met Museum Acc. 11.90 Record',
  },
  {
    id: 'as-is-warranty',
    num: 'CLAUSE 04',
    category: 'SOFTWARE LIABILITY WAIVER',
    statute: 'MIT License Statutory Warranty Exclusion',
    title: 'Statutory "AS IS" Disclaimer & Full Limitation of Liability',
    summary:
      'All source code, web applications, audio synthesizers, interactive canvas games (NEON PROTOCOL), developer tools, and algorithms published across this portfolio are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.',
    details: [
      'Exclusion of Warranties: To the maximum extent permitted by applicable law, the author disclaims all representations and warranties, whether express, statutory, or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, operational continuity, data accuracy, and non-infringement.',
      'Limitation of Liability: Under no legal theory—whether in tort (including negligence), contract, strict liability, or otherwise—shall the author (Phana Kurosaki / Phana Ach) be liable for any direct, indirect, incidental, special, exemplary, punitive, or consequential damages (including loss of data, loss of revenue, browser disruption, or hardware wear) arising from the use or inability to use this site, games, procedural audio routines, or associated code repositories.',
      'Client Sandbox Execution: All games, procedural WebAudio oscillators, and 60 FPS canvas loops execute strictly client-side inside the visitor\'s own browser sandbox at the visitor\'s sole election.',
    ],
    pills: ['MIT License Disclaimer', 'AS IS / AS AVAILABLE', 'Zero Author Liability', 'Client Sandbox Only'],
    badge: 'STATUTORY WAIVER',
    icon: IconFileText,
    externalLink: 'https://opensource.org/licenses/MIT',
    externalLinkLabel: 'MIT Open Source License Reference',
  },
  {
    id: 'privacy-sovereignty',
    num: 'CLAUSE 05',
    category: 'DATA PRIVACY & SOVEREIGNTY',
    statute: 'Zero-Surveillance Architecture',
    title: 'Zero Tracking Policy & Client-Side Data Sovereignty',
    summary:
      'This portfolio operates on an uncompromising Zero-Tracking architecture. No tracking cookies, analytics pixels, browser fingerprinting, marketing beacons, or remote telemetry scripts are deployed anywhere on this domain.',
    details: [
      'Zero Cookies & Zero Beacons: No third-party surveillance scripts (such as Google Analytics, Meta Pixel, Hotjar, or advertising cookies) are embedded in this codebase. No tracking cookies are placed on your machine.',
      'Local Storage Sovereignty: User preferences (such as light/dark mode selection, WebAudio mechanical SFX toggle, signature accent preset, and console command history) are stored strictly inside your browser\'s local storage (localStorage) and never transmitted to external databases.',
      'External Link Advisory: When following external links to GitHub, Facebook, or Gmail, the visitor enters third-party ecosystems governed by their respective independent privacy terms.',
    ],
    pills: ['Zero Tracking Cookies', 'Zero Telemetry Beacons', 'Local Storage Only', 'Client Data Sovereignty'],
    badge: 'ZERO TRACKING',
    icon: IconShield,
    externalLink: '#footer-legal-section',
    externalLinkLabel: 'Verified Local Storage Protocol',
  },
  {
    id: 'dmca-contact',
    num: 'CLAUSE 06',
    category: 'SAFE HARBOR & DISPUTE PROTOCOL',
    statute: '17 U.S.C. § 512 / Notice & Takedown Protocol',
    title: 'Intellectual Property Inquiries & DMCA Safe Harbor Channel',
    summary:
      'Phana Kurosaki upholds the intellectual property rights of all copyright holders, trademark owners, and cultural institutions. A good-faith expedited notice-and-takedown protocol is maintained for instant, amicable resolution.',
    details: [
      'Direct Notification Channel: If you are a copyright or trademark owner or an authorized agent and believe in good faith that any content, code, imagery, or reference on this website infringes upon your protected intellectual property, please submit an inquiry directly via email.',
      'Official IP Inquiry Address: phleyphana@gmail.com with subject line: "[LEGAL / IP INQUIRY] Notice of Claimed Infringement".',
      'Response SLA: The author commits to reviewing legitimate notices within 24 to 48 business hours and executing appropriate remedial measures—including immediate attribution updates, clarifying disclaimers, or complete removal of the disputed content.',
      'Good-Faith Amicability: We are fully committed to legal integrity, constructive communication, and respectful cooperation with all rights holders without the necessity of formal adversarial proceedings.',
    ],
    pills: ['DMCA Safe Harbor', 'phleyphana@gmail.com', '24-48h Review SLA', 'Good-Faith Resolution'],
    badge: 'NOTICE & TAKEDOWN',
    icon: IconMail,
    externalLink: 'mailto:phleyphana@gmail.com?subject=%5BLEGAL%20%2F%20IP%20INQUIRY%5D%20Notice%20of%20Claimed%20Infringement',
    externalLinkLabel: 'Transmit Legal Inquiry to phleyphana@gmail.com',
  },
  {
    id: 'ai-safe-harbor',
    num: 'CLAUSE 07',
    category: 'AI CITATION & STATUTORY SAFE HARBOR',
    statute: 'US Copyright Office AI Guidance / Fair Use / Non-Affiliation',
    title: 'Autonomous AI Agents, Chatbots & Complete Statutory Safe Harbor',
    summary:
      'Full legal disclosure regarding the auxiliary use of third-party Artificial Intelligence developer tools, autonomous coding agents (Google DeepMind Antigravity, Anthropic Claude Code, OpenAI Codex), and conversational chatbots (Gemini, Claude, ChatGPT). Establishes independent developer authorship, non-affiliation, and total exclusion of liability to prevent frivolous litigation.',
    details: [
      'Two-Tier AI Architecture Disclosure: The PK Studio codebase is developed utilizing artificial intelligence in two clearly demarcated categories: (a) Autonomous Coding Agents (Antigravity by Google DeepMind and Codex by OpenAI currently active; Claude Code by Anthropic designated as a planned future roadmap pipeline for upcoming CLI automation) operating via command-line interfaces, terminal subprocesses, AST code modifications, and build verification scripts; and (b) Conversational AI Chatbots (Gemini, Claude, ChatGPT) used exclusively for exploratory ideation, prompt drafting, and design dialogues.',
      'Absolute Non-Affiliation & Corporate Separation: Phana Kurosaki (PK) is an independent private developer. There is no corporate partnership, joint venture, agency, endorsement, sponsorship, or employment relationship between the author and Google LLC, Alphabet Inc., Google DeepMind, Anthropic PBC, OpenAI OpCo, LLC, or Microsoft Corporation. All AI logos, product names, and brand badges are referenced solely under the doctrine of Nominative Fair Use (15 U.S.C. § 1115(b)(4)) to truthfully credit the developer tooling used during engineering.',
      'Human Authorship & Copyright Sovereignty: In compliance with the United States Copyright Office Policy Statement on Copyright Registration Guidance for Works Containing Materials Generated by AI (88 FR 16190), all human architecture, creative direction, system invariants, UI styling, sound synthesis algorithms, Khmer orthographic logic, and final deployment approvals are original creative expressions originated and directed by Phana Kurosaki. Third-party AI agents operate strictly as auxiliary assistive instruments and compilers under direct human orchestration.',
      'Complete Liability & Indemnity Shield: All code, algorithms, visual components, and web applications co-authored with AI tools are released "AS IS" under the MIT License without warranties of any kind. Under no circumstances shall the author be liable for any claims, damages, patent disputes, downstream deployments, or third-party interpretations arising from the use of AI tools or associated repositories.',
      'Expedited Good-Faith Remediation: Any rightsholder or enterprise possessing questions or concerns regarding nominative attribution or logo display is invited to contact phleyphana@gmail.com for instant amicable resolution within 24 to 48 hours, fully precluding the necessity of adversarial legal proceedings.',
    ],
    pills: ['US Copyright Office Guidance', 'Nominative Fair Use', 'Zero Corporate Affiliation', 'MIT Warranty Exclusion', '24-48h Remediation'],
    badge: 'LEGAL SAFE HARBOR',
    icon: IconShield,
    externalLink: 'https://www.copyright.gov/ai/',
    externalLinkLabel: 'US Copyright Office AI Guidance',
  },
];

export default function Footer({ onNavigateHome, onPlaySound }) {
  const currentYear = new Date().getFullYear();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [hubTab, setHubTab] = useState('both');
  const [expandedLegalIds, setExpandedLegalIds] = useState(new Set());

  const toggleLegalDetails = (id) => {
    onPlaySound?.('switch');
    setExpandedLegalIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectLegalClause = (clauseId) => {
    onPlaySound?.('switch');
    setHubTab('legal');
    setExpandedLegalIds((prev) => new Set(prev).add(clauseId));
    const el = document.getElementById('footer-dossier-hub');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTechSpecs = () => {
    onPlaySound?.('switch');
    setHubTab('tech');
    const el = document.getElementById('footer-dossier-hub');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    onPlaySound?.('switch');
    onNavigateHome(sectionId);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(PROFILE.email);
      onPlaySound?.('switch');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {}
  };

  return (
    <footer className="bg-bg text-ink">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-line">
          {/* Brand Identity */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <PKMonogram className="w-7 h-7 text-ink" />
              <div>
                <div className="font-mono text-sm font-bold tracking-[0.16em] uppercase">
                  {PROFILE.brand} // {PROFILE.fullName}
                </div>
                <div className="font-mono text-xs text-muted">
                  Also known as {PROFILE.nickname}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted leading-relaxed">
              Built with curiosity, custom canvas physics, and code. Open to
              software experiments, architecture design, and direct collaboration.
            </p>
          </div>

          {/* Section Links */}
          <div className="md:col-span-3 font-mono text-xs space-y-2.5">
            <div className="text-muted uppercase tracking-wider mb-3">
              SECTIONS
            </div>
            {[
              { id: 'home', label: '01 Home' },
              { id: 'about', label: '02 About' },
              { id: 'projects', label: '03 Projects' },
              { id: 'console', label: '04 Console' },
              { id: 'github', label: '05 GitHub' },
              { id: 'building', label: '06 Currently Building' },
              { id: 'journey', label: '07 The Journey' },
              { id: 'contact', label: '08 Contact' },
            ].map((item) => (
              <div key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="text-muted hover:text-ink transition-colors"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          {/* Direct Transmission Channels & Platforms */}
          <div className="md:col-span-4 font-mono text-xs space-y-4">
            <div>
              <div className="flex items-center justify-between text-muted uppercase tracking-wider mb-2.5 text-[11px]">
                <span>DIRECT CHANNELS // CONTACT</span>
                <span className="flex items-center gap-1.5 text-[10px] text-accent font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span>ONLINE</span>
                </span>
              </div>
              <div className="space-y-1.5">
                {/* GitHub */}
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-bg text-accent group-hover:scale-110 transition-transform">
                      <IconGitHub className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent transition-colors">
                        @{PROFILE.githubUsername}
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        GITHUB // REPOSITORIES
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted group-hover:text-accent font-bold uppercase flex items-center gap-1">
                    <span>SRC</span>
                    <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>

                {/* Gmail */}
                <div className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift">
                  <a
                    href={PROFILE.emailMailto}
                    onClick={() => onPlaySound?.('switch')}
                    className="flex items-center gap-2 min-w-0 flex-1 mr-2"
                    title={`Send an email to ${PROFILE.email}`}
                  >
                    <span className="p-1 rounded bg-bg text-[#ea4335] group-hover:scale-110 transition-transform">
                      <IconMail className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent truncate transition-colors">
                        {PROFILE.email}
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        GMAIL // DIRECT INBOX
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="border border-line/80 hover:border-accent bg-bg px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted hover:text-accent flex items-center gap-1 transition-colors shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <IconCheck className="w-2.5 h-2.5 text-[#4ade80]" />
                        <span className="text-[#4ade80] font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <IconCopy className="w-2.5 h-2.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Facebook Main */}
                <a
                  href={PROFILE.facebookMainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-bg text-[#1877f2] group-hover:scale-110 transition-transform">
                      <IconFacebook className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent transition-colors">
                        Phana Kurosaki
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        FACEBOOK // MAIN PROFILE
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted group-hover:text-accent font-bold uppercase flex items-center gap-1">
                    <span>MAIN</span>
                    <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>

                {/* Facebook DM */}
                <a
                  href={PROFILE.facebookDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-bg text-[#0084ff] group-hover:scale-110 transition-transform">
                      <IconMessageSquare className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent transition-colors">
                        Direct Messenger
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        FACEBOOK // DM CHANNEL
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted group-hover:text-accent font-bold uppercase flex items-center gap-1">
                    <span>DM</span>
                    <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-2.5 border-t border-line/60">
              <div className="text-muted uppercase tracking-wider mb-2 text-[10px]">
                LIVE APPS &amp; TOOLS
              </div>
              <div className="space-y-1.5 text-xs">
                <div>
                  <a
                    href="https://not-phana.github.io/PK-Khmer-Type/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
                  >
                    <span>PK Khmer Type</span>
                    <IconArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://not-phana.github.io/PK-game/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
                  >
                    <span>NEON PROTOCOL (PK-game)</span>
                    <IconArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://not-phana.github.io/PK-icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
                  >
                    <span>PK Icons Studio</span>
                    <IconArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Studio Dossier & Statutory Legal Shield Hub */}
        <div id="footer-dossier-hub" className="border-b border-line bg-surface/20 scroll-mt-20">
          <div id="footer-legal-section" className="scroll-mt-20" />
          
          {/* Unified Header Bar */}
          <div className="p-5 sm:px-10 lg:px-12 py-5 border-b border-line flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="hud-label text-accent mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span>STUDIO INTELLIGENCE // ARCHITECTURE &amp; STATUTORY LEGAL SHIELD</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
                How It Works &amp; Statutory Legal Ledger
              </h3>
              <p className="mt-1 text-xs text-muted max-w-3xl leading-relaxed">
                Technical explanations of core architectures alongside audited statutory legal disclosures covering third-party AI agents (Antigravity, Claude Code, Codex), conversational chatbots, trademark fair use (15 U.S.C. § 1115(b)(4)), Khmer NiDA standards, The Met CC0 public domain art, and MIT "AS IS" liability waivers.
              </p>
            </div>

            {/* Mode Switcher Segmented Controller */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs shrink-0">
              <button
                type="button"
                onClick={() => {
                  onPlaySound?.('switch');
                  setHubTab('tech');
                }}
                className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 font-bold ${
                  hubTab === 'tech'
                    ? 'border-accent bg-accent text-bg shadow-sm'
                    : 'border-line bg-bg text-muted hover:text-ink hover:border-accent/60'
                }`}
              >
                <IconCode className="w-3.5 h-3.5" />
                <span>TECH SPECS ({FOOTER_TECH_DOSSIERS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onPlaySound?.('switch');
                  setHubTab('legal');
                }}
                className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 font-bold ${
                  hubTab === 'legal'
                    ? 'border-accent bg-accent text-bg shadow-sm'
                    : 'border-line bg-bg text-muted hover:text-ink hover:border-accent/60'
                }`}
              >
                <IconShield className="w-3.5 h-3.5" />
                <span>LEGAL SHIELD ({LEGAL_COMPLIANCE_CLAUSES.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onPlaySound?.('switch');
                  setHubTab('both');
                }}
                className={`px-3 py-1.5 border transition-all flex items-center gap-1.5 font-bold ${
                  hubTab === 'both'
                    ? 'border-accent bg-accent text-bg shadow-sm'
                    : 'border-line bg-bg text-muted hover:text-ink hover:border-accent/60'
                }`}
              >
                <IconGrid className="w-3.5 h-3.5" />
                <span>ALL COMPACT ({FOOTER_TECH_DOSSIERS.length + LEGAL_COMPLIANCE_CLAUSES.length})</span>
              </button>

              <a
                href="mailto:phleyphana@gmail.com?subject=%5BLEGAL%20%2F%20IP%20INQUIRY%5D%20Notice%20of%20Claimed%20Infringement"
                onClick={() => onPlaySound?.('switch')}
                className="border border-line bg-surface/50 hover:border-accent hover:text-accent text-muted px-2.5 py-1.5 transition-colors flex items-center gap-1.5 ml-1 hidden sm:flex text-[11px]"
                title="Send legal / copyright inquiry to phleyphana@gmail.com"
              >
                <IconMail className="w-3 h-3 text-accent" />
                <span>IP INQUIRIES</span>
              </a>
            </div>
          </div>

          {/* Section 1: Technology & Engineering Specs */}
          {(hubTab === 'tech' || hubTab === 'both') && (
            <div>
              {hubTab === 'both' && (
                <div className="px-5 sm:px-10 lg:px-12 py-2.5 bg-surface/40 border-b border-line flex items-center justify-between font-mono text-[11px]">
                  <span className="text-accent font-bold tracking-wider uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>PART 01 // HOW IT WORKS: 6 ENGINEERING SPECS</span>
                  </span>
                  <span className="text-muted">OPEN-SOURCE &amp; ARCHITECTURAL BLUEPRINTS</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-line">
                {FOOTER_TECH_DOSSIERS.map((spec) => {
                  const SpecIcon = spec.icon;
                  return (
                    <article
                      key={spec.id}
                      className="bg-bg p-4 sm:p-5 flex flex-col justify-between hover:bg-surface/50 transition-colors group card-laser-lift relative"
                    >
                      <div>
                        {/* Header: Index & Status */}
                        <div className="flex items-center justify-between font-mono text-[11px] text-muted mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-accent font-bold">{spec.index}</span>
                            <span>//</span>
                            <span className="text-muted text-[10px] tracking-wider">{spec.category}</span>
                          </div>
                          <span className="border border-accent/40 bg-accentDim px-1.5 py-0.5 text-[9px] text-accent font-semibold">
                            {spec.status}
                          </span>
                        </div>

                        {/* Title with Icon */}
                        <div className="flex items-start gap-2.5 mb-1.5">
                          <span className="p-1 rounded bg-surface border border-line text-accent shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-accent transition-all">
                            <SpecIcon className="w-3.5 h-3.5" />
                          </span>
                          <div>
                            <h4 className="font-display text-base font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                              {spec.name}
                            </h4>
                            <div className="text-[11px] font-mono text-accent/90 mt-0.5">
                              {spec.subtitle}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mt-2 text-xs text-muted leading-relaxed">
                          {spec.description}
                        </p>

                        {/* Tech Pills */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {spec.pills.map((pill) => (
                            <span
                              key={pill}
                              className="border border-line bg-surface px-2 py-0.5 font-mono text-[9px] text-ink"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Direct Link Action */}
                      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                        {spec.link.startsWith('#') ? (
                          <a
                            href={spec.link}
                            onClick={(e) => handleLinkClick(e, spec.link.replace('#', ''))}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline font-bold"
                          >
                            <span>{spec.linkLabel}</span>
                            <IconArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        ) : (
                          <a
                            href={spec.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => onPlaySound?.('switch')}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline font-bold"
                          >
                            <span>{spec.linkLabel}</span>
                            <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                        <span className="font-mono text-[9px] text-muted tracking-widest uppercase">
                          PK SPEC
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: Trademarks, Cultural Standards & Safe Harbor Disclaimers */}
          {(hubTab === 'legal' || hubTab === 'both') && (
            <div className={hubTab === 'both' ? 'border-t border-line' : ''}>
              {hubTab === 'both' && (
                <div className="px-5 sm:px-10 lg:px-12 py-2.5 bg-surface/40 border-b border-line flex items-center justify-between font-mono text-[11px]">
                  <span className="text-accent font-bold tracking-wider uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>PART 02 // TRADEMARKS, CULTURAL STANDARDS &amp; SAFE HARBOR DISCLAIMERS</span>
                  </span>
                  <span className="text-muted">STATUTORY AUDIT // 100% COMPLIANCE &amp; DISCLOSURE</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-line">
                {LEGAL_COMPLIANCE_CLAUSES.map((clause) => {
                  const ClauseIcon = clause.icon;
                  const isExpanded = expandedLegalIds.has(clause.id);
                  return (
                    <article
                      key={clause.id}
                      className="bg-bg p-4 sm:p-5 flex flex-col justify-between hover:bg-surface/50 transition-colors group card-laser-lift relative"
                    >
                      <div>
                        {/* Header: Num, Statute, Badge */}
                        <div className="flex items-center justify-between font-mono text-[11px] text-muted mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-accent font-bold">{clause.num}</span>
                            <span>//</span>
                            <span className="text-muted text-[10px] tracking-wider">{clause.category}</span>
                          </div>
                          <span className="border border-accent/40 bg-accentDim px-1.5 py-0.5 text-[9px] text-accent font-semibold">
                            {clause.badge}
                          </span>
                        </div>

                        {/* Title with Icon */}
                        <div className="flex items-start gap-2.5 mb-1.5">
                          <span className="p-1 rounded bg-surface border border-line text-accent shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-accent transition-all">
                            <ClauseIcon className="w-3.5 h-3.5" />
                          </span>
                          <div>
                            <h4 className="font-display text-base font-bold text-ink group-hover:text-accent transition-colors leading-snug">
                              {clause.title}
                            </h4>
                            <div className="text-[10px] font-mono text-muted mt-0.5">
                              {clause.statute}
                            </div>
                          </div>
                        </div>

                        {/* Core Statutory Summary (Direct legal protection) */}
                        <div className="mt-2 border-l-2 border-accent/70 bg-surface/30 p-2 text-xs text-ink/90 leading-relaxed font-mono">
                          {clause.summary}
                        </div>

                        {/* Expandable Provisions Drawer */}
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() => toggleLegalDetails(clause.id)}
                            className="font-mono text-[10px] text-accent hover:underline font-bold flex items-center gap-1"
                          >
                            <span>{isExpanded ? '- Hide Full Provisions' : `+ View Full Provisions (${clause.details.length})`}</span>
                          </button>

                          {isExpanded && (
                            <div className="mt-2 space-y-1.5 p-2 bg-bg border border-line/60 font-mono text-[11px] text-muted">
                              {clause.details.map((detail, idx) => (
                                <div key={idx} className="flex items-start gap-1.5">
                                  <span className="text-accent font-bold shrink-0">[{String(idx + 1).padStart(2, '0')}]</span>
                                  <span className="text-ink/80 leading-relaxed">{detail}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Legal Pills */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {clause.pills.map((pill) => (
                            <span
                              key={pill}
                              className="border border-line bg-surface px-2 py-0.5 font-mono text-[9px] text-ink"
                            >
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Direct Legal Action Link */}
                      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
                        {clause.externalLink && (
                          <a
                            href={clause.externalLink}
                            target={clause.externalLink.startsWith('#') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            onClick={() => onPlaySound?.('switch')}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline font-bold"
                          >
                            <span>{clause.externalLinkLabel}</span>
                            <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )}
                        <span className="font-mono text-[9px] text-muted tracking-widest uppercase">
                          LEGAL SHIELD
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>


        {/* Bottom Copyright Bar */}
        <div className="px-6 py-4 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-muted bg-surface/50">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} {PROFILE.fullName} ({PROFILE.brand}). All rights reserved.</span>
            <span className="hidden sm:inline text-line">|</span>
            <span className="hidden sm:inline">Built with curiosity and code.</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
            <button
              type="button"
              onClick={handleSelectTechSpecs}
              className="text-muted hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Tech Specs (6)
            </button>
            <button
              type="button"
              onClick={() => handleSelectLegalClause('trademarks')}
              className="text-muted hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Trademarks &amp; Fair Use
            </button>
            <button
              type="button"
              onClick={() => handleSelectLegalClause('khmer-nida')}
              className="text-muted hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Khmer NiDA Standards
            </button>
            <button
              type="button"
              onClick={() => handleSelectLegalClause('met-museum-cc0')}
              className="text-muted hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Met CC0 1.0 Public Domain
            </button>
            <button
              type="button"
              onClick={() => handleSelectLegalClause('as-is-warranty')}
              className="text-muted hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              "AS IS" Warranty Waiver
            </button>
            <button
              type="button"
              onClick={() => handleSelectLegalClause('privacy-sovereignty')}
              className="text-muted hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              Privacy (Zero Tracking)
            </button>
            <button
              type="button"
              onClick={() => handleSelectLegalClause('dmca-contact')}
              className="text-accent font-semibold hover:underline transition-colors"
            >
              DMCA / IP Inquiries
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
