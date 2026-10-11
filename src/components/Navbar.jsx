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
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'console', label: 'Console', href: '#console' },
  { id: 'github', label: 'GitHub', href: '#github' },
  { id: 'contact', label: 'Contact', href: '#contact' },
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
      className="sticky top-0 left-0 z-50 w-full border-b border-line bg-bg/95 backdrop-blur-sm"
    >
      {/* Scroll progress indicator hairline */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full bg-accent transition-[width] duration-75"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      <div className="mx-auto flex h-12 max-w-[1400px] items-stretch justify-between">
        {/* Brand Identity Cell */}
        <div className="flex min-w-0 items-stretch">
          <a
            href="#home"
            onClick={(e) => handleSectionClick(e, 'home')}
            className="group flex items-center gap-2.5 border-r border-line px-4 sm:px-6 text-ink hover:bg-surface transition-colors"
            aria-label="PK — Phana Kurosaki Home"
          >
            <PKMonogram className="w-6 h-6 text-ink transition-transform duration-200 group-hover:scale-105" />
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs font-bold tracking-[0.18em] uppercase">
                PHANA
              </span>
              <span className="hidden sm:inline-block font-mono text-[10px] text-accent tracking-[0.1em]">
                // KON
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-stretch"
          >
            <ul className="flex h-full items-stretch">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  !isDetailView && activeSection === item.id;
                return (
                  <li key={item.id} className="flex items-stretch">
                    <a
                      href={item.href}
                      onClick={(e) => handleSectionClick(e, item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex h-full items-center border-r border-line px-3.5 hud-label whitespace-nowrap transition-colors ${
                        isActive
                          ? 'text-ink bg-surface'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      <span
                        className={`px-2 py-0.5 transition-colors ${
                          isActive
                            ? 'bg-invertBg text-invertFg'
                            : 'group-hover:bg-invertBg group-hover:text-invertFg'
                        }`}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right Utility Cells */}
        <div className="flex shrink-0 items-stretch">
          {/* Live Studio Clock & Telemetry Pill */}
          <div
            className="hidden 2xl:flex items-center gap-2 border-l border-line px-3.5 font-mono text-[11px] text-muted select-none"
            title="Local system clock & live studio telemetry"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-ink font-semibold">{clockText}</span>
            <span className="text-[10px] text-muted">SYS:OK</span>
          </div>

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            title="Open Command Palette (Ctrl + K)"
            className="hidden md:flex items-center gap-2 border-l border-line px-3.5 font-mono text-[11px] text-muted hover:text-ink hover:bg-surface transition-colors"
          >
            <IconTerminal className="w-3.5 h-3.5 text-accent" />
            <span>CMD</span>
            <kbd className="border border-line bg-surface px-1.5 py-0.5 text-[10px] text-ink">
              Ctrl+K
            </kbd>
          </button>

          {/* Signature Accent Switcher Dots */}
          <div
            className="hidden sm:flex items-center gap-1.5 border-l border-line px-3"
            role="group"
            aria-label="Accent color preset"
          >
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeAccent(opt.id)}
                title={`Accent: ${opt.label}`}
                aria-label={`Set ${opt.label} accent`}
                className={`w-3.5 h-3.5 rounded-full transition-transform ${
                  accentPreset === opt.id
                    ? 'scale-125 ring-2 ring-ink ring-offset-1 ring-offset-bg'
                    : 'opacity-55 hover:opacity-100'
                }`}
                style={{ backgroundColor: opt.color }}
              />
            ))}
          </div>

          {/* Tactile WebAudio Synth Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            title="Toggle WebAudio mechanical switch sound effects"
            aria-label={soundEnabled ? 'Mute UI sound effects' : 'Enable UI sound effects'}
            className="hidden sm:flex items-center justify-center border-l border-line px-3 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-ink hover:bg-surface transition-colors"
          >
            <span>SFX:</span>
            <span className={`ml-1 font-bold ${soundEnabled ? 'text-accent' : 'text-muted'}`}>
              {soundEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            title={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            className="flex w-11 items-center justify-center border-l border-line text-muted hover:bg-invertBg hover:text-invertFg transition-colors"
          >
            {theme === 'dark' ? (
              <IconSun className="w-4 h-4" />
            ) : (
              <IconMoon className="w-4 h-4" />
            )}
          </button>

          {/* Direct GitHub Profile Link */}
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 border-l border-line bg-invertBg text-invertFg px-4 hud-label hover:opacity-90 transition-opacity"
          >
            <IconGitHub className="w-3.5 h-3.5" />
            <span>@{PROFILE.githubUsername}</span>
            <IconArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex xl:hidden w-12 items-center justify-center border-l border-line text-ink hover:bg-surface transition-colors"
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
          className="xl:hidden border-t border-line bg-surface animate-enter"
        >
          <ul className="divide-y divide-line">
            {NAV_ITEMS.map((item, idx) => {
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
                      0{idx + 1} // {item.label}
                    </span>
                    <span className="text-muted">-&gt;</span>
                  </a>
                </li>
              );
            })}
            <li className="px-6 py-3.5 flex items-center justify-between">
              <span className="hud-label text-muted">ACCENT THEME</span>
              <div className="flex items-center gap-2.5">
                {ACCENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onChangeAccent(opt.id)}
                    className={`w-5 h-5 rounded-full ${
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
