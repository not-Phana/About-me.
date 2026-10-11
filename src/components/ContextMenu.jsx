import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  PKMonogram,
  IconArrowRight,
  IconArrowUpRight,
  IconCopy,
  IconCheck,
  IconTerminal,
  IconSun,
  IconMoon,
  IconVolume,
  IconVolumeX,
  IconShield,
  IconGitHub,
  IconMail,
  IconSparkles,
  IconCompass,
  IconCode,
  IconLayers,
  IconCpu,
} from './Icons';
import { playTactileClick } from '../utils/sound';

const ACCENTS = [
  { id: 'amber', label: 'Amber', color: '#d4a528' },
  { id: 'cyan', label: 'Cyan', color: '#38bdf8' },
  { id: 'emerald', label: 'Emerald', color: '#34d399' },
  { id: 'crimson', label: 'Crimson', color: '#fb7185' },
];

const NAV_SHORTCUTS = [
  { id: 'home', code: '01', label: 'Home' },
  { id: 'about', code: '02', label: 'About' },
  { id: 'projects', code: '03', label: 'Projects' },
  { id: 'console', code: '04', label: 'Console' },
  { id: 'github', code: '05', label: 'GitHub' },
  { id: 'contact', code: '06', label: 'Contact' },
];

export default function ContextMenu({
  onNavigateHome,
  onOpenCommandPalette,
  theme,
  onToggleTheme,
  accentPreset,
  onChangeAccent,
  soundEnabled,
  onToggleSound,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [contextData, setContextData] = useState({
    selectedText: '',
    linkUrl: '',
    linkLabel: '',
    isProjectCard: false,
    projectId: null,
  });
  const [toastMessage, setToastMessage] = useState(null);
  const menuRef = useRef(null);
  const toastTimerRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Global ContextMenu Listener
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Allow native browser inspect/menu if Shift is held down
      if (e.shiftKey) return;

      e.preventDefault();

      // Detect contextual metadata under pointer
      const target = e.target;
      const selection = window.getSelection()?.toString().trim() || '';

      let linkUrl = '';
      let linkLabel = '';
      const anchor = target?.closest ? target.closest('a') : null;
      if (anchor && anchor.href) {
        linkUrl = anchor.href;
        linkLabel = anchor.innerText?.trim() || anchor.getAttribute('aria-label') || 'Link';
      }

      let isProjectCard = false;
      let projectId = null;
      const card = target?.closest ? target.closest('[data-project-id], .spotlight-card') : null;
      if (card) {
        isProjectCard = true;
        projectId = card.getAttribute('data-project-id') || null;
      }

      setContextData({
        selectedText: selection.length > 0 ? selection.slice(0, 80) : '',
        linkUrl,
        linkLabel: linkLabel.slice(0, 32),
        isProjectCard,
        projectId,
      });

      // Clamp coordinates within viewport
      const menuWidth = 276;
      const menuHeight = 440;
      let posX = e.clientX;
      let posY = e.clientY;

      if (posX + menuWidth > window.innerWidth - 12) {
        posX = Math.max(12, posX - menuWidth);
      }
      if (posY + menuHeight > window.innerHeight - 12) {
        posY = Math.max(12, posY - menuHeight);
      }

      setPosition({ x: posX, y: posY });
      setIsOpen(true);
      playTactileClick('switch', soundEnabled);
    };

    const handleDismiss = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('mousedown', handleDismiss);
    window.addEventListener('scroll', closeMenu, { passive: true });
    window.addEventListener('resize', closeMenu, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('mousedown', handleDismiss);
      window.removeEventListener('scroll', closeMenu);
      window.removeEventListener('resize', closeMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(toastTimerRef.current);
    };
  }, [closeMenu, soundEnabled]);

  // Action Handlers
  const handleCopyText = (text, label) => {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      playTactileClick('keycap', soundEnabled);
      showToast(`${label} COPIED`);
      setTimeout(closeMenu, 400);
    }).catch(() => {
      showToast('COPY FAILED');
    });
  };

  const handleJumpSection = (secId) => {
    playTactileClick('keycap', soundEnabled);
    closeMenu();
    onNavigateHome(secId);
  };

  const handleOpenCommandPaletteAction = () => {
    playTactileClick('switch', soundEnabled);
    closeMenu();
    onOpenCommandPalette();
  };

  const handleToggleThemeAction = () => {
    playTactileClick('switch', soundEnabled);
    onToggleTheme();
    showToast(`THEME: ${theme === 'dark' ? 'LIGHT' : 'DARK'}`);
  };

  const handleToggleSoundAction = () => {
    onToggleSound();
    playTactileClick('switch', !soundEnabled);
    showToast(`AUDIO: ${soundEnabled ? 'MUTED' : 'ENABLED'}`);
  };

  const handleChangeAccentAction = (accentId) => {
    playTactileClick('switch', soundEnabled);
    onChangeAccent(accentId);
    showToast(`ACCENT: ${accentId.toUpperCase()}`);
  };

  const handleScrollTopAction = () => {
    playTactileClick('switch', soundEnabled);
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="PK Studio Precision Context Menu"
      className="context-menu-hud fixed z-[10000] w-[276px] select-none rounded-none border border-line bg-surface/95 text-ink shadow-2xl backdrop-blur-md"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Laser Scanner Accent Line at Top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

      {/* Header telemetry ribbon */}
      <div className="flex items-center justify-between border-b border-line bg-surface2/60 px-3 py-2">
        <div className="flex items-center gap-2">
          <PKMonogram className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-ink">
            PK STUDIO // MENU
          </span>
        </div>
        <span className="font-mono text-[8px] tracking-wider text-muted uppercase">
          ESC TO CLOSE
        </span>
      </div>

      {/* Context-aware dynamic section */}
      {(contextData.selectedText || contextData.linkUrl || contextData.isProjectCard) && (
        <div className="border-b border-line bg-accentDim/30 p-2">
          <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-accent">
            <IconSparkles className="w-3 h-3" />
            <span>SMART CONTEXT TARGET</span>
          </div>

          {contextData.selectedText && (
            <button
              type="button"
              onClick={() => handleCopyText(contextData.selectedText, 'SELECTION')}
              className="flex w-full items-center justify-between border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-accent hover:bg-surface2"
            >
              <div className="flex items-center gap-2 truncate">
                <IconCopy className="w-3.5 h-3.5 shrink-0 text-accent" />
                <span className="truncate">Copy: "{contextData.selectedText}"</span>
              </div>
              <span className="text-[9px] text-muted shrink-0 ml-1">COPY</span>
            </button>
          )}

          {contextData.linkUrl && (
            <button
              type="button"
              onClick={() => handleCopyText(contextData.linkUrl, 'LINK URL')}
              className="mt-1 flex w-full items-center justify-between border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-accent hover:bg-surface2"
            >
              <div className="flex items-center gap-2 truncate">
                <IconArrowUpRight className="w-3.5 h-3.5 shrink-0 text-accent" />
                <span className="truncate">Copy URL: {contextData.linkLabel || 'Link'}</span>
              </div>
              <span className="text-[9px] text-muted shrink-0 ml-1">URL</span>
            </button>
          )}
        </div>
      )}

      {/* Primary Section Jump Matrix */}
      <div className="p-2 border-b border-line">
        <div className="mb-1.5 px-1 font-mono text-[9px] font-bold tracking-widest text-muted uppercase">
          WARP DECK // SECTIONS
        </div>
        <div className="grid grid-cols-2 gap-1">
          {NAV_SHORTCUTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleJumpSection(item.id)}
              className="group flex items-center justify-between border border-line bg-surface/60 px-2 py-1.5 text-left font-mono text-[10px] uppercase text-muted transition-all hover:border-accent hover:bg-surface hover:text-ink"
            >
              <span className="font-bold text-accent group-hover:underline">
                {item.code}
              </span>
              <span className="truncate font-semibold">{item.label}</span>
              <IconArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
            </button>
          ))}
        </div>
      </div>

      {/* Studio Hardware Controls */}
      <div className="p-2 border-b border-line space-y-1">
        <div className="mb-1 px-1 font-mono text-[9px] font-bold tracking-widest text-muted uppercase">
          STUDIO CONTROLS
        </div>

        {/* Command Palette Trigger */}
        <button
          type="button"
          onClick={handleOpenCommandPaletteAction}
          className="flex w-full items-center justify-between border border-line bg-surface px-2.5 py-1.5 text-left font-mono text-[11px] text-ink transition-colors hover:border-accent hover:bg-surface2"
        >
          <div className="flex items-center gap-2">
            <IconTerminal className="w-3.5 h-3.5 text-accent" />
            <span>Command Palette</span>
          </div>
          <span className="border border-line bg-surface2 px-1.5 py-0.5 text-[9px] font-bold text-muted">
            Ctrl+K
          </span>
        </button>

        {/* Theme & Sound Row */}
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={handleToggleThemeAction}
            className="flex items-center justify-between border border-line bg-surface px-2 py-1.5 text-left font-mono text-[10px] text-ink transition-colors hover:border-accent hover:bg-surface2"
          >
            <div className="flex items-center gap-1.5">
              {theme === 'dark' ? (
                <IconSun className="w-3.5 h-3.5 text-accent" />
              ) : (
                <IconMoon className="w-3.5 h-3.5 text-accent" />
              )}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleToggleSoundAction}
            className="flex items-center justify-between border border-line bg-surface px-2 py-1.5 text-left font-mono text-[10px] text-ink transition-colors hover:border-accent hover:bg-surface2"
          >
            <div className="flex items-center gap-1.5">
              {soundEnabled ? (
                <IconVolume className="w-3.5 h-3.5 text-accent" />
              ) : (
                <IconVolumeX className="w-3.5 h-3.5 text-muted" />
              )}
              <span>{soundEnabled ? 'Audio: ON' : 'Audio: OFF'}</span>
            </div>
          </button>
        </div>

        {/* Studio Accent Color Matrix */}
        <div className="flex items-center justify-between border border-line bg-surface px-2.5 py-1.5">
          <span className="font-mono text-[10px] uppercase text-muted">
            Accent Preset
          </span>
          <div className="flex items-center gap-1.5">
            {ACCENTS.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => handleChangeAccentAction(acc.id)}
                title={`Accent: ${acc.label}`}
                aria-label={`Select ${acc.label} accent`}
                className={`w-3 h-3 transition-transform ${
                  accentPreset === acc.id
                    ? 'scale-125 ring-1 ring-ink ring-offset-1 ring-offset-bg'
                    : 'opacity-50 hover:opacity-100'
                }`}
                style={{ backgroundColor: acc.color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Developer & Direct Actions */}
      <div className="p-2 space-y-1">
        <div className="mb-1 px-1 font-mono text-[9px] font-bold tracking-widest text-muted uppercase">
          QUICK ACTIONS
        </div>

        <button
          type="button"
          onClick={() => handleCopyText('phleyphana@gmail.com', 'EMAIL')}
          className="flex w-full items-center justify-between border border-line bg-surface px-2.5 py-1.5 text-left font-mono text-[10px] text-ink transition-colors hover:border-accent hover:bg-surface2"
        >
          <div className="flex items-center gap-2">
            <IconMail className="w-3.5 h-3.5 text-accent" />
            <span>Copy Gmail</span>
          </div>
          <span className="text-[9px] text-muted">phleyphana</span>
        </button>

        <a
          href="https://github.com/phanaach4889"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => playTactileClick('keycap', soundEnabled)}
          className="flex w-full items-center justify-between border border-line bg-surface px-2.5 py-1.5 text-left font-mono text-[10px] text-ink transition-colors hover:border-accent hover:bg-surface2"
        >
          <div className="flex items-center gap-2">
            <IconGitHub className="w-3.5 h-3.5 text-accent" />
            <span>GitHub Profile</span>
          </div>
          <IconArrowUpRight className="w-3 h-3 text-muted" />
        </a>

        <button
          type="button"
          onClick={() => handleJumpSection('footer-legal-section')}
          className="flex w-full items-center justify-between border border-line bg-surface px-2.5 py-1.5 text-left font-mono text-[10px] text-ink transition-colors hover:border-accent hover:bg-surface2"
        >
          <div className="flex items-center gap-2">
            <IconShield className="w-3.5 h-3.5 text-accent" />
            <span>Legal Shield & Disclaimers</span>
          </div>
          <span className="text-[8px] font-mono text-muted">STATUTORY</span>
        </button>

        <button
          type="button"
          onClick={handleScrollTopAction}
          className="flex w-full items-center justify-between border border-line bg-surface px-2.5 py-1.5 text-left font-mono text-[10px] text-ink transition-colors hover:border-accent hover:bg-surface2"
        >
          <div className="flex items-center gap-2">
            <IconCompass className="w-3.5 h-3.5 text-accent" />
            <span>Return to Top</span>
          </div>
          <span className="text-[8px] font-mono text-muted">TOP</span>
        </button>
      </div>

      {/* Active Toast Bar / Footer Readout */}
      <div className="border-t border-line bg-surface2 px-3 py-1.5 font-mono text-[9px] flex items-center justify-between">
        {toastMessage ? (
          <div className="flex items-center gap-1.5 text-accent font-bold animate-pulse">
            <IconCheck className="w-3 h-3" />
            <span>{toastMessage}</span>
          </div>
        ) : (
          <div className="text-muted flex items-center justify-between w-full">
            <span>SHIFT+RCLICK FOR NATIVE</span>
            <span className="text-accent font-bold">SYS.26</span>
          </div>
        )}
      </div>
    </div>
  );
}
