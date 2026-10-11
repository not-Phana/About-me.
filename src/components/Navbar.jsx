import React, { useState, useEffect } from 'react';
import {
  PKMonogram,
  IconGitHub,
  IconSun,
  IconMoon,
  IconMenu,
  IconClose,
  IconArrowUpRight,
  IconTerminal,
} from './Icons';
import { PROFILE } from '../data/profile';

const NAV_ITEMS = [
  { id: 'home', index: '01', label: 'Home', href: '#home' },
  { id: 'about', index: '02', label: 'About', href: '#about' },
  { id: 'projects', index: '03', label: 'Projects', href: '#projects' },
  { id: 'console', index: '04', label: 'Console', href: '#console' },
  { id: 'github', index: '05', label: 'GitHub', href: '#github' },
  { id: 'contact', index: '06', label: 'Contact', href: '#contact' },
];

const ACCENT_OPTIONS = [
  { id: 'amber', color: '#d4a528', label: 'Amber' },
  { id: 'cyan', color: '#38bdf8', label: 'Cyan' },
  { id: 'emerald', color: '#34d399', label: 'Emerald' },
  { id: 'crimson', color: '#fb7185', label: 'Crimson' },
];

export default function Navbar({
  activeSection,
  onNavigateHome,
  isDetailView,
  theme,
  onToggleTheme,
  accentPreset,
  onChangeAccent,
  soundEnabled,
  onToggleSound,
  onOpenCommandPalette,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [clockText, setClockText] = useState(() => {
    try {
      return new Date().toLocaleTimeString('en-GB', { hour12: false });
    } catch {
      return '00:00:00';
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      try {
        setClockText(new Date().toLocaleTimeString('en-GB', { hour12: false }));
      } catch {
        // Ignore locale time error
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateHome(sectionId);
  };

  return (
    <header
      id="site-nav"
      className="sticky top-0 left-0 z-50 w-full bg-bg border-b border-line select-none"
    >
      {/* Top Architectural Laser Progress Bar */}
      <div className="relative h-[2px] w-full bg-lineSoft overflow-hidden">
        <div
          className="h-full bg-accent transition-[width] duration-75"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <div className="mx-auto flex h-14 max-w-[1400px] border-x border-line items-stretch justify-between bg-bg">
        {/* ================================================================
            LEFT: STUDIO BRAND IDENTITY MODULE
            ================================================================ */}
        <div className="flex items-stretch shrink-0">
          <a
            href="#home"
            onClick={(e) => handleSectionClick(e, 'home')}
            className="group relative flex items-center gap-3 border-r border-line px-4 sm:px-5 text-ink hover:bg-surface transition-colors whitespace-nowrap"
            aria-label="PK — Phana Kurosaki Home"
          >
            {/* Top-left accent corner tick */}
            <span
              className="pointer-events-none absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-accent opacity-80 group-hover:opacity-100"
              aria-hidden="true"
            />

            <PKMonogram className="w-7 h-7 text-ink shrink-0 transition-transform duration-200 group-hover:scale-105" />

            <div className="flex flex-col justify-center leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-extrabold tracking-[0.14em] uppercase text-ink">
                  PHANA
                </span>
                <span className="border border-accent/50 bg-accentDim px-1.5 py-[2px] font-mono text-[9px] font-bold tracking-[0.12em] text-accent">
                  KON
                </span>
              </div>
              <span className="mt-1 font-mono text-[9px] tracking-[0.14em] text-muted uppercase">
                PK STUDIO // SYS.26
              </span>
            </div>
          </a>

          {/* ==============================================================
              CENTER-LEFT: PRECISION INDEXED NAVIGATION DECK
              ============================================================== */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-stretch"
          >
            <ul className="flex h-full items-stretch">
              {NAV_ITEMS.map((item) => {
                const isActive = !isDetailView && activeSection === item.id;
                return (
                  <li key={item.id} className="flex items-stretch">
                    <a
                      href={item.href}
                      onClick={(e) => handleSectionClick(e, item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group relative flex h-full items-center gap-2 border-r border-line px-3.5 xl:px-4 font-mono text-[11px] uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-surface2 text-ink font-bold'
                          : 'text-muted hover:text-ink hover:bg-surface/60'
                      }`}
                    >
                      {/* Active bottom laser indicator */}
                      <span
                        className={`pointer-events-none absolute bottom-0 inset-x-0 h-[2px] transition-opacity ${
                          isActive
                            ? 'bg-accent opacity-100'
                            : 'bg-ink/40 opacity-0 group-hover:opacity-60'
                        }`}
                        aria-hidden="true"
                      />

                      <span
                        className={`text-[9px] font-mono transition-colors ${
                          isActive
                            ? 'text-accent font-bold'
                            : 'text-muted/60 group-hover:text-accent'
                        }`}
                      >
                        {item.index}
                      </span>
                      <span>{item.label}</span>
                      {isActive && (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* ================================================================
            RIGHT: HARDWARE INSTRUMENT CLUSTER & GITHUB CTA
            ================================================================ */}
        <div className="flex shrink-0 items-stretch">
          {/* 1. Recessed Telemetry Clock Module */}
          <div
            className="hidden 2xl:flex items-center border-l border-line px-3 bg-surface/40"
            title="Local studio system clock"
          >
            <div className="flex items-center gap-2 border border-line bg-bg px-2.5 py-1 font-mono text-[10px] whitespace-nowrap">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-ink font-semibold tracking-wider">
                {clockText}
              </span>
            </div>
          </div>

          {/* 2. Mechanical Keycap Command Palette Trigger */}
          <div className="hidden md:flex items-center border-l border-line px-2.5 bg-bg">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Open Command Palette (Ctrl + K)"
              className="pk-keycap flex items-center gap-2 bg-surface hover:border-accent px-2.5 py-1 font-mono text-[11px] text-ink whitespace-nowrap"
            >
              <IconTerminal className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] tracking-wider uppercase font-semibold">
                CMD
              </span>
              <kbd className="border border-line bg-bg px-1.5 py-[1px] text-[9px] text-accent font-bold">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* 3. Precision LED Accent Matrix Pod */}
          <div
            className="hidden sm:flex items-center border-l border-line px-2.5 bg-bg"
            role="group"
            aria-label="Accent color preset"
          >
            <div className="flex items-center gap-1.5 border border-line bg-surface px-2 py-1.5">
              {ACCENT_OPTIONS.map((opt) => {
                const active = accentPreset === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeAccent(opt.id)}
                    title={`Studio Accent: ${opt.label}`}
                    aria-label={`Set ${opt.label} accent`}
                    className={`w-2.5 h-2.5 transition-all ${
                      active
                        ? 'scale-110 ring-1 ring-ink ring-offset-1 ring-offset-bg'
                        : 'opacity-45 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: opt.color }}
                  />
                );
              })}
            </div>
          </div>

          {/* 4. Tactile WebAudio Synth Equalizer Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            title="Toggle WebAudio mechanical switch sound effects"
            aria-label={
              soundEnabled ? 'Mute UI sound effects' : 'Enable UI sound effects'
            }
            className="hidden sm:flex items-center gap-2 border-l border-line px-3 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-ink hover:bg-surface transition-colors whitespace-nowrap"
          >
            {/* Mini equalizer bars SVG */}
            <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
              <span
                className={`w-[2px] transition-all ${
                  soundEnabled ? 'h-2.5 bg-accent' : 'h-1 bg-muted/40'
                }`}
              />
              <span
                className={`w-[2px] transition-all ${
                  soundEnabled ? 'h-3 bg-accent' : 'h-1 bg-muted/40'
                }`}
              />
              <span
                className={`w-[2px] transition-all ${
                  soundEnabled ? 'h-1.5 bg-accent' : 'h-1 bg-muted/40'
                }`}
              />
            </span>
            <span
              className={`font-bold ${
                soundEnabled ? 'text-ink' : 'text-muted'
              }`}
            >
              SFX
            </span>
          </button>

          {/* 5. Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            title={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            className="flex w-10 items-center justify-center border-l border-line text-muted hover:bg-surface hover:text-accent transition-colors"
          >
            {theme === 'dark' ? (
              <IconSun className="w-4 h-4" />
            ) : (
              <IconMoon className="w-4 h-4" />
            )}
          </button>

          {/* 6. Primary GitHub Profile Action Module */}
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 border-l border-line bg-invertBg text-invertFg px-4 font-mono text-[11px] font-bold tracking-[0.08em] uppercase whitespace-nowrap hover:bg-accent hover:text-[#0b0b0c] transition-colors"
          >
            <IconGitHub className="w-3.5 h-3.5 shrink-0" />
            <span>@{PROFILE.githubUsername}</span>
            <IconArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="flex lg:hidden w-12 items-center justify-center border-l border-line text-ink hover:bg-surface transition-colors"
          >
            {mobileMenuOpen ? (
              <IconClose className="w-5 h-5" />
            ) : (
              <IconMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-line bg-surface animate-enter"
        >
          <ul className="divide-y divide-line">
            {NAV_ITEMS.map((item) => {
              const isActive = !isDetailView && activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleSectionClick(e, item.id)}
                    className={`flex items-center justify-between px-6 py-3.5 hud-label ${
                      isActive
                        ? 'bg-accentDim text-accent'
                        : 'text-ink hover:bg-surface2'
                    }`}
                  >
                    <span>
                      {item.index} // {item.label}
                    </span>
                    <span className="text-muted">-&gt;</span>
                  </a>
                </li>
              );
            })}
            <li className="px-6 py-3.5 flex items-center justify-between">
              <span className="hud-label text-muted">ACCENT LED</span>
              <div className="flex items-center gap-2.5">
                {ACCENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeAccent(opt.id)}
                    className={`w-4 h-4 ${
                      accentPreset === opt.id ? 'ring-2 ring-ink' : 'opacity-60'
                    }`}
                    style={{ backgroundColor: opt.color }}
                    aria-label={opt.label}
                  />
                ))}
              </div>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-between px-6 py-3.5 hud-label text-accent bg-bg"
              >
                <span>Open Command Palette</span>
                <span>CTRL+K</span>
              </button>
            </li>
            <li>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-4 hud-label bg-invertBg text-invertFg"
              >
                <span className="flex items-center gap-2">
                  <IconGitHub className="w-4 h-4" />
                  <span>GitHub Profile (@{PROFILE.githubUsername})</span>
                </span>
                <IconArrowUpRight className="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
