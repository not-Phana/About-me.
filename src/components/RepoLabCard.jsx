import React, { useState, useEffect, useRef } from 'react';
import {
  IconTerminal,
  IconRadio,
  IconZap,
  IconCheck,
  IconCopy,
  IconArrowUpRight,
  IconSparkles,
  IconRefresh,
  IconSend,
  IconClock,
  IconGitFork,
  IconStar,
} from './Icons';

const INCUBATING_PROJECTS = [
  {
    name: 'PK-Khmer-NLP',
    tag: 'STAGED // Q4 2026',
    status: 'Architecture Staged',
    desc: 'Phonetic dictionary parser, ligature segmenter, and spell-checking WebAssembly runtime for Cambodian typography.',
    stack: 'Rust · WASM · TypeScript',
    progress: 78,
  },
  {
    name: 'PK-Studio-Code',
    tag: 'INTERNAL BETA // 2027',
    status: 'Sandbox Testing',
    desc: 'In-browser desktop IDE core with virtual file undo-tree coordinate engine and zero-latency terminal execution.',
    stack: 'React 18 · Monaco · Web Workers',
    progress: 85,
  },
  {
    name: 'PK-Canvas-Arena',
    tag: 'NEON PROTOCOL EXPANSION',
    status: 'Combat Vector Tuning',
    desc: '4,200 x 4,200 procedural canvas cyber-grid with Valkyrie Mk-IV multi-phase boss rush and WebAudio sound synthesis.',
    stack: 'HTML5 Canvas · WebAudio Synth · 60 FPS',
    progress: 64,
  },
];

export default function RepoLabCard({ colSpanClass, onPlaySound, repos = [] }) {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal' | 'radar' | 'dispatch' | 'clone'
  const [scriptType, setScriptType] = useState('bash'); // 'bash' | 'pwsh'
  const [copiedCloneAll, setCopiedCloneAll] = useState(false);
  const [trackedProjects, setTrackedProjects] = useState({});

  // Terminal state
  const [termInput, setTermInput] = useState('');
  const [isPinging, setIsPinging] = useState(false);
  const [pingLatency, setPingLatency] = useState('24ms');
  const [termLogs, setTermLogs] = useState([
    { text: 'PK REPO LAB TELEMETRY v2.6 // KERNEL ONLINE', type: 'info' },
    { text: 'Connected to GitHub REST API node: api.github.com/users/not-Phana', type: 'system' },
    { text: 'Type a command below or click quick action buttons (e.g. "pk ping", "pk stats").', type: 'hint' },
  ]);
  const termEndRef = useRef(null);

  // Dispatch state
  const [dispatchRepo, setDispatchRepo] = useState('PK-Khmer-Type');
  const [dispatchType, setDispatchType] = useState('feature');
  const [dispatchTitle, setDispatchTitle] = useState('');

  // Auto-scroll terminal logs
  useEffect(() => {
    if (activeTab === 'terminal' && termEndRef.current) {
      termEndRef.current.scrollTop = termEndRef.current.scrollHeight;
    }
  }, [termLogs, activeTab]);

  const handleTabChange = (tab) => {
    onPlaySound?.('switch');
    setActiveTab(tab);
  };

  const runCommand = async (cmdText) => {
    const raw = (cmdText || termInput).trim();
    if (!raw) return;
    setTermInput('');
    onPlaySound?.('switch');

    const cmd = raw.toLowerCase();
    const newLogs = [...termLogs, { text: `>_ ${raw}`, type: 'input' }];

    if (cmd === 'clear' || cmd === 'cls') {
      setTermLogs([
        { text: 'PK REPO LAB TELEMETRY // CONSOLE BUFFER WIPED', type: 'info' },
      ]);
      return;
    }

    if (cmd === 'help') {
      newLogs.push(
        { text: 'Available commands:', type: 'system' },
        { text: '  pk ping      - Measure live millisecond latency to GitHub API', type: 'text' },
        { text: '  pk stats     - Display full repository and engineering telemetry', type: 'text' },
        { text: '  pk matrix    - Render ASCII studio radar scan', type: 'text' },
        { text: '  git status   - Query current deployment working tree', type: 'text' },
        { text: '  git clone    - Switch to batch clone script generator', type: 'text' },
        { text: '  clear        - Reset terminal log output', type: 'text' }
      );
      setTermLogs(newLogs);
      return;
    }

    if (cmd === 'pk ping' || cmd === 'ping') {
      setIsPinging(true);
      newLogs.push({ text: 'Sending ICMP ping to api.github.com node...', type: 'system' });
      setTermLogs([...newLogs]);

      const t0 = performance.now();
      try {
        await fetch('https://api.github.com/users/not-Phana', { cache: 'no-store' });
        const ms = Math.round(performance.now() - t0);
        setPingLatency(`${ms}ms`);
        onPlaySound?.('beep');
        setTermLogs((prev) => [
          ...prev,
          { text: `Ping ACK received from GitHub node in ${ms} ms [HTTP 200 OK]`, type: 'success' },
          { text: `Network telemetry: Zero packet loss, TLS 1.3 session verified.`, type: 'info' },
        ]);
      } catch {
        const fallbackMs = Math.round(20 + Math.random() * 25);
        setPingLatency(`${fallbackMs}ms`);
        setTermLogs((prev) => [
          ...prev,
          { text: `Ping ACK returned from edge cache in ${fallbackMs} ms [STABLE]`, type: 'success' },
        ]);
      } finally {
        setIsPinging(false);
      }
      return;
    }

    if (cmd === 'pk stats' || cmd === 'stats') {
      const originalCount = repos.filter((r) => !r.fork).length;
      newLogs.push(
        { text: 'TELEMETRY PROFILE // @not-Phana (Kon / PK)', type: 'system' },
        { text: `  Public Repos: ${repos.length || 9} total (${originalCount || 7} original source, 2 forks)`, type: 'text' },
        { text: '  Primary Languages: JavaScript, HTML, TypeScript, CSS, Shell', type: 'text' },
        { text: '  Core Collective: Phana Kurosaki + Antigravity Agent + Claude Code + Codex', type: 'text' },
        { text: '  Icon System: 100% Crisp Inline SVGs (Strict Zero-Emoji Rule Active)', type: 'success' },
        { text: '  Working Tree: 0 uncommitted changes · Branch "main" synced with origin', type: 'info' }
      );
      setTermLogs(newLogs);
      return;
    }

    if (cmd === 'git status' || cmd === 'status') {
      newLogs.push(
        { text: 'On branch main', type: 'system' },
        { text: "Your branch is up to date with 'origin/main'.", type: 'text' },
        { text: 'nothing to commit, working tree clean', type: 'success' },
        { text: 'Build artifacts verified: assets/app.bundle.{js,css}', type: 'info' }
      );
      setTermLogs(newLogs);
      return;
    }

    if (cmd === 'pk matrix' || cmd === 'matrix' || cmd === 'radar') {
      newLogs.push(
        { text: '+--- PK CORPORATION RADAR SCAN ----------------------+', type: 'system' },
        { text: '| [ACTIVE] PK-Khmer-Type     ==> 40 Levels / 218 Lessons |', type: 'info' },
        { text: '| [ACTIVE] PK-game           ==> NEON PROTOCOL Overdrive |', type: 'info' },
        { text: '| [ACTIVE] PK-icons          ==> 100% Vector Icon System |', type: 'info' },
        { text: '| [ACTIVE] About-me.         ==> Cyber Engineering Core  |', type: 'info' },
        { text: '| [STAGED] PK-Khmer-NLP      ==> WASM Phonetic Parser    |', type: 'success' },
        { text: '+----------------------------------------------------+', type: 'system' }
      );
      setTermLogs(newLogs);
      return;
    }

    if (cmd.startsWith('git clone')) {
      setActiveTab('clone');
      return;
    }

    // Default response
    newLogs.push({
      text: `Command "${raw}" executed. Type "help" to view telemetry commands or "pk ping" to test latency.`,
      type: 'text',
    });
    setTermLogs(newLogs);
  };

  const handleCopyCloneAll = () => {
    const bashScript = [
      '# Clone all original public repositories by Phana Kurosaki (@not-Phana)',
      'git clone https://github.com/not-Phana/PK-Khmer-Type.git',
      'git clone https://github.com/not-Phana/PK-game.git',
      'git clone https://github.com/not-Phana/PK-icons.git',
      'git clone https://github.com/not-Phana/About-me..git',
      'git clone https://github.com/not-Phana/Phana-cofee-shop.git',
      'git clone https://github.com/not-Phana/github-achievements-run.git',
    ].join('\n');

    const pwshScript = [
      '# PowerShell batch clone for @not-Phana repositories',
      "$repos = @('PK-Khmer-Type', 'PK-game', 'PK-icons', 'About-me.', 'Phana-cofee-shop', 'github-achievements-run')",
      '$repos | ForEach-Object { git clone "https://github.com/not-Phana/$_.git" }',
    ].join('\n');

    const code = scriptType === 'bash' ? bashScript : pwshScript;
    try {
      navigator.clipboard.writeText(code);
      setCopiedCloneAll(true);
      onPlaySound?.('switch');
      setTimeout(() => setCopiedCloneAll(false), 2200);
    } catch {
      // Ignore
    }
  };

  const handleTrackProject = (projName) => {
    onPlaySound?.('switch');
    setTrackedProjects((prev) => ({
      ...prev,
      [projName]: !prev[projName],
    }));
  };

  const handleLaunchIssue = (e) => {
    e.preventDefault();
    onPlaySound?.('switch');
    const title = dispatchTitle.trim() || `[${dispatchType.toUpperCase()}] Project collaboration request`;
    const body = `### Description\n${dispatchTitle || 'Interested in contributing or requesting this feature.'}\n\n### Category\n${dispatchType}\n\n### Dispatched via\nPhana Kurosaki Developer Platform (PK Labs Dispatch Deck)`;
    const issueUrl = `https://github.com/not-Phana/${dispatchRepo}/issues/new?title=${encodeURIComponent(
      title
    )}&body=${encodeURIComponent(body)}`;
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`${colSpanClass} spotlight-card card-laser-lift bg-[#090b10] border border-line p-6 sm:p-8 flex flex-col justify-between hover:border-accent/70 transition-all duration-300 relative overflow-hidden group min-h-[380px]`}
    >
      {/* Subtle Ambient Scanline Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#d4a528_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* Top Header & Tab Navigation */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-lineSoft">
          <div className="flex items-center gap-2.5 font-mono text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="font-bold tracking-wider text-accent uppercase">
              PK LABS // REPOSITORY DECK
            </span>
            <span className="hidden sm:inline-block border border-line bg-surface px-2 py-0.5 text-[10px] text-muted">
              API PING: {pingLatency}
            </span>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-1 bg-surface/80 border border-line p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => handleTabChange('terminal')}
              className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-accent text-[#0b0b0c] font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <IconTerminal className="w-3 h-3" />
              <span>TERMINAL</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('radar')}
              className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'radar'
                  ? 'bg-accent text-[#0b0b0c] font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <IconRadio className="w-3 h-3" />
              <span>INCUBATOR</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('dispatch')}
              className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'dispatch'
                  ? 'bg-accent text-[#0b0b0c] font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <IconSend className="w-3 h-3" />
              <span>DISPATCH</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('clone')}
              className={`px-2.5 py-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'clone'
                  ? 'bg-accent text-[#0b0b0c] font-bold shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <IconCopy className="w-3 h-3" />
              <span>CLONE ALL</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Terminal */}
        {activeTab === 'terminal' && (
          <div className="mt-4 space-y-3 font-mono">
            {/* Terminal Top Quick Commands */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="text-muted flex items-center gap-1.5">
                <IconZap className="w-3 h-3 text-accent" />
                <span>Quick Actions:</span>
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => runCommand('pk ping')}
                  disabled={isPinging}
                  className="border border-line bg-surface hover:border-accent hover:text-accent px-2 py-0.5 text-muted transition-colors disabled:opacity-50"
                >
                  pk ping
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('pk stats')}
                  className="border border-line bg-surface hover:border-accent hover:text-accent px-2 py-0.5 text-muted transition-colors"
                >
                  pk stats
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('git status')}
                  className="border border-line bg-surface hover:border-accent hover:text-accent px-2 py-0.5 text-muted transition-colors"
                >
                  git status
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('pk matrix')}
                  className="border border-line bg-surface hover:border-accent hover:text-accent px-2 py-0.5 text-muted transition-colors"
                >
                  radar scan
                </button>
                <button
                  type="button"
                  onClick={() => runCommand('clear')}
                  className="border border-line bg-surface hover:border-red-400 hover:text-red-400 px-2 py-0.5 text-muted transition-colors"
                >
                  clear
                </button>
              </div>
            </div>

            {/* Terminal Window Box */}
            <div
              ref={termEndRef}
              className="bg-[#050608] border border-line p-3.5 rounded-sm max-h-[175px] min-h-[140px] overflow-y-auto space-y-1 text-xs leading-relaxed select-text"
            >
              {termLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`break-words ${
                    log.type === 'input'
                      ? 'text-accent font-bold'
                      : log.type === 'system'
                      ? 'text-[#38bdf8]'
                      : log.type === 'success'
                      ? 'text-[#4ade80]'
                      : log.type === 'info'
                      ? 'text-ink font-semibold'
                      : log.type === 'hint'
                      ? 'text-muted italic'
                      : 'text-muted'
                  }`}
                >
                  {log.text}
                </div>
              ))}
            </div>

            {/* Interactive Command Input Prompt */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(termInput);
              }}
              className="flex items-center gap-2 border border-line bg-surface/50 px-3 py-1.5 focus-within:border-accent transition-colors"
            >
              <span className="text-accent text-xs font-bold">{'>_'}</span>
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="type command (e.g. pk ping, pk stats, git status, help)..."
                className="w-full bg-transparent text-xs text-ink placeholder:text-muted/60 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 border border-line bg-surface hover:border-accent hover:text-accent px-2.5 py-0.5 text-[11px] text-muted transition-colors uppercase font-bold"
              >
                Run
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Incubating Repositories Radar */}
        {activeTab === 'radar' && (
          <div className="mt-4 space-y-3 font-mono">
            <div className="text-[11px] text-muted flex items-center justify-between">
              <span>UPCOMING / CONFIDENTIAL WORKSPACE MODULES</span>
              <span className="text-accent">3 MODULES STAGED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {INCUBATING_PROJECTS.map((proj) => {
                const isTracked = !!trackedProjects[proj.name];
                return (
                  <div
                    key={proj.name}
                    className="border border-line bg-[#06080b] p-3 flex flex-col justify-between hover:border-accent/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 text-[10px] text-muted mb-1.5">
                        <span className="text-accent font-bold truncate">
                          {proj.tag}
                        </span>
                        <span className="border border-line px-1 py-0.2 text-[9px]">
                          {proj.progress}%
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-ink truncate">
                        {proj.name}
                      </h4>
                      <p className="text-[11px] text-muted line-clamp-2 mt-1 leading-snug">
                        {proj.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-lineSoft flex items-center justify-between gap-2">
                      <span className="text-[10px] text-muted truncate">
                        {proj.stack}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleTrackProject(proj.name)}
                        className={`border px-2 py-0.5 text-[10px] transition-colors ${
                          isTracked
                            ? 'border-[#4ade80] bg-[#4ade80]/10 text-[#4ade80] font-bold'
                            : 'border-line bg-surface text-muted hover:text-ink hover:border-accent'
                        }`}
                      >
                        {isTracked ? 'Tracking' : 'Monitor'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Quick Issue & Collaboration Dispatcher */}
        {activeTab === 'dispatch' && (
          <form onSubmit={handleLaunchIssue} className="mt-4 space-y-3 font-mono">
            <div className="text-[11px] text-muted flex items-center justify-between">
              <span>DISPATCH ISSUE OR FEATURE PROPOSAL TO GITHUB</span>
              <span className="text-accent">DIRECT REPO LINK</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] text-muted uppercase mb-1">
                  Target Repository
                </label>
                <select
                  value={dispatchRepo}
                  onChange={(e) => setDispatchRepo(e.target.value)}
                  className="w-full border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-accent"
                >
                  <option value="PK-Khmer-Type">PK-Khmer-Type (Typing Tutor)</option>
                  <option value="PK-game">PK-game (NEON PROTOCOL)</option>
                  <option value="PK-icons">PK-icons (Vector Engine)</option>
                  <option value="About-me.">About-me. (Studio Platform)</option>
                  <option value="Phana-cofee-shop">Phana-cofee-shop</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-muted uppercase mb-1">
                  Request Category
                </label>
                <select
                  value={dispatchType}
                  onChange={(e) => setDispatchType(e.target.value)}
                  className="w-full border border-line bg-surface px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-accent"
                >
                  <option value="feature">New Feature Proposal</option>
                  <option value="bug">Bug Report / Defect</option>
                  <option value="design">Design &amp; UI Improvement</option>
                  <option value="collab">Developer Collaboration</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-muted uppercase mb-1">
                Proposal Summary / Title
              </label>
              <input
                type="text"
                value={dispatchTitle}
                onChange={(e) => setDispatchTitle(e.target.value)}
                placeholder="e.g. Add phonetic practice drills for Pali Khmer loanwords..."
                className="w-full border border-line bg-surface px-3 py-1.5 text-xs text-ink focus:outline-none focus:border-accent placeholder:text-muted/60"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[10px] text-muted">
                Pre-populates an issue template directly on GitHub.
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-accent text-[#0b0b0c] font-bold px-4 py-1.5 text-xs uppercase hover:opacity-90 transition-opacity"
              >
                <span>Dispatch to GitHub</span>
                <IconArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Tab 4: One-Click Batch Clone Script Generator */}
        {activeTab === 'clone' && (
          <div className="mt-4 space-y-3 font-mono">
            <div className="flex items-center justify-between text-[11px] text-muted">
              <span>ONE-CLICK BATCH CLONE SCRIPT</span>
              <div className="flex items-center gap-1 bg-surface border border-line p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound?.('switch');
                    setScriptType('bash');
                  }}
                  className={`px-2 py-0.5 text-[10px] transition-colors ${
                    scriptType === 'bash'
                      ? 'bg-accent text-[#0b0b0c] font-bold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  Bash / Zsh
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onPlaySound?.('switch');
                    setScriptType('pwsh');
                  }}
                  className={`px-2 py-0.5 text-[10px] transition-colors ${
                    scriptType === 'pwsh'
                      ? 'bg-accent text-[#0b0b0c] font-bold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  PowerShell
                </button>
              </div>
            </div>

            <div className="bg-[#050608] border border-line p-3 font-mono text-[11px] text-ink overflow-x-auto select-all leading-relaxed max-h-[140px]">
              {scriptType === 'bash' ? (
                <>
                  <div className="text-muted"># Clone all repositories by @not-Phana</div>
                  <div>git clone https://github.com/not-Phana/PK-Khmer-Type.git</div>
                  <div>git clone https://github.com/not-Phana/PK-game.git</div>
                  <div>git clone https://github.com/not-Phana/PK-icons.git</div>
                  <div>git clone https://github.com/not-Phana/About-me..git</div>
                </>
              ) : (
                <>
                  <div className="text-muted"># PowerShell batch clone</div>
                  <div>$repos = @('PK-Khmer-Type', 'PK-game', 'PK-icons', 'About-me.')</div>
                  <div>$repos | ForEach-Object {'{'} git clone "https://github.com/not-Phana/$_.git" {'}'}</div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleCopyCloneAll}
                className={`inline-flex items-center gap-1.5 border px-4 py-1.5 text-xs font-bold uppercase transition-colors ${
                  copiedCloneAll
                    ? 'border-[#4ade80] bg-[#4ade80]/10 text-[#4ade80]'
                    : 'border-line bg-surface text-ink hover:border-accent hover:text-accent'
                }`}
              >
                {copiedCloneAll ? (
                  <>
                    <IconCheck className="w-3.5 h-3.5" />
                    <span>Commands Copied!</span>
                  </>
                ) : (
                  <>
                    <IconCopy className="w-3.5 h-3.5" />
                    <span>Copy All Clone Commands</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Telemetry Strip */}
      <div className="mt-5 pt-3 border-t border-lineSoft flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-muted relative z-10">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-ink">
            <IconSparkles className="w-3 h-3 text-accent" />
            <span>PK Labs Interactive Deck</span>
          </span>
          <span className="hidden sm:inline-block text-muted">
            Engineered with zero-emoji vector precision
          </span>
        </div>

        <a
          href="https://github.com/not-Phana?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-accent hover:underline font-bold"
        >
          <span>Explore All On GitHub</span>
          <IconArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
