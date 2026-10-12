import React, { useState } from 'react';
import {
  IconTerminal,
  IconKeyboard,
  IconGamepad,
  IconCode,
  IconCpu,
  IconGrid,
  IconArrowRight,
  IconCheck,
  IconMousePointer,
} from './Icons';

const CONSOLE_TOPICS = [
  {
    key: 'whoami',
    label: 'whoami',
    icon: IconTerminal,
    command: 'pk explain --identity',
    lines: [
      'Name: Phana Kurosaki (Preferred display name: Phana · Online alias: KON · Brand: PK).',
      'Focus: Building software, websites, developer tools, and interactive games from scratch.',
      'Approach: Use AI as a collaborator to build faster while inspecting and understanding the underlying code, event loops, and system architecture.',
    ],
    projectSlug: null,
  },
  {
    key: 'khmer-nida',
    label: 'khmer-nida',
    icon: IconKeyboard,
    command: 'pk inspect pk-khmer-type --layout=nida',
    lines: [
      'Khmer is an abugida script where dependent vowels and Coeng subscript consonants attach around a base consonant across 4 modifier layers (Base, Shift, Ctrl, AltGr).',
      'In PK Khmer Type, the base consonant is always typed first: pressing [K] (ក) + [A] (ា) produces កា. To stack a subscript consonant on Khmer NiDA, press [J] (្) followed by the second consonant.',
      'PK Khmer Type ships with 40 progressive levels, 218 lessons, 664+ exercises, 3D kinematic hand guides, procedural Web Audio switches, and a real-time mastery heatmap dashboard.',
    ],
    projectSlug: 'pk-khmer-type',
  },
  {
    key: 'neon-engine',
    label: 'neon-engine',
    icon: IconGamepad,
    command: 'pk inspect pk-game --engine=canvas-webaudio',
    lines: [
      'NEON PROTOCOL // OVERDRIVE (PK-game) runs a custom 60 FPS HTML5 Canvas loop across a 4,200 x 4,200 cyber-grid with zero external game engine dependencies.',
      'All audio is synthesized live in the browser via a 4-track multi-BPM WebAudio engine—no external MP3/WAV files required.',
      'Features 6 active tactical skills ([Q] Dimension Rift Katana with projectile parry, [R] Omega Ion Laser, [F] Chrono-Stasis Dome, [X] Phantom Clone Swap, [E] Seraphim Overdrive, [SPACE] Siphon Dash).',
    ],
    projectSlug: 'neon-protocol-overdrive',
  },
  {
    key: 'studio-code',
    label: 'studio-code',
    icon: IconCode,
    command: 'pk inspect pk-studio-code --status',
    lines: [
      'PK Studio Code is my in-development browser/desktop IDE built around the Microsoft Monaco Editor engine.',
      'Includes an integrated interactive REPL terminal, AST diagnostic problems table, a custom PKPluginSystem event bus, 5 editor themes, and a zero-dependency Node SSE hot-reload server.',
      'Status: Local workspace build in active development (not yet published to a public repository).',
    ],
    projectSlug: 'pk-studio-code',
  },
  {
    key: 'kon-ai',
    label: 'kon-ai',
    icon: IconCpu,
    command: 'pk inspect kon --architecture',
    lines: [
      'KON (PK Intelligence) is my personal AI coding assistant experiment built to explain code, trace bugs, and test streaming LLM workflows.',
      'Uses a local Express backend on port 5000 with Server-Sent Events (SSE) token streaming so API keys never leak into client-side JavaScript.',
      'Status: Personal local prototype and learning sandbox.',
    ],
    projectSlug: 'kon-ai-companion',
  },
  {
    key: 'pk-icons',
    label: 'pk-icons',
    icon: IconGrid,
    command: 'pk inspect pk-icons --spec=24x24',
    lines: [
      'PK Icons Studio is a pixel-perfect 24x24 stroke SVG icon collection (50 custom icons) built to replace generic emojis across all PK interfaces.',
      'Includes an interactive browser customizer for stroke width and size, instant keyword search, JS module string exports, and batch ZIP downloads.',
    ],
    projectSlug: 'pk-icons-studio',
  },
  {
    key: 'cursor-lab',
    label: 'cursor-fx',
    icon: IconMousePointer,
    command: 'pk test --cursor-and-hover-fx',
    lines: [
      'Step 1: Dual-Layer Architectural Cursor — Zero-latency center tracking dot + fluid lerp follower ring. Contextually transforms into an I-beam over inputs and expands over interactive links and buttons.',
      'Step 2: Isolated Hover Effects — Experience 3 distinct, non-conflicting hover animations: Heartbeat Pulse (Ver 1), 3D Perspective Tilt (Ver 2), and Radiant Light Sweep (Ver 3).',
      'Try hovering over the interactive test targets below or typing in the terminal input to observe the morphing states live.',
    ],
    projectSlug: null,
    isCursorLab: true,
  },
  {
    key: 'claude-code',
    label: 'future-agent',
    icon: IconTerminal,
    command: 'pk roadmap --agent=claude-code',
    lines: [
      'Target: Claude Code CLI (Anthropic Autonomous Terminal Agent).',
      'Status: Queued in the PK Studio developer roadmap for future engineering phases.',
      'Projected Role: High-order AST multi-file refactoring, CLI automation, and invariant verification.',
      'Active Alliance: Biological lead Phana steers active production with Antigravity and Codex.',
    ],
    projectSlug: null,
  },
];

export default function InteractiveConsole({
  onSelectProject,
  onChangeAccent,
  onToggleTheme,
  onPlaySound,
}) {
  const [activeKey, setActiveKey] = useState('khmer-nida');
  const [inputVal, setInputVal] = useState('');
  const [customOutput, setCustomOutput] = useState(null);

  const currentTopic =
    CONSOLE_TOPICS.find((t) => t.key === activeKey) || CONSOLE_TOPICS[0];

  const handleSelectTopic = (key) => {
    onPlaySound?.('switch');
    setCustomOutput(null);
    setActiveKey(key);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const raw = inputVal.trim().toLowerCase();
    if (!raw) return;
    onPlaySound?.('keycap');
    setInputVal('');

    if (raw === 'matrix' || raw === 'telemetry') {
      onPlaySound?.('pulse');
      setCustomOutput({
        command: 'pk sys --architecture-map',
        lines: [
          'CORE STACK: React 18 · Vite · Tailwind CSS 3 · HTML5 Canvas (60 FPS) · Web Audio Procedural Synth.',
          'MONUMENTAL HELLENIC ENGINE: Cormorant Garamond · Met Museum CC0 Pentelic Marble · Delphic Epigraphy.',
          'DEV ARCHITECTURE: Zero-dependency Monaco Editor IDE · Node SSE Streaming · Khmer NiDA Keyboard 40-level engine.',
        ],
        projectSlug: null,
      });
      return;
    }

    if (raw === 'clear' || raw === 'cls') {
      setCustomOutput(null);
      return;
    }

    if (raw === 'help' || raw === '?') {
      setCustomOutput({
        command: 'help',
        lines: [
          'Available topics: whoami, khmer-nida, neon-engine, studio-code, kon-ai, pk-icons, cursor-fx',
          'Interactive tools: "cursor", "status", "contact", "legal", "theme light", "theme dark", "accent cyan", "accent amber", "accent emerald", "accent crimson", "sfx", "clear"',
        ],
        projectSlug: null,
      });
      return;
    }

    if (
      raw === 'legal' ||
      raw === 'license' ||
      raw === 'disclaimer' ||
      raw === 'disclaimers' ||
      raw === 'trademark' ||
      raw === 'trademarks' ||
      raw === 'privacy' ||
      raw === 'dmca' ||
      raw === 'copyright'
    ) {
      onPlaySound?.('switch');
      setCustomOutput({
        command: 'pk legal --compliance-audit',
        lines: [
          'LEGAL PROTOCOLS & STATUTORY AUDIT // 100% VERIFIED',
          '01 TRADEMARKS (15 U.S.C. § 1115(b)(4)): Nominative Fair Use for GitHub, Microsoft, Meta, Google.',
          '02 KHMER NIDA STANDARD: Formal cultural attribution to NiDA (Royal Government of Cambodia) & KhmerOS.',
          '03 THE MET CC0 1.0: Classical Epicurus marble bust (Acc. 11.90) dedicated to Public Domain.',
          '04 "AS IS" WARRANTY EXCLUSION: Full MIT statutory waiver of express/implied liability for code & games.',
          '05 PRIVACY SOVEREIGNTY: Zero tracking cookies, zero marketing pixels, zero analytics beacons.',
          `06 DMCA NOTICE & TAKEDOWN: Direct safe harbor channel -> ${PROFILE.email} (24-48h SLA).`,
        ],
        projectSlug: null,
      });
      return;
    }

    if (
      raw === 'contact' ||
      raw === 'social' ||
      raw === 'email' ||
      raw === 'gmail' ||
      raw === 'mail' ||
      raw === 'facebook' ||
      raw === 'fb'
    ) {
      onPlaySound?.('switch');
      setCustomOutput({
        command: 'pk connect --channels',
        lines: [
          `GMAIL (INBOX): ${PROFILE.email} (Direct transmission)`,
          `GITHUB (SRC): https://github.com/${PROFILE.githubUsername} (@${PROFILE.githubUsername})`,
          `FACEBOOK (MAIN): ${PROFILE.facebookMainUrl}`,
          `FACEBOOK (DM): ${PROFILE.facebookDmUrl}`,
          'DIRECT PROTOCOL: Open to software collaboration, feedback, and tech discussions.',
        ],
        projectSlug: null,
      });
      return;
    }

    if (raw === 'cursor' || raw === 'fx' || raw === 'animations') {
      onPlaySound?.('switch');
      setActiveKey('cursor-lab');
      setCustomOutput(null);
      return;
    }

    if (raw === 'claude' || raw === 'claude-code' || raw === 'future' || raw === 'roadmap') {
      onPlaySound?.('switch');
      setCustomOutput({
        command: 'pk roadmap --agent=claude-code',
        lines: [
          'CLAUDE CODE CLI // FUTURE ROADMAP AUTONOMOUS AGENT',
          'STATUS: QUEUED FOR FUTURE PIPELINE (HORIZON 2026+)',
          'ROLE: Autonomous Terminal & CLI Agent for AST multi-file refactoring and invariant proofs.',
          'CURRENT STACK: Active production co-authored with Antigravity (Google DeepMind) and Codex (OpenAI).',
          'ROADMAP TARGET: Scheduled for activation when large-scale multi-repository automation expands.',
        ],
        projectSlug: null,
      });
      return;
    }

    if (raw === 'status' || raw === 'sys') {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      setCustomOutput({
        command: 'pk sys --telemetry',
        lines: [
          `Viewport: ${w}x${h} px (Device Pixel Ratio: ${dpr}x).`,
          `Time: ${new Date().toISOString()} · Platform: ${navigator.platform || 'Unknown'}.`,
          'Status: PK Studio OS Kernel v2.6 · All hardware subsystems nominal.',
        ],
        projectSlug: null,
      });
      return;
    }

    if (raw === 'sfx' || raw === 'sound') {
      onPlaySound?.('pulse');
      setCustomOutput({
        command: 'pk audio --test',
        lines: [
          'Web Audio procedural oscillator synthesized 440Hz -> 880Hz frequency sweep.',
          'Mechanical tactile switches active.',
        ],
        projectSlug: null,
      });
      return;
    }

    if (raw.startsWith('accent ')) {
      const color = raw.replace('accent ', '').trim();
      if (['amber', 'cyan', 'emerald', 'crimson'].includes(color)) {
        onChangeAccent?.(color);
        setCustomOutput({
          command: `pk config --accent=${color}`,
          lines: [`Switched studio accent preset to [${color.toUpperCase()}].`],
          projectSlug: null,
        });
        return;
      }
    }

    if (raw === 'theme light' || raw === 'theme dark' || raw === 'theme') {
      onToggleTheme?.();
      setCustomOutput({
        command: 'pk config --toggle-theme',
        lines: ['Toggled display color scheme.'],
        projectSlug: null,
      });
      return;
    }

    if (raw === 'open khmer' || raw === 'khmer') {
      handleSelectTopic('khmer-nida');
      return;
    }
    if (raw === 'open game' || raw === 'neon' || raw === 'game') {
      handleSelectTopic('neon-engine');
      return;
    }
    if (raw === 'open icons' || raw === 'icons') {
      handleSelectTopic('pk-icons');
      return;
    }

    const matched = CONSOLE_TOPICS.find(
      (t) => t.key === raw || raw.includes(t.key)
    );
    if (matched) {
      handleSelectTopic(matched.key);
    } else {
      setCustomOutput({
        command: raw,
        lines: [
          `Unknown command "${raw}". Type "help" or click one of the module tabs on the left.`,
        ],
        projectSlug: null,
      });
    }
  };

  const displayed = customOutput || currentTopic;

  return (
    <section id="console" className="border-b border-line bg-bg relative overflow-hidden">
      {/* Background Architectural Kinetic Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-6 left-6 lg:left-16 overflow-hidden opacity-[0.045] font-classical font-semibold text-[5.5rem] sm:text-[8rem] lg:text-[11rem] tracking-[0.08em] text-accent leading-none whitespace-nowrap z-0"
        data-bg-motion="console-watermark"
      >
        TERMINAL // SYS.26
      </div>

      <div className="mx-auto max-w-[1400px] border-x border-line relative z-10">
        {/* Section Header */}
        <div className="p-6 sm:p-10 border-b border-line flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface/40 reveal-on-scroll">
          <div>
            <div className="hud-label text-accent mb-2">
              SECTION 04 // INTERACTIVE ARCHITECTURE CONSOLE
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              How My Projects Work Under the Hood
            </h2>
          </div>
          <p className="font-mono text-xs text-muted">
            Select a system module or type <code className="text-accent">telemetry</code>,{' '}
            <code className="text-accent">status</code>, or{' '}
            <code className="text-accent">help</code> in the terminal prompt below.
          </p>
        </div>

        {/* Console Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 reveal-on-scroll reveal-delay-1">
          {/* Left 3 Columns: Topic Selector */}
          <div
            role="tablist"
            aria-label="Console Architecture Topics"
            className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-line bg-surface flex lg:flex-col overflow-x-auto divide-x lg:divide-x-0 lg:divide-y divide-line"
          >
            {CONSOLE_TOPICS.map((topic) => {
              const Icon = topic.icon;
              const isSelected = !customOutput && activeKey === topic.key;
              return (
                <button
                  key={topic.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectTopic(topic.key)}
                  className={`flex items-center justify-between gap-3 px-5 py-3.5 font-mono text-xs whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-invertBg text-invertFg font-bold'
                      : 'text-muted hover:text-ink hover:bg-surface2'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{topic.label}</span>
                  </span>
                  <span className="hidden lg:inline text-[10px] opacity-60">
                    -&gt;
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right 9 Columns: Terminal Output & Interactive Input */}
          <div className="relative lg:col-span-9 bg-[#08090b] text-[#eceae4] p-6 sm:p-8 flex flex-col justify-between min-h-[340px] font-mono overflow-hidden">
            {/* CRT Screen Scanline Overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06] select-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.8) 2px, rgba(0, 0, 0, 0.8) 4px)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between border-b border-[#20232b] pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#facc15]/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]/80 inline-block beacon-pulse" />
                  </div>
                  <span className="ml-2 text-[#8c9099]">phana@kon-studio</span>{' '}
                  <span className="text-accent">~ $</span>{' '}
                  <span className="text-white font-semibold">
                    {displayed.command}
                  </span>
                  <span className="inline-block w-2 h-3.5 bg-accent terminal-cursor-blink ml-1 align-middle" />
                </div>
                <span className="text-[10px] text-[#4ade80] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] beacon-pulse inline-block" />
                  <span>KERNEL: OK</span>
                </span>
              </div>

              {/* Output Paragraphs */}
              <div className="mt-5 space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#d1d5db]">
                {displayed.lines.map((line, idx) => (
                  <p
                    key={`${displayed.command}-${idx}`}
                    style={{ animationDelay: `${idx * 0.08}s` }}
                    className="term-line-enter border-l-2 border-accent/70 pl-3.5"
                  >
                    <span className="text-accent mr-2">0{idx + 1} //</span>
                    {line}
                  </p>
                ))}
              </div>

              {displayed.projectSlug && (
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={() => onSelectProject(displayed.projectSlug)}
                    className="btn-laser-sweep inline-flex items-center gap-2 border border-accent bg-accent text-[#0b0b0c] px-4 py-2 text-xs font-bold hover:opacity-90 shadow-md"
                  >
                    <span>Open Full Project Specification</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {displayed.isCursorLab && (
                <div className="mt-6 pt-5 border-t border-[#20232b]">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    <span>HOVER ANIMATION SANDBOX // STEP 2 ISOLATED EFFECTS</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Version 1: Pulse Only */}
                    <div className="hover-anim-pulse border border-accent/40 bg-[#12141a] p-3.5 rounded text-left select-none cursor-pointer">
                      <div className="text-[10px] text-accent font-mono font-bold tracking-widest">
                        VER 01 // PULSE
                      </div>
                      <div className="text-sm font-bold text-white mt-1">
                        Heartbeat Scale
                      </div>
                      <div className="text-[11px] text-[#8c9099] mt-1 leading-normal">
                        Rhythmic scale pulse and expanding radiant shadow ring.
                      </div>
                    </div>

                    {/* Version 2: 3D Tilt Only */}
                    <div className="hover-anim-tilt border border-[#2d323f] bg-[#12141a] p-3.5 rounded text-left select-none cursor-pointer">
                      <div className="text-[10px] text-[#38bdf8] font-mono font-bold tracking-widest">
                        VER 02 // 3D TILT
                      </div>
                      <div className="text-sm font-bold text-white mt-1">
                        Perspective Tilt
                      </div>
                      <div className="text-[11px] text-[#8c9099] mt-1 leading-normal">
                        Kinematic 3D plane tilt with elevated shadow depth.
                      </div>
                    </div>

                    {/* Version 3: Glow Sweep Only */}
                    <div className="hover-anim-sweep border border-[#2d323f] bg-[#12141a] p-3.5 rounded text-left select-none cursor-pointer">
                      <div className="text-[10px] text-[#34d399] font-mono font-bold tracking-widest">
                        VER 03 // GLOW SWEEP
                      </div>
                      <div className="text-sm font-bold text-white mt-1">
                        Dynamic Light Beam
                      </div>
                      <div className="text-[11px] text-[#8c9099] mt-1 leading-normal">
                        High-velocity angled laser sweep traversing surface.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-[#0d0e12] border border-[#20232b] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-[#8c9099]">
                      <span className="text-white font-semibold">Step 1 Morphing Test:</span> Move pointer over text input below or test buttons above to watch dual-layer morphing.
                    </span>
                    <span className="text-accent font-mono text-[10px] uppercase tracking-widest">
                      ACTIVE: DUAL-LAYER CURSOR
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Command Input */}
            <form
              onSubmit={handleCommandSubmit}
              className="relative z-10 mt-8 pt-4 border-t border-[#20232b] flex items-center gap-2.5 text-xs sm:text-sm"
            >
              <span className="text-accent font-bold shrink-0">
                pk@kon ~ $
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'matrix', 'status', 'sfx', 'theme', or 'help'..."
                aria-label="Interactive console command input"
                className="w-full bg-transparent text-white placeholder:text-[#525763] focus:outline-none"
              />
              <button
                type="submit"
                className="btn-laser-sweep border border-[#2b2f3a] bg-[#14171f] px-3.5 py-1 text-xs text-[#eceae4] hover:border-accent hover:text-accent transition-colors shrink-0 font-bold"
              >
                EXEC
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
