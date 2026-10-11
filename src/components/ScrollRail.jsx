import React, { useState, useEffect, useRef, useCallback } from 'react';

const SECTIONS = [
  { id: 'home', code: '01', label: 'HOME' },
  { id: 'about', code: '02', label: 'BIO' },
  { id: 'projects', code: '03', label: 'WORK' },
  { id: 'console', code: '04', label: 'TERM' },
  { id: 'github', code: '05', label: 'GIT' },
  { id: 'building', code: '06', label: 'LAB' },
  { id: 'journey', code: '07', label: 'LOG' },
  { id: 'contact', code: '08', label: 'MSG' },
];

export default function ScrollRail({
  isDetailView,
  onNavigateHome,
  onPlaySound,
}) {
  const [scrollStats, setScrollStats] = useState({
    progress: 0,
    scrollY: 0,
    activeId: 'home',
  });
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  const updateScroll = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    let currentActive = 'home';
    if (!isDetailView) {
      const triggerLine = scrollY + window.innerHeight * 0.32;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= triggerLine) {
          currentActive = sec.id;
        }
      }
    }

    setScrollStats({
      progress,
      scrollY: Math.round(scrollY),
      activeId: currentActive,
    });
  }, [isDetailView]);

  useEffect(() => {
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [updateScroll]);

  const scrubToClientY = useCallback((clientY) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    window.scrollTo({
      top: ratio * maxScroll,
      behavior: 'auto',
    });
  }, []);

  useEffect(() => {
    if (!isDragging) return undefined;

    const handlePointerMove = (e) => {
      scrubToClientY(e.clientY);
    };
    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, scrubToClientY]);

  const percentText = String(Math.round(scrollStats.progress * 100)).padStart(
    3,
    '0'
  );
  const coordText = String(scrollStats.scrollY).padStart(4, '0');

  return (
    <>
      {/* Top Architectural Scroll Laser Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-accent transition-transform duration-75 ease-out origin-left"
          style={{ transform: `scaleX(${scrollStats.progress})` }}
        />
      </div>

      {/* Right-Edge Studio HUD Scroll Telemetry & Interactive Scrubber Rail */}
      <aside
        aria-label="Page scroll telemetry and section navigation rail"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-2 select-none"
      >
        <div className="bg-surface/90 backdrop-blur-md border border-line rounded-sm p-2 shadow-card flex flex-col items-center gap-2">
          {/* Telemetry Readout Header */}
          <div className="w-full pb-1.5 border-b border-line flex flex-col items-center text-center">
            <span className="font-mono text-[10px] font-semibold text-accent tracking-wider leading-none">
              {percentText}%
            </span>
            <span className="font-mono text-[9px] text-muted tracking-tighter mt-1 leading-none">
              Y:{coordText}
            </span>
          </div>

          {/* Interactive Section Waypoints & Vertical Fader Scrubber */}
          <div className="flex items-stretch gap-2 py-1">
            {!isDetailView && (
              <div className="flex flex-col justify-between py-0.5">
                {SECTIONS.map((sec) => {
                  const isActive = scrollStats.activeId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => {
                        if (onPlaySound) onPlaySound('switch');
                        onNavigateHome(sec.id);
                      }}
                      title={`Jump to ${sec.label} (${sec.code})`}
                      className={`group flex items-center justify-end gap-1.5 px-1 py-0.5 rounded-sm transition-colors text-right ${
                        isActive
                          ? 'text-accent bg-accentDim'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      <span className="font-mono text-[9px] tracking-widest uppercase">
                        {sec.label}
                      </span>
                      <span
                        className={`w-1.5 h-[2px] transition-all ${
                          isActive
                            ? 'w-2.5 bg-accent'
                            : 'bg-line group-hover:bg-ink'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Draggable Hardware Fader Track */}
            <div
              ref={trackRef}
              onPointerDown={(e) => {
                if (onPlaySound) onPlaySound('key');
                setIsDragging(true);
                scrubToClientY(e.clientY);
              }}
              role="slider"
              aria-label="Vertical scroll scrubber"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(scrollStats.progress * 100)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                  e.preventDefault();
                  window.scrollBy({ top: 320, behavior: 'smooth' });
                } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                  e.preventDefault();
                  window.scrollBy({ top: -320, behavior: 'smooth' });
                } else if (e.key === 'Home') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (e.key === 'End') {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                  });
                }
              }}
              className="relative w-3 h-48 bg-bg border border-line rounded-sm cursor-ns-resize overflow-hidden flex flex-col justify-between p-[2px]"
              title="Click or drag to scrub page"
            >
              {/* Micro ruler ticks inside track */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to bottom, transparent 0px, transparent 7px, var(--line) 7px, var(--line) 8px)',
                }}
              />

              {/* Active progress fill bar */}
              <div
                className="w-full bg-accentDim border-b border-accent transition-all duration-75 pointer-events-none"
                style={{
                  height: `${Math.max(6, scrollStats.progress * 100)}%`,
                }}
              />

              {/* Precision Fader Thumb */}
              <div
                className="absolute left-0 right-0 h-3 bg-accent border border-invertBg rounded-[1px] pointer-events-none transition-transform duration-75"
                style={{
                  top: `calc(${scrollStats.progress * 100}% - ${
                    scrollStats.progress * 12
                  }px)`,
                }}
              />
            </div>
          </div>

          {/* Return to Top Trigger */}
          <button
            type="button"
            onClick={() => {
              if (onPlaySound) onPlaySound('switch');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={scrollStats.scrollY < 120}
            className={`w-full pt-1.5 border-t border-line flex items-center justify-center gap-1 font-mono text-[9px] uppercase tracking-wider transition-colors ${
              scrollStats.scrollY >= 120
                ? 'text-ink hover:text-accent cursor-pointer'
                : 'text-muted/40 cursor-not-allowed'
            }`}
            title="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
              <path d="M6 6h12" />
            </svg>
            <span>TOP</span>
          </button>
        </div>
      </aside>
    </>
  );
}
