import React, { useState } from 'react';
import FeaturedProjects from './FeaturedProjects';
import ProjectFilters from './ProjectFilters';
import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects, onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  const filteredProjects =
    selectedCategory === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

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

        {/* Complete Project Index Header */}
        <div className="px-6 pt-8 pb-4 sm:px-10 bg-surface border-b border-line flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="hud-label text-ink">
              02 // COMPLETE PROJECT DIRECTORY ({projects.length} PROJECTS)
            </span>
          </div>
          <span className="font-mono text-xs text-muted">
            CLICK ANY PROJECT TO INSPECT DETAILS
          </span>
        </div>

        {/* Category Filter Bar */}
        <ProjectFilters
          projects={projects}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Responsive Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-line">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
