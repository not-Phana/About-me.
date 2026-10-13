import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import InteractiveCanvas from './InteractiveCanvas';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconGitHub,
  IconKeyboard,
  IconGamepad,
  IconGrid,
  IconCheck,
} from './Icons';

// Verified Khmer NiDA keystroke mappings from PK Khmer Type
const KHMER_DEMO_KEYS = [
  { key: 'X', kh: 'ខ', code: 'U+1781', role: 'Base Consonant (Kha)' },
  { key: 'J', kh: '្', code: 'U+17D2', role: 'Coeng Subscript Stacker' },
  { key: 'M', kh: 'ម', code: 'U+1798', role: 'Consonant (Ma)' },
  { key: 'E', kh: 'ែ', code: 'U+17C2', role: 'Dependent Vowel (Ae)' },
  { key: 'R', kh: 'រ', code: 'U+179A', role: 'Consonant (Ro)' },
  { key: 'K', kh: 'ក', code: 'U+1780', role: 'Base Consonant (Ka)' },
  { key: 'A', kh: 'ា', code: 'U+17B6', role: 'Dependent Vowel (Aa)' },
  { key: 'S', kh: 'ស', code: 'U+179F', role: 'Base Consonant (Sa)' },
];

// Verified Valkyrie Mk-IV tactical arsenal from NEON PROTOCOL // OVERDRIVE (PK-game)
const NEON_SKILLS = [
  {
    slot: '[Q]',
    name: 'Dimension Rift Katana',
    spec: '3-Hit X-Cross Plasma Cleave + 2.6x Projectile Parry Riposte',
    threat: 'MELEE / PARRY',
  },
  {
    slot: '[R]',
    name: 'Omega Ion Laser + Bits',
    spec: '1,150px Orbital Beam + 2 Autonomous Floating Fin-Funnel Bits',
    threat: 'ORBITAL BEAM',
  },
  {
    slot: '[F]',
    name: 'Chrono-Stasis Dome',
    spec: '265px Time-Freeze Matrix (82% Slow) + Orbital Bullet Capture',
    threat: 'TIME CONTROL',
  },
  {
    slot: '[X]',
    name: 'Phantom Squadron Swap',
    spec: 'Holographic Wingman + Voltaic Tether + Quantum Phase-Swap',
    threat: 'TACTICAL CLONE',
  },
  {
    slot: '[E]',
    name: 'Seraphim 6-Wing Overdrive',
    spec: '2.5x Fire Rate + Converts Hostile Bullets to Allied Missiles',
    threat: 'SUPERNOVA',
  },
  {
    slot: '[SPC]',
    name: 'Phase-Rift Siphon Dash',
    spec: 'Invulnerability Dash Siphoning Nearby Bullets into +6% Charge',
    threat: 'IFRAME DASH',
  },
];

// Verified 24x24 vectors from PK Icons Studio
const ICON_SAMPLES = [
  {
    name: 'code-lab',
    svgPath: '<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />',
    render: () => (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
  },
  {
    name: 'terminal',
    svgPath: '<polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />',
    render: () => (
      <>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </>
    ),
  },
  {
    name: 'quantum-core',
    svgPath: '<circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" />',
    render: () => (
      <>
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
  },
  {
    name: 'layers',
    svgPath:
      '<polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />',
    render: () => (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
  },
  {
    name: 'target',
    svgPath:
      '<circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />',
    render: () => (
      <>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
  },
  {
    name: 'shield',
    svgPath: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />',
    render: () => <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

export default function HeroSection({
  onExploreProjects,
  onSelectProject,
  onPlaySound,
  onOpenCommandPalette,
}) {
  const [activeTabId, setActiveTabId] = useState('pk-khmer-type');

  // State for Mode 1: Interactive Khmer NiDA Keycap Deck
  const [typedBuffer, setTypedBuffer] = useState([
    KHMER_DEMO_KEYS[0], // ខ
    KHMER_DEMO_KEYS[1], // ្
    KHMER_DEMO_KEYS[2], // ម
    KHMER_DEMO_KEYS[3], // ែ
    KHMER_DEMO_KEYS[4], // រ
  ]);
  const [lastPressedKey, setLastPressedKey] = useState(KHMER_DEMO_KEYS[4]);
  const [burstKey, setBurstKey] = useState(0);

  // State for Mode 2: Interactive NEON PROTOCOL Skill & Radar Inspector
  const [selectedSkillIdx, setSelectedSkillIdx] = useState(0);
  const [radarCoords, setRadarCoords] = useState({ x: 2140, y: 1890 });

  // State for Mode 3: Interactive PK Icons Customizer
  const [selectedIconIdx, setSelectedIconIdx] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(2.2);
  const [copiedSvg, setCopiedSvg] = useState(false);

  const matchedProject = PROJECTS.find((p) => p.id === activeTabId);

  const handlePressKhmerKey = (keyObj) => {
    onPlaySound?.('keycap');
    setLastPressedKey(keyObj);
    setTypedBuffer((prev) => [...prev.slice(-9), keyObj]);
    setBurstKey((prev) => prev + 1);
  };

  const handleSpellKhmerWord = () => {
    onPlaySound?.('pulse');
    setTypedBuffer([
      KHMER_DEMO_KEYS[0],
      KHMER_DEMO_KEYS[1],
      KHMER_DEMO_KEYS[2],
      KHMER_DEMO_KEYS[3],
      KHMER_DEMO_KEYS[4],
    ]);
    setLastPressedKey(KHMER_DEMO_KEYS[4]);
    setBurstKey((prev) => prev + 1);
  };

  const handleCopyIconSvg = () => {
    const icon = ICON_SAMPLES[selectedIconIdx];
    const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${icon.svgPath}</svg>`;
    navigator.clipboard?.writeText(rawSvg);
    onPlaySound?.('pulse');
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 1800);
  };

  return (
    <section
      id="home"
      className="relative border-b border-line bg-bg overflow-hidden"
    >
      {/* Interactive Cyber-Celestial Constellation Canvas Background */}
      <InteractiveCanvas />

      {/* Monumental Classical Greek Typography Watermark in Background (Unobstructed in Editorial Column) */}
      <div
        aria-hidden="true"
        className="hero-watermark-ambient pointer-events-none select-none absolute inset-y-0 left-0 w-full lg:w-[58%] z-0 flex flex-col items-center lg:items-start justify-center px-6 sm:px-12 lg:px-16 overflow-hidden opacity-45"
      >
        <div
          lang="el"
          data-bg-motion="hero-epigraph"
          className="font-classical italic text-[11px] sm:text-xs tracking-[0.24em] text-accent/60 mb-1 select-none flex items-center gap-2"
        >
          <span className="w-3 h-[1px] bg-accent/40 inline-block" />
          <span>// ΕΠΙΓΡΑΦΗ · PHANA KUROSAKI //</span>
          <span className="w-3 h-[1px] bg-accent/40 inline-block" />
        </div>

        <div className="font-classical font-semibold tracking-[-0.015em] text-center lg:text-left leading-[0.88] select-none">
          <div
            data-bg-motion="hero-name-1"
            className="text-[3.8rem] sm:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] whitespace-nowrap text-stroke-watermark"
          >
            Phana
          </div>
          <div
            data-bg-motion="hero-name-2"
            className="text-[3.8rem] sm:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] whitespace-nowrap text-stroke-watermark-gold"
          >
            Kurosaki
          </div>
        </div>

        <div
          lang="el"
          data-bg-motion="hero-greek"
          className="font-classical italic tracking-[0.22em] text-[11px] sm:text-xs text-accent/50 mt-2.5 select-none flex items-center gap-2"
        >
          <span>Φάννα Κυροσάκι</span>
          <span className="text-[9px] font-mono opacity-60">· [BUILDER &amp; ARCHITECT]</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] border-x border-line">
        {/* Top architectural status bar */}
        <div className="hero-enter-1 flex flex-wrap items-center justify-between border-b border-line px-5 py-2.5 sm:px-8 text-xs font-mono text-muted gap-3 bg-surface/40 backdrop-blur-xs">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#4ade80] beacon-pulse" />
            <span className="text-ink font-medium">{PROFILE.tagline}</span>
            {/* Live Audio Frequency Spectrum Telemetry (8-Bar Animated Analyzer) */}
            <div className="hidden sm:inline-flex items-end gap-[2.5px] h-3.5 ml-2.5 opacity-90" title="Live Hardware Audio Engine Telemetry">
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-1 inline-block" />
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-2 inline-block" />
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-3 inline-block" />
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-4 inline-block" />
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-5 inline-block" />
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-6 inline-block" />
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-7 inline-block" />
              <span className="w-1 bg-[#4ade80] rounded-xs animate-eq-8 inline-block" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>IDENTITY: {PROFILE.brand} // {PROFILE.fullName.toUpperCase()}</span>
            <span className="hidden md:inline text-line">|</span>
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="hidden sm:inline text-accent hover:underline"
            >
              [PRESS CTRL+K FOR QUICK LAUNCHER]
            </button>
          </div>
        </div>

        {/* Main Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="hero-enter-2 lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-line">
            <div>
              {/* Museum Curator Folio Plaque with Classical Serif Full Name & Laser Scanner */}
              <div className="hero-enter-2 mb-6 border-l-2 border-accent/60 pl-3.5 sm:pl-4 py-0.5 relative laser-scanner-line">
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-accent font-bold mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>EXHIBITION FOLIO 01 // INDEPENDENT DEVELOPER</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="font-classical text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[var(--ms-ivory)] leading-none tracking-normal">
                    {PROFILE.fullName}
                  </span>
                  <span
                    lang="el"
                    className="font-classical italic text-sm sm:text-base tracking-[0.16em] text-[var(--ms-limestone)]"
                  >
                    Φάννα Κυροσάκι
                  </span>
                  <span className="border border-[var(--ms-rule-strong)] bg-[var(--ms-surface)] px-2 py-0.5 font-mono text-[9px] text-[var(--ms-limestone)] tracking-widest uppercase">
                    PK // KON
                  </span>
                </div>
              </div>

              <div className="hud-label text-accent mb-5">
                {PROFILE.heroSubheadline}
              </div>

              <h1 className="hero-enter-3 font-display text-4xl sm:text-6xl xl:text-[4.35rem] font-extrabold tracking-[-0.035em] leading-[1.03] text-ink">
                {PROFILE.heroHeadlineMain}{' '}
                <span
                  ref={(el) => {
                    if (el && !el.dataset.underlineInit) {
                      el.dataset.underlineInit = 'true';
                      requestAnimationFrame(() => {
                        el.classList.add('go');
                      });
                    }
                  }}
                  onClick={(e) => {
                    const el = e.currentTarget;
                    el.classList.remove('go');
                    void el.offsetWidth;
                    el.classList.add('go');
                  }}
                  title="Click to replay hand-drawn underline"
                  className="headline-wrap cursor-pointer"
                >
                  <span className="font-serif italic font-normal text-shimmer-gold">
                    {PROFILE.heroHeadlineAccent}
                  </span>
                  <svg
                    className="hand-drawn-underline"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 7 C 60 2, 120 11, 180 5 S 260 3, 296 8"
                      fill="none"
                      stroke="#c9a227"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="340"
                      strokeDashoffset="340"
                    />
                  </svg>
                </span>
              </h1>

              <p className="hero-enter-4 mt-8 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
                {PROFILE.heroSummary}
              </p>
            </div>

            {/* Action Buttons & Quick Ledger */}
            <div className="hero-enter-4 mt-10 pt-8 border-t border-lineSoft">
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onPlaySound?.('switch');
                    onExploreProjects();
                  }}
                  className="btn-laser-sweep inline-flex items-center justify-center gap-2.5 bg-invertBg text-invertFg px-6 py-3.5 hud-label hover:opacity-90 shadow-md"
                >
                  <span>Explore My Projects</span>
                  <IconArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="btn-laser-sweep inline-flex items-center justify-center gap-2.5 border border-line bg-surface hover:border-ink text-ink px-6 py-3.5 hud-label transition-colors"
                >
                  <IconGitHub className="w-4 h-4" />
                  <span>Visit My GitHub</span>
                  <IconArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Verified Quick Architecture Summary with Interactive Hover Cards */}
              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-lineSoft font-mono">
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound?.('switch');
                    onExploreProjects?.();
                  }}
                  className="hud-frame p-2.5 sm:p-3 border border-line/60 bg-surface/30 hover:bg-surface/80 hover:border-accent hover-anim-pulse transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  title="Explore Web Apps"
                >
                  <div className="text-[10px] sm:text-[11px] text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] beacon-pulse" />
                    <span className="truncate">PAGES</span>
                  </div>
                  <div className="mt-1 text-base sm:text-xl font-bold text-ink">
                    3 Web Apps
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound?.('switch');
                    onExploreProjects?.();
                  }}
                  className="hud-frame p-2.5 sm:p-3 border border-line/60 bg-surface/30 hover:bg-surface/80 hover:border-accent hover-anim-tilt transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  title="View Projects"
                >
                  <div className="text-[10px] sm:text-[11px] text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="truncate">BUILDS</span>
                  </div>
                  <div className="mt-1 text-base sm:text-xl font-bold text-ink">
                    {PROJECTS.length} Projects
                  </div>
                </button>
                <a
                  href="#console"
                  onClick={() => {
                    onPlaySound?.('switch');
                  }}
                  className="hud-frame p-2.5 sm:p-3 border border-line/60 bg-surface/30 hover:bg-surface/80 hover:border-accent hover-anim-sweep transition-all duration-200 cursor-pointer text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent block"
                  title="Inspect Architecture Stack"
                >
                  <div className="text-[10px] sm:text-[11px] text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" />
                    <span className="truncate">STACK</span>
                  </div>
                  <div className="mt-1 text-base sm:text-xl font-bold text-accent">
                    Zero Templates
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Live Playable 3-Mode Software Sandbox */}
          <div className="hero-enter-3 lg:col-span-5 bg-surface bg-architectural-grid flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
                <span className="hud-label text-ink">
                  INTERACTIVE STUDIO SANDBOX // TRY LIVE
                </span>
                <span className="font-mono text-[11px] text-accent">
                  PLAYABLE PREVIEW
                </span>
              </div>

              {/* Mode Selector Tabs */}
              <div
                role="tablist"
                aria-label="Interactive software sandboxes"
                className="grid grid-cols-3 border border-line bg-bg mb-4"
              >
                {[
                  {
                    id: 'pk-khmer-type',
                    code: '01 // TYPE',
                    label: 'Khmer Deck',
                    icon: IconKeyboard,
                  },
                  {
                    id: 'neon-protocol-overdrive',
                    code: '02 // GAME',
                    label: 'Neon Radar',
                    icon: IconGamepad,
                  },
                  {
                    id: 'pk-icons-studio',
                    code: '03 // SVG',
                    label: 'PK Icons',
                    icon: IconGrid,
                  },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const selected = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      onClick={() => {
                        onPlaySound?.('switch');
                        setActiveTabId(tab.id);
                      }}
                      className={`flex flex-col items-start gap-1 p-3 text-left border-r last:border-r-0 border-line transition-colors ${
                        selected
                          ? 'bg-invertBg text-invertFg'
                          : 'text-muted hover:text-ink hover:bg-surface2'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between font-mono text-[10px]">
                        <span>{tab.code}</span>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="font-mono text-xs font-bold truncate w-full">
                        {tab.label}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* SANDBOX MODE 1: PK Khmer Type Interactive Abugida Deck */}
              {activeTabId === 'pk-khmer-type' && (
                <div className="border border-line bg-bg p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-lineSoft pb-3">
                    <div>
                      <div className="font-mono text-[10px] text-accent uppercase">
                        PK KHMER TYPE // INTERACTIVE NIDA DECK
                      </div>
                      <div className="font-display text-lg font-bold text-ink">
                        Click Keys to Stack Khmer Script
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={handleSpellKhmerWord}
                        className="border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-accent hover:border-accent"
                      >
                        Reset &ldquo;ខ្មែរ&rdquo;
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onPlaySound?.('switch');
                          setTypedBuffer([]);
                        }}
                        className="border border-line bg-surface px-2.5 py-1 font-mono text-[10px] text-muted hover:text-ink"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Live Khmer Output Display with Key Burst Bounce Pop */}
                  <div className="border border-line bg-surface p-3.5 flex items-center justify-between min-h-[60px] overflow-hidden">
                    <div
                      key={burstKey}
                      className="animate-key-burst text-2xl sm:text-3xl font-bold text-ink tracking-wide"
                    >
                      {typedBuffer.length > 0 ? (
                        typedBuffer.map((k, idx) => (
                          <span key={idx} className="inline-block transition-transform hover:scale-110">
                            {k.kh}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm font-mono text-muted">
                          Click mechanical keycaps below...
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-accent border border-line bg-bg px-2 py-1 shadow-xs">
                      {lastPressedKey.code} ({lastPressedKey.key})
                    </span>
                  </div>

                  {/* Interactive Mechanical Keycaps with tactile active pop */}
                  <div className="grid grid-cols-4 gap-2">
                    {KHMER_DEMO_KEYS.map((k) => (
                      <button
                        key={k.key}
                        type="button"
                        onClick={() => handlePressKhmerKey(k)}
                        className="pk-keycap bg-surface hover:border-accent active:scale-90 transition-all duration-100 p-2.5 flex flex-col items-center justify-center hover:bg-surface2"
                      >
                        <span className="font-mono text-[10px] text-muted">
                          Key [{k.key}]
                        </span>
                        <span className="text-lg font-bold text-accent mt-0.5">
                          {k.kh}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="font-mono text-[11px] text-muted flex items-center justify-between pt-1">
                    <span>Last Key: {lastPressedKey.role}</span>
                    <span>218 Full Lessons</span>
                  </div>
                </div>
              )}

              {/* SANDBOX MODE 2: NEON PROTOCOL Tactical Arsenal & Radar */}
              {activeTabId === 'neon-protocol-overdrive' && (
                <div className="border border-line bg-bg p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-lineSoft pb-3">
                    <div>
                      <div className="font-mono text-[10px] text-accent uppercase">
                        NEON PROTOCOL // VALKYRIE MK-IV HUD
                      </div>
                      <div className="font-display text-lg font-bold text-ink">
                        6-Skill Tactical Arsenal Inspector
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#4ade80]">
                      SECTOR: {radarCoords.x} : {radarCoords.y}
                    </span>
                  </div>

                  {/* Interactive Tactical Animated Radar Scope */}
                  <div
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const nx = Math.round(
                        ((e.clientX - rect.left) / rect.width) * 4200
                      );
                      const ny = Math.round(
                        ((e.clientY - rect.top) / rect.height) * 4200
                      );
                      setRadarCoords({ x: nx, y: ny });
                    }}
                    onClick={() => onPlaySound?.('pulse')}
                    className="relative cursor-crosshair border border-line bg-[#08090c] p-2.5 overflow-hidden group select-none"
                  >
                    {/* Radar SVG Visual Scope */}
                    <div className="relative w-full h-[135px] flex items-center justify-center overflow-hidden">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 380 135"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        {/* Center horizontal & vertical range axis */}
                        <line x1="0" y1="67.5" x2="380" y2="67.5" stroke="#4ade80" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4 4" />
                        <line x1="190" y1="0" x2="190" y2="135" stroke="#4ade80" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4 4" />

                        {/* Concentric distance rings */}
                        <circle cx="190" cy="67.5" r="28" stroke="#4ade80" strokeWidth="0.75" strokeOpacity="0.32" fill="none" />
                        <circle cx="190" cy="67.5" r="54" stroke="#4ade80" strokeWidth="0.75" strokeOpacity="0.22" fill="none" strokeDasharray="3 3" />
                        <circle cx="190" cy="67.5" r="82" stroke="#4ade80" strokeWidth="0.75" strokeOpacity="0.14" fill="none" />

                        {/* Target Blip 1: Valkyrie Mk-IV (Center) */}
                        <circle cx="190" cy="67.5" r="3.5" fill="#4ade80" />
                        <circle cx="190" cy="67.5" r="8" stroke="#4ade80" strokeWidth="0.8" fill="none" className="radar-blip-ping" />

                        {/* Target Blip 2: Orbital Bit Alpha */}
                        <circle cx="155" cy="42" r="2.5" fill="#38bdf8" />
                        <text x="160" y="40" fill="#38bdf8" fontSize="8" fontFamily="monospace" opacity="0.85">BIT-01</text>

                        {/* Target Blip 3: Orbital Bit Beta */}
                        <circle cx="225" cy="92" r="2.5" fill="#38bdf8" />
                        <text x="230" y="96" fill="#38bdf8" fontSize="8" fontFamily="monospace" opacity="0.85">BIT-02</text>

                        {/* Target Blip 4: Hostile Target */}
                        <circle cx="255" cy="38" r="3" fill="#f87171" />
                        <circle cx="255" cy="38" r="9" stroke="#f87171" strokeWidth="0.8" fill="none" className="radar-blip-ping" />
                        <text x="263" y="36" fill="#f87171" fontSize="8" fontFamily="monospace" opacity="0.9">HOSTILE // 3,420M</text>

                        {/* Rotating 360-degree radar beam sweep */}
                        <g transform="translate(190, 67.5)">
                          <g className="animate-radar-sweep">
                            <line x1="0" y1="0" x2="115" y2="0" stroke="#4ade80" strokeWidth="1.5" strokeOpacity="0.85" />
                            <polygon points="0,0 115,-40 115,0" fill="url(#radarSweepGrad)" />
                          </g>
                        </g>

                        <defs>
                          <linearGradient id="radarSweepGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
                            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.25" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* HUD Corner telemetry overlay */}
                      <div className="absolute top-1 left-2 font-mono text-[9px] text-[#4ade80]/80">
                        RANGE: 4,200M // 60 FPS
                      </div>
                      <div className="absolute top-1 right-2 font-mono text-[9px] text-accent">
                        TRACK: {radarCoords.x}:{radarCoords.y}
                      </div>
                    </div>

                    {/* Active Tactical Skill Spec Readout */}
                    <div className="mt-2.5 pt-2 border-t border-lineSoft flex items-center justify-between text-[11px] text-accent">
                      <span>
                        ACTIVE: {NEON_SKILLS[selectedSkillIdx].slot} // {NEON_SKILLS[selectedSkillIdx].name}
                      </span>
                      <span className="font-mono text-[10px] text-muted">{NEON_SKILLS[selectedSkillIdx].threat}</span>
                    </div>
                    <p className="mt-1 text-ink text-xs leading-relaxed font-mono">
                      {NEON_SKILLS[selectedSkillIdx].spec}
                    </p>
                  </div>

                  {/* 6 Skill Selector Buttons */}
                  <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                    {NEON_SKILLS.map((sk, idx) => (
                      <button
                        key={sk.slot}
                        type="button"
                        onClick={() => {
                          onPlaySound?.('keycap');
                          setSelectedSkillIdx(idx);
                        }}
                        className={`pk-keycap p-2 text-left active:scale-95 transition-all duration-100 ${
                          selectedSkillIdx === idx
                            ? 'bg-invertBg text-invertFg font-bold'
                            : 'bg-surface text-muted hover:text-ink'
                        }`}
                      >
                        <div className="text-[10px] opacity-75">{sk.slot}</div>
                        <div className="truncate text-[11px]">
                          {sk.name.split(' ')[0]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SANDBOX MODE 3: PK Icons Studio Live Stroke Customizer */}
              {activeTabId === 'pk-icons-studio' && (
                <div className="border border-line bg-bg p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-lineSoft pb-3">
                    <div>
                      <div className="font-mono text-[10px] text-accent uppercase">
                        PK ICONS STUDIO // LIVE CUSTOMIZER
                      </div>
                      <div className="font-display text-lg font-bold text-ink">
                        24x24 Vector Stroke Inspector
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyIconSvg}
                      className="inline-flex items-center gap-1.5 border border-accent bg-accentDim px-3 py-1 font-mono text-[11px] text-ink hover:bg-accent hover:text-[#0b0b0c] font-semibold transition-colors"
                    >
                      {copiedSvg ? (
                        <>
                          <IconCheck className="w-3.5 h-3.5" />
                          <span>Copied SVG!</span>
                        </>
                      ) : (
                        <span>Copy Raw SVG</span>
                      )}
                    </button>
                  </div>

                  {/* Stroke Width Control */}
                  <div className="flex items-center justify-between gap-4 border border-line bg-surface px-3.5 py-2.5 font-mono text-xs">
                    <label htmlFor="hero-stroke-slider" className="text-muted">
                      STROKE WIDTH: <strong className="text-ink">{strokeWidth}px</strong>
                    </label>
                    <input
                      id="hero-stroke-slider"
                      type="range"
                      min="1.2"
                      max="3.0"
                      step="0.2"
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(Number(e.target.value))}
                      className="w-32 accent-[var(--accent)] cursor-pointer"
                    />
                  </div>

                  {/* Icon Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {ICON_SAMPLES.map((ic, idx) => (
                      <button
                        key={ic.name}
                        type="button"
                        onClick={() => {
                          onPlaySound?.('keycap');
                          setSelectedIconIdx(idx);
                        }}
                        className={`p-3 border flex flex-col items-center justify-center gap-1.5 transition-colors ${
                          selectedIconIdx === idx
                            ? 'border-accent bg-accentDim text-ink'
                            : 'border-line bg-surface text-muted hover:text-ink'
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={strokeWidth}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-6 h-6"
                        >
                          {ic.render()}
                        </svg>
                        <span className="font-mono text-[10px] truncate w-full text-center">
                          {ic.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Inspector Footer */}
            <div className="mt-5 flex items-center justify-between pt-3 border-t border-line font-mono text-xs">
              {matchedProject?.liveUrl ? (
                <a
                  href={matchedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:underline font-semibold"
                >
                  <span>Open Full {matchedProject.name}</span>
                  <IconArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-muted">STATUS: VERIFIED BUILD</span>
              )}

              {matchedProject && (
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound?.('switch');
                    onSelectProject(matchedProject.id);
                  }}
                  className="inline-flex items-center gap-1.5 text-ink hover:text-accent font-semibold transition-colors"
                >
                  <span>Inspect Architecture</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
