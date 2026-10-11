import React, { useState } from 'react';
import {
  IconArrowUpRight,
  IconArrowRight,
  IconGitHub,
  IconCheck,
} from './Icons';
import ProjectPreviewVisual from './ProjectPreviewVisual';

export default function FeaturedProjects({ projects, onSelectProject }) {
  const featured = projects.filter((p) => p.featured);
  const flagship = featured[0]; // PK Khmer Type
  const secondaryFeatured = featured.slice(1);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  if (!flagship) return null;

  const slides = flagship.gallery?.length
    ? flagship.gallery
    : [{ src: flagship.coverImage, caption: flagship.name }];

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
        <span className="font-mono text-xs text-muted">
          PK-KHMER-TYPE // V2.4 STUDIO
        </span>
      </div>

      {/* Flagship Product Showcase: PK Khmer Type */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-line">
        {/* Left: Product Visual & Layout Switcher */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-line bg-surface/50 p-6 sm:p-10 flex flex-col justify-between">
          <div className="group relative border border-line bg-[#0b0d12] overflow-hidden aspect-[16/10]">
            <img
              src={slides[activeSlideIdx]?.src || flagship.coverImage}
              alt={slides[activeSlideIdx]?.caption || flagship.name}
              className="w-full h-full object-cover object-top transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-bg/90 backdrop-blur-sm border border-line px-3 py-1 font-mono text-[11px] text-ink">
              <span className="h-2 w-2 rounded-full bg-[#4ade80]" />
              <span>{flagship.status}</span>
            </div>
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
          {secondaryFeatured.map((project) => (
            <div
              key={project.id}
              className="group p-6 sm:p-10 flex flex-col justify-between hover:bg-surface/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-muted mb-4">
                  <span>
                    {project.index} // {project.category.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-line px-2.5 py-0.5 text-[11px] text-ink bg-surface">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                    {project.status}
                  </span>
                </div>

                <div
                  onClick={() => onSelectProject(project.id)}
                  className="cursor-pointer border border-line aspect-[16/9] mb-5 overflow-hidden"
                >
                  <ProjectPreviewVisual project={project} />
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
          ))}
        </div>
      )}
    </div>
  );
}
