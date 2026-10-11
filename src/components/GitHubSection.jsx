import React, { useState, useMemo } from 'react';
import { useGitHubData } from '../hooks/useGitHubData';
import { PROFILE } from '../data/profile';
import {
  IconGitHub,
  IconArrowUpRight,
  IconStar,
  IconGitFork,
  IconRefresh,
  IconClock,
  IconCheck,
  IconTerminal,
  IconClose,
} from './Icons';

function formatDate(isoString) {
  if (!isoString) return 'Unknown';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoString.slice(0, 10);
  }
}

const LANG_COLORS = {
  JavaScript: '#facc15',
  HTML: '#fb7185',
  CSS: '#38bdf8',
  TypeScript: '#60a5fa',
  Python: '#34d399',
  Other: '#a1a1aa',
};

export default function GitHubSection() {
  const { profile, repos, status, errorMessage, refresh } = useGitHubData();
  const [repoFilter, setRepoFilter] = useState('original'); // 'original' | 'all'
  const [selectedLang, setSelectedLang] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [copiedRepo, setCopiedRepo] = useState('');

  const originalRepos = useMemo(() => repos.filter((r) => !r.fork), [repos]);
  const baseRepos = repoFilter === 'original' ? originalRepos : repos;

  // Compute real language distribution across baseRepos
  const languageBreakdown = useMemo(() => {
    const counts = {};
    let total = 0;
    baseRepos.forEach((r) => {
      const lang = r.language || 'HTML';
      counts[lang] = (counts[lang] || 0) + 1;
      total += 1;
    });
    if (total === 0) return [];
    return Object.entries(counts)
      .map(([lang, count]) => ({
        lang,
        count,
        pct: Math.round((count / total) * 100),
        color: LANG_COLORS[lang] || LANG_COLORS.Other,
      }))
      .sort((a, b) => b.count - a.count);
  }, [baseRepos]);

  const months2026 = [
    { key: '2026-01', label: 'Jan' },
    { key: '2026-02', label: 'Feb' },
    { key: '2026-03', label: 'Mar' },
    { key: '2026-04', label: 'Apr' },
    { key: '2026-05', label: 'May' },
    { key: '2026-06', label: 'Jun' },
    { key: '2026-07', label: 'Jul' },
    { key: '2026-08', label: 'Aug' },
    { key: '2026-09', label: 'Sep' },
    { key: '2026-10', label: 'Oct' },
  ];

  const monthlyActivity = months2026.map((m) => {
    const activeInMonth = repos.filter(
      (r) =>
        (r.created_at && r.created_at.startsWith(m.key)) ||
        (r.pushed_at && r.pushed_at.startsWith(m.key)) ||
        (r.updated_at && r.updated_at.startsWith(m.key))
    );
    return {
      ...m,
      count: activeInMonth.length,
      repoNames: activeInMonth.map((r) => r.name),
    };
  });

  const displayedRepos = useMemo(() => {
    return baseRepos.filter((r) => {
      const matchesLang =
        !selectedLang || (r.language || 'HTML') === selectedLang;
      const matchesMonth =
        !selectedMonth ||
        (r.created_at && r.created_at.startsWith(selectedMonth)) ||
        (r.pushed_at && r.pushed_at.startsWith(selectedMonth)) ||
        (r.updated_at && r.updated_at.startsWith(selectedMonth));
      return matchesLang && matchesMonth;
    });
  }, [baseRepos, selectedLang, selectedMonth]);

  const handleCopyClone = (repoName, cloneUrl) => {
    const cmd = `git clone ${
      cloneUrl || `https://github.com/${PROFILE.githubUsername}/${repoName}.git`
    }`;
    try {
      navigator.clipboard.writeText(cmd);
      setCopiedRepo(repoName);
      setTimeout(() => setCopiedRepo(''), 2000);
    } catch {
      // Fallback ignore
    }
  };

  return (
    <section id="github" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        {/* Section Header */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-line flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="hud-label text-accent mb-3">
              SECTION 02 // OPEN SOURCE &amp; PUBLIC REPOSITORIES
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
              GitHub Activity &amp; Repositories
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refresh}
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 border border-line bg-surface hover:border-ink text-ink px-4 py-2.5 hud-label transition-colors disabled:opacity-50"
            >
              <IconRefresh
                className={`w-3.5 h-3.5 ${
                  status === 'loading' ? 'animate-spin' : ''
                }`}
              />
              <span>
                {status === 'loading' ? 'Syncing API...' : 'Refresh API'}
              </span>
            </button>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-invertBg text-invertFg px-5 py-2.5 hud-label hover:opacity-90 transition-opacity"
            >
              <IconGitHub className="w-4 h-4" />
              <span>Open @{PROFILE.githubUsername}</span>
              <IconArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* API Status Notice Bar */}
        <div className="border-b border-line bg-surface px-6 py-3 sm:px-10 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <span
              className={`h-2 w-2 rounded-full ${
                status === 'live'
                  ? 'bg-[#4ade80]'
                  : status === 'loading'
                  ? 'bg-[#d4a528]'
                  : 'bg-[#818cf8]'
              }`}
            />
            <span className="text-ink">
              {status === 'live' &&
                'Connected to live GitHub REST API (api.github.com/users/phanaach4889)'}
              {status === 'loading' &&
                'Fetching public repository data from GitHub REST API...'}
              {status === 'fallback' &&
                (errorMessage || 'Using verified local repository snapshot.')}
            </span>
          </div>
          <span className="text-muted">
            Click any language or 2026 month cell below to filter repositories
          </span>
        </div>

        {/* Profile Overview & Verified Activity Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-line">
          {/* Left: Public GitHub Profile Card + Language Telemetry Bar */}
          <div className="lg:col-span-5 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-line flex flex-col justify-between bg-bg">
            <div className="flex items-start gap-4">
              {profile?.avatar_url && (
                <div className="hud-frame shrink-0">
                  <img
                    src={profile.avatar_url}
                    alt={`${profile.login} GitHub avatar`}
                    className="w-16 h-16 border border-line object-cover bg-surface"
                  />
                </div>
              )}
              <div>
                <div className="font-mono text-xs text-accent">
                  GITHUB PROFILE // PUBLIC DATA
                </div>
                <h3 className="font-display text-2xl font-bold text-ink mt-0.5">
                  {profile?.name || 'Kon'} (
                  @{profile?.login || PROFILE.githubUsername})
                </h3>
                <p className="mt-1.5 text-sm text-muted">
                  &ldquo;{profile?.bio || PROFILE.githubBio}&rdquo;
                </p>
              </div>
            </div>

            {/* Primary Language Distribution Bar */}
            {languageBreakdown.length > 0 && (
              <div className="mt-6 pt-5 border-t border-lineSoft">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted mb-2">
                  <span>REPOSITORY LANGUAGE TELEMETRY</span>
                  <span>{baseRepos.length} REPOS ANALYZED</span>
                </div>
                <div className="h-2.5 w-full bg-surface border border-line flex overflow-hidden">
                  {languageBreakdown.map((item) => (
                    <div
                      key={item.lang}
                      style={{
                        width: `${item.pct}%`,
                        backgroundColor: item.color,
                      }}
                      title={`${item.lang}: ${item.pct}% (${item.count} repos)`}
                      className="h-full transition-all duration-300"
                    />
                  ))}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {languageBreakdown.map((item) => {
                    const isSelected = selectedLang === item.lang;
                    return (
                      <button
                        key={item.lang}
                        type="button"
                        onClick={() =>
                          setSelectedLang(isSelected ? '' : item.lang)
                        }
                        className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[11px] transition-colors ${
                          isSelected
                            ? 'border-accent bg-accentDim text-ink font-bold'
                            : 'border-line bg-surface text-muted hover:text-ink'
                        }`}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.lang}</span>
                        <span className="text-muted">{item.pct}%</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <dl className="mt-6 grid grid-cols-3 border border-line bg-surface divide-x divide-line font-mono text-center">
              <div className="p-3.5">
                <dt className="text-[10px] text-muted uppercase">
                  PUBLIC REPOS
                </dt>
                <dd className="mt-1 text-xl font-bold text-ink">
                  {profile?.public_repos ?? repos.length}
                </dd>
              </div>
              <div className="p-3.5">
                <dt className="text-[10px] text-muted uppercase">
                  ORIGINAL REPOS
                </dt>
                <dd className="mt-1 text-xl font-bold text-accent">
                  {originalRepos.length}
                </dd>
              </div>
              <div className="p-3.5">
                <dt className="text-[10px] text-muted uppercase">
                  JOINED GITHUB
                </dt>
                <dd className="mt-1 text-sm font-bold text-ink pt-1">
                  Jan 2026
                </dd>
              </div>
            </dl>
          </div>

          {/* Right: Official API Repository Activity Cadence (2026) */}
          <div className="lg:col-span-7 p-6 sm:p-10 bg-surface/40 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <div className="hud-label text-ink">
                  PUBLIC REPOSITORY PUSH &amp; CREATION CADENCE (2026)
                </div>
                <p className="text-xs text-muted mt-1">
                  Computed directly from public GitHub API repository timestamps. Click any active month to inspect repositories touched in that period.
                </p>
              </div>
              <span className="font-mono text-xs text-accent">
                2026 TIMELINE
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2">
              {monthlyActivity.map((item) => {
                const active = item.count > 0;
                const isSelected = selectedMonth === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      active &&
                      setSelectedMonth(isSelected ? '' : item.key)
                    }
                    title={
                      active
                        ? `${item.label} 2026: ${item.repoNames.join(', ')} (Click to filter)`
                        : `${item.label} 2026: No public repo push timestamp`
                    }
                    className={`border p-2.5 flex flex-col items-center justify-between min-h-[86px] transition-colors ${
                      isSelected
                        ? 'border-accent bg-accentDim ring-1 ring-accent'
                        : active
                        ? 'border-line bg-bg hover:border-accent/60 cursor-pointer'
                        : 'border-line bg-bg opacity-60 cursor-default'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-muted">
                      {item.label}
                    </span>
                    <div
                      className={`w-full h-6 border flex items-center justify-center font-mono text-xs font-bold ${
                        item.count >= 3
                          ? 'border-accent bg-accent text-[#0b0b0c]'
                          : item.count > 0
                          ? 'border-accent/60 bg-accentDim text-accent'
                          : 'border-lineSoft bg-surface text-muted/40'
                      }`}
                    >
                      {item.count}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Repository Filter Bar */}
        <div className="border-b border-line bg-surface px-6 py-4 sm:px-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-muted">
              DISPLAYING PUBLIC REPOSITORIES ({displayedRepos.length})
            </span>
            {selectedLang && (
              <button
                type="button"
                onClick={() => setSelectedLang('')}
                className="inline-flex items-center gap-1 border border-accent bg-accentDim px-2 py-0.5 text-accent"
              >
                <span>LANG: {selectedLang}</span>
                <IconClose className="w-3 h-3" />
              </button>
            )}
            {selectedMonth && (
              <button
                type="button"
                onClick={() => setSelectedMonth('')}
                className="inline-flex items-center gap-1 border border-accent bg-accentDim px-2 py-0.5 text-accent"
              >
                <span>MONTH: {selectedMonth}</span>
                <IconClose className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRepoFilter('original')}
              className={`border px-3 py-1 font-mono text-xs transition-colors ${
                repoFilter === 'original'
                  ? 'border-invertBg bg-invertBg text-invertFg font-semibold'
                  : 'border-line bg-bg text-muted hover:text-ink'
              }`}
            >
              Original Work ({originalRepos.length})
            </button>
            <button
              type="button"
              onClick={() => setRepoFilter('all')}
              className={`border px-3 py-1 font-mono text-xs transition-colors ${
                repoFilter === 'all'
                  ? 'border-invertBg bg-invertBg text-invertFg font-semibold'
                  : 'border-line bg-bg text-muted hover:text-ink'
              }`}
            >
              All Public Repos ({repos.length})
            </button>
          </div>
        </div>

        {/* Repository Grid */}
        {displayedRepos.length === 0 ? (
          <div className="p-12 text-center font-mono text-sm text-muted">
            <p>No public repositories match this filter combination.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedLang('');
                setSelectedMonth('');
                setRepoFilter('all');
              }}
              className="mt-3 border border-accent bg-accentDim px-4 py-1.5 text-xs text-accent"
            >
              Reset Repository Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-line">
            {displayedRepos.map((repo) => {
              const isCopied = copiedRepo === repo.name;
              return (
                <article
                  key={repo.id || repo.name}
                  className="spotlight-card bg-bg p-6 sm:p-8 flex flex-col justify-between hover:bg-surface/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <IconClock className="w-3.5 h-3.5 text-accent" />
                        <span>
                          Updated {formatDate(repo.pushed_at || repo.updated_at)}
                        </span>
                      </span>
                      <span className="border border-line bg-surface px-2 py-0.5 text-[10px] uppercase">
                        {repo.fork ? 'Forked Repo' : 'Source Repo'}
                      </span>
                    </div>

                    <h3 className="font-mono text-lg font-bold text-ink break-words">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {repo.name}
                      </a>
                    </h3>

                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {repo.description ||
                        'Public GitHub repository maintained by phanaach4889.'}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-lineSoft space-y-3 font-mono text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-muted">
                        {repo.language && (
                          <span className="inline-flex items-center gap-1.5 text-ink">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor:
                                  LANG_COLORS[repo.language] ||
                                  LANG_COLORS.Other,
                              }}
                            />
                            <span>{repo.language}</span>
                          </span>
                        )}
                        <span
                          className="inline-flex items-center gap-1"
                          title="GitHub Stars"
                        >
                          <IconStar className="w-3.5 h-3.5" />
                          <span>{repo.stargazers_count ?? 0}</span>
                        </span>
                        <span
                          className="inline-flex items-center gap-1"
                          title="GitHub Forks"
                        >
                          <IconGitFork className="w-3.5 h-3.5" />
                          <span>{repo.forks_count ?? 0}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {repo.homepage && (
                          <a
                            href={repo.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-accent hover:underline"
                          >
                            <span>Live</span>
                            <IconArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-ink hover:text-accent transition-colors"
                        >
                          <span>Repo</span>
                          <IconArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* One-Click Copy git clone Command */}
                    <button
                      type="button"
                      onClick={() => handleCopyClone(repo.name, repo.clone_url)}
                      className={`w-full flex items-center justify-between border px-3 py-1.5 text-[11px] transition-colors ${
                        isCopied
                          ? 'border-[#4ade80] bg-[#4ade80]/10 text-[#4ade80]'
                          : 'border-line bg-surface text-muted hover:text-ink hover:border-ink'
                      }`}
                      title={`Copy git clone command for ${repo.name}`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <IconTerminal className="w-3 h-3 text-accent shrink-0" />
                        <span className="truncate">
                          git clone .../{repo.name}.git
                        </span>
                      </span>
                      <span className="shrink-0 ml-2 font-bold uppercase flex items-center gap-1">
                        {isCopied ? (
                          <>
                            <IconCheck className="w-3 h-3" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <span>Copy</span>
                        )}
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
