import React, { useState, useEffect, useRef } from 'react';
import {
  IconClose,
  IconArrowRight,
  IconArrowUpRight,
  IconTerminal,
  IconCode,
  IconGitHub,
} from './Icons';
import { PROFILE } from '../data/profile';

export default function CommandPalette({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  onNavigateHome,
  theme,
  onToggleTheme,
  accentPreset,
  onChangeAccent,
  soundEnabled,
  onToggleSound,
}) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  const actions = [
    ...projects.map((p) => ({
      id: `inspect-${p.id}`,
      group: 'INSPECT PROJECT ARCHITECTURE',
      label: `Inspect: ${p.name}`,
      meta: `${p.category} · ${p.status}`,
      run: () => {
        onSelectProject(p.id);
        onClose();
      },
    })),
    ...projects
      .filter((p) => p.liveUrl)
      .map((p) => ({
        id: `launch-${p.id}`,
        group: 'LAUNCH LIVE DEPLOYMENT',
        label: `Launch Live: ${p.name}`,
        meta: p.liveUrl.replace('https://', ''),
        external: true,
        run: () => {
          window.open(p.liveUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      })),
    {
      id: 'nav-console',
      group: 'STUDIO NAVIGATION & CONTROLS',
      label: 'Jump to Interactive PK Console (pk@kon)',
      meta: 'Section // Terminal',
      run: () => {
        onNavigateHome('console');
        onClose();
      },
    },
    {
      id: 'nav-github',
      group: 'STUDIO NAVIGATION & CONTROLS',
      label: 'Jump to GitHub Activity & Repositories',
      meta: 'Section // GitHub REST API',
      run: () => {
        onNavigateHome('github');
        onClose();
      },
    },
    {
      id: 'toggle-theme',
      group: 'STUDIO NAVIGATION & CONTROLS',
      label: `Switch Theme Mode (Current: ${theme.toUpperCase()})`,
      meta: 'Toggle Dark / Light',
      run: () => {
        onToggleTheme();
        onClose();
      },
    },
    {
      id: 'toggle-sound',
      group: 'STUDIO NAVIGATION & CONTROLS',
      label: `Mechanical WebAudio Synth (Current: ${soundEnabled ? 'ON' : 'MUTED'})`,
      meta: 'Toggle Tactile Audio',
      run: () => {
        onToggleSound();
        onClose();
      },
    },
    {
      id: 'accent-amber',
      group: 'SIGNATURE ACCENT PRESETS',
      label: 'Accent: PK Amber Gold (Default)',
      meta: accentPreset === 'amber' ? 'ACTIVE' : '#D4A528',
      run: () => {
        onChangeAccent('amber');
        onClose();
      },
    },
    {
      id: 'accent-cyan',
      group: 'SIGNATURE ACCENT PRESETS',
      label: 'Accent: Cyber Cyan (PK Future)',
      meta: accentPreset === 'cyan' ? 'ACTIVE' : '#38BDF8',
      run: () => {
        onChangeAccent('cyan');
        onClose();
      },
    },
    {
      id: 'accent-emerald',
      group: 'SIGNATURE ACCENT PRESETS',
      label: 'Accent: Neon Protocol Emerald',
      meta: accentPreset === 'emerald' ? 'ACTIVE' : '#34D399',
      run: () => {
        onChangeAccent('emerald');
        onClose();
      },
    },
    {
      id: 'accent-crimson',
      group: 'SIGNATURE ACCENT PRESETS',
      label: 'Accent: Kurosaki Crimson',
      meta: accentPreset === 'crimson' ? 'ACTIVE' : '#F43F5E',
      run: () => {
        onChangeAccent('crimson');
        onClose();
      },
    },
    {
      id: 'ext-github',
      group: 'EXTERNAL PROFILE',
      label: `Open GitHub Profile (@${PROFILE.githubUsername})`,
      meta: 'github.com/phanaach4889',
      external: true,
      run: () => {
        window.open(PROFILE.githubUrl, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase()) ||
      item.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].run();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, activeIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-sm flex items-start justify-center p-4 sm:pt-20 animate-enter"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="PK Studio Command Palette"
    >
      <div className="w-full max-w-2xl border border-line bg-bg shadow-2xl overflow-hidden">
        {/* Top Search Bar */}
        <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3.5 gap-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <IconTerminal className="w-4 h-4 text-accent shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, project name, or theme preset..."
              className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-muted focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-muted hover:text-ink flex items-center gap-1"
          >
            <span>ESC</span>
            <IconClose className="w-3 h-3" />
          </button>
        </div>

        {/* Action Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-lineSoft">
          {filtered.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-muted">
              No matching commands or projects for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={item.run}
                  className={`w-full text-left px-5 py-3 flex items-center justify-between gap-4 transition-colors ${
                    selected
                      ? 'bg-accentDim border-l-2 border-accent text-ink'
                      : 'bg-bg text-muted hover:text-ink'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] text-accent uppercase tracking-wider">
                      {item.group}
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-semibold text-ink truncate mt-0.5">
                      {item.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs text-muted">
                    <span className="hidden sm:inline">{item.meta}</span>
                    {item.external ? (
                      <IconArrowUpRight className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <IconArrowRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Bottom Shortcut Legend */}
        <div className="border-t border-line bg-surface px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-muted">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="border border-line bg-bg px-1.5 py-0.5 text-ink">
                ↑↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="border border-line bg-bg px-1.5 py-0.5 text-ink">
                ENTER
              </kbd>{' '}
              Execute
            </span>
            <span>
              <kbd className="border border-line bg-bg px-1.5 py-0.5 text-ink">
                ESC
              </kbd>{' '}
              Dismiss
            </span>
          </div>
          <span className="text-accent">PK COMMAND PALETTE // V2.0</span>
        </div>
      </div>
    </div>
  );
}
