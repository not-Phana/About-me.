import React, { useState, useEffect } from 'react';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconGitHub,
  IconTerminal,
  IconCpu,
  IconCode,
} from './Icons';

/**
 * IncubationSlotCard Component
 * Fills the remaining grid slot (e.g. Slot 09 in a 3-column grid) with an
 * interactive, visually stunning R&D Incubation & Mystery Build Card.
 * Includes interactive 3D perspective tilt, 3 holographic preview modes,
 * and quick collaboration triggers.
 */
export default function IncubationSlotCard({
  slotNumber = '09',
  category = 'INCUBATION LAB',
  status = 'IN DESIGN PHASE',
  title = 'Classified Build // Next Project',
  badge = 'R&D',
  description = 'Currently architecting my next experimental tool—prototyping an offline-first WebAssembly engine, mechanical audio synthesis, and custom canvas rendering. Got an idea or want to collaborate?',
  technologies = ['WebAssembly', 'Rust', 'Canvas 60FPS', 'AI Agents'],
  onPlaySound,
  onOpenCommandPalette,
}) {
  const [tiltStyle, setTiltStyle] = useState({});
  const [activeVisualMode, setActiveVisualMode] = useState(0); // 0: Radar, 1: Matrix, 2: Oscilloscope
  const [scanTick, setScanTick] = useState(0);

  // Subtle pulsing animation tick for live visual readout
  useEffect(() => {
    const timer = setInterval(() => {
      setScanTick((t) => (t + 1) % 100);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const visualModes = [
    { key: 'radar', label: 'RADAR SCANNER', icon: IconCpu },
    { key: 'terminal', label: 'MATRIX STREAM', icon: IconTerminal },
    { key: 'wave', label: 'OSCILLOSCOPE', icon: IconCode },
  ];

  const handleCycleMode = (e) => {
    e.stopPropagation();
    onPlaySound?.('switch');
    setActiveVisualMode((prev) => (prev + 1) % visualModes.length);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--px', `${x}px`);
    e.currentTarget.style.setProperty('--py', `${y}px`);

    const rx = ((y / rect.height - 0.5) * -3.2).toFixed(2);
    const ry = ((x / rect.width - 0.5) * 3.2).toFixed(2);
    setTiltStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    });
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--px', '-500px');
    e.currentTarget.style.setProperty('--py', '-500px');
    setTiltStyle({});
  };

  const handleScrollToContact = () => {
    onPlaySound?.('switch');
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="spotlight-card card-laser-lift group flex flex-col justify-between bg-bg p-6 sm:p-8 transition-colors border border-accent/25 relative overflow-hidden"
    >
      {/* Background cybernetic grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(var(--accent) 1px, transparent 1px), linear-gradient(to right, rgba(201,162,39,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,162,39,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 24px 24px, 24px 24px',
        }}
        aria-hidden="true"
      />

      <div>
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted mb-4 relative z-10">
          <span className="flex items-center gap-1.5">
            <span className="text-accent font-bold">{slotNumber}</span>
            <span>//</span>
            <span className="text-accent">{category}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 border border-accent/40 bg-accentDim px-2.5 py-0.5 text-[11px] text-accent font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span>{status}</span>
          </span>
        </div>

        {/* Visual Preview Container */}
        <div
          onClick={handleCycleMode}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCycleMode(e);
            }
          }}
          aria-label="Cycle classified preview visual mode"
          className="hud-frame cursor-pointer border border-accent/40 group-hover:border-accent aspect-[16/10] mb-5 overflow-hidden transition-colors focus-visible:outline-accent bg-[#07090c] relative flex flex-col justify-between p-3.5 select-none"
        >
          {/* Top HUD overlay */}
          <div className="flex items-center justify-between text-[10px] font-mono text-accent/80 z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>SIGNAL: SECURE // 60 FPS</span>
            </div>
            <button
              type="button"
              onClick={handleCycleMode}
              className="text-[9px] border border-accent/30 bg-surface px-1.5 py-0.5 text-accent hover:border-accent transition-colors"
            >
              MODE: {visualModes[activeVisualMode].label} [CLICK]
            </button>
          </div>

          {/* Mode 0: Holographic Radar Scanner */}
          {activeVisualMode === 0 && (
            <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
              {/* Concentric radar rings */}
              <div className="absolute w-28 h-28 rounded-full border border-accent/20 animate-pulse" />
              <div className="absolute w-20 h-20 rounded-full border border-accent/30" />
              <div className="absolute w-12 h-12 rounded-full border border-accent/40" />

              {/* Crosshairs */}
              <div className="absolute w-32 h-[1px] bg-accent/20" />
              <div className="absolute h-32 w-[1px] bg-accent/20" />

              {/* Sweeping radar scanner line */}
              <div
                className="absolute w-28 h-28 rounded-full pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(201,162,39,0.35) 0deg, rgba(201,162,39,0.05) 50deg, transparent 75deg)',
                  animation: 'radarSweep 3s linear infinite',
                }}
              />

              {/* Target Blips */}
              <div
                className="absolute w-2 h-2 rounded-full bg-accent animate-ping"
                style={{ top: '28%', left: '62%' }}
              />
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-[#ffd978]"
                style={{ bottom: '34%', left: '38%' }}
              />

              <div className="absolute font-mono text-[9px] text-[#8c9099] tracking-widest bottom-0 right-1">
                RADAR: 42.8N // 104.9E
              </div>
            </div>
          )}

          {/* Mode 1: Matrix Stream Terminal */}
          {activeVisualMode === 1 && (
            <div className="relative flex-1 flex flex-col justify-center my-2 font-mono text-[10px] text-[#34d399] leading-snug space-y-1 overflow-hidden px-2">
              <div className="text-accent/90">&gt; KERNEL_INIT: OK</div>
              <div className="text-[#a7f3d0] truncate">
                &gt; WASM_THREAD_01: ALLOCATING 64MB
              </div>
              <div className="text-muted truncate">
                &gt; COMPILED_TARGET: x86_64-pc-windows-msvc
              </div>
              <div className="text-accent flex items-center gap-1 font-bold">
                <span>&gt; NEXT_BUILD: CLASSIFIED</span>
                <span className="w-1.5 h-3 bg-accent animate-pulse inline-block" />
              </div>
            </div>
          )}

          {/* Mode 2: Audio Synth Oscilloscope */}
          {activeVisualMode === 2 && (
            <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
              <svg
                viewBox="0 0 200 60"
                className="w-full h-full text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M0 30 Q25 5, 50 30 T100 30 T150 30 T200 30"
                  className="opacity-40"
                />
                <path
                  d="M0 30 Q15 10, 30 30 T60 30 T90 10 T120 50 T150 30 T180 20 T200 30"
                  className="filter drop-shadow-[0_0_4px_currentColor]"
                />
              </svg>
              <div className="absolute top-1 left-2 font-mono text-[9px] text-accent/80">
                SYNTH OSC // 440Hz SINE
              </div>
            </div>
          )}

          {/* Bottom HUD metadata */}
          <div className="flex items-center justify-between text-[9px] font-mono text-muted border-t border-accent/20 pt-1.5 z-10">
            <span>SYS // PROTOTYPE_DECK</span>
            <span className="text-accent font-bold">STATUS: COMPILING</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-accent transition-colors flex items-center gap-2">
          <span>{title}</span>
          <span className="text-xs font-mono text-accent border border-accent/30 px-1.5 py-0.5 uppercase tracking-wider">
            {badge}
          </span>
        </h3>

        <p className="mt-2 text-sm text-muted leading-relaxed">
          {description}
        </p>

        {/* Planned Technology Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-accent font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Triggers */}
      <div className="mt-6 pt-5 border-t border-lineSoft flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleScrollToContact}
          className="btn-laser-sweep inline-flex items-center gap-2 border border-accent bg-accent text-[#0b0b0c] px-4 py-2 font-mono text-xs font-bold hover:opacity-90 shadow-sm"
        >
          <span>Suggest an Idea / Contact</span>
          <IconArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href="https://github.com/phanaach4889"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onPlaySound?.('switch')}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors py-1"
        >
          <IconGitHub className="w-3.5 h-3.5" />
          <span>Follow on GitHub</span>
          <IconArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </article>
  );
}
