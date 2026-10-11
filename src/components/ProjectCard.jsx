import React from 'react';
import { IconArrowUpRight, IconArrowRight, IconGitHub } from './Icons';
import ProjectPreviewVisual from './ProjectPreviewVisual';

export default function ProjectCard({ project, onSelectProject }) {
  const statusDotColor =
    project.statusTone === 'live'
      ? 'bg-[#4ade80]'
      : project.statusTone === 'building'
      ? 'bg-[#d4a528]'
      : 'bg-[#818cf8]';

  return (
    <article className="group flex flex-col justify-between bg-bg p-6 sm:p-8 hover:bg-surface/40 transition-colors">
      <div>
        {/* Card Header Metadata */}
        <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted mb-4">
          <span>
            {project.index} // {project.category.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-0.5 text-[11px] text-ink">
            <span className={`h-1.5 w-1.5 rounded-full ${statusDotColor}`} />
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
          className="cursor-pointer border border-line aspect-[16/10] mb-5 overflow-hidden focus-visible:outline-accent"
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

        {/* Verified Tech Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
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
