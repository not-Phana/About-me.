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
} from './Icons';

const FOOTER_TECH_DOSSIERS = [
  {
    id: 'github-workspace',
    index: 'SPEC 01',
    category: 'CODE REPOSITORIES',
    name: 'GitHub Open-Source Architecture',
    subtitle: 'Zero templates, real commit history, and public code verification.',
    description:
      'Every project in this portfolio is an authentic, publicly inspectable build hosted on GitHub (github.com/phanaach4889). Built from scratch without pre-packaged templates. The site continuously queries GitHub\'s REST API for live commit counts, language breakdowns, and public release branches.',
    pills: ['8 Repositories', 'Zero Templates', 'GitHub REST API', 'Public Git Clones'],
    link: 'https://github.com/phanaach4889',
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
    link: 'https://phanaach4889.github.io/PK-Khmer-Type/',
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
    link: 'https://phanaach4889.github.io/PK-game/',
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
    link: 'https://phanaach4889.github.io/PK-icons/',
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
];

export default function Footer({ onNavigateHome, onPlaySound }) {
  const currentYear = new Date().getFullYear();
  const [copiedEmail, setCopiedEmail] = useState(false);

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
                        Phanna Kurosaki
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
                    href="https://phanaach4889.github.io/PK-Khmer-Type/"
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
                    href="https://phanaach4889.github.io/PK-game/"
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
                    href="https://phanaach4889.github.io/PK-icons/"
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

        {/* Studio Architectural Dossier & Technology Glossary */}
        <div className="border-b border-line bg-surface/20">
          {/* Header Bar */}
          <div className="p-6 sm:px-10 lg:px-12 py-6 border-b border-line flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="hud-label text-accent mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                <span>FOOTER DOSSIER // CORE DISCIPLINES, LINGUISTICS &amp; REAL BUILDS</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                How It Works: Technology &amp; Engineering Specs
              </h3>
            </div>
            <div className="font-mono text-xs text-muted">
              <span className="border border-line bg-bg px-3 py-1.5 text-accent font-bold inline-flex items-center gap-1.5">
                <span>6 ARCHITECTURAL DOSSIERS</span>
              </span>
            </div>
          </div>

          {/* 6-Card High-Density Architectural Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-line">
            {FOOTER_TECH_DOSSIERS.map((spec) => {
              const SpecIcon = spec.icon;
              return (
                <article
                  key={spec.id}
                  className="bg-bg p-6 sm:p-8 flex flex-col justify-between hover:bg-surface/60 transition-colors group card-laser-lift relative overflow-hidden"
                >
                  <div>
                    {/* Header: Index & Status */}
                    <div className="flex items-center justify-between font-mono text-xs text-muted mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold">{spec.index}</span>
                        <span>//</span>
                        <span className="text-[11px] text-muted">{spec.category}</span>
                      </div>
                      <span className="border border-accent/40 bg-accentDim px-2 py-0.5 text-[10px] text-accent font-semibold">
                        {spec.status}
                      </span>
                    </div>

                    {/* Title with Icon */}
                    <div className="flex items-start gap-3 mb-2">
                      <span className="p-1.5 rounded bg-surface border border-line text-accent shrink-0 mt-0.5 group-hover:scale-110 group-hover:border-accent transition-all">
                        <SpecIcon className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="font-display text-lg sm:text-xl font-bold text-ink group-hover:text-accent transition-colors">
                          {spec.name}
                        </h4>
                        <div className="text-xs font-mono text-accent/90 mt-0.5">
                          {spec.subtitle}
                        </div>
                      </div>
                    </div>

                    {/* Explanatory Body */}
                    <p className="mt-3 text-xs sm:text-[13px] text-muted leading-relaxed">
                      {spec.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {spec.pills.map((pill) => (
                        <span
                          key={pill}
                          className="border border-line bg-surface px-2.5 py-0.5 font-mono text-[10px] text-ink"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Link Action */}
                  <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                    {spec.link.startsWith('#') ? (
                      <a
                        href={spec.link}
                        onClick={(e) => handleLinkClick(e, spec.link.replace('#', ''))}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline font-semibold"
                      >
                        <span>{spec.linkLabel}</span>
                        <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <a
                        href={spec.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => onPlaySound?.('switch')}
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline font-semibold"
                      >
                        <span>{spec.linkLabel}</span>
                        <IconArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                      PK ARCHITECTURE
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="px-6 py-4 sm:px-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted bg-surface/50">
          <div>
            &copy; {currentYear} {PROFILE.fullName} ({PROFILE.brand}). All rights reserved.
          </div>
          <div>Built with curiosity and code.</div>
        </div>
      </div>
    </footer>
  );
}
