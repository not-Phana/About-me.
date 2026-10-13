import React, { useState } from 'react';
import { CONTRIBUTORS } from '../data/contributors';
import {
  IconGitHub,
  IconArrowUpRight,
  IconCheck,
  IconTerminal,
  IconRefresh,
} from './Icons';

export default function ContributorsShowcase({ onPlaySound }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'human' | 'agent' | 'chatbot'
  const [identityMode, setIdentityMode] = useState('split'); // 'split' | 'fused'
  const [selectedId, setSelectedId] = useState(
    CONTRIBUTORS[0]?.id || 'kon-kurosaki'
  );
  const [activeGitAccount, setActiveGitAccount] = useState('both'); // 'kon' | 'not-phana' | 'both'
  const [isSimulatingHandshake, setIsSimulatingHandshake] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState([
    '[HORIZON 2026+] Handshake: Anthropic Claude Code CLI protocol mapped to PK Studio.',
    '[HORIZON 2026+] AST Target: High-order component modularization & multi-file invariant proofs.',
    '[HORIZON 2026+] Status: Formally queued on developer roadmap for upcoming engineering phases.',
    '[HORIZON 2026+] Current active steering: Biological architect Phana maintains 100% control.',
  ]);

  const konAccount = CONTRIBUTORS.find((c) => c.id === 'kon-kurosaki');
  const phanaAccount = CONTRIBUTORS.find((c) => c.id === 'not-phana');

  const handleRunSimulation = (e) => {
    e?.stopPropagation?.();
    onPlaySound?.('switch');
    setIsSimulatingHandshake(true);
    setSimulatedLogs([
      '[CONNECTING] Querying Anthropic Claude Code CLI protocol...',
    ]);
    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        '[PIPELINE] Protocol verified. Target: not-phana/PK-Khmer-Type repository tree.',
      ]);
    }, 350);
    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        '[AST INSPECTION] Queued for future automated terminal AST refactors and invariant proofs.',
      ]);
    }, 700);
    setTimeout(() => {
      setSimulatedLogs((prev) => [
        ...prev,
        '[STANDBY] Agent ready in roadmap. Awaiting human deployment trigger by architect Phana.',
      ]);
      setIsSimulatingHandshake(false);
    }, 1100);
  };

  const filteredContributors = CONTRIBUTORS.filter((c) => {
    if (activeFilter === 'human') return c.category === 'human';
    if (activeFilter === 'agent') return c.category === 'agent';
    if (activeFilter === 'chatbot') return c.category === 'chatbot';
    return true;
  });

  const nonHumanContributors = filteredContributors.filter(
    (c) => c.category !== 'human'
  );
  const showHumanSection =
    activeFilter === 'all' || activeFilter === 'human';

  const selectedContributor =
    CONTRIBUTORS.find((c) => c.id === selectedId) || CONTRIBUTORS[0];

  const handleSelect = (id) => {
    onPlaySound?.('switch');
    setSelectedId(id);
    if (id === 'kon-kurosaki') setActiveGitAccount('kon');
    else if (id === 'not-phana') setActiveGitAccount('not-phana');
  };

  const handleFilterChange = (filter) => {
    onPlaySound?.('switch');
    setActiveFilter(filter);
    const nextList = CONTRIBUTORS.filter((c) => {
      if (filter === 'human') return c.category === 'human';
      if (filter === 'agent') return c.category === 'agent';
      if (filter === 'chatbot') return c.category === 'chatbot';
      return true;
    });
    if (nextList.length > 0 && !nextList.some((c) => c.id === selectedId)) {
      setSelectedId(nextList[0].id);
    }
  };

  const toggleIdentityFusion = (nextMode) => {
    onPlaySound?.('switch');
    setIdentityMode(nextMode);
    if (nextMode === 'fused') {
      setActiveGitAccount('both');
      if (selectedId !== 'kon-kurosaki' && selectedId !== 'not-phana') {
        setSelectedId('kon-kurosaki');
      }
    }
  };

  const renderContributorCard = (c) => {
    const isSelected = c.id === selectedId;
    const isHuman = c.category === 'human';

    return (
      <div
        key={c.id}
        onClick={() => handleSelect(c.id)}
        className={`group spotlight-card card-laser-lift border p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left relative ${
          isSelected
            ? 'border-accent bg-surface ring-1 ring-accent/60 shadow-lg'
            : isHuman
            ? 'border-accent/35 bg-bg/95 hover:border-accent hover:bg-surface/60'
            : 'border-line bg-bg hover:border-accent/50 hover:bg-surface/60'
        }`}
      >
        {/* Active Indicator Top Border Bar */}
        {isSelected && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
        )}

        <div>
          {/* Top Same-Human Clone Sync Banner for the 2 Human Cards */}
          {isHuman && (
            <div className="mb-3 -mt-1 flex items-center justify-between border-b border-lineSoft pb-2 font-mono text-[9.5px]">
              <span className="inline-flex items-center gap-1.5 text-accent font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>
                  {c.id === 'kon-kurosaki'
                    ? '1 BRAIN // ACCOUNT #01'
                    : '1 BRAIN // ACCOUNT #02'}
                </span>
              </span>
              <span className="text-[#38bdf8] font-semibold">
                {c.id === 'kon-kurosaki'
                  ? '== @not-Phana'
                  : '== @Kon-Kurosaki'}
              </span>
            </div>
          )}

          {/* Avatar & Live Status Beacon */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="relative">
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105 ${
                  c.isFuture
                    ? 'ring-2 ring-dashed ring-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.35)]'
                    : c.badgeTone === 'gold'
                    ? 'ring-2 ring-accent/80 shadow-[0_0_12px_rgba(212,165,40,0.3)]'
                    : c.badgeTone === 'cyan'
                    ? 'ring-2 ring-[#38bdf8]/80 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : c.badgeTone === 'coral'
                    ? 'ring-2 ring-[#f97316]/80 shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                    : c.badgeTone === 'violet'
                    ? 'ring-2 ring-[#818cf8]/80 shadow-[0_0_12px_rgba(129,140,248,0.3)]'
                    : 'ring-2 ring-[#34d399]/80 shadow-[0_0_12px_rgba(52,211,153,0.3)]'
                }`}
              >
                <img
                  src={c.avatar}
                  alt={`${c.name} avatar`}
                  onError={(e) => {
                    if (
                      c.avatarFallback &&
                      e.currentTarget.src !== c.avatarFallback
                    ) {
                      e.currentTarget.src = c.avatarFallback;
                    }
                  }}
                  className="w-full h-full rounded-full object-cover bg-surface"
                />
              </div>
              {/* Live Online Dot */}
              <span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-bg"
                style={{ backgroundColor: c.statusDotColor }}
                title={c.status}
              />
            </div>

            {c.isFuture ? (
              <span className="font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider border border-[#f97316]/60 bg-[#f97316]/10 text-[#f97316] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
                <span>HORIZON 2026+</span>
              </span>
            ) : (
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 uppercase tracking-wider ${
                  c.roleTag === 'AGENT'
                    ? 'border border-accent/60 bg-accentDim text-accent font-bold'
                    : c.roleTag === 'CHATBOT'
                    ? 'border border-line bg-surface text-muted'
                    : 'border border-accent/50 bg-accentDim text-accent font-bold'
                }`}
              >
                {c.roleTag}
              </span>
            )}
          </div>

          {/* Name & Handle */}
          <div className="mb-2">
            <h4 className="font-display text-lg font-bold text-ink group-hover:text-accent transition-colors flex items-center justify-between">
              <span>{c.name}</span>
              <IconArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent shrink-0" />
            </h4>
            <span className="font-mono text-xs text-muted block mt-0.5">
              {c.handle}
            </span>
          </div>

          {/* Type Badge */}
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-block font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-xs uppercase ${
                c.badgeTone === 'gold'
                  ? 'bg-accentDim text-accent border border-accent/40'
                  : c.badgeTone === 'cyan'
                  ? 'bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30'
                  : c.badgeTone === 'coral'
                  ? 'bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/30'
                  : c.badgeTone === 'violet'
                  ? 'bg-[#818cf8]/10 text-[#818cf8] border border-[#818cf8]/30'
                  : 'bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/30'
              }`}
            >
              {c.typeBadge}
            </span>
          </div>

          {/* Role & Model */}
          <p className="text-xs text-ink/90 font-medium leading-snug mb-1.5">
            {c.role}
          </p>
          <p className="font-mono text-[11px] text-muted leading-relaxed line-clamp-2">
            {c.focus}
          </p>

          {/* Commit Share Micro Progress Bar for Human Accounts */}
          {isHuman && (
            <div className="mt-3 pt-2.5 border-t border-lineSoft">
              <div className="flex items-center justify-between font-mono text-[9.5px] mb-1">
                <span className="text-muted">REPO SHARE (OF 200)</span>
                <span
                  className={
                    c.id === 'kon-kurosaki'
                      ? 'text-accent font-bold'
                      : 'text-[#38bdf8] font-bold'
                  }
                >
                  {c.id === 'kon-kurosaki'
                    ? '84.0% (168)'
                    : '15.0% (30)'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface overflow-hidden border border-lineSoft">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: c.id === 'kon-kurosaki' ? '84%' : '15%',
                    backgroundColor:
                      c.id === 'kon-kurosaki' ? '#d4a528' : '#38bdf8',
                  }}
                />
              </div>
            </div>
          )}

          {/* Counterpart Pill */}
          <div className="mt-3 pt-2 border-t border-lineSoft flex items-center justify-between font-mono text-[10px] text-muted">
            <span className="uppercase text-[9px] tracking-wider text-muted">
              {c.samePersonBadge
                ? c.samePersonBadge
                : c.isFuture
                ? 'Future Roadmap Agent'
                : c.category === 'agent'
                ? 'Autonomous Agent'
                : c.category === 'chatbot'
                ? 'Conversational Chat'
                : 'Human Architect'}
            </span>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-4 pt-3 border-t border-lineSoft flex items-center justify-between font-mono text-[11px]">
          <span
            className={
              c.isFuture ? 'text-[#f97316] font-bold' : 'text-muted'
            }
          >
            {c.commitsCount}
          </span>
          <span
            className={`font-semibold ${
              isSelected
                ? 'text-accent'
                : c.isFuture
                ? 'text-[#f97316] group-hover:underline'
                : 'text-muted group-hover:text-ink'
            }`}
          >
            {isSelected
              ? 'INSPECTING'
              : c.isFuture
              ? 'VIEW ROADMAP'
              : 'VIEW LOG'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      id="contributors"
      className="border-b border-line bg-surface/30 relative overflow-hidden"
    >
      {/* Background Micro Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-10 right-6 overflow-hidden opacity-[0.03] font-classical font-semibold text-[7rem] sm:text-[10rem] tracking-[0.1em] text-ink leading-none whitespace-nowrap z-0"
        data-bg-motion="contributors-watermark"
      >
        COLLECTIVE // 08
      </div>

      <div className="p-6 sm:p-10 lg:p-12 relative z-10">
        {/* Module Header with Telemetry Status */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-lineSoft">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-accent font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>
                THE ALLIANCE // 1 HUMAN (2 ACCOUNTS: 198 COMMITS) · AGENTS &amp; AI
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-ink">
              One Human (Two Accounts), Autonomous Agents &amp; AI Chatbots
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted max-w-3xl leading-relaxed">
              Plot twist: those two human accounts—
              <span className="text-accent font-mono font-semibold">
                @Kon-Kurosaki
              </span>{' '}
              and{' '}
              <span className="text-[#38bdf8] font-mono font-semibold">
                @not-Phana
              </span>
              —are both me. One brain committing across two GitHub accounts (
              <span className="text-ink font-mono font-bold">198/200</span>{' '}
              verified commits combined), orchestrating autonomous coding agents
              and AI chatbots.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs">
            <button
              type="button"
              onClick={() => handleFilterChange('all')}
              className={`border px-3.5 py-1.5 transition-colors ${
                activeFilter === 'all'
                  ? 'border-accent bg-accentDim text-ink font-bold shadow-sm'
                  : 'border-line bg-surface text-muted hover:text-ink'
              }`}
            >
              All Entries (8)
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('human')}
              className={`border px-3.5 py-1.5 transition-colors ${
                activeFilter === 'human'
                  ? 'border-accent bg-accentDim text-ink font-bold shadow-sm'
                  : 'border-line bg-surface text-muted hover:text-ink'
              }`}
            >
              Me · 2 Accounts (2)
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('agent')}
              className={`border px-3.5 py-1.5 transition-colors ${
                activeFilter === 'agent'
                  ? 'border-accent bg-accentDim text-ink font-bold shadow-sm'
                  : 'border-line bg-surface text-muted hover:text-ink'
              }`}
            >
              Autonomous Agents (3)
            </button>
            <button
              type="button"
              onClick={() => handleFilterChange('chatbot')}
              className={`border px-3.5 py-1.5 transition-colors ${
                activeFilter === 'chatbot'
                  ? 'border-accent bg-accentDim text-ink font-bold shadow-sm'
                  : 'border-line bg-surface text-muted hover:text-ink'
              }`}
            >
              AI Chatbots (3)
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* INTERACTIVE DUAL-ACCOUNT NEURAL SYNC BRIDGE & FUSION CONTROLLER   */}
        {/* ================================================================= */}
        {showHumanSection && konAccount && phanaAccount && (
          <div className="mt-6 border border-accent/40 bg-[#080a0f] p-4 sm:p-6 relative overflow-hidden hud-frame">
            {/* Subtle Ambient Dual-Tone Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#38bdf8]/10 blur-3xl"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              {/* Left: Explanation & Live Equation */}
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
                  <span className="px-2 py-0.5 bg-accent text-[#0b0b0c] font-bold">
                    DUAL-ACCOUNT TELEMETRY // 1 BRAIN == 2 GITHUB LOGINS
                  </span>
                  <span className="text-[#4ade80] font-bold">
                    ● BIOLOGICAL ARCHITECT VERIFIED
                  </span>
                </div>
                <div className="font-display text-lg sm:text-xl font-bold text-ink">
                  Why are there two &ldquo;Phana&rdquo; accounts in the commit log?
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  <strong className="text-accent font-mono">@Kon-Kurosaki</strong>{' '}
                  (168 commits) is my local workstation coding config, and{' '}
                  <strong className="text-[#38bdf8] font-mono">@not-Phana</strong>{' '}
                  (30 commits) is my repository owner account. Toggle{' '}
                  <strong className="text-ink">Identity Fusion</strong> below to
                  inspect them separately or merge both accounts into a single{' '}
                  <strong className="text-ink">198-commit (99.0%)</strong> profile.
                </p>
              </div>

              {/* Right: Interactive Split vs Fuse Switcher */}
              <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
                <div className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  IDENTITY DISPLAY MODE:
                </div>
                <div className="inline-flex border border-line bg-surface p-1 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => toggleIdentityFusion('split')}
                    className={`px-3.5 py-1.5 transition-all flex items-center gap-2 ${
                      identityMode === 'split'
                        ? 'bg-accent text-[#0b0b0c] font-bold shadow-sm'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <span>01 // SPLIT (2 ACCOUNTS)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleIdentityFusion('fused')}
                    className={`px-3.5 py-1.5 transition-all flex items-center gap-2 ${
                      identityMode === 'fused'
                        ? 'bg-[#38bdf8] text-[#090d16] font-bold shadow-sm'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    <span>02 // FUSE INTO 1 ME (198)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive SVG Synaptic Conduit & 200-Commit Proportional Bar */}
            <div className="relative z-10 mt-5 pt-4 border-t border-lineSoft grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* SVG Visual Link Between the Two Accounts */}
              <div className="lg:col-span-7 border border-line bg-[#0b0e16] px-4 py-3 flex items-center justify-between gap-2">
                {/* Account 1 Pill */}
                <button
                  type="button"
                  onClick={() => handleSelect('kon-kurosaki')}
                  className={`flex items-center gap-2.5 text-left p-1.5 border transition-colors ${
                    selectedId === 'kon-kurosaki'
                      ? 'border-accent bg-accentDim'
                      : 'border-transparent hover:border-line'
                  }`}
                >
                  <img
                    src={konAccount.avatar}
                    alt={konAccount.name}
                    onError={(e) => {
                      if (
                        konAccount.avatarFallback &&
                        e.currentTarget.src !== konAccount.avatarFallback
                      ) {
                        e.currentTarget.src = konAccount.avatarFallback;
                      }
                    }}
                    className="w-9 h-9 rounded-full ring-2 ring-accent object-cover shrink-0"
                  />
                  <div>
                    <div className="font-mono text-[11px] font-bold text-ink">
                      @Kon-Kurosaki
                    </div>
                    <div className="font-mono text-[9.5px] text-accent">
                      168 Commits (84%)
                    </div>
                  </div>
                </button>

                {/* Animated SVG Bridge */}
                <div className="flex-1 flex flex-col items-center justify-center px-2 min-w-[90px]">
                  <div className="font-mono text-[9px] text-[#4ade80] tracking-widest uppercase mb-1 text-center">
                    {identityMode === 'fused'
                      ? 'FUSED // 198 COMMITS'
                      : 'SAME BRAIN // 100% SYNC'}
                  </div>
                  <svg
                    viewBox="0 0 180 20"
                    className="w-full h-5 overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="dualAccountGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#d4a528" />
                        <stop offset="50%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>
                    <line
                      x1="4"
                      y1="10"
                      x2="176"
                      y2="10"
                      stroke="url(#dualAccountGrad)"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                    />
                    <circle cx="6" cy="10" r="3.5" fill="#d4a528" />
                    <circle cx="90" cy="10" r="4" fill="#4ade80">
                      <animate
                        attributeName="r"
                        values="3;5.5;3"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="174" cy="10" r="3.5" fill="#38bdf8" />
                    <circle r="3" fill="#ffffff">
                      <animateMotion
                        dur="1.6s"
                        repeatCount="indefinite"
                        path="M 6 10 L 174 10"
                      />
                    </circle>
                    <circle r="3" fill="#d4a528">
                      <animateMotion
                        dur="1.6s"
                        begin="0.8s"
                        repeatCount="indefinite"
                        path="M 174 10 L 6 10"
                      />
                    </circle>
                  </svg>
                </div>

                {/* Account 2 Pill */}
                <button
                  type="button"
                  onClick={() => handleSelect('not-phana')}
                  className={`flex items-center gap-2.5 text-left p-1.5 border transition-colors ${
                    selectedId === 'not-phana'
                      ? 'border-[#38bdf8] bg-[#38bdf8]/10'
                      : 'border-transparent hover:border-line'
                  }`}
                >
                  <img
                    src={phanaAccount.avatar}
                    alt={phanaAccount.name}
                    onError={(e) => {
                      if (
                        phanaAccount.avatarFallback &&
                        e.currentTarget.src !== phanaAccount.avatarFallback
                      ) {
                        e.currentTarget.src = phanaAccount.avatarFallback;
                      }
                    }}
                    className="w-9 h-9 rounded-full ring-2 ring-[#38bdf8] object-cover shrink-0"
                  />
                  <div>
                    <div className="font-mono text-[11px] font-bold text-ink">
                      @not-Phana
                    </div>
                    <div className="font-mono text-[9.5px] text-[#38bdf8]">
                      30 Commits (15%)
                    </div>
                  </div>
                </button>
              </div>

              {/* 200-Commit Repository Authorship Breakdown Bar */}
              <div className="lg:col-span-5 border border-line bg-[#0b0e16] p-3.5">
                <div className="flex items-center justify-between font-mono text-[10px] mb-2">
                  <span className="text-ink font-bold">
                    COMBINED HUMAN AUTHORSHIP
                  </span>
                  <span className="text-[#4ade80] font-bold">
                    198 / 200 COMMITS (99.0%)
                  </span>
                </div>
                <div className="w-full h-3 bg-surface flex overflow-hidden border border-line">
                  <div
                    style={{ width: '84%', backgroundColor: '#d4a528' }}
                    title="@Kon-Kurosaki: 168 Commits (84%)"
                    className="h-full transition-all duration-500"
                  />
                  <div
                    style={{ width: '15%', backgroundColor: '#38bdf8' }}
                    title="@not-Phana: 30 Commits (15%)"
                    className="h-full transition-all duration-500"
                  />
                  <div
                    style={{ width: '1%', backgroundColor: '#818cf8' }}
                    title="Autonomous Agents (Antigravity + Codex): 2 Commits (1%)"
                    className="h-full transition-all duration-500"
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[9.5px] text-muted">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 inline-block bg-accent" />
                    <span>@Kon-Kurosaki (168)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 inline-block bg-[#38bdf8]" />
                    <span>@not-Phana (30)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 inline-block bg-[#818cf8]" />
                    <span>Agents (2)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {/* Render Human Cards: Either Fused 2-Column Master Card OR Split Cards */}
          {showHumanSection &&
            identityMode === 'fused' &&
            konAccount &&
            phanaAccount && (
              <div
                onClick={() => handleSelect('kon-kurosaki')}
                className="sm:col-span-2 group spotlight-card card-laser-lift border-2 border-accent bg-surface p-6 flex flex-col justify-between relative cursor-pointer shadow-lg"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-[#4ade80] to-[#38bdf8]" />

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-lineSoft font-mono text-[10px]">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent text-[#0b0b0c] font-bold uppercase tracking-wider">
                      FUSED IDENTITY // 1 HUMAN = 2 GITHUB ACCOUNTS
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleIdentityFusion('split');
                      }}
                      className="border border-line bg-bg px-2.5 py-0.5 text-muted hover:text-ink hover:border-accent transition-colors"
                    >
                      UNFUSE BACK TO 2 CARDS
                    </button>
                  </div>

                  {/* Overlapping Dual Avatars + Combined Title */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-4 shrink-0">
                        <div className="w-16 h-16 rounded-full p-0.5 ring-2 ring-accent bg-bg relative z-10 shadow-[0_0_16px_rgba(212,165,40,0.4)]">
                          <img
                            src={konAccount.avatar}
                            alt={konAccount.name}
                            onError={(e) => {
                              if (
                                konAccount.avatarFallback &&
                                e.currentTarget.src !== konAccount.avatarFallback
                              ) {
                                e.currentTarget.src = konAccount.avatarFallback;
                              }
                            }}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="w-16 h-16 rounded-full p-0.5 ring-2 ring-[#38bdf8] bg-bg relative z-0 shadow-[0_0_16px_rgba(56,189,248,0.4)]">
                          <img
                            src={phanaAccount.avatar}
                            alt={phanaAccount.name}
                            onError={(e) => {
                              if (
                                phanaAccount.avatarFallback &&
                                e.currentTarget.src !==
                                  phanaAccount.avatarFallback
                              ) {
                                e.currentTarget.src =
                                  phanaAccount.avatarFallback;
                              }
                            }}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-display text-xl sm:text-2xl font-extrabold text-ink">
                          Phana Kurosaki (Both Accounts)
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs mt-1">
                          <span className="text-accent font-bold">
                            @Kon-Kurosaki
                          </span>
                          <span className="text-muted">+</span>
                          <span className="text-[#38bdf8] font-bold">
                            @not-Phana
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-[#4ade80]/40 bg-[#4ade80]/10 px-3 py-2 font-mono text-right shrink-0">
                      <div className="text-sm font-bold text-[#4ade80]">
                        198 COMMITS
                      </div>
                      <div className="text-[9.5px] text-muted uppercase">
                        99.0% OF REPOSITORY
                      </div>
                    </div>
                  </div>

                  {/* Dual Sub-Cards Comparing the 2 Accounts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="border border-accent/40 bg-bg/90 p-3.5">
                      <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                        <span className="text-accent font-bold">
                          ACCOUNT #01 // DEV
                        </span>
                        <span className="text-ink font-bold">168 COMMITS</span>
                      </div>
                      <div className="font-mono text-xs text-ink font-semibold mb-1">
                        @Kon-Kurosaki
                      </div>
                      <p className="text-[11px] text-muted leading-relaxed">
                        Workstation Git config used to write the core typing
                        engine, 218 lessons, and UI systems.
                      </p>
                      <a
                        href={konAccount.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2.5 inline-flex items-center gap-1 font-mono text-[10px] text-accent hover:underline"
                      >
                        <span>Open @Kon-Kurosaki</span>
                        <IconArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="border border-[#38bdf8]/40 bg-bg/90 p-3.5">
                      <div className="flex items-center justify-between font-mono text-[10px] mb-1">
                        <span className="text-[#38bdf8] font-bold">
                          ACCOUNT #02 // OWNER
                        </span>
                        <span className="text-ink font-bold">30 COMMITS</span>
                      </div>
                      <div className="font-mono text-xs text-ink font-semibold mb-1">
                        @not-Phana
                      </div>
                      <p className="text-[11px] text-muted leading-relaxed">
                        Repository owner account managing GitHub Pages
                        deployments, releases, and repo tree hygiene.
                      </p>
                      <a
                        href={phanaAccount.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2.5 inline-flex items-center gap-1 font-mono text-[10px] text-[#38bdf8] hover:underline"
                      >
                        <span>Open @not-Phana</span>
                        <IconArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-lineSoft flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#4ade80] font-bold">
                    198 Combined Commits (168 + 30)
                  </span>
                  <span className="text-accent font-semibold">
                    SINGLE HUMAN ARCHITECT // INSPECTING
                  </span>
                </div>
              </div>
            )}

          {showHumanSection &&
            identityMode === 'split' &&
            filteredContributors
              .filter((c) => c.category === 'human')
              .map((c) => renderContributorCard(c))}

          {/* Render Autonomous Agents & AI Chatbots */}
          {nonHumanContributors.map((c) => renderContributorCard(c))}
        </div>

        {/* Selected Contributor Deep Dive Inspection Console */}
        <div className="mt-6 border border-line bg-surface/50 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6 reveal-on-scroll">
          <div className="flex items-start gap-4 sm:gap-6 flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shrink-0 ring-2 ring-accent p-0.5 overflow-hidden">
              <img
                src={selectedContributor.avatar}
                alt={`${selectedContributor.name} avatar`}
                onError={(e) => {
                  if (
                    selectedContributor.avatarFallback &&
                    e.currentTarget.src !== selectedContributor.avatarFallback
                  ) {
                    e.currentTarget.src = selectedContributor.avatarFallback;
                  }
                }}
                className="w-full h-full rounded-full object-cover bg-surface"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest">
                  CONTRIBUTOR INSPECTION // {selectedContributor.model}
                </span>
                <span className="text-line">•</span>
                <span className="font-mono text-[10px] text-muted uppercase">
                  STATUS: {selectedContributor.status}
                </span>
                <span className="text-line">•</span>
                <span
                  className={`font-mono text-[10px] uppercase font-bold px-1.5 py-0.2 border ${
                    selectedContributor.isFuture
                      ? 'border-[#f97316]/50 bg-[#f97316]/10 text-[#f97316]'
                      : selectedContributor.category === 'agent'
                      ? 'border-accent/60 bg-accentDim text-accent'
                      : selectedContributor.category === 'chatbot'
                      ? 'border-line bg-surface text-muted'
                      : 'border-[#38bdf8]/40 bg-[#38bdf8]/10 text-[#38bdf8]'
                  }`}
                >
                  {selectedContributor.isFuture
                    ? 'NEXT-GEN HORIZON // PLANNED CLI INTEGRATION'
                    : selectedContributor.category === 'agent'
                    ? 'AUTONOMOUS AGENT (TERMINAL & TOOL EXECUTION)'
                    : selectedContributor.category === 'chatbot'
                    ? 'CONVERSATIONAL CHATBOT (WEB & PROMPT INTERFACE)'
                    : 'HUMAN CREATOR (BOTH ACCOUNTS ARE ME)'}
                </span>
              </div>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-ink">
                {selectedContributor.name} ({selectedContributor.handle})
              </h4>
              <p className="mt-1.5 text-sm text-muted max-w-2xl leading-relaxed">
                {selectedContributor.description}
              </p>

              {/* Counterpart Ecosystem Note */}
              {selectedContributor.pairedWith && (
                <div className="mt-2.5 font-mono text-xs text-accent/90 flex items-center gap-1.5">
                  <span className="text-muted">IDENTITY LINK:</span>
                  <span>{selectedContributor.pairedWith}</span>
                </div>
              )}

              {/* Key Contributions List */}
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedContributor.keyContributions.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 border border-line bg-bg px-2.5 py-1 font-mono text-xs text-ink/90"
                  >
                    <IconCheck className="w-3 h-3 text-accent shrink-0" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              {/* Interactive Dual-Account Git Shortlog Proof when inspecting either Human Account */}
              {selectedContributor.category === 'human' && (
                <div className="mt-5 border border-accent/40 bg-[#080a0f] p-4 font-mono text-xs text-ink/90">
                  <div className="flex flex-wrap items-center justify-between border-b border-lineSoft pb-2.5 mb-3 gap-2">
                    <div className="flex items-center gap-2 text-accent font-bold text-[11px]">
                      <IconTerminal className="w-3.5 h-3.5 text-accent" />
                      <span>
                        GIT IDENTITY PROOF // WHY I HAVE 2 ACCOUNTS IN THE LOG
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      {[
                        { id: 'both', label: 'MERGED (198)' },
                        { id: 'kon', label: '@Kon-Kurosaki (168)' },
                        { id: 'not-phana', label: '@not-Phana (30)' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            onPlaySound?.('switch');
                            setActiveGitAccount(tab.id);
                          }}
                          className={`px-2 py-0.5 border transition-colors ${
                            activeGitAccount === tab.id
                              ? 'border-accent bg-accent text-[#0b0b0c] font-bold'
                              : 'border-line bg-surface text-muted hover:text-ink'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeGitAccount === 'both' && (
                    <div className="space-y-1.5 text-[11px] leading-relaxed">
                      <div className="text-muted">
                        <span className="text-accent font-bold">$</span> git
                        shortlog -sn --all # not-Phana/PK-Khmer-Type
                      </div>
                      <div className="text-ink">
                        <span className="text-accent font-bold">168</span>{' '}
                        Phana Kurosaki &lt;@Kon-Kurosaki&gt;{' '}
                        <span className="text-muted">
                          // Me (Local IDE git config)
                        </span>
                      </div>
                      <div className="text-ink">
                        <span className="text-[#38bdf8] font-bold"> 30</span>{' '}
                        Phana &lt;@not-Phana&gt;{' '}
                        <span className="text-muted">
                          // Also Me (Repo owner account)
                        </span>
                      </div>
                      <div className="text-[#4ade80] font-bold pt-1">
                        =&gt; VERIFIED: 198 / 200 commits (99.0%) authored by
                        the exact same human.
                      </div>
                    </div>
                  )}

                  {activeGitAccount === 'kon' && (
                    <div className="space-y-1.5 text-[11px] leading-relaxed">
                      <div className="text-muted">
                        <span className="text-accent font-bold">$</span> git
                        config user.name &amp;&amp; git rev-list --count HEAD
                        --author=&quot;Kon-Kurosaki&quot;
                      </div>
                      <div className="text-accent font-bold">
                        Phana Kurosaki (@Kon-Kurosaki) — 168 Verified Commits
                        (84.0%)
                      </div>
                      <div className="text-muted">
                        Role: Primary workstation identity used for daily feature
                        engineering, Khmer NiDA keyboard engine, and UI/UX code.
                      </div>
                    </div>
                  )}

                  {activeGitAccount === 'not-phana' && (
                    <div className="space-y-1.5 text-[11px] leading-relaxed">
                      <div className="text-muted">
                        <span className="text-[#38bdf8] font-bold">$</span> gh
                        repo view not-Phana/PK-Khmer-Type --json owner
                      </div>
                      <div className="text-[#38bdf8] font-bold">
                        Phana (@not-Phana) — 30 Verified Commits (15.0%)
                      </div>
                      <div className="text-muted">
                        Role: Repository owner account used for creating the
                        repos, merging PRs, and publishing GitHub Pages builds.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Futuristic Interactive Terminal Handshake Simulation for Future Agent */}
              {selectedContributor.isFuture && (
                <div className="mt-5 border border-[#f97316]/40 bg-[#0b0b0e] p-4 font-mono text-xs text-ink/90 relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between border-b border-lineSoft pb-2.5 mb-3 gap-2 text-[11px] text-[#f97316]">
                    <div className="flex items-center gap-2">
                      <IconTerminal className="w-3.5 h-3.5 text-[#f97316]" />
                      <span className="font-bold tracking-wider uppercase">
                        CLAUDE CODE CLI // FUTURE ROADMAP SIMULATOR
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRunSimulation}
                      className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-ink hover:text-[#f97316] border border-line px-2.5 py-1 bg-surface/80 hover:border-[#f97316]/60 transition-colors"
                    >
                      <IconRefresh
                        className={`w-3 h-3 ${
                          isSimulatingHandshake
                            ? 'animate-spin text-[#f97316]'
                            : ''
                        }`}
                      />
                      <span>
                        {isSimulatingHandshake
                          ? 'SIMULATING HANDSHAKE...'
                          : 'RERUN CLI HANDSHAKE'}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] leading-relaxed">
                    <div className="text-muted flex items-center gap-1.5">
                      <span className="text-[#f97316] font-bold">$</span>
                      <span>claude-code --autonomous --roadmap-pipeline</span>
                    </div>
                    {simulatedLogs.map((log, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 text-ink/90"
                      >
                        <span className="text-[#f97316] font-bold">&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    {isSimulatingHandshake && (
                      <div className="inline-block w-2 h-3.5 bg-[#f97316] animate-pulse align-middle ml-1" />
                    )}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-lineSoft/60 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
                    <span>PROTOCOL: ANTHROPIC CLI PIPELINE</span>
                    <span className="text-[#f97316] font-semibold uppercase">
                      STANDBY FOR HORIZON 2026+ ACTIVATION
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action to External Link */}
          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-lineSoft">
            <a
              href={selectedContributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onPlaySound?.('switch')}
              className="inline-flex items-center gap-2 bg-invertBg text-invertFg px-5 py-2.5 hud-label hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {selectedContributor.category === 'human' ||
              selectedContributor.profileUrl.includes('github.com') ? (
                <IconGitHub className="w-4 h-4" />
              ) : (
                <IconTerminal className="w-4 h-4" />
              )}
              <span>
                {selectedContributor.isFuture
                  ? `Inspect ${selectedContributor.name} Roadmap`
                  : `Open ${selectedContributor.handle}`}
              </span>
              <IconArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span className="font-mono text-[11px] text-muted">
              {selectedContributor.isFuture
                ? 'Horizon 2026+ · Queued for Deployment'
                : `${selectedContributor.commitsCount} recorded`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
