import React, { useState } from 'react';
import {
  IconTerminal,
  IconKeyboard,
  IconGamepad,
  IconCode,
  IconCpu,
  IconGrid,
  IconArrowRight,
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

    if (raw === 'help' || raw === '?') {
      setCustomOutput({
        command: 'help',
        lines: [
          'Available topics: whoami, khmer-nida, neon-engine, studio-code, kon-ai, pk-icons',
          'Interactive commands: "open khmer", "open game", "open icons", "theme light", "theme dark", "accent cyan", "accent amber", "accent emerald", "accent crimson"',
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
    <section id="console" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        {/* Section Header */}
        <div className="p-6 sm:p-10 border-b border-line flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-surface/40">
          <div>
            <div className="hud-label text-accent mb-2">
              INTERACTIVE ARCHITECTURE CONSOLE // PK HELP
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
              How My Projects Work Under the Hood
            </h2>
          </div>
          <p className="font-mono text-xs text-muted">
            Select a system module or type <code className="text-accent">help</code>,{' '}
            <code className="text-accent">accent cyan</code>, or{' '}
            <code className="text-accent">theme</code> in the prompt below.
          </p>
        </div>

        {/* Console Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
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
          <div className="lg:col-span-9 bg-[#090a0d] text-[#eceae4] p-6 sm:p-8 flex flex-col justify-between min-h-[300px] font-mono">
            <div>
              {/* Command Prompt Header */}
              <div className="flex items-center justify-between border-b border-[#22252e] pb-3 text-xs">
                <div>
                  <span className="text-[#8c9099]">phana@kon-studio</span>{' '}
                  <span className="text-accent">~ $</span>{' '}
                  <span className="text-white font-semibold">
                    {displayed.command}
                  </span>
                </div>
                <span className="text-[10px] text-[#4ade80]">STATUS: OK</span>
              </div>

              {/* Output Paragraphs */}
              <div className="mt-5 space-y-3.5 text-xs sm:text-sm leading-relaxed text-[#d1d5db]">
                {displayed.lines.map((line, idx) => (
                  <p key={idx} className="border-l-2 border-[#232730] pl-3.5">
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
                    className="inline-flex items-center gap-2 border border-accent/60 bg-accentDim px-4 py-2 text-xs text-white hover:bg-accent hover:text-[#0b0b0c] font-semibold transition-colors"
                  >
                    <span>Open Full Project Specification</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Interactive Command Input */}
            <form
              onSubmit={handleCommandSubmit}
              className="mt-8 pt-4 border-t border-[#22252e] flex items-center gap-2.5 text-xs sm:text-sm"
            >
              <span className="text-accent font-bold shrink-0">
                pk@kon ~ $
              </span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type 'help', 'khmer-nida', 'neon-engine', 'accent cyan', or 'theme'..."
                aria-label="Interactive console command input"
                className="w-full bg-transparent text-white placeholder:text-[#5b606b] focus:outline-none"
              />
              <button
                type="submit"
                className="border border-[#2b2f3a] bg-[#14171f] px-3 py-1 text-xs text-[#eceae4] hover:border-accent transition-colors shrink-0"
              >
                RUN
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
