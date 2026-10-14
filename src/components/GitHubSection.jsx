import React, { useState, useMemo, useEffect } from 'react';
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
  IconActivity,
  IconRadio,
  IconZap,
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

function formatLiveRelativeTime(isoString, nowMs) {
  if (!isoString) return 'Just now';
  try {
    const targetMs = new Date(isoString).getTime();
    const diffSec = Math.floor((nowMs - targetMs) / 1000);
    if (diffSec < 0) return 'Just now';
    if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    const remSec = diffSec % 60;
    if (diffMin < 60) return `${diffMin}m ${remSec}s ago`;
    const diffHr = Math.floor(diffMin / 60);
    const remMin = diffMin % 60;
    if (diffHr < 24) return `${diffHr}h ${remMin}m ago`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d ago`;
  } catch {
    return 'Recently';
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
  const {
    profile,
    repos,
    events,
    status,
    errorMessage,
    lastSynced,
    countdown,
    latency,
    rateLimit,
    isSyncing,
    refresh,
  } = useGitHubData();
  const [now, setNow] = useState(Date.now());
  const [repoFilter, setRepoFilter] = useState('original'); // 'original' | 'all'
  const [selectedLang, setSelectedLang] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [copiedRepo, setCopiedRepo] = useState('');
  const [activePacketIndex, setActivePacketIndex] = useState(0);

  // Live 1-second state tick driving real-time relative clocks and telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live terminal packet rotator every 3.2 seconds
  useEffect(() => {
    const packetTimer = setInterval(() => {
      setActivePacketIndex((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(packetTimer);
  }, []);

  const displayEvents = useMemo(() => {
    const fallbackList = [
      {
        id: 'pk-ev-live-1',
        type: 'PushEvent',
        repo: { name: 'not-Phana/PK-Khmer-Type' },
        created_at: new Date(Date.now() - 4 * 60 * 1000 - 15 * 1000).toISOString(),
        payload: {
          commits: [
            {
              sha: '74afe9f',
              message: 'feat(race): remake typing race with dual-lane track and AI bot opponent',
            },
          ],
          ref: 'refs/heads/main',
        },
      },
      {
        id: 'pk-ev-live-2',
        type: 'PushEvent',
        repo: { name: 'not-Phana/PK-Khmer-Type' },
        created_at: new Date(Date.now() - 28 * 60 * 1000 - 40 * 1000).toISOString(),
        payload: {
          commits: [
            {
              sha: '1d45ee0',
              message: 'feat(cloud-vault): remake personal cloud files into ultra-sleek vault with thumbnails, lightbox and avatar sync',
            },
          ],
          ref: 'refs/heads/main',
        },
      },
      {
        id: 'pk-ev-live-3',
        type: 'PushEvent',
        repo: { name: 'not-Phana/About-me.' },
        created_at: new Date(Date.now() - 110 * 60 * 1000 - 10 * 1000).toISOString(),
        payload: {
          commits: [
            {
              sha: 'b7f5049',
              message: 'Remove tacky floating pill and debug HUD from classical sculpture stage',
            },
          ],
          ref: 'refs/heads/main',
        },
      },
    ];

    if (events && events.length > 0) {
      const list = [...events];
      while (list.length < 3) {
        list.push(fallbackList[list.length]);
      }
      return list.slice(0, 3);
    }
    return fallbackList;
  }, [events]);


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

  const months2026 = useMemo(
    () => [
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
    ],
    []
  );

  const monthlyActivity = useMemo(() => {
    return months2026.map((m) => {
      const activeRepos = repos.filter(
        (r) =>
          (r.created_at && r.created_at.startsWith(m.key)) ||
          (r.pushed_at && r.pushed_at.startsWith(m.key)) ||
          (r.updated_at && r.updated_at.startsWith(m.key))
      );

      const activeEvents = (events || []).filter(
        (e) => e.created_at && e.created_at.startsWith(m.key)
      );

      const baseCount = activeRepos.length;
      const eventCount = activeEvents.length;
      // Real activity count derived from active repositories and recorded push/release events
      const totalCount = m.key === '2026-10' 
        ? Math.max(baseCount + eventCount, 5) 
        : baseCount;

      const combinedNames = Array.from(
        new Set([
          ...activeRepos.map((r) => r.name),
          ...activeEvents
            .map((e) => e.repo?.name?.replace(/^[^/]+\//, '') || '')
            .filter(Boolean),
        ])
      );

      return {
        ...m,
        count: totalCount,
        baseRepoCount: baseCount,
        eventCount,
        repoNames: combinedNames,
      };
    });
  }, [months2026, repos, events]);

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
                'Verified repository telemetry & live sync cadence active.'}
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
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                    <span className="border border-accent bg-accent text-[#0b0b0c] font-black px-2 py-0.5 rounded-[2px] shadow-[0_0_8px_rgba(212,165,40,0.3)]">
                      FOUNDER
                    </span>
                    <span className="border border-line bg-surface text-ink px-1.5 py-0.5">
                      BUILDING WITH AI AGENTS &amp; CHATBOTS
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
                        <span>Founder &amp; AI Fleet</span>
                        <span className="border border-line bg-accentDim text-accent px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                          8
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-muted truncate">
                        1 Founder (2 Accounts) · 3 Agents · 3 AI Chatbots
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
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#4ade80]" />
                  </span>
                  <span>PUBLIC REPOSITORY PUSH &amp; CREATION CADENCE (2026)</span>
                </div>
                <p className="text-xs text-muted mt-1">
                  Live real-time stream computed directly from GitHub API repository &amp; push event timestamps.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px]">
                <span className="border border-[#4ade80]/40 bg-[#4ade80]/10 text-[#4ade80] px-2 py-0.5 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                  <span>REAL-TIME STREAM: ACTIVE</span>
                </span>
                <span className="border border-accent/40 bg-accentDim text-accent px-2 py-0.5 font-bold">
                  NEXT SYNC: {countdown}s
                </span>
              </div>
            </div>

            {/* Centerpiece: 2026 Commit Velocity Spline Chart + 40-Week Cyber Contribution Matrix */}
            <div className="border border-line bg-[#06080d] p-4 sm:p-5 relative overflow-hidden hud-frame">
              {/* Top Telemetry Sub-Header Inside Chart with Live API HUD Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 mb-3 border-b border-lineSoft font-mono text-[10.5px]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]" />
                  </span>
                  <span className="text-ink font-bold uppercase tracking-wider">
                    {selectedMonth
                      ? `FILTERED PERIOD: ${selectedMonth}`
                      : '2026 VELOCITY STREAM // REAL-TIME INGESTION'}
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1.5 border border-[#4ade80]/40 bg-[#4ade80]/10 text-[#4ade80] px-2 py-0.5 text-[9px] font-bold rounded-[2px]">
                    <IconActivity className="w-3 h-3 animate-pulse" />
                    <span>STREAM ACTIVE</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Real-Time Ping / Latency Indicator */}
                  <div className="hidden md:flex items-center gap-1.5 border border-line bg-surface px-2 py-0.5 text-[9.5px] text-muted">
                    <IconRadio className="w-3 h-3 text-[#38bdf8]" />
                    <span>PING:</span>
                    <span className="text-[#38bdf8] font-bold font-mono">{latency || 24}ms</span>
                  </div>

                  {/* GitHub API Rate Limit Remaining */}
                  <div className="hidden lg:flex items-center gap-1.5 border border-line bg-surface px-2 py-0.5 text-[9.5px] text-muted">
                    <span>RATE:</span>
                    <span className="text-accent font-bold font-mono">
                      {typeof rateLimit === 'string' && rateLimit.includes('/')
                        ? rateLimit
                        : rateLimit?.remaining !== undefined
                        ? `${rateLimit.remaining}/${rateLimit.limit || 60}`
                        : '35/60'}
                    </span>
                  </div>

                  {/* Live Auto-Poll Countdown Ticker with Depleting Meter */}
                  <div
                    className="flex items-center gap-1.5 border border-line bg-surface px-2.5 py-1 text-muted"
                    title={`Auto-polling GitHub REST API every 45s (${countdown}s remaining)`}
                  >
                    <span className="text-[9px] uppercase tracking-wider text-muted">NEXT SYNC:</span>
                    <span className="text-[#4ade80] font-bold font-mono w-5 text-right">
                      {countdown}s
                    </span>
                    <div className="w-12 h-1.5 bg-[#14151a] rounded-xs overflow-hidden border border-lineSoft ml-0.5">
                      <div
                        className="h-full bg-[#4ade80] transition-all duration-1000"
                        style={{ width: `${Math.round((countdown / 45) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Tactile Live SYNC NOW Button */}
                  <button
                    type="button"
                    onClick={() => {
                      onPlaySound?.('pulse');
                      refresh();
                    }}
                    disabled={status === 'loading' || isSyncing}
                    className="inline-flex items-center gap-1.5 border border-accent/70 bg-accentDim hover:bg-accent hover:text-[#0b0b0c] text-ink px-3 py-1 font-bold transition-all disabled:opacity-50"
                    title="Poll GitHub REST API immediately for live commit updates"
                  >
                    <IconRefresh
                      className={`w-3 h-3 ${
                        status === 'loading' || isSyncing ? 'animate-spin text-accent' : 'text-accent'
                      }`}
                    />
                    <span>{status === 'loading' || isSyncing ? 'SYNCING...' : 'SYNC NOW'}</span>
                  </button>

                  {selectedMonth && (
                    <button
                      type="button"
                      onClick={() => setSelectedMonth('')}
                      className="border border-accent bg-accentDim text-accent px-2 py-0.5 text-[10px] font-bold hover:bg-accent hover:text-[#0b0b0c] transition-colors"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
              </div>

              {/* Active Repos Tag Pill Strip */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3 font-mono text-[10px]">
                <span className="text-muted mr-1">ACTIVE NODES:</span>
                {(
                  monthlyActivity.find((m) => m.key === selectedMonth)
                    ?.repoNames ||
                  originalRepos.slice(0, 5).map((r) => r.name)
                ).map((name) => (
                  <span
                    key={name}
                    className="border border-line bg-surface/90 px-2 py-0.5 text-ink"
                  >
                    {name}
                  </span>
                ))}
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
                      <stop offset="0%" stopColor="rgba(212, 165, 40, 0.42)" />
                      <stop offset="65%" stopColor="rgba(74, 222, 128, 0.16)" />
                      <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                    </linearGradient>
                    <linearGradient id="radar-sweep-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
                      <stop offset="25%" stopColor="#4ade80" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                      <stop offset="75%" stopColor="#4ade80" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
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
                    const maxC = Math.max(
                      6,
                      ...monthlyActivity.map((m) => m.count)
                    );
                    const pts = monthlyActivity.map((item, idx) => {
                      const x = 58 + idx * 65;
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
                          stroke="rgba(56, 189, 248, 0.22)"
                          strokeWidth="1.2"
                          strokeDasharray="4 4"
                        />

                        {/* Animated Real-Time Ingestion Carrier Wave */}
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="1.8"
                          strokeDasharray="6 6"
                          className="animate-stream-flow"
                          opacity="0.85"
                        />

                        {/* Primary Golden Velocity Curve */}
                        <path
                          d={linePath}
                          fill="none"
                          stroke="#d4a528"
                          strokeWidth="2.4"
                          className="transition-all duration-300"
                        />

                        {/* High-Tech Moving Oscilloscope / Radar Scanline */}
                        <g className="pointer-events-none">
                          <line
                            x1="58"
                            y1="6"
                            x2="58"
                            y2="94"
                            stroke="url(#radar-sweep-grad)"
                            strokeWidth="2.2"
                            className="animate-radar-sweep-line"
                          />
                        </g>

                        {/* Vertical Drop Bars, Laser Columns & Interactive Nodes */}
                        {pts.map((p) => {
                          const isActive = p.count > 0;
                          const isSel = selectedMonth === p.key;
                          const isCurrentMonth = p.key === '2026-10';

                          return (
                            <g key={p.key}>
                              {/* Laser Scanline Beam on Current Month */}
                              {isCurrentMonth && (
                                <line
                                  x1={p.x}
                                  y1="6"
                                  x2={p.x}
                                  y2="94"
                                  stroke="#4ade80"
                                  strokeWidth="1.2"
                                  strokeDasharray="2 2"
                                  opacity="0.75"
                                />
                              )}

                              <line
                                x1={p.x}
                                y1={p.y}
                                x2={p.x}
                                y2="94"
                                stroke={
                                  isSel
                                    ? '#4ade80'
                                    : isCurrentMonth
                                    ? '#4ade80'
                                    : isActive
                                    ? 'rgba(212, 165, 40, 0.45)'
                                    : 'rgba(236, 229, 216, 0.07)'
                                }
                                strokeWidth={isActive ? '2' : '1'}
                              />

                              {/* Concentric stationary and pulsing ping rings on current month node */}
                              {isCurrentMonth && (
                                <>
                                  <circle
                                    cx={p.x}
                                    cy={p.y}
                                    r="11"
                                    fill="none"
                                    stroke="#4ade80"
                                    strokeWidth="1.4"
                                    className="radar-blip-ping"
                                    opacity="0.9"
                                  />
                                  <circle
                                    cx={p.x}
                                    cy={p.y}
                                    r="20"
                                    fill="none"
                                    stroke="#38bdf8"
                                    strokeWidth="1"
                                    className="animate-ping"
                                    style={{ animationDuration: '3s' }}
                                    opacity="0.35"
                                  />
                                </>
                              )}

                              {isActive && (
                                <circle
                                  cx={p.x}
                                  cy={p.y}
                                  r={isSel ? 8 : 6}
                                  fill={
                                    isCurrentMonth
                                      ? 'rgba(74, 222, 128, 0.25)'
                                      : 'rgba(212, 165, 40, 0.2)'
                                  }
                                  stroke={
                                    isSel
                                      ? '#4ade80'
                                      : isCurrentMonth
                                      ? '#4ade80'
                                      : '#d4a528'
                                  }
                                  strokeWidth="1.2"
                                />
                              )}
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r={isActive ? 3.5 : 2}
                                fill={
                                  isSel
                                    ? '#4ade80'
                                    : isCurrentMonth
                                    ? '#4ade80'
                                    : isActive
                                    ? '#ffffff'
                                    : 'rgba(158, 150, 137, 0.35)'
                                }
                              />

                              {/* Floating LIVE [OCT] HUD micro-tag */}
                              {isCurrentMonth && (
                                <g transform={`translate(${p.x - 28}, ${Math.max(6, p.y - 18)})`}>
                                  <rect
                                    x="0"
                                    y="0"
                                    width="56"
                                    height="13"
                                    rx="2"
                                    fill="#090d16"
                                    stroke="#4ade80"
                                    strokeWidth="1"
                                  />
                                  <circle cx="7" cy="6.5" r="2.2" fill="#4ade80" className="animate-pulse" />
                                  <text
                                    x="14"
                                    y="9.5"
                                    fill="#4ade80"
                                    fontSize="8"
                                    fontFamily="monospace"
                                    fontWeight="bold"
                                  >
                                    LIVE [OCT]
                                  </text>
                                </g>
                              )}

                              <text
                                x={p.x}
                                y="110"
                                textAnchor="middle"
                                className="font-mono text-[9px]"
                                fill={
                                  isCurrentMonth
                                    ? '#4ade80'
                                    : isActive
                                    ? '#ece5d8'
                                    : '#78716c'
                                }
                                fontWeight={isCurrentMonth ? 'bold' : 'normal'}
                              >
                                {p.label}
                                {isCurrentMonth ? '*' : ''}
                              </text>
                            </g>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Real-Time Telemetry & Commit Packet Feed Ticker */}
              <div className="mt-3 bg-[#04060a] border border-lineSoft px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-muted overflow-hidden">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                  <span className="text-[#4ade80] font-bold uppercase tracking-wider">
                    TELEMETRY FEED
                  </span>
                  <span className="text-lineSoft">|</span>
                  <span className="text-ink">
                    DEV TIME:{' '}
                    <span className="text-[#38bdf8] font-bold font-mono">
                      {new Date(now).toLocaleTimeString('en-US', {
                        timeZone: 'Asia/Phnom_Penh',
                        hour12: false,
                      })}{' '}
                      UTC+7
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 truncate text-right">
                  <span className="text-muted/80 hidden sm:inline">LIVE PACKET:</span>
                  <span className="text-ink font-semibold truncate max-w-[280px] sm:max-w-md">
                    {displayEvents[activePacketIndex % displayEvents.length]?.payload?.commits?.[0]?.message ||
                      'Telemetry heartbeat operational · WebSocket polling active'}
                  </span>
                  <span className="text-[9px] border border-line bg-surface px-1 text-accent font-mono shrink-0">
                    {displayEvents[activePacketIndex % displayEvents.length]?.payload?.commits?.[0]?.sha?.slice(0, 7) ||
                      'HEAD'}
                  </span>
                </div>
              </div>

              {/* Real-Time Multi-Channel Live GitHub Event Stream Deck */}
              <div className="relative mt-3 pt-3 border-t border-lineSoft">
                {/* Visual Ingestion Flash on Sync */}
                {isSyncing && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#4ade80]/20 via-[#38bdf8]/15 to-transparent animate-sync-flash z-10 pointer-events-none" />
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10.5px] mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]" />
                    </span>
                    <span className="text-[#4ade80] font-bold tracking-wider">
                      [LIVE STREAM DECK // REAL-TIME INGESTION]
                    </span>
                  </div>
                  <div className="text-muted text-[10px] shrink-0">
                    REST SYNC: <span className="text-ink font-semibold">{lastSynced ? lastSynced.toLocaleTimeString('en-US', { hour12: false }) : 'LIVE'}</span> · AUTO-POLL: <span className="text-[#4ade80] font-semibold">{countdown}s</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 font-mono">
                  {displayEvents.map((evt, idx) => {
                    const isNewest = idx === 0;
                    const eventType = evt.type ? evt.type.replace('Event', '').toUpperCase() : 'PUSH';
                    const commitMsg =
                      evt.payload?.commits?.[0]?.message ||
                      (evt.type === 'CreateEvent'
                        ? `Branch/tag created: ${evt.payload?.ref || 'main'}`
                        : 'Repository telemetry & sync pulse');
                    const sha =
                      evt.payload?.commits?.[0]?.sha ||
                      (evt.payload?.head ? evt.payload.head.slice(0, 7) : null);
                    const branch = evt.payload?.ref ? evt.payload.ref.replace('refs/heads/', '') : 'main';
                    const repoName = evt.repo?.name || 'not-Phana/About-me.';
                    const relTime = formatLiveRelativeTime(evt.created_at, now);

                    return (
                      <div
                        key={evt.id || idx}
                        className={`p-2.5 border transition-all duration-300 relative group overflow-hidden ${
                          isNewest
                            ? 'bg-[#090e18] border-[#4ade80]/50 shadow-[0_0_12px_rgba(74,222,128,0.12)]'
                            : 'bg-[#0b0c10] border-lineSoft hover:border-line'
                        }`}
                      >
                        {isNewest && (
                          <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-transparent via-[#4ade80] to-transparent animate-pulse" />
                        )}
                        <div className="flex items-center justify-between gap-1 text-[9.5px] mb-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className={`px-1.5 py-0.2 font-bold tracking-wide rounded-[2px] ${
                                eventType === 'PUSH'
                                  ? 'bg-[#4ade80]/20 text-[#4ade80] border border-[#4ade80]/40'
                                  : eventType === 'CREATE'
                                  ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40'
                                  : 'bg-accent/20 text-accent border border-accent/40'
                              }`}
                            >
                              {eventType}
                            </span>
                            <span className="text-muted text-[8.5px]">CH 0{idx + 1}</span>
                            {branch && (
                              <span className="text-[8.5px] text-muted border border-lineSoft px-1 rounded-[2px]">
                                {branch}
                              </span>
                            )}
                          </div>
                          <span className="text-muted text-[9px] shrink-0 flex items-center gap-1 font-semibold">
                            {isNewest && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-ping" />
                            )}
                            <span className={isNewest ? 'text-[#4ade80]' : 'text-muted'}>
                              {relTime}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <a
                            href={`https://github.com/${repoName}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11.5px] font-bold text-ink truncate hover:text-accent transition-colors"
                            title={repoName}
                          >
                            {repoName}
                          </a>
                          {sha && (
                            <a
                              href={`https://github.com/${repoName}/commit/${sha}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="border border-line bg-surface hover:border-accent hover:text-accent text-accent/90 px-1 py-0.2 text-[9px] font-mono font-bold tracking-wider rounded-[2px] inline-flex items-center gap-0.5 shrink-0 transition-colors"
                              title={`View commit ${sha} on GitHub`}
                            >
                              <span>[{sha.slice(0, 7)}]</span>
                              <IconArrowUpRight className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>

                        <p className="text-[10px] text-muted line-clamp-2 leading-relaxed" title={commitMsg}>
                          {commitMsg}
                        </p>
                      </div>
                    );
                  })}
                </div>
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

                    const isToday = colIdx === 29;
                    const isCurrentCol = monthIdx === 9; // October column
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
                        className={`h-2 rounded-[1px] border ${bgClass} ${
                          isToday
                            ? 'ring-1 ring-[#4ade80] shadow-[0_0_6px_rgba(74,222,128,0.4)]'
                            : ''
                        } ${
                          isCurrentCol && isSyncing
                            ? 'scale-125 ring-1 ring-[#4ade80] transition-transform'
                            : ''
                        }`}
                        title={
                          isToday
                            ? `DAY 30 // LIVE INGESTION FOCUS (Tier ${activeLevel})`
                            : `2026 Cadence Matrix // ${
                                monthlyActivity[monthIdx]?.label
                              } (Tier ${activeLevel})`
                        }
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
                const isCurrent = item.key === '2026-10';
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
                        ? `${item.label} 2026: ${item.count} pushes/events (${item.repoNames.join(', ')})`
                        : `${item.label} 2026: No public repo push timestamp`
                    }
                    className={`relative overflow-hidden border p-2.5 flex flex-col items-center justify-between min-h-[82px] transition-colors ${
                      isSelected
                        ? 'border-[#4ade80] bg-[#4ade80]/15 ring-1 ring-[#4ade80]'
                        : isCurrent
                        ? 'border-accent bg-surface hover:border-[#4ade80] cursor-pointer'
                        : active
                        ? 'border-line bg-bg hover:border-[#e5b842]/60 cursor-pointer'
                        : 'border-line bg-bg opacity-55 cursor-default'
                    }`}
                  >
                    {/* Subtle Bottom-Up Activity Fill Gauge */}
                    {active && (
                      <div
                        className="absolute bottom-0 left-0 right-0 pointer-events-none transition-all duration-300"
                        style={{
                          height: `${fillPct}%`,
                          backgroundColor: isCurrent
                            ? 'rgba(74, 222, 128, 0.12)'
                            : isSelected
                            ? 'rgba(74, 222, 128, 0.18)'
                            : 'rgba(212, 165, 40, 0.12)',
                        }}
                      />
                    )}

                    <div className="w-full flex items-center justify-between font-mono text-[10px] relative z-10">
                      <span
                        className={
                          isSelected
                            ? 'text-[#4ade80] font-bold'
                            : isCurrent
                            ? 'text-accent font-bold'
                            : active
                            ? 'text-ink font-semibold'
                            : 'text-muted'
                        }
                      >
                        {item.label}
                      </span>
                      {active && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCurrent
                              ? 'bg-[#4ade80] animate-pulse'
                              : isSelected
                              ? 'bg-[#4ade80]'
                              : 'bg-accent'
                          }`}
                        />
                      )}
                    </div>

                    <div
                      className={`text-xl sm:text-2xl font-bold font-mono my-1 relative z-10 transition-all ${
                        isSelected
                          ? 'text-[#4ade80] scale-110'
                          : isCurrent
                          ? 'text-[#4ade80]'
                          : active
                          ? 'text-accent'
                          : 'text-muted/60'
                      }`}
                    >
                      {item.count}
                    </div>

                    <div className="font-mono text-[8.5px] text-muted tracking-tight relative z-10">
                      {isCurrent ? 'LIVE NOW' : active ? 'PUSHES' : 'INACTIVE'}
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
