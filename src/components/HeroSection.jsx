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
} from './Icons';

const BLUEPRINT_TABS = [
  {
    id: 'pk-khmer-type',
    code: 'SYS-01',
    label: 'PK Khmer Type',
    role: 'Bilingual Typing Studio',
    icon: IconKeyboard,
    metrics: [
      { k: 'CURRICULUM', v: '40 Levels · 218 Lessons' },
      { k: 'LAYOUTS', v: 'Khmer Standard · NiDA · EN' },
      { k: 'ENGINE', v: 'ES6+ · WebAudio · 3D Hands' },
    ],
    sampleKeys: [
      { key: 'K', kh: 'ក', layer: 'Base Consonant' },
      { key: 'A', kh: 'ា', layer: 'Dependent Vowel' },
      { key: 'J / SPC', kh: '្', layer: 'Coeng Subscript' },
      { key: 'SHIFT+SPC', kh: '␣', layer: 'Visible Space' },
    ],
  },
  {
    id: 'neon-protocol-overdrive',
    code: 'SYS-02',
    label: 'NEON PROTOCOL',
    role: 'HTML5 Canvas Action Game',
    icon: IconGamepad,
    metrics: [
      { k: 'ARENA', v: '4,200 x 4,200 Multi-Sector' },
      { k: 'ARSENAL', v: '6 Tactical Skills + Contracts' },
      { k: 'AUDIO', v: '4-Track Procedural WebAudio' },
    ],
    sampleKeys: [
      { key: '[Q]', kh: 'KATANA', layer: '3-Hit X-Rift & Parry' },
      { key: '[R]', kh: 'OMEGA', layer: '1,150px Orbital Beam' },
      { key: '[F]', kh: 'STASIS', layer: 'Bullet Capture Dome' },
      { key: '[E]', kh: 'SERAPH', layer: '6-Wing Overdrive' },
    ],
  },
  {
    id: 'pk-icons-studio',
    code: 'SYS-03',
    label: 'PK Icons Studio',
    role: '24x24 Vector Asset Library',
    icon: IconGrid,
    metrics: [
      { k: 'COLLECTION', v: '50 Custom 24x24 Vectors' },
      { k: 'STROKE SPEC', v: '2px · Round Cap & Join' },
      { k: 'EXPORTS', v: 'Raw SVG · JS Module · ZIP' },
    ],
    sampleKeys: [
      { key: '01', kh: 'code-lab', layer: '24x24 Stroke SVG' },
      { key: '02', kh: 'brain-lab', layer: '24x24 Stroke SVG' },
      { key: '03', kh: 'terminal', layer: '24x24 Stroke SVG' },
      { key: '04', kh: 'quantum', layer: '24x24 Stroke SVG' },
    ],
  },
];

export default function HeroSection({ onExploreProjects, onSelectProject }) {
  const [activeTabId, setActiveTabId] = useState('pk-khmer-type');
  const activeTab =
    BLUEPRINT_TABS.find((t) => t.id === activeTabId) || BLUEPRINT_TABS[0];
  const matchedProject = PROJECTS.find((p) => p.id === activeTab.id);

  return (
    <section
      id="home"
      className="relative border-b border-line bg-bg overflow-hidden"
    >
      {/* Top architectural metadata bar */}
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="flex flex-wrap items-center justify-between border-b border-line px-5 py-2.5 sm:px-8 text-xs font-mono text-muted gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2 w-2 rounded-full bg-[#4ade80]" />
            <span className="text-ink font-medium">{PROFILE.tagline}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>IDENTITY: {PROFILE.brand} // {PROFILE.fullName.toUpperCase()}</span>
            <span className="hidden md:inline text-line">|</span>
            <span className="hidden md:inline">AKA: {PROFILE.nickname}</span>
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

              <h1 className="font-display text-4xl sm:text-6xl xl:text-[4.25rem] font-extrabold tracking-[-0.035em] leading-[1.03] text-ink">
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
                    SHIPPED ON PAGES
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-bold text-ink">
                    3 Live Apps
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted uppercase tracking-wider">
                    TRACKED BUILDS
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-bold text-ink">
                    {PROJECTS.length} Projects
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-muted uppercase tracking-wider">
                    APPROACH
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-bold text-accent">
                    From Scratch
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Software Architecture Inspector */}
          <div className="lg:col-span-5 bg-surface bg-architectural-grid flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3 mb-5">
                <span className="hud-label text-ink">
                  ACTIVE BUILD INSPECTOR // PK-SYS
                </span>
                <span className="font-mono text-[11px] text-accent">
                  LIVE TELEMETRY
                </span>
              </div>

              {/* Selector Tabs for Real Shipped Projects */}
              <div
                role="tablist"
                aria-label="Inspect shipped PK software systems"
                className="grid grid-cols-3 border border-line bg-bg mb-5"
              >
                {BLUEPRINT_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const selected = tab.id === activeTab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      type="button"
                      aria-selected={selected}
                      onClick={() => setActiveTabId(tab.id)}
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

              {/* Blueprint Inspection Card */}
              <div className="border border-line bg-bg p-5">
                <div className="flex items-start justify-between gap-3 border-b border-lineSoft pb-3.5">
                  <div>
                    <div className="font-mono text-[11px] text-accent uppercase">
                      {activeTab.role}
                    </div>
                    <h2 className="font-display text-xl font-bold text-ink mt-0.5">
                      {activeTab.label}
                    </h2>
                  </div>
                  {matchedProject?.liveUrl && (
                    <a
                      href={matchedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 border border-line px-2.5 py-1 font-mono text-[11px] text-ink hover:border-accent hover:text-accent transition-colors"
                    >
                      <span>Launch</span>
                      <IconArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Spec Rows */}
                <dl className="divide-y divide-lineSoft my-3 font-mono text-xs">
                  {activeTab.metrics.map((m) => (
                    <div
                      key={m.k}
                      className="flex items-center justify-between py-2 gap-2"
                    >
                      <dt className="text-muted">{m.k}</dt>
                      <dd className="text-ink font-medium text-right">{m.v}</dd>
                    </div>
                  ))}
                </dl>

                {/* Interactive Key / Module Matrix */}
                <div className="mt-4 pt-3 border-t border-lineSoft">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-2.5">
                    VERIFIED MODULE MATRIX
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {activeTab.sampleKeys.map((item) => (
                      <div
                        key={item.key}
                        className="border border-line bg-surface p-2.5 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-mono text-[10px] text-muted">
                            {item.key}
                          </div>
                          <div className="font-mono text-[11px] text-ink font-medium mt-0.5">
                            {item.layer}
                          </div>
                        </div>
                        <span className="font-mono text-sm font-bold text-accent px-2 py-0.5 border border-line bg-bg">
                          {item.kh}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Inspector Footer */}
            <div className="mt-5 flex items-center justify-between pt-3 border-t border-line font-mono text-xs">
              <span className="text-muted">STATUS: VERIFIED BUILD</span>
              {matchedProject && (
                <button
                  type="button"
                  onClick={() => onSelectProject(matchedProject.id)}
                  className="inline-flex items-center gap-1.5 text-ink hover:text-accent font-semibold transition-colors"
                >
                  <span>Read Architecture Notes</span>
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
