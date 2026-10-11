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

export default function FeaturedProjects({ projects, onSelectProject }) {
  const featured = projects.filter((p) => p.featured);
  const flagship = featured[0]; // PK Khmer Type
  const secondaryFeatured = featured.slice(1);

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [viewportMode, setViewportMode] = useState('gallery'); // 'gallery' | 'embed' | 'blueprint'
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [inlineEmbedMap, setInlineEmbedMap] = useState({});

  if (!flagship) return null;

  const slides = flagship.gallery?.length
    ? flagship.gallery
    : [{ src: flagship.coverImage, caption: flagship.name }];

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

        {/* Viewport Mode Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2 sm:mt-0">
          {[
            { id: 'gallery', label: '01 // SCREENSHOTS' },
            { id: 'embed', label: '02 // LIVE INTERACTIVE APP' },
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
        {/* Left: Product Visual / Live App / System Blueprint */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-line bg-surface/50 p-6 sm:p-10 flex flex-col justify-between">
          {viewportMode === 'gallery' && (
            <>
              <div className="hud-frame group relative border border-line bg-[#0b0d12] overflow-hidden aspect-[16/10]">
                <img
                  src={slides[activeSlideIdx]?.src || flagship.coverImage}
                  alt={slides[activeSlideIdx]?.caption || flagship.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-bg/90 backdrop-blur-sm border border-line px-3 py-1 font-mono text-[11px] text-ink">
                  <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
                  <span>{flagship.status}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setViewportMode('embed')}
                  className="absolute bottom-3 right-3 bg-invertBg text-invertFg px-3.5 py-1.5 hud-label shadow-card hover:opacity-90 transition-opacity"
                >
                  Launch Live Embed -&gt;
                </button>
              </div>

              {/* Interactive Screenshot Selector for Flagship */}
              {slides.length > 1 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted mb-2">
                    <span>INSPECT KEYBOARD LAYOUTS &amp; STUDIO VIEWS</span>
                    <span>
                      0{activeSlideIdx + 1} / 0{slides.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      'Studio + 3D Hands',
                      'Khmer Standard',
                      'Khmer NiDA',
                      'English QWERTY',
                    ].map((label, idx) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setActiveSlideIdx(idx)}
                        className={`px-3 py-2 border text-left font-mono text-[11px] transition-colors ${
                          activeSlideIdx === idx
                            ? 'border-accent bg-accentDim text-ink font-semibold'
                            : 'border-line bg-bg text-muted hover:text-ink'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {viewportMode === 'embed' && (
            <div className="flex flex-col h-full justify-between">
              <div className="hud-frame relative border border-accent bg-[#0b0d12] overflow-hidden aspect-[16/10]">
                <iframe
                  src={flagship.liveUrl}
                  title={`${flagship.name} Live Embedded Application`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border border-line bg-bg px-4 py-2.5 font-mono text-xs">
                <span className="text-accent">
                  LIVE SANDBOX // {flagship.liveUrl}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setViewportMode('gallery')}
                    className="text-muted hover:text-ink"
                  >
                    [Back to Screenshots]
                  </button>
                  <a
                    href={flagship.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent inline-flex items-center gap-1"
                  >
                    <span>Full Screen</span>
                    <IconArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
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

            <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              {flagship.name}
            </h3>
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
                className="spotlight-card group p-6 sm:p-10 flex flex-col justify-between hover:bg-surface/40 transition-colors"
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
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
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
