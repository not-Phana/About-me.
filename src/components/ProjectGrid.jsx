import React, { useState, useMemo } from 'react';
import FeaturedProjects from './FeaturedProjects';
import ProjectFilters from './ProjectFilters';
import ProjectCard from './ProjectCard';
import {
  IconGrid,
  IconLayers,
  IconArrowUpRight,
  IconArrowRight,
  IconGitHub,
  IconClose,
} from './Icons';

export default function ProjectGrid({ projects, onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTechTag, setActiveTechTag] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'ledger'

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All Projects' || p.category === selectedCategory;

      const matchesTech =
        !activeTechTag || p.technologies.includes(activeTechTag);

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory && matchesTech;

      const haystack = [
        p.name,
        p.subtitle,
        p.category,
        p.status,
        p.shortDescription,
        ...(p.technologies || []),
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && matchesTech && haystack.includes(q);
    });
  }, [projects, selectedCategory, activeTechTag, searchQuery]);

  return (
    <section id="projects" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        {/* Section Header */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-line flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="hud-label text-accent mb-3">
              SECTION 01 // SOFTWARE &amp; EXPERIMENTS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
              Projects &amp; Real Builds
            </h2>
          </div>
          <p className="max-w-xl text-sm sm:text-base text-muted leading-relaxed">
            Every entry below is a real project from my GitHub repositories or
            local development workspace—labeled honestly with its actual status,
            verified features, and live or source links where available.
          </p>
        </div>

        {/* Flagship & Featured Showcase */}
        <FeaturedProjects
          projects={projects}
          onSelectProject={onSelectProject}
        />

        {/* Complete Project Index Header + Search & View Mode Controls */}
        <div className="px-6 py-5 sm:px-10 bg-surface border-b border-line flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="hud-label text-ink">
              02 // COMPLETE PROJECT DIRECTORY ({filteredProjects.length} /{' '}
              {projects.length})
            </span>
            {activeTechTag && (
              <button
                type="button"
                onClick={() => setActiveTechTag('')}
                className="inline-flex items-center gap-1.5 border border-accent bg-accentDim px-2.5 py-0.5 font-mono text-xs text-accent"
              >
                <span>TECH: {activeTechTag}</span>
                <IconClose className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Instant Search Filter */}
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, stack, or tool..."
                aria-label="Filter projects by name, stack, or tool"
                className="w-full border border-line bg-bg px-3 py-1.5 font-mono text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
              />
            </div>

            {/* View Mode Switcher: Grid Cards vs Architectural Ledger */}
            <div
              className="inline-flex border border-line bg-bg"
              role="group"
              aria-label="Project directory layout mode"
            >
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-invertBg text-invertFg font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <IconGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('ledger')}
                className={`inline-flex items-center gap-1.5 border-l border-line px-3 py-1.5 font-mono text-xs transition-colors ${
                  viewMode === 'ledger'
                    ? 'bg-invertBg text-invertFg font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <IconLayers className="w-3.5 h-3.5" />
                <span>Spec Ledger</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Bar */}
        <ProjectFilters
          projects={projects}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Directory Content: Cards Grid or Architectural Spec Ledger */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center font-mono text-sm text-muted">
            <p>No projects match the current filter criteria.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Projects');
                setSearchQuery('');
                setActiveTechTag('');
              }}
              className="mt-4 border border-accent bg-accentDim px-4 py-2 font-mono text-xs text-accent hover:bg-accent hover:text-[#0b0b0c] transition-colors"
            >
              Reset Directory Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-line">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={onSelectProject}
                onSelectTechTag={setActiveTechTag}
                activeTechTag={activeTechTag}
              />
            ))}
          </div>
        ) : (
          /* High-Density Studio Architectural Spec Ledger */
          <div className="overflow-x-auto bg-bg">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-line bg-surface/60 text-muted uppercase">
                  <th className="py-3.5 px-4 sm:px-6">IDX</th>
                  <th className="py-3.5 px-4">PROJECT</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">CATEGORY</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">
                    VERIFIED STACK
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filteredProjects.map((project) => {
                  const dotColor =
                    project.statusTone === 'live'
                      ? 'bg-[#4ade80]'
                      : project.statusTone === 'building'
                      ? 'bg-[#d4a528]'
                      : 'bg-[#818cf8]';
                  return (
                    <tr
                      key={project.id}
                      className="hover:bg-surface/40 transition-colors group"
                    >
                      <td className="py-4 px-4 sm:px-6 text-accent font-bold whitespace-nowrap">
                        {project.index}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project.id)}
                          className="font-display text-base font-bold text-ink group-hover:text-accent text-left transition-colors"
                        >
                          {project.name}
                        </button>
                        <div className="text-[11px] text-muted mt-0.5 max-w-md font-sans">
                          {project.subtitle}
                        </div>
                      </td>
                      <td className="py-4 px-4 hidden md:table-cell text-muted whitespace-nowrap">
                        {project.category}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-0.5 text-[11px] text-ink">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${dotColor}`}
                          />
                          <span>{project.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="border border-line bg-surface px-2 py-0.5 text-[10px] text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-invertBg text-invertFg px-2.5 py-1 text-[10px] uppercase font-bold hover:opacity-90"
                            >
                              <span>Live</span>
                              <IconArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 border border-line bg-surface hover:border-ink text-ink px-2.5 py-1 text-[10px] uppercase"
                            >
                              <IconGitHub className="w-3 h-3" />
                              <span>Repo</span>
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => onSelectProject(project.id)}
                            className="inline-flex items-center gap-1 border border-line hover:border-accent text-accent px-2.5 py-1 text-[10px] uppercase"
                          >
                            <span>Specs</span>
                            <IconArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
