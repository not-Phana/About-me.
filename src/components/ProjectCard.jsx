import React, { useState } from 'react';
import { IconArrowUpRight, IconArrowRight, IconGitHub } from './Icons';
import ProjectPreviewVisual from './ProjectPreviewVisual';

export default function ProjectCard({
  project,
  onSelectProject,
  onSelectTechTag,
  activeTechTag,
}) {
  const [tiltStyle, setTiltStyle] = useState({});

  const statusDotColor =
    project.statusTone === 'live'
      ? 'bg-[#4ade80]'
      : project.statusTone === 'building'
      ? 'bg-[#d4a528]'
      : 'bg-[#818cf8]';

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

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="spotlight-card card-laser-lift group flex flex-col justify-between bg-bg p-6 sm:p-8 transition-colors"
    >
      <div>
        {/* Card Header Metadata */}
        <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted mb-4">
          <span className="flex items-center gap-1.5">
            <span className="text-accent font-bold">{project.index}</span>
            <span>//</span>
            <span>{project.category.toUpperCase()}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-0.5 text-[11px] text-ink">
            <span className={`h-1.5 w-1.5 rounded-full ${statusDotColor} ${project.statusTone === 'live' ? 'beacon-pulse' : ''}`} />
            <span>{project.status}</span>
          </span>
        </div>

        {/* Visual Preview Container */}
        <div
          onClick={() => onSelectProject(project.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectProject(project.id);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Inspect details for ${project.name}`}
          className="hud-frame cursor-pointer border border-line group-hover:border-accent/70 aspect-[16/10] mb-5 overflow-hidden transition-colors focus-visible:outline-accent"
        >
          <ProjectPreviewVisual project={project} />
        </div>

        {/* Title & Concise Description */}
        <h3 className="font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-accent transition-colors">
          <button
            type="button"
            onClick={() => onSelectProject(project.id)}
            className="text-left focus:outline-none"
          >
            {project.name}
          </button>
        </h3>

        <p className="mt-2 text-sm text-muted leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Verified Tech Tags (Clickable to filter) */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => {
            const isSelected = activeTechTag === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() =>
                  onSelectTechTag &&
                  onSelectTechTag(isSelected ? '' : tech)
                }
                title={`Filter projects using ${tech}`}
                className={`border px-2 py-0.5 font-mono text-[11px] transition-colors ${
                  isSelected
                    ? 'border-accent bg-accent text-[#0b0b0c] font-bold'
                    : 'border-line bg-surface text-muted hover:text-ink hover:border-accent/60'
                }`}
              >
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-6 pt-4 border-t border-lineSoft flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-invertBg text-invertFg px-3.5 py-1.5 hud-label hover:opacity-90 transition-opacity"
            >
              <span>Open Project</span>
              <IconArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted">
              Local Workspace Build
            </span>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-line bg-surface hover:border-ink text-ink px-3.5 py-1.5 hud-label transition-colors"
            >
              <IconGitHub className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelectProject(project.id)}
          className="inline-flex items-center gap-1 font-mono text-xs text-ink hover:text-accent font-medium transition-colors"
        >
          <span>Learn More</span>
          <IconArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
