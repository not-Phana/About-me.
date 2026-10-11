import React, { useEffect, useState } from 'react';
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconArrowRight,
  IconGitHub,
  IconCheck,
  IconAlert,
} from './Icons';
import ProjectPreviewVisual from './ProjectPreviewVisual';

export default function ProjectDetail({
  project,
  requestedSlug,
  allProjects,
  onBack,
  onSelectProject,
}) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  useEffect(() => {
    setSelectedImageIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project?.id, requestedSlug]);

  // Useful 404 / Not-Found Handling for unknown project detail routes
  if (!project) {
    return (
      <section className="min-h-[75vh] border-b border-line bg-bg flex items-center">
        <div className="mx-auto w-full max-w-[1400px] border-x border-line p-6 sm:p-12 lg:p-20">
          <div className="max-w-xl border border-line bg-surface p-8 sm:p-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent mb-4">
              <IconAlert className="w-4 h-4" />
              <span>404 // PROJECT ROUTE NOT FOUND</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              Project &ldquo;{requestedSlug}&rdquo; does not exist.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              The project slug in the URL could not be matched to any entry in
              the project data file. You can return to the main project showcase
              or jump directly to a verified project below.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 bg-invertBg text-invertFg px-5 py-3 hud-label hover:opacity-90 transition-opacity"
              >
                <IconArrowLeft className="w-4 h-4" />
                <span>Back to All Projects</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <div className="font-mono text-xs text-muted mb-3">
                AVAILABLE VERIFIED PROJECTS:
              </div>
              <div className="flex flex-wrap gap-2">
                {allProjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectProject(p.id)}
                    className="border border-line bg-bg px-3 py-1.5 font-mono text-xs text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentIdx = allProjects.findIndex((p) => p.id === project.id);
  const nextProject =
    allProjects[(currentIdx + 1) % allProjects.length] || null;
  const galleryItems = project.gallery?.length ? project.gallery : [];

  return (
    <article className="border-b border-line bg-bg animate-enter">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        {/* Top Breadcrumb & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface px-6 py-4 sm:px-10">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 font-mono text-xs text-ink hover:text-accent transition-colors"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span>BACK TO PROJECTS</span>
          </button>

          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <span>PROJECT SPECIFICATION // {project.index}</span>
            <span>·</span>
            <span className="text-ink">{project.category}</span>
          </div>
        </div>

        {/* Project Header Banner */}
        <div className="p-6 sm:p-10 lg:p-14 border-b border-line grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 border border-line bg-surface px-3 py-1 font-mono text-xs text-ink mb-5">
              <span
                className={`h-2 w-2 rounded-full ${
                  project.statusTone === 'live'
                    ? 'bg-[#4ade80]'
                    : project.statusTone === 'building'
                    ? 'bg-[#d4a528]'
                    : 'bg-[#818cf8]'
                }`}
              />
              <span>Status: {project.status}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">
              {project.name}
            </h1>
            <p className="mt-2 font-mono text-sm text-accent">
              {project.subtitle}
            </p>
            <p className="mt-5 max-w-3xl text-base sm:text-lg text-muted leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-4 border border-line bg-surface p-6 space-y-4">
            <div className="hud-label text-ink border-b border-line pb-2.5">
              PROJECT LINKS &amp; ACCESS
            </div>

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between bg-invertBg text-invertFg px-5 py-3.5 hud-label hover:opacity-90 transition-opacity"
              >
                <span>Open Live Project</span>
                <IconArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <div className="border border-line bg-bg p-3.5 font-mono text-xs text-muted">
                Live URL: Not deployed publicly yet (Local workspace build).
              </div>
            )}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between border border-line bg-bg hover:border-ink text-ink px-5 py-3.5 hud-label transition-colors"
              >
                <span className="flex items-center gap-2">
                  <IconGitHub className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </span>
                <IconArrowUpRight className="w-4 h-4" />
              </a>
            ) : (
              <div className="border border-line bg-bg p-3.5 font-mono text-xs text-muted">
                Repository: Local codebase on my PC (public GitHub repo not
                published yet).
              </div>
            )}

            {project.secondaryLinks?.length > 0 && (
              <div className="pt-3 border-t border-line space-y-2">
                <div className="font-mono text-[11px] text-muted uppercase">
                  Direct Sub-Routes:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.secondaryLinks.map((sub) => (
                    <a
                      key={sub.url}
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 border border-line bg-bg px-3 py-1.5 font-mono text-xs text-ink hover:border-accent hover:text-accent transition-colors"
                    >
                      <span>{sub.label}</span>
                      <IconArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Showcase / Screenshots Section */}
        <div className="p-6 sm:p-10 lg:p-14 border-b border-line bg-surface/40">
          <div className="hud-label text-ink mb-4">
            VISUAL PREVIEW &amp; INTERFACE INSPECTION
          </div>

          {galleryItems.length > 0 ? (
            <div>
              <div className="border border-line bg-[#0b0d12] overflow-hidden max-h-[560px] flex items-center justify-center">
                <img
                  src={galleryItems[selectedImageIdx]?.src}
                  alt={galleryItems[selectedImageIdx]?.caption || project.name}
                  className="w-full h-auto max-h-[560px] object-contain"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-xs text-muted">
                  {galleryItems[selectedImageIdx]?.caption}
                </p>
                {galleryItems.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {galleryItems.map((item, idx) => (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`px-3 py-1.5 border font-mono text-xs transition-colors ${
                          selectedImageIdx === idx
                            ? 'border-accent bg-accentDim text-ink font-semibold'
                            : 'border-line bg-bg text-muted hover:text-ink'
                        }`}
                      >
                        View 0{idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-line aspect-[16/8] max-h-[420px] overflow-hidden">
              <ProjectPreviewVisual project={project} />
            </div>
          )}
        </div>

        {/* Deep Architectural Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line">
          {/* Left 7 Columns: Why I Built It + Verified Features */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 space-y-10">
            <div>
              <h2 className="hud-label text-accent mb-3">
                01 // WHY I BUILT IT
              </h2>
              <p className="text-base text-ink/90 leading-relaxed">
                {project.whyIBuiltIt}
              </p>
            </div>

            <div className="pt-8 border-t border-lineSoft">
              <h2 className="hud-label text-accent mb-4">
                02 // VERIFIED IMPLEMENTED FEATURES
              </h2>
              <ul className="space-y-3">
                {project.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 text-sm sm:text-base text-ink/90"
                  >
                    <IconCheck className="w-4 h-4 text-accent shrink-0 mt-1" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right 5 Columns: Tech Stack, Current Status, Challenges & Next Steps */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-14 space-y-8 bg-surface/20">
            <div>
              <h2 className="hud-label text-accent mb-3">
                03 // VERIFIED TECHNOLOGY
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-lineSoft">
              <h2 className="hud-label text-accent mb-3">
                04 // CHALLENGES &amp; IMPROVEMENTS
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.challengesAndImprovements}
              </p>
            </div>

            <div className="pt-6 border-t border-lineSoft">
              <h2 className="hud-label text-accent mb-3">
                05 // WHAT COMES NEXT
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                {project.whatComesNext}
              </p>
            </div>
          </div>
        </div>

        {/* Next Project Navigation Bar */}
        {nextProject && (
          <div className="border-t border-line bg-surface px-6 py-6 sm:px-10 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink transition-colors"
            >
              <IconArrowLeft className="w-4 h-4" />
              <span>Return to Project Directory</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(nextProject.id)}
              className="inline-flex items-center gap-3 font-mono text-xs text-ink hover:text-accent transition-colors"
            >
              <span>
                NEXT PROJECT: <strong>{nextProject.name}</strong>
              </span>
              <IconArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
