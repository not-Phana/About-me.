import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { IconCode, IconCpu, IconLayers, IconGamepad } from './Icons';

const CAPABILITY_LAYERS = [
  {
    code: 'LAYER 01',
    title: 'Web & Interface Engineering',
    icon: IconCode,
    tools: ['React 18', 'Vite', 'Tailwind CSS', 'ES6+ JavaScript', 'HTML5 / CSS3'],
    projects: ['PK Khmer Type', 'PK Icons Studio', 'Phana Coffee Shop', 'PHANA Platform'],
    summary:
      'Building responsive, dark-first interfaces with strong typography, keyboard accessibility, and zero-dependency UI components.',
  },
  {
    code: 'LAYER 02',
    title: 'Interactive Canvas, SVG & WebAudio',
    icon: IconGamepad,
    tools: ['HTML5 Canvas 2D', 'Web Audio API Synth', 'Inline SVG Vectors', '60fps Game Loops'],
    projects: ['NEON PROTOCOL // OVERDRIVE', 'PK Khmer Type', 'PK Icons Studio'],
    summary:
      'Procedural sound synthesis, real-time particle physics, 3D kinematic hand guides, and live SVG geometry serialization.',
  },
  {
    code: 'LAYER 03',
    title: 'Desktop & Local Systems',
    icon: IconCpu,
    tools: ['Electron', 'Node.js', 'Local File I/O', 'Custom Window Chrome'],
    projects: ['PK Studio Code', 'PK Music Desktop v0.1', 'Arachne Desktop Clock'],
    summary:
      'Packaging web and system utilities into standalone desktop workbenches, audio players, and ambient hardware-style widgets.',
  },
  {
    code: 'LAYER 04',
    title: 'AI-Assisted Architecture & Debugging',
    icon: IconLayers,
    tools: ['KON (PK Intelligence)', 'GitHub Pages CI/CD', 'Git Version Control', 'Modular Bundling'],
    projects: ['KON (PK Intelligence)', 'PK Khmer Type', 'All 2026 Repositories'],
    summary:
      'Using AI to accelerate research and prototyping while reading, testing, and verifying every module to understand how it works underneath.',
  },
];

export default function AboutSection() {
  const [activeLayerIdx, setActiveLayerIdx] = useState(0);
  const activeLayer = CAPABILITY_LAYERS[activeLayerIdx];

  return (
    <section id="about" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-line">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-line flex flex-col justify-between">
            <div>
              <div className="hud-label text-accent mb-3">
                SECTION 04 // ABOUT ME
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.08]">
                {PROFILE.aboutHeading}
              </h2>

              <div className="mt-8 space-y-5 text-base sm:text-lg text-muted leading-relaxed">
                {PROFILE.aboutParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={index === 0 ? 'text-ink font-medium' : ''}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Identity Ledger */}
            <div className="mt-10 pt-8 border-t border-lineSoft">
              <div className="hud-label text-ink mb-4">
                DEVELOPER PROFILE SUMMARY
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="hud-frame border border-line bg-surface p-3.5">
                  <dt className="text-muted">NAME / ALIAS</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {PROFILE.fullName} ({PROFILE.nickname})
                  </dd>
                </div>
                <div className="hud-frame border border-line bg-surface p-3.5">
                  <dt className="text-muted">PERSONAL BRAND</dt>
                  <dd className="mt-1 text-sm font-semibold text-accent">
                    {PROFILE.brand}
                  </dd>
                </div>
                <div className="hud-frame border border-line bg-surface p-3.5 sm:col-span-2">
                  <dt className="text-muted">MAIN FOCUS</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    Building software, websites, developer tools, and games
                    through hands-on iteration
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Concise Development Philosophy List */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 bg-surface/20 flex flex-col justify-between">
            <div>
              <div className="hud-label text-accent mb-3">
                HOW I WORK // DEVELOPMENT PHILOSOPHY
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Principles behind what I create
              </h3>
              <p className="mt-2 text-sm text-muted">
                Five rules I follow across every repository and experiment.
              </p>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {PROFILE.philosophy.map((item) => (
                  <div
                    key={item.index}
                    className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 hover:bg-surface/50 px-2 -mx-2 transition-colors"
                  >
                    <dt className="font-mono text-sm font-bold text-ink sm:w-64 shrink-0 flex items-baseline gap-3">
                      <span className="text-xs text-accent">{item.index}</span>
                      <span>{item.statement}</span>
                    </dt>
                    <dd className="text-sm text-muted leading-relaxed">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 border border-line bg-bg p-5 font-mono text-xs text-muted">
              <span className="text-accent font-semibold">HONESTY NOTE:</span>{' '}
              Everything on this site is built for learning and utility—no fake
              client lists, no fabricated metrics, and no paid walls.
            </div>
          </div>
        </div>

        {/* Interactive Studio Stack & Capability Matrix */}
        <div className="p-6 sm:p-10 lg:p-12 bg-surface/30">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="hud-label text-accent mb-2">
                TECHNICAL ARCHITECTURE // CAPABILITY MATRIX
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Tools &amp; Systems Used Across My Builds
              </h3>
            </div>
            <span className="font-mono text-xs text-muted">
              SELECT ANY LAYER TO INSPECT VERIFIED USAGE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Layer Selector Tabs */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {CAPABILITY_LAYERS.map((layer, idx) => {
                const Icon = layer.icon;
                const isSelected = activeLayerIdx === idx;
                return (
                  <button
                    key={layer.code}
                    type="button"
                    onClick={() => setActiveLayerIdx(idx)}
                    className={`text-left p-4 border transition-colors flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-accent bg-accentDim'
                        : 'border-line bg-bg hover:border-ink'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[11px] text-accent font-bold">
                        {layer.code}
                      </div>
                      <div className="font-display text-base font-bold text-ink mt-0.5">
                        {layer.title}
                      </div>
                    </div>
                    <Icon
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isSelected ? 'text-accent' : 'text-muted'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Layer Inspector */}
            <div className="lg:col-span-7 hud-frame border border-line bg-bg p-6 sm:p-8 flex flex-col justify-between bg-architectural-grid">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4 mb-5 font-mono text-xs">
                  <span className="text-accent font-bold">
                    {activeLayer.code} // {activeLayer.title.toUpperCase()}
                  </span>
                  <span className="text-muted">VERIFIED IN REPOSITORIES</span>
                </div>

                <p className="text-base text-ink/90 leading-relaxed">
                  {activeLayer.summary}
                </p>

                <div className="mt-6">
                  <div className="font-mono text-[11px] text-muted uppercase mb-2.5">
                    TECHNOLOGIES &amp; APIS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeLayer.tools.map((tool) => (
                      <span
                        key={tool}
                        className="border border-accent/50 bg-accentDim px-3 py-1 font-mono text-xs text-ink font-semibold"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <span className="text-muted">USED IN PROJECTS:</span>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.projects.map((projName) => (
                    <span
                      key={projName}
                      className="border border-line bg-surface px-2.5 py-1 text-ink"
                    >
                      {projName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
