import React from 'react';
import { PROJECT_CATEGORIES } from '../data/projects';

export default function ProjectFilters({
  projects,
  selectedCategory,
  onSelectCategory,
}) {
  // Only show categories that have at least one real verified project
  const availableCategories = PROJECT_CATEGORIES.filter((cat) => {
    if (cat === 'All Projects') return true;
    return projects.some((p) => p.category === cat);
  });

  const getCategoryCount = (cat) => {
    if (cat === 'All Projects') return projects.length;
    return projects.filter((p) => p.category === cat).length;
  };

  return (
    <div className="border-b border-line bg-surface px-6 py-4 sm:px-10 flex flex-wrap items-center justify-between gap-4">
      <div className="font-mono text-xs text-muted">
        FILTER BY CATEGORY // REAL DISCOVERED BUILDS
      </div>

      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {availableCategories.map((category) => {
          const isActive = selectedCategory === category;
          const count = getCategoryCount(category);

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(category)}
              className={`inline-flex items-center gap-2 border px-3.5 py-1.5 font-mono text-xs transition-colors ${
                isActive
                  ? 'border-invertBg bg-invertBg text-invertFg font-semibold'
                  : 'border-line bg-bg text-muted hover:text-ink hover:border-ink'
              }`}
            >
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 border ${
                  isActive
                    ? 'border-invertFg/30 text-invertFg'
                    : 'border-line text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
