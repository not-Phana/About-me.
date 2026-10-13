import React, { useState } from 'react';
import {
  IconArrowUpRight,
  IconArrowRight,
  IconGitHub,
  IconCheck,
  IconLayers,
  IconCode,
} from './Icons';
import ProjectPreviewVisual from './ProjectPreviewVisual';
import RealKhmerKeyboard from './RealKhmerKeyboard';

const FLAGSHIP_MODULES = [
  {
    code: 'SYS-01',
    name: 'Khmer Unicode & NiDA Key Engine',
    stack: 'Unicode 1780–17FF · Coeng Subscripts',
    detail:
      'Handles multi-keystroke Khmer consonant clusters, dependent vowels, and shift-layer glyphs across Khmer NiDA, Khmer Standard, and English QWERTY.',
  },
  {
    code: 'SYS-02',
    name: '3D Kinematic Hand & Finger Guide',
    stack: 'SVG Vector Rig · Real-Time Key Targets',
    detail:
      'Highlights exact left/right finger assignments and shift modifiers before each keystroke to build proper touch-typing muscle memory.',
  },
  {
    code: 'SYS-03',
    name: 'Procedural WebAudio Switch Synth',
    stack: 'Web Audio API · Zero External Samples',
    detail:
      'Synthesizes tactile mechanical keycap clicks and error feedback in real time using browser oscillators and filtered noise envelopes.',
  },
  {
    code: 'SYS-04',
    name: 'Adaptive Mastery & Heatmap Engine',
    stack: 'LocalStorage Telemetry · WPM & Accuracy',
    detail:
      'Tracks per-key latency and miss rates across 40 levels (218 lessons) to automatically generate targeted practice drills.',
  },
];

const COENG_CLUSTERS = [
  {
    id: 'suostei',
    word: 'សួស្តីកម្ពុជា',
    meaning: 'Hello Cambodia · Greeting & Country Name',
    layout: 'nida',
    steps: [
      { key: 'S', glyph: 'ស', finger: 'Left Ring', role: 'Base Consonant' },
      { key: 'Shift+Y', glyph: 'ួ', finger: 'Right Index', role: 'Dependent Vowel' },
      { key: 'S', glyph: 'ស', finger: 'Left Ring', role: 'Cluster Base' },
      { key: 'J', glyph: '្ (Coeng)', finger: 'Right Index', role: 'Subscript Sign U+17D2' },
      { key: 'T', glyph: 'ត', finger: 'Left Index', role: 'Subscript Consonant' },
      { key: 'Shift+I', glyph: 'ី', finger: 'Right Middle', role: 'Superscript Vowel' },
      { key: 'K', glyph: 'ក', finger: 'Right Middle', role: 'Base Consonant' },
      { key: 'M', glyph: 'ម', finger: 'Right Index', role: 'Cluster Base' },
      { key: 'J', glyph: '្ (Coeng)', finger: 'Right Index', role: 'Subscript Sign U+17D2' },
      { key: 'Shift+B', glyph: 'ព', finger: 'Left Index', role: 'Subscript Consonant' },
      { key: 'U', glyph: 'ុ', finger: 'Right Index', role: 'Subscript Vowel' },
      { key: 'Shift+C', glyph: 'ជ', finger: 'Left Middle', role: 'Base Consonant' },
      { key: 'A', glyph: 'ា', finger: 'Left Pinky', role: 'Dependent Vowel' },
    ],
  },
  {
    id: 'bachek',
    word: 'បច្ចេកវិទ្យា',
    meaning: 'Technology & Engineering · Multi-Coeng Stack',
    layout: 'nida',
    steps: [
      { key: 'B', glyph: 'ប', finger: 'Left Index', role: 'Base Consonant' },
      { key: 'C', glyph: 'ច', finger: 'Left Middle', role: 'Cluster Base' },
      { key: 'J', glyph: '្ (Coeng)', finger: 'Right Index', role: 'Subscript Sign U+17D2' },
      { key: 'C', glyph: 'ច', finger: 'Left Middle', role: 'Geminated Subscript' },
      { key: 'E', glyph: 'េ', finger: 'Left Middle', role: 'Pre-Base Vowel (Typed After)' },
      { key: 'K', glyph: 'ក', finger: 'Right Middle', role: 'Base Consonant' },
      { key: 'V', glyph: 'វ', finger: 'Left Index', role: 'Base Consonant' },
      { key: 'I', glyph: 'ិ', finger: 'Right Middle', role: 'Superscript Vowel' },
      { key: 'Shift+T', glyph: 'ទ', finger: 'Left Index', role: 'Cluster Base' },
      { key: 'J', glyph: '្ (Coeng)', finger: 'Right Index', role: 'Subscript Sign U+17D2' },
      { key: 'Y', glyph: 'យ', finger: 'Right Index', role: 'Medial Subscript' },
      { key: 'A', glyph: 'ា', finger: 'Left Pinky', role: 'Dependent Vowel' },
    ],
  },
  {
    id: 'sralanh',
    word: 'ខ្ញុំស្រឡាញ់កូដ',
    meaning: 'I Love Coding · Shift + Coeng + Nasal Mark',
    layout: 'nida',
    steps: [
      { key: 'X', glyph: 'ខ', finger: 'Left Ring', role: 'Cluster Base' },
      { key: 'J', glyph: '្ (Coeng)', finger: 'Right Index', role: 'Subscript Sign U+17D2' },
      { key: 'Shift+J', glyph: 'ញ', finger: 'Right Index', role: 'Subscript Consonant' },
      { key: ',', glyph: 'ុំ', finger: 'Right Middle', role: 'Compound Vowel (U+17BB U+17C6)' },
      { key: 'S', glyph: 'ស', finger: 'Left Ring', role: 'Cluster Base' },
      { key: 'J', glyph: '្ (Coeng)', finger: 'Right Index', role: 'Subscript Sign U+17D2' },
      { key: 'R', glyph: 'រ', finger: 'Left Index', role: 'Medial Subscript' },
      { key: 'Shift+L', glyph: 'ឡ', finger: 'Right Ring', role: 'Voiced Consonant' },
      { key: 'A', glyph: 'ា', finger: 'Left Pinky', role: 'Dependent Vowel' },
      { key: 'Shift+J', glyph: 'ញ', finger: 'Right Index', role: 'Final Consonant' },
      { key: "'", glyph: '់', finger: 'Right Pinky', role: 'Bantoc Diacritic' },
    ],
  },
  {
    id: 'english-dev',
    word: 'Phana Kurosaki',
    meaning: 'English US QWERTY · Shift + Home-Row Precision',
    layout: 'english',
    steps: [
      { key: 'Shift+P', glyph: 'P', finger: 'Right Pinky', role: 'Uppercase Initial' },
      { key: 'H', glyph: 'h', finger: 'Right Index', role: 'Home Row Reach' },
      { key: 'A', glyph: 'a', finger: 'Left Pinky', role: 'Home Row Anchor' },
      { key: 'N', glyph: 'n', finger: 'Right Index', role: 'Bottom Row Reach' },
      { key: 'A', glyph: 'a', finger: 'Left Pinky', role: 'Home Row Anchor' },
      { key: 'Space', glyph: '␣', finger: 'Right Thumb', role: 'Word Separator' },
      { key: 'Shift+K', glyph: 'K', finger: 'Right Middle', role: 'Uppercase Initial' },
      { key: 'U', glyph: 'u', finger: 'Right Index', role: 'Top Row Reach' },
      { key: 'R', glyph: 'r', finger: 'Left Index', role: 'Top Row Reach' },
      { key: 'O', glyph: 'o', finger: 'Right Ring', role: 'Top Row Reach' },
      { key: 'S', glyph: 's', finger: 'Left Ring', role: 'Home Row Anchor' },
      { key: 'A', glyph: 'a', finger: 'Left Pinky', role: 'Home Row Anchor' },
      { key: 'K', glyph: 'k', finger: 'Right Middle', role: 'Home Row Anchor' },
      { key: 'I', glyph: 'i', finger: 'Right Middle', role: 'Top Row Reach' },
    ],
  },
];

export default function FeaturedProjects({ projects, onSelectProject }) {
  const featured = projects.filter((p) => p.featured);
  const flagship = featured[0]; // PK Khmer Type
  const secondaryFeatured = featured.slice(1);

  const [activeKeyboardLayout, setActiveKeyboardLayout] = useState('nida'); // 'nida' | 'english' | 'standard'
  const [customKeyboardPrompt, setCustomKeyboardPrompt] = useState('');
  const [activeClusterIdx, setActiveClusterIdx] = useState(0);
  const [viewportMode, setViewportMode] = useState('keyboard'); // 'keyboard' | 'lesson-lab' | 'blueprint'
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [inlineEmbedMap, setInlineEmbedMap] = useState({});

  if (!flagship) return null;

  const activeCluster = COENG_CLUSTERS[activeClusterIdx] || COENG_CLUSTERS[0];

  const toggleSecondaryEmbed = (projectId) => {
    setInlineEmbedMap((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <div className="border-b border-line">
      {/* Section Subheader */}
      <div className="flex flex-wrap items-center justify-between border-b border-line px-6 py-4 sm:px-10 bg-surface">
        <div className="flex items-center gap-3">
          <span className="hud-label text-accent">01 // FLAGSHIP SHOWCASE</span>
          <span className="text-line">|</span>
          <span className="font-mono text-xs text-muted">
            SHIPPED &amp; ACTIVELY DEVELOPED
          </span>
        </div>

        {/* Viewport Mode Switcher (No cramped iframe or static screenshot tab) */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2 sm:mt-0">
          {[
            { id: 'keyboard', label: '01 // REAL KEYBOARD (NIDA / EN)' },
            { id: 'lesson-lab', label: '02 // COENG & LESSON LAB' },
            { id: 'blueprint', label: '03 // SYSTEM BLUEPRINT' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setViewportMode(tab.id)}
              className={`px-3 py-1 border font-mono text-[11px] transition-colors ${
                viewportMode === tab.id
                  ? 'border-accent bg-accent text-[#0b0b0c] font-bold'
                  : 'border-line bg-bg text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Flagship Product Showcase: PK Khmer Type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-line">
        {/* Left: Real Interactive Keyboard / Coeng & Lesson Lab / System Blueprint */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-line bg-surface/50 p-6 sm:p-10 flex flex-col justify-between">
          {viewportMode === 'keyboard' && (
            <div className="flex flex-col h-full justify-between">
              <div className="hud-frame">
                <RealKhmerKeyboard
                  activeLayoutId={activeKeyboardLayout}
                  customPrompt={customKeyboardPrompt}
                  onLayoutChange={(nextId) => {
                    setActiveKeyboardLayout(nextId);
                    setCustomKeyboardPrompt('');
                  }}
                  liveUrl={flagship.liveUrl}
                />
              </div>

              {/* Bottom Layout & Lab Selector Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted mb-2">
                  <span>
                    SWITCH LIVE KEYBOARD LAYOUT (MICROSOFT KHMER NIDA &amp; ENGLISH)
                  </span>
                  <span className="text-accent font-semibold uppercase">
                    ACTIVE:{' '}
                    {activeKeyboardLayout === 'nida'
                      ? 'KHMER NIDA (MICROSOFT)'
                      : activeKeyboardLayout === 'english'
                      ? 'ENGLISH (US QWERTY)'
                      : 'KHMER STANDARD'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'nida', label: 'Khmer NiDA (Microsoft)', type: 'layout' },
                    { id: 'english', label: 'English (US QWERTY)', type: 'layout' },
                    { id: 'standard', label: 'Khmer Standard', type: 'layout' },
                    { id: 'lesson-lab', label: 'Coeng & Lesson Lab ->', type: 'mode' },
                  ].map((item) => {
                    const isSelected =
                      item.type === 'layout' && activeKeyboardLayout === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          if (item.type === 'layout') {
                            setActiveKeyboardLayout(item.id);
                            setCustomKeyboardPrompt('');
                          } else {
                            setViewportMode('lesson-lab');
                          }
                        }}
                        className={`px-3 py-2 border text-left font-mono text-[11px] transition-colors ${
                          isSelected
                            ? 'border-accent bg-accentDim text-ink font-semibold'
                            : 'border-line bg-bg text-muted hover:text-ink'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {viewportMode === 'lesson-lab' && (
            <div className="flex flex-col h-full justify-between border border-line bg-[#0b0d13] p-5 sm:p-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 mb-4">
                  <div>
                    <div className="font-mono text-[10.5px] text-accent font-bold uppercase">
                      KHMER UNICODE &amp; NIDA COENG SUBSCRIPT DECONSTRUCTOR
                    </div>
                    <div className="font-mono text-[11px] text-muted mt-0.5">
                      Inspect how multi-keystroke Khmer clusters &amp; English touch-typing drills map to physical keys.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveKeyboardLayout(activeCluster.layout);
                      setCustomKeyboardPrompt(activeCluster.word);
                      setViewportMode('keyboard');
                    }}
                    className="border border-accent bg-accent text-[#0b0b0c] px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase hover:opacity-90 transition-opacity"
                  >
                    Auto-Type on Live Keyboard -&gt;
                  </button>
                </div>

                {/* Phrase Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {COENG_CLUSTERS.map((cl, idx) => {
                    const active = idx === activeClusterIdx;
                    return (
                      <button
                        key={cl.id}
                        type="button"
                        onClick={() => setActiveClusterIdx(idx)}
                        className={`p-2.5 border text-left transition-colors ${
                          active
                            ? 'border-accent bg-accentDim'
                            : 'border-line bg-[#10131c] hover:border-ink'
                        }`}
                      >
                        <div
                          className="text-base font-bold text-ink truncate"
                          style={{
                            fontFamily: "'Noto Sans Khmer', 'JetBrains Mono', sans-serif",
                          }}
                        >
                          {cl.word}
                        </div>
                        <div className="font-mono text-[9.5px] text-muted uppercase mt-0.5">
                          {cl.layout === 'nida' ? 'Khmer NiDA' : 'English US'} · {cl.steps.length} Keys
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Keystroke Sequence Pipeline */}
                <div className="border border-line bg-[#080a0f] p-3.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-muted mb-2.5">
                    <span>
                      SEQUENCE PIPELINE //{' '}
                      <strong className="text-ink">{activeCluster.meaning}</strong>
                    </span>
                    <span className="text-[#4ade80]">
                      {activeCluster.steps.length} KEYSTROKES
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {activeCluster.steps.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="border border-lineSoft bg-[#101420] p-2 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between font-mono text-[9.5px]">
                          <span className="text-muted">#{sIdx + 1}</span>
                          <span className="border border-accent/50 bg-accentDim px-1.5 py-0.2 text-accent font-bold">
                            {step.key}
                          </span>
                        </div>
                        <div
                          className="my-1.5 text-lg font-bold text-ink text-center"
                          style={{
                            fontFamily: "'Noto Sans Khmer', 'JetBrains Mono', sans-serif",
                          }}
                        >
                          {step.glyph}
                        </div>
                        <div className="font-mono text-[9px] text-muted truncate text-center">
                          {step.finger}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom 218-Lesson Curriculum Summary Bar */}
              <div className="mt-4 pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px]">
                <div className="flex flex-wrap items-center gap-3 text-muted">
                  <span>
                    KHMER NIDA: <strong className="text-ink">80 LESSONS</strong>
                  </span>
                  <span>·</span>
                  <span>
                    KHMER STANDARD: <strong className="text-ink">80 LESSONS</strong>
                  </span>
                  <span>·</span>
                  <span>
                    ENGLISH QWERTY: <strong className="text-ink">58 LESSONS</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewportMode('keyboard')}
                  className="text-accent hover:underline font-bold"
                >
                  &lt;- Back to Real Keyboard
                </button>
              </div>
            </div>
          )}

          {viewportMode === 'blueprint' && (
            <div className="flex flex-col h-full justify-between border border-line bg-bg p-5 sm:p-6 bg-architectural-grid">
              <div>
                <div className="flex items-center justify-between border-b border-line pb-3 mb-4 font-mono text-xs">
                  <span className="text-accent font-bold flex items-center gap-2">
                    <IconLayers className="w-4 h-4" />
                    <span>PK-KHMER-TYPE // ARCHITECTURAL PIPELINE</span>
                  </span>
                  <span className="text-muted">4 CORE MODULES</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FLAGSHIP_MODULES.map((mod, idx) => {
                    const active = activeModuleIdx === idx;
                    return (
                      <button
                        key={mod.code}
                        type="button"
                        onClick={() => setActiveModuleIdx(idx)}
                        className={`text-left p-4 border transition-colors ${
                          active
                            ? 'border-accent bg-accentDim'
                            : 'border-line bg-surface hover:border-ink'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                          <span className="text-accent font-bold">
                            {mod.code}
                          </span>
                          <span className="text-muted">NODE 0{idx + 1}</span>
                        </div>
                        <div className="font-display text-base font-bold text-ink">
                          {mod.name}
                        </div>
                        <div className="font-mono text-[10px] text-muted mt-1">
                          {mod.stack}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 border border-line bg-surface p-4">
                <div className="font-mono text-[11px] text-accent uppercase mb-1">
                  INSPECTING {FLAGSHIP_MODULES[activeModuleIdx].code} —{' '}
                  {FLAGSHIP_MODULES[activeModuleIdx].name}
                </div>
                <p className="text-sm text-ink/90 leading-relaxed">
                  {FLAGSHIP_MODULES[activeModuleIdx].detail}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Flagship Product Specification */}
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-bg">
          <div>
            <div className="flex items-center justify-between font-mono text-xs text-muted mb-3">
              <span>INDEX // {flagship.index}</span>
              <span className="text-accent uppercase">{flagship.category}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {flagship.name}
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              {flagship.subtitle}
            </p>

            <p className="mt-5 text-sm sm:text-base text-muted leading-relaxed">
              {flagship.shortDescription}
            </p>

            {/* Verified Implemented Features */}
            <div className="mt-6 pt-5 border-t border-lineSoft">
              <div className="hud-label text-ink mb-3">
                VERIFIED IMPLEMENTED CAPABILITIES
              </div>
              <ul className="space-y-2 text-sm text-muted">
                {[
                  'Khmer typing lessons (40 levels, 218 progressive lessons)',
                  'Keyboard layout learning (Khmer Standard, Khmer NiDA, English QWERTY)',
                  'Dual-hand 3D kinematic finger guide & procedural Web Audio switches',
                  'Progress tracking & Live Mastery Dashboard with per-key heatmaps',
                  'Adaptive practice drills for weak keys & Temple Trial typing races',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <IconCheck className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <span className="text-ink/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Tech Stack */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {flagship.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Primary, Secondary, and Detail Actions */}
          <div className="mt-8 pt-6 border-t border-line space-y-3">
            <div className="flex flex-wrap gap-3">
              {flagship.liveUrl && (
                <a
                  href={flagship.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-invertBg text-invertFg px-5 py-3 hud-label hover:opacity-90 transition-opacity"
                >
                  <span>Open Project</span>
                  <IconArrowUpRight className="w-4 h-4" />
                </a>
              )}
              {flagship.repoUrl && (
                <a
                  href={flagship.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-line bg-surface hover:border-ink text-ink px-5 py-3 hud-label transition-colors"
                >
                  <IconGitHub className="w-4 h-4" />
                  <span>View Source</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => onSelectProject(flagship.id)}
              className="w-full inline-flex items-center justify-between border border-line px-4 py-2.5 font-mono text-xs text-muted hover:text-ink hover:border-ink transition-colors"
            >
              <span>Inspect Full Project Breakdown &amp; Sub-Apps</span>
              <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Featured Releases Row */}
      {secondaryFeatured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line bg-bg">
          {secondaryFeatured.map((project) => {
            const isEmbedded = Boolean(inlineEmbedMap[project.id]);
            return (
              <div
                key={project.id}
                className="spotlight-card card-laser-lift group p-6 sm:p-10 flex flex-col justify-between hover:bg-surface/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-muted mb-4">
                    <span>
                      {project.index} // {project.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <button
                          type="button"
                          onClick={() => toggleSecondaryEmbed(project.id)}
                          className={`border px-2.5 py-0.5 text-[11px] font-mono transition-colors ${
                            isEmbedded
                              ? 'border-accent bg-accent text-[#0b0b0c] font-bold'
                              : 'border-line bg-surface text-accent hover:border-accent'
                          }`}
                        >
                          {isEmbedded ? 'Close Live Embed' : 'Try Live Inline'}
                        </button>
                      )}
                      <span className="inline-flex items-center gap-1.5 border border-line px-2.5 py-0.5 text-[11px] text-ink bg-surface">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] beacon-pulse" />
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <div className="hud-frame border border-line aspect-[16/9] mb-5 overflow-hidden bg-[#0b0d12]">
                    {isEmbedded && project.liveUrl ? (
                      <iframe
                        src={project.liveUrl}
                        title={`${project.name} Inline Preview`}
                        className="w-full h-full border-0"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        onClick={() => onSelectProject(project.id)}
                        className="cursor-pointer w-full h-full"
                      >
                        <ProjectPreviewVisual project={project} />
                      </div>
                    )}
                  </div>

                  <h3 className="font-display text-2xl font-bold text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-lineSoft flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-invertBg text-invertFg px-4 py-2 hud-label hover:opacity-90 transition-opacity"
                      >
                        <span>Open Project</span>
                        <IconArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-line bg-surface hover:border-ink text-ink px-4 py-2 hud-label transition-colors"
                      >
                        <IconGitHub className="w-3.5 h-3.5" />
                        <span>View Source</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors"
                  >
                    <span>Learn More</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
