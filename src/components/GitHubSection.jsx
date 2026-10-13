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
import ContributorsShowcase from './ContributorsShowcase';
import RepoLabCard from './RepoLabCard';

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

export default function GitHubSection({ onPlaySound }) {
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

  const labCardColSpan = useMemo(() => {
    const remainderLg = displayedRepos.length % 3;
    const spanLg =
      remainderLg === 1
        ? 'lg:col-span-2'
        : remainderLg === 2
        ? 'lg:col-span-1'
        : 'lg:col-span-3';

    const remainderMd = displayedRepos.length % 2;
    const spanMd = remainderMd === 1 ? 'md:col-span-1' : 'md:col-span-2';

    return `col-span-1 ${spanMd} ${spanLg}`;
  }, [displayedRepos.length]);

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
    <section id="github" className="border-b border-line bg-bg relative overflow-hidden">
      {/* Background Architectural Kinetic Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-8 right-8 lg:right-24 overflow-hidden opacity-[0.045] font-classical font-semibold text-[6rem] sm:text-[9rem] lg:text-[12rem] tracking-[0.08em] text-ink leading-none whitespace-nowrap z-0"
        data-bg-motion="github-watermark"
      >
        OCTOCAT // 05
      </div>

      <div className="mx-auto max-w-[1400px] border-x border-line relative z-10">
        {/* Section Header */}
        <div className="p-6 sm:p-10 lg:p-12 border-b border-line flex flex-col lg:flex-row lg:items-end justify-between gap-6 reveal-on-scroll">
          <div>
            <div className="hud-label text-accent mb-3">
              SECTION 05 // GITHUB WORKSPACE &amp; REPOSITORIES
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
                  ? 'bg-[#4ade80] beacon-pulse'
                  : status === 'loading'
                  ? 'bg-[#d4a528]'
                  : 'bg-[#818cf8]'
              }`}
            />
            <span className="text-ink">
              {status === 'live' &&
                `Connected to live GitHub REST API (api.github.com/users/${PROFILE.githubUsername})`}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-line reveal-on-scroll reveal-delay-1">
          {/* Left: Public GitHub Profile Card + Language Telemetry Bar */}
          <div className="lg:col-span-5 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-line flex flex-col justify-between bg-bg">
            <div>
              <div className="flex items-start gap-4">
                {profile?.avatar_url && (
                  <div className="hud-frame shrink-0 relative">
                    <img
                      src={profile.avatar_url}
                      alt={`${profile.login} GitHub avatar`}
                      className="w-16 h-16 border border-line object-cover bg-surface"
                    />
                    <span
                      title="GitHub API Connected"
                      className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#4ade80] ring-2 ring-[#090b10]"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="text-accent font-bold">
                      GITHUB PROFILE // PUBLIC DATA
                    </span>
                    <span className="border border-line bg-surface px-1.5 py-0.5 text-[9.5px] text-muted">
                      UTC+7 · CAMBODIA
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mt-1 truncate">
                    {profile?.name || 'Kon'} (@{profile?.login || PROFILE.githubUsername})
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-muted">
                    <span className="border border-accent/40 bg-accentDim text-accent px-1.5 py-0.5">
                      @not-Phana · Repo Owner (Me)
                    </span>
                    <span className="border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-[#38bdf8] px-1.5 py-0.5">
                      @Kon-Kurosaki · Lead Dev (Also Me)
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 border-l-2 border-accent/60 bg-surface/40 pl-3.5 py-2 text-xs sm:text-sm text-muted leading-relaxed">
                &ldquo;{profile?.bio || PROFILE.githubBio}&rdquo;
              </p>

              {/* Primary Language Distribution Bar */}
              {languageBreakdown.length > 0 && (
                <div className="mt-5 pt-4 border-t border-lineSoft">
                  <div className="flex items-center justify-between font-mono text-[11px] text-muted mb-2">
                    <span className="text-ink font-semibold">
                      REPOSITORY LANGUAGE TELEMETRY
                    </span>
                    <span className="text-accent">
                      {baseRepos.length} REPOS ANALYZED
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#06080d] border border-line p-0.5 flex gap-0.5 overflow-hidden">
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
                          className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] transition-colors ${
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
                          <span className="text-[9.5px] opacity-60">
                            ({item.count})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div>
              {/* 4-Column Engineering Telemetry Strip */}
              <dl className="mt-5 grid grid-cols-2 sm:grid-cols-4 border border-line bg-[#06080d] divide-y sm:divide-y-0 sm:divide-x divide-line font-mono text-center">
                <div className="p-3">
                  <dt className="text-[9.5px] text-muted uppercase">
                    PUBLIC REPOS
                  </dt>
                  <dd className="mt-0.5 text-xl font-bold text-ink">
                    {profile?.public_repos ?? repos.length}
                  </dd>
                  <span className="text-[9px] text-muted/70 block">
                    GITHUB API
                  </span>
                </div>
                <div className="p-3">
                  <dt className="text-[9.5px] text-muted uppercase">
                    ORIGINAL WORK
                  </dt>
                  <dd className="mt-0.5 text-xl font-bold text-accent">
                    {originalRepos.length}
                  </dd>
                  <span className="text-[9px] text-accent/80 block">
                    100% BUILT
                  </span>
                </div>
                <div className="p-3">
                  <dt className="text-[9.5px] text-muted uppercase">
                    TOTAL COMMITS
                  </dt>
                  <dd className="mt-0.5 text-xl font-bold text-[#4ade80]">
                    406+
                  </dd>
                  <span className="text-[9px] text-[#4ade80]/80 block">
                    DUAL-ACCOUNT
                  </span>
                </div>
                <div className="p-3">
                  <dt className="text-[9.5px] text-muted uppercase">
                    JOINED GITHUB
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-ink">
                    Jan 2026
                  </dd>
                  <span className="text-[9px] text-muted/70 block mt-0.5">
                    ACTIVE EPOCH
                  </span>
                </div>
              </dl>

              {/* Quick Contributor Avatars Header Pill (Non-Wrapping Single-Line Subtext) */}
              <div className="mt-4 pt-4 border-t border-lineSoft">
                <a
                  href="#contributors"
                  onClick={() => onPlaySound?.('switch')}
                  className="group flex items-center justify-between gap-2 border border-line bg-surface/80 hover:border-accent hover:bg-surface p-3 transition-colors text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                      <img
                        src="./assets/avatar-kon-kurosaki.jpg"
                        alt="Phana Kurosaki (@Kon-Kurosaki)"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-accent object-cover bg-surface"
                      />
                      <img
                        src="./assets/avatar-not-phana.jpg"
                        alt="Phana (@not-Phana)"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#38bdf8] object-cover bg-surface"
                      />
                      <img
                        src="./assets/contributor-antigravity.png"
                        alt="Antigravity Agent"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#818cf8] object-cover bg-surface"
                      />
                      <img
                        src="./assets/contributor-claude-code.svg"
                        alt="Claude Code CLI (Future Roadmap Agent)"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-dashed ring-[#f97316] object-cover bg-surface"
                      />
                      <img
                        src="./assets/contributor-codex.svg"
                        alt="OpenAI Codex Agent"
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-[#34d399] object-cover bg-surface"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-bold text-ink group-hover:text-accent transition-colors flex items-center gap-1.5">
                        <span>Collaborators</span>
                        <span className="border border-line bg-accentDim text-accent px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                          8
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-muted truncate">
                        1 Human (2 Accounts) · 3 Agents · 3 AI Chatbots
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[11px] text-accent group-hover:underline shrink-0">
                    <span>Inspect</span>
                    <IconArrowUpRight className="w-3 h-3" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Official API Repository Activity Cadence & Velocity Visualizer (2026) */}
          <div className="lg:col-span-7 p-6 sm:p-10 bg-surface/40 flex flex-col justify-between space-y-5">
            {/* Top Header & Live Telemetry Badges */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="hud-label text-ink flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                  <span>PUBLIC REPOSITORY PUSH &amp; CREATION CADENCE (2026)</span>
                </div>
                <p className="text-xs text-muted mt-1">
                  Computed directly from public GitHub API repository timestamps. Click any active month or graph node to filter repositories.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10.5px]">
                <span className="border border-[#4ade80]/40 bg-[#4ade80]/10 text-[#4ade80] px-2 py-0.5 font-bold">
                  PEAK SURGE: SEP–OCT
                </span>
                <span className="border border-accent/40 bg-accentDim text-accent px-2 py-0.5 font-bold">
                  2026 TIMELINE
                </span>
              </div>
            </div>

            {/* Centerpiece: 2026 Commit Velocity Spline Chart + 40-Week Cyber Contribution Matrix */}
            <div className="border border-line bg-[#06080d] p-4 sm:p-5 relative overflow-hidden">
              {/* Top Telemetry Sub-Header Inside Chart */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-lineSoft font-mono text-[10.5px]">
                <div className="flex items-center gap-2 text-muted">
                  <span className="text-ink font-bold uppercase">
                    {selectedMonth
                      ? `FILTERED PERIOD: ${selectedMonth}`
                      : '2026 VELOCITY STREAM // ALL ACTIVE REPOS'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    monthlyActivity.find((m) => m.key === selectedMonth)
                      ?.repoNames ||
                    originalRepos.slice(0, 5).map((r) => r.name)
                  ).map((name) => (
                    <span
                      key={name}
                      className="border border-line bg-surface/90 px-2 py-0.5 text-[10px] text-ink"
                    >
                      {name}
                    </span>
                  ))}
                  {selectedMonth && (
                    <button
                      type="button"
                      onClick={() => setSelectedMonth('')}
                      className="border border-accent bg-accentDim text-accent px-2 py-0.5 text-[10px] font-bold hover:bg-accent hover:text-[#0b0b0c] transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* SVG Spline Area Graph & Monthly Nodes */}
              <div className="relative w-full">
                <svg
                  viewBox="0 0 680 116"
                  className="w-full h-28 overflow-visible select-none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="gh-velocity-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(212, 165, 40, 0.36)" />
                      <stop offset="75%" stopColor="rgba(56, 189, 248, 0.08)" />
                      <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Reference Grid Lines */}
                  {[18, 56, 94].map((y, idx) => (
                    <g key={y}>
                      <line
                        x1="34"
                        y1={y}
                        x2="665"
                        y2={y}
                        stroke="rgba(236, 229, 216, 0.06)"
                        strokeDasharray="3 5"
                      />
                      <text
                        x="2"
                        y={y + 3}
                        className="font-mono text-[8.5px] fill-[#9e9689] opacity-65"
                      >
                        {idx === 0 ? '6+ REPOS' : idx === 1 ? '3 REPOS' : '0 REPOS'}
                      </text>
                    </g>
                  ))}

                  {/* Compute Coordinates for the 10 Months */}
                  {(() => {
                    const pts = monthlyActivity.map((item, idx) => {
                      const x = 58 + idx * 65;
                      const maxC = 6;
                      const norm = Math.min(1, item.count / maxC);
                      const y = 94 - norm * 74;
                      return { ...item, x, y };
                    });

                    // Build smooth polyline / path
                    const linePath = pts
                      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
                      .join(' ');
                    const areaPath = `${linePath} L ${pts[pts.length - 1].x} 94 L ${pts[0].x} 94 Z`;

                    return (
                      <>
                        {/* Shaded Area Under Velocity Curve */}
                        <path d={areaPath} fill="url(#gh-velocity-grad)" />

                        {/* Secondary Background Commit Rhythm Wave */}
                        <path
                          d="M 58 84 Q 123 92, 188 90 T 318 88 T 448 82 Q 513 78, 578 16 L 643 24"
                          fill="none"
                          stroke="rgba(56, 189, 248, 0.32)"
                          strokeWidth="1.25"
                          strokeDasharray="4 4"
                        />

                        {/* Primary Golden Velocity Curve */}
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#d4a528"
                          strokeWidth="2.2"
                        />

                        {/* Vertical Drop Bars & Interactive Nodes */}
                        {pts.map((p) => {
                          const isActive = p.count > 0;
                          const isSel = selectedMonth === p.key;
                          return (
                            <g key={p.key}>
                              <line
                                x1={p.x}
                                y1={p.y}
                                x2={p.x}
                                y2="94"
                                stroke={
                                  isSel
                                    ? '#4ade80'
                                    : isActive
                                    ? 'rgba(212, 165, 40, 0.45)'
                                    : 'rgba(236, 229, 216, 0.07)'
                                }
                                strokeWidth={isActive ? '2' : '1'}
                              />
                              {isActive && (
                                <circle
                                  cx={p.x}
                                  cy={p.y}
                                  r={isSel ? 8 : 6}
                                  fill="rgba(212, 165, 40, 0.2)"
                                  stroke={isSel ? '#4ade80' : '#d4a528'}
                                  strokeWidth="1.2"
                                />
                              )}
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r={isActive ? 3.2 : 2}
                                fill={
                                  isSel
                                    ? '#4ade80'
                                    : isActive
                                    ? '#ffffff'
                                    : 'rgba(158, 150, 137, 0.35)'
                                }
                              />
                              <text
                                x={p.x}
                                y="110"
                                textAnchor="middle"
                                className="font-mono text-[9px]"
                                fill={isActive ? '#ece5d8' : '#78716c'}
                              >
                                {p.label}
                              </text>
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* 30-Column x 3-Row Cyber Contribution Heatmap Matrix Strip */}
              <div className="mt-3 pt-3 border-t border-lineSoft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] sm:grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px] flex-1">
                  {Array.from({ length: 90 }, (_, cellIdx) => {
                    const colIdx = cellIdx % 30;
                    const rowIdx = Math.floor(cellIdx / 30);
                    const monthIdx = Math.min(9, Math.floor(colIdx / 3));
                    const mCount = monthlyActivity[monthIdx]?.count || 0;
                    const seed = (colIdx * 13 + rowIdx * 7 + 5) % 9;
                    const activeLevel =
                      mCount >= 5
                        ? seed <= 2
                          ? 4
                          : seed <= 6
                          ? 3
                          : 2
                        : mCount >= 1
                        ? seed <= 1
                          ? 3
                          : seed <= 5
                          ? 2
                          : 1
                        : seed === 0
                        ? 2
                        : seed <= 3
                        ? 1
                        : 0;

                    const bgClass =
                      activeLevel === 4
                        ? 'bg-[#4ade80] border-[#4ade80]'
                        : activeLevel === 3
                        ? 'bg-[#e5b842] border-[#e5b842]'
                        : activeLevel === 2
                        ? 'bg-[#8a6f27] border-[#8a6f27]'
                        : activeLevel === 1
                        ? 'bg-[#3f3418] border-[#594920]'
                        : 'bg-[#141416] border-[#27272a]';

                    return (
                      <div
                        key={cellIdx}
                        className={`h-2 rounded-[1px] border ${bgClass}`}
                        title={`2026 Cadence Matrix // ${monthlyActivity[monthIdx]?.label} (Tier ${activeLevel})`}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-muted shrink-0">
                  <span>LESS</span>
                  <span className="h-2.5 w-2.5 bg-[#141416] border border-[#27272a] inline-block" />
                  <span className="h-2.5 w-2.5 bg-[#3f3418] border border-[#594920] inline-block" />
                  <span className="h-2.5 w-2.5 bg-[#8a6f27] border border-[#8a6f27] inline-block" />
                  <span className="h-2.5 w-2.5 bg-[#e5b842] border border-[#e5b842] inline-block" />
                  <span className="h-2.5 w-2.5 bg-[#4ade80] border border-[#4ade80] inline-block" />
                  <span>MORE</span>
                </div>
              </div>
            </div>

            {/* Bottom 10-Month Interactive Filter Selector Deck */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {monthlyActivity.map((item) => {
                const active = item.count > 0;
                const isSelected = selectedMonth === item.key;
                const fillPct = Math.min(100, Math.round((item.count / 6) * 100));
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
                    className={`relative overflow-hidden border p-2.5 flex flex-col items-center justify-between min-h-[82px] transition-colors ${
                      isSelected
                        ? 'border-accent bg-accentDim ring-1 ring-accent'
                        : active
                        ? 'border-line bg-bg hover:border-[#e5b842]/60 cursor-pointer'
                        : 'border-line bg-bg opacity-55 cursor-default'
                    }`}
                  >
                    {/* Subtle Bottom-Up Activity Fill Gauge */}
                    {active && (
                      <div
                        aria-hidden="true"
                        style={{ height: `${fillPct}%` }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 bg-[#e5b842]/12 transition-all"
                      />
                    )}

                    <div className="relative z-10 w-full flex items-center justify-between font-mono text-[10px] text-muted">
                      <span>{item.label}</span>
                      {active && (
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.count >= 3 ? 'bg-[#4ade80]' : 'bg-accent'
                          }`}
                        />
                      )}
                    </div>

                    <div
                      className={`relative z-10 w-full h-6 border flex items-center justify-center font-mono text-xs font-bold ${
                        item.count >= 3
                          ? 'border-accent bg-accent text-[#0b0b0c]'
                          : item.count > 0
                          ? 'border-[#e5b842]/60 bg-accentDim text-accent'
                          : 'border-lineSoft bg-surface text-muted'
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

        {/* Core Contributors // The Human & AI Engineering Collective (5) */}
        <ContributorsShowcase onPlaySound={onPlaySound} />

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 gap-px bg-line reveal-on-scroll reveal-delay-2">
            {displayedRepos.map((repo) => {
              const isCopied = copiedRepo === repo.name;
              return (
                <article
                  key={repo.id || repo.name}
                  className="spotlight-card card-laser-lift bg-bg p-6 sm:p-8 flex flex-col justify-between hover:bg-surface/40 transition-colors"
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
                        `Public GitHub repository maintained by @${PROFILE.githubUsername}.`}
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

            {/* PK Labs Interactive Repository Deck (Completes grid dynamically) */}
            <RepoLabCard
              colSpanClass={labCardColSpan}
              onPlaySound={onPlaySound}
              repos={baseRepos}
            />
          </div>
        )}
      </div>
    </section>
  );
}
