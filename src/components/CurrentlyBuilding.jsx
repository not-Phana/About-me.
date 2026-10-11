import React from 'react';
import {
  IconArrowUpRight,
  IconArrowRight,
  IconGitHub,
  IconTerminal,
} from './Icons';

export default function CurrentlyBuilding({ projects, onSelectProject }) {
  // Featured active builds controlled directly from src/data/projects.js (`currentlyBuilding: true`)
  const activeBuilds = projects.filter((p) => p.currentlyBuilding);

  if (activeBuilds.length === 0) return null;

  return (
    <section id="building" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        {/* Section Header */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-line flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-surface/30">
          <div>
            <div className="hud-label text-accent mb-3 flex items-center gap-2">
              <IconTerminal className="w-4 h-4" />
              <span>SECTION 03 // CURRENTLY BUILDING</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
              Active Workbenches
            </h2>
          </div>
          <p className="max-w-xl text-sm sm:text-base text-muted leading-relaxed">
            Projects I am actively iterating on right now—showing what exists
            today, what is still unfinished, and what I am building next.
          </p>
        </div>

        {/* Active Builds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 gap-px bg-line">
          {activeBuilds.map((project) => (
            <div
              key={project.id}
              className="bg-bg p-6 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-4">
                  <span className="text-muted">
                    WORKBENCH // {project.index}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-0.5 text-ink">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        project.statusTone === 'live'
                          ? 'bg-[#4ade80]'
                          : 'bg-[#d4a528]'
                      }`}
                    />
                    <span>{project.status}</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-ink">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {project.shortDescription}
                </p>

                <div className="mt-5 border-l-2 border-accent bg-surface/60 p-4">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-accent mb-1">
                    WHAT COMES NEXT
                  </div>
                  <p className="text-sm text-ink/90 leading-relaxed">
                    {project.whatComesNext}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-lineSoft flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-invertBg text-invertFg px-3.5 py-1.5 hud-label hover:opacity-90 transition-opacity"
                    >
                      <span>Open Live</span>
                      <IconArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-line bg-surface hover:border-ink text-ink px-3.5 py-1.5 hud-label transition-colors"
                    >
                      <IconGitHub className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                  {!project.liveUrl && !project.repoUrl && (
                    <span className="font-mono text-xs text-muted">
                      Local workspace build (Unpublished)
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(project.id)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-ink hover:text-accent transition-colors"
                >
                  <span>Inspect Notes</span>
                  <IconArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
