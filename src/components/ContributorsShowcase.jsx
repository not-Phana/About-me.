import React, { useState } from 'react';
import { CONTRIBUTORS } from '../data/contributors';
import {
  IconGitHub,
  IconArrowUpRight,
  IconCheck,
  IconTerminal,
  IconSparkles,
  IconRefresh,
} from './Icons';

export default function ContributorsShowcase({ onPlaySound }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'human' | 'agent' | 'chatbot'
  const [selectedId, setSelectedId] = useState(CONTRIBUTORS[0]?.id || 'kon-kurosaki');
  const [isSimulatingHandshake, setIsSimulatingHandshake] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState([
    '[HORIZON 2026+] Handshake: Anthropic Claude Code CLI protocol mapped to PK Studio.',
    '[HORIZON 2026+] AST Target: High-order component modularization & multi-file invariant proofs.',
    '[HORIZON 2026+] Status: Formally queued on developer roadmap for upcoming engineering phases.',
    '[HORIZON 2026+] Current active steering: Biological architect Phana maintains 100% control.',
  ]);

  const handleRunSimulation = (e) => {
    e?.stopPropagation?.();
    onPlaySound?.('switch');
    setIsSimulatingHandshake(true);
    setSimulatedLogs(['[CONNECTING] Querying Anthropic Claude Code CLI protocol...']);
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

  const selectedContributor =
    CONTRIBUTORS.find((c) => c.id === selectedId) || CONTRIBUTORS[0];

  const handleSelect = (id) => {
    onPlaySound?.('switch');
    setSelectedId(id);
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

  return (
    <div id="contributors" className="border-b border-line bg-surface/30 relative overflow-hidden">
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
              <span>THE ALLIANCE // 1 HUMAN (2 ACCOUNTS: 198 COMMITS) · AGENTS &amp; AI</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-ink">
              One Human (Two Accounts), Autonomous Agents &amp; AI Chatbots
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted max-w-3xl leading-relaxed">
              Both <span className="text-ink font-mono font-semibold">@Kon-Kurosaki</span> and <span className="text-ink font-mono font-semibold">@not-Phana</span> are me—one human architect committing across two GitHub accounts (<span className="text-accent font-mono">198/200</span> verified commits combined), working alongside autonomous coding agents and conversational AI chatbots.
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

        {/* Responsive Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {filteredContributors.map((c) => {
            const isSelected = c.id === selectedId;
            return (
              <div
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`group spotlight-card card-laser-lift border p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left relative ${
                  isSelected
                    ? 'border-accent bg-surface ring-1 ring-accent/60 shadow-lg'
                    : 'border-line bg-bg hover:border-accent/50 hover:bg-surface/60'
                }`}
              >
                {/* Active Indicator Top Border Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
                )}

                <div>
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
                            if (c.avatarFallback && e.currentTarget.src !== c.avatarFallback) {
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
                  <span className={c.isFuture ? 'text-[#f97316] font-bold' : 'text-muted'}>
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
                    {isSelected ? 'INSPECTING' : c.isFuture ? 'VIEW ROADMAP' : 'VIEW LOG'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Contributor Deep Dive Inspection Console */}
        <div className="mt-6 border border-line bg-surface/50 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 reveal-on-scroll">
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shrink-0 ring-2 ring-accent p-0.5 overflow-hidden">
              <img
                src={selectedContributor.avatar}
                alt={`${selectedContributor.name} avatar`}
                onError={(e) => {
                  if (selectedContributor.avatarFallback && e.currentTarget.src !== selectedContributor.avatarFallback) {
                    e.currentTarget.src = selectedContributor.avatarFallback;
                  }
                }}
                className="w-full h-full rounded-full object-cover bg-surface"
              />
            </div>
            <div>
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
                    : 'HUMAN CREATOR (CORE DECISION MAKER)'}
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
                  <span className="text-muted">COLLABORATIVE PAIR:</span>
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

              {/* Futuristic Interactive Terminal Handshake Simulation for Future Agent */}
              {selectedContributor.isFuture && (
                <div className="mt-5 border border-[#f97316]/40 bg-[#0b0b0e] p-4 font-mono text-xs text-ink/90 relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between border-b border-lineSoft pb-2.5 mb-3 gap-2 text-[11px] text-[#f97316]">
                    <div className="flex items-center gap-2">
                      <IconTerminal className="w-3.5 h-3.5 text-[#f97316]" />
                      <span className="font-bold tracking-wider uppercase">CLAUDE CODE CLI // FUTURE ROADMAP SIMULATOR</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRunSimulation}
                      className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-ink hover:text-[#f97316] border border-line px-2.5 py-1 bg-surface/80 hover:border-[#f97316]/60 transition-colors"
                    >
                      <IconRefresh className={`w-3 h-3 ${isSimulatingHandshake ? 'animate-spin text-[#f97316]' : ''}`} />
                      <span>{isSimulatingHandshake ? 'SIMULATING HANDSHAKE...' : 'RERUN CLI HANDSHAKE'}</span>
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] leading-relaxed">
                    <div className="text-muted flex items-center gap-1.5">
                      <span className="text-[#f97316] font-bold">$</span>
                      <span>claude-code --autonomous --roadmap-pipeline</span>
                    </div>
                    {simulatedLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-ink/90">
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
                    <span className="text-[#f97316] font-semibold uppercase">STANDBY FOR HORIZON 2026+ ACTIVATION</span>
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
              {selectedContributor.category === 'human' || selectedContributor.profileUrl.includes('github.com') ? (
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
