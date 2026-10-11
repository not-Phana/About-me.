import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
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
      <div className="mx-auto max-w-[1400px] border-x border-line">
        {/* Top architectural status bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-line px-5 py-2.5 sm:px-8 text-xs font-mono text-muted gap-3 bg-surface/40">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#4ade80]" />
            <span className="text-ink font-medium">{PROFILE.tagline}</span>
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
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-line">
            <div>
              <div className="hud-label text-accent mb-5">
                {PROFILE.heroSubheadline}
              </div>

              <h1 className="font-display text-4xl sm:text-6xl xl:text-[4.35rem] font-extrabold tracking-[-0.035em] leading-[1.03] text-ink">
                {PROFILE.heroHeadlineMain}{' '}
                <span className="font-serif italic font-normal text-accent block sm:inline">
                  {PROFILE.heroHeadlineAccent}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
                {PROFILE.heroSummary}
              </p>
            </div>

            {/* Action Buttons & Quick Ledger */}
            <div className="mt-10 pt-8 border-t border-lineSoft">
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onPlaySound?.('switch');
                    onExploreProjects();
                  }}
                  className="inline-flex items-center justify-center gap-2.5 bg-invertBg text-invertFg px-6 py-3.5 hud-label hover:opacity-90 transition-opacity"
                >
                  <span>Explore My Projects</span>
                  <IconArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="inline-flex items-center justify-center gap-2.5 border border-line bg-surface hover:border-ink text-ink px-6 py-3.5 hud-label transition-colors"
                >
                  <IconGitHub className="w-4 h-4" />
                  <span>Visit My GitHub</span>
                  <IconArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Verified Quick Architecture Summary */}
              <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-lineSoft font-mono">
                <div>
                  <div className="text-[11px] text-muted uppercase tracking-wider">
                    LIVE ON GITHUB PAGES
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-bold text-ink">
                    3 Web Apps
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted uppercase tracking-wider">
                    DOCUMENTED BUILDS
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-bold text-ink">
                    {PROJECTS.length} Projects
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted uppercase tracking-wider">
                    ARCHITECTURE
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-bold text-accent">
                    Zero Templates
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Playable 3-Mode Software Sandbox */}
          <div className="lg:col-span-5 bg-surface bg-architectural-grid flex flex-col justify-between p-6 sm:p-8 lg:p-10">
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

                  {/* Live Khmer Output Display */}
                  <div className="border border-line bg-surface p-3.5 flex items-center justify-between min-h-[60px]">
                    <div className="text-2xl sm:text-3xl font-bold text-ink tracking-wide">
                      {typedBuffer.length > 0 ? (
                        typedBuffer.map((k) => k.kh).join('')
                      ) : (
                        <span className="text-sm font-mono text-muted">
                          Click mechanical keycaps below...
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-accent border border-line bg-bg px-2 py-1">
                      {lastPressedKey.code} ({lastPressedKey.key})
                    </span>
                  </div>

                  {/* Interactive Mechanical Keycaps */}
                  <div className="grid grid-cols-4 gap-2">
                    {KHMER_DEMO_KEYS.map((k) => (
                      <button
                        key={k.key}
                        type="button"
                        onClick={() => handlePressKhmerKey(k)}
                        className="pk-keycap bg-surface hover:border-accent p-2.5 flex flex-col items-center justify-center"
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

                  {/* Interactive Tactical Grid Box */}
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
                    className="cursor-crosshair border border-line bg-surface p-3.5 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between text-[11px] text-accent mb-1">
                      <span>
                        ACTIVE SLOT: {NEON_SKILLS[selectedSkillIdx].slot} //{' '}
                        {NEON_SKILLS[selectedSkillIdx].name}
                      </span>
                      <span>{NEON_SKILLS[selectedSkillIdx].threat}</span>
                    </div>
                    <p className="text-ink text-xs leading-relaxed">
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
                        className={`pk-keycap p-2 text-left ${
                          selectedIconIdx !== undefined &&
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
