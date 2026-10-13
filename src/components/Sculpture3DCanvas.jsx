import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Sculpture3DCanvas
 * Monumental Free-Standing 3D Classical Sculpture Stage (Unboxed).
 * 
 * Features:
 * 1. Freestanding, unboxed design: No constraining borders or card boxes holding the statue.
 * 2. Big & Long Monumental Sculpture Bust: Towering high-resolution Greek marble bust with golden kintsugi seams.
 * 3. Monumental Typography Layered BEHIND the sculpture: Big classical gold-stroke lettering spanning wide.
 * 4. Butter-smooth multi-layer 3D perspective mouse parallax (differential z-depth).
 * 5. Dynamic auric specular glint sweep across golden kintsugi seams.
 * 6. Interactive modes: Classical Realism, Auric Radiance Glow, and 3D Cyber Mesh.
 * 
 * Strict Zero-Emoji Policy: No Unicode emojis anywhere; crisp inline SVGs only.
 */

export default function Sculpture3DCanvas({
  src,
  alt = '3D Classical Sculpture',
  plate,
  maxim,
  className = '',
  onPlaySound,
}) {
  const containerRef = useRef(null);

  // Render Modes: 0 = Realism, 1 = Auric Glow, 2 = 3D Mesh
  const [renderMode, setRenderMode] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Rotation & Light State
  const [displayYaw, setDisplayYaw] = useState(0);
  const [displayPitch, setDisplayPitch] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });

  // Physics / Lerp interpolation
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);
  const currentYaw = useRef(0);
  const currentPitch = useRef(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  // Determine dynamic inscriptions based on plate & maxim
  const plateId = plate?.id || 'kintsugi';
  const primaryTitle =
    plateId === 'kintsugi'
      ? 'K I N T S U G I'
      : plateId === 'frontal'
      ? 'E P I C U R U S'
      : plateId === 'profile'
      ? 'A T A R A X I A'
      : 'C H R Y S I P P O S';

  const greekEpigraph =
    plate?.inscription || maxim?.greek || 'ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ';

  const secondaryTag =
    plateId === 'kintsugi'
      ? 'PENTELIC MARBLE · AURIC SEAMS · NOBLE RESILIENCE'
      : plateId === 'frontal'
      ? 'MET MUSEUM ACC. 11.90 · DELPHIC MAXIM'
      : plateId === 'profile'
      ? 'HELLENISTIC STUDY · ATARAXIA & METRON'
      : 'MET MUSEUM ACC. 24.243 · FORMAL LOGIC';

  // Smooth animation loop using lerp
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const ease = 0.085;
      currentYaw.current += (targetYaw.current - currentYaw.current) * ease;
      currentPitch.current += (targetPitch.current - currentPitch.current) * ease;

      setDisplayYaw(Math.round(currentYaw.current * 25));
      setDisplayPitch(Math.round(currentPitch.current * 20));

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Mouse interaction
  // Mouse interaction: Only rotate when deliberately dragging with mouse pressed down.
  // The statue remains completely static and calm on hover.
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;

    if (isDragging) {
      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = (e.clientX - dragStart.current.x) / rect.width;
      const deltaY = (e.clientY - dragStart.current.y) / rect.height;
      targetYaw.current = Math.max(-1.2, Math.min(1.2, targetYaw.current + deltaX * 1.5));
      targetPitch.current = Math.max(-1.0, Math.min(1.0, targetPitch.current - deltaY * 1.5));
      dragStart.current = { x: e.clientX, y: e.clientY };

      setSpotlight({
        x: Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)),
        y: Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100)),
      });
    }
  }, [isDragging]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    onPlaySound?.('switch');
  }, [onPlaySound]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsDragging(false);
    // Return smoothly to stable center position (no hover drift)
    targetYaw.current = 0;
    targetPitch.current = 0;
    setSpotlight({ x: 50, y: 40 });
  }, []);

  const handleReset = useCallback((e) => {
    e.stopPropagation();
    onPlaySound?.('switch');
    targetYaw.current = 0;
    targetPitch.current = 0;
    setSpotlight({ x: 50, y: 40 });
  }, [onPlaySound]);

  const handleSwitchMode = useCallback((modeIdx) => {
    onPlaySound?.('keycap');
    setRenderMode(modeIdx);
  }, [onPlaySound]);

  // Derived 3D transform values
  const yaw = currentYaw.current;
  const pitch = currentPitch.current;

  // Layer 1: Background Text Parallax (moves opposite / deeper in z)
  const bgTextTransform = `translate3d(${yaw * -20}px, ${pitch * 16}px, -50px) scale(0.97)`;

  // Layer 2: Foreground Statue Parallax (moves forward and tilts toward cursor)
  const statueTransform = `perspective(1200px) rotateX(${-pitch * 15}deg) rotateY(${yaw * 18}deg) translate3d(${yaw * 28}px, ${-pitch * 18}px, 40px) scale(1.03)`;

  // Layer 3: Dynamic specular glint coordinates
  const glintX = Math.round(spotlight.x);
  const glintY = Math.round(spotlight.y);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full flex flex-col items-center justify-center select-none ${isDragging ? 'cursor-grabbing' : 'cursor-default'} ${className}`}
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      title="Classical Greek marble bust with golden kintsugi seams"
    >
      {/* 1. Ambient Gallery Dark Illumination & Chiaroscuro Spotlight (Unboxed) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(ellipse 95% 85% at ${spotlight.x}% ${spotlight.y}%, 
              ${renderMode === 1 ? 'rgba(212, 165, 40, 0.22)' : 'rgba(212, 165, 40, 0.14)'} 0%, 
              rgba(212, 165, 40, 0.03) 50%, 
              transparent 85%
            )
          `,
        }}
      />

      {/* Rotating Delphic Celestial Orbit Rings (Unbounded Space) */}
      <div
        aria-hidden="true"
        className="delphic-ring-spin pointer-events-none absolute w-[580px] h-[580px] sm:w-[680px] sm:h-[680px] lg:w-[780px] lg:h-[780px] rounded-full border border-[var(--ms-bronze)]/15 border-dashed z-0"
        style={{
          transform: `translate3d(${yaw * -10}px, ${pitch * 10}px, -70px)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] lg:w-[580px] lg:h-[580px] rounded-full border border-[var(--ms-bronze)]/10 z-0"
        style={{
          transform: `translate3d(${yaw * -14}px, ${pitch * 12}px, -60px)`,
        }}
      />

      {/* 2. LAYER 1: MONUMENTAL TEXT LAYERED BEHIND THE STATUE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between pt-6 sm:pt-10 pb-16 sm:pb-20 px-2 z-10 transition-transform duration-75 ease-out select-none"
        style={{
          transform: bgTextTransform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Giant Monolithic Title (e.g. K I N T S U G I) behind head & hair curls */}
        <div
          className="font-classical font-black text-center whitespace-nowrap tracking-[0.28em] sm:tracking-[0.40em] leading-none transition-all duration-300"
          style={{
            fontSize: 'clamp(4.2rem, 12vw, 8.8rem)',
            WebkitTextStroke: renderMode === 1 ? '1.8px rgba(250, 204, 21, 0.92)' : '1.5px rgba(212, 165, 40, 0.72)',
            color: renderMode === 1 ? 'rgba(250, 204, 21, 0.22)' : 'rgba(212, 165, 40, 0.12)',
            textShadow: renderMode === 1 
              ? '0 0 50px rgba(250, 204, 21, 0.5), 0 0 100px rgba(212, 165, 40, 0.25)' 
              : '0 0 40px rgba(212, 165, 40, 0.35)',
          }}
        >
          {primaryTitle}
        </div>

        {/* Monumental Classical Greek Epigraph behind neck & torso */}
        <div
          lang="el"
          className="font-classical italic font-semibold text-center whitespace-nowrap tracking-[0.18em] sm:tracking-[0.28em] transition-all duration-300"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 5.6rem)',
            WebkitTextStroke: renderMode === 1 ? '1.6px rgba(250, 204, 21, 0.80)' : '1.4px rgba(220, 185, 75, 0.62)',
            color: renderMode === 1 ? 'rgba(250, 204, 21, 0.18)' : 'rgba(220, 185, 75, 0.12)',
            textShadow: '0 0 35px rgba(212, 165, 40, 0.30)',
          }}
        >
          {greekEpigraph}
        </div>

        {/* Archival Specimen Attribution Watermark */}
        <div className="font-mono text-[9.5px] sm:text-[11px] tracking-[0.32em] text-[var(--ms-bronze)]/50 uppercase">
          {secondaryTag}
        </div>
      </div>

      {/* 3. LAYER 2: BIG & TALL FOREGROUND STATUE IN FRONT OF THE MONUMENTAL TEXT */}
      <div
        className="relative w-full h-full flex items-center justify-center z-20 transition-transform duration-75 ease-out pointer-events-none"
        style={{
          transform: statueTransform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Towering Freestanding Sculpture Cutout Bust */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="w-auto h-[460px] sm:h-[580px] lg:h-[760px] xl:h-[840px] max-h-[88vh] max-w-[98%] object-contain drop-shadow-[0_35px_70px_rgba(0,0,0,0.98)] transition-all duration-300"
          style={{
            filter: renderMode === 1
              ? 'drop-shadow(0 35px 75px rgba(0,0,0,0.98)) drop-shadow(0 0 60px rgba(245,195,45,0.55)) contrast(1.1)'
              : renderMode === 2
              ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.95)) drop-shadow(0 0 40px rgba(56,189,248,0.4)) hue-rotate(20deg)'
              : 'drop-shadow(0 30px 65px rgba(0,0,0,0.96)) drop-shadow(0 0 40px rgba(212,165,40,0.32))',
          }}
        />

        {/* Mode 1: Auric Specular Light Glint Sweep across Golden Seams */}
        {renderMode === 1 && (
          <div
            className="pointer-events-none absolute inset-0 mix-blend-color-dodge transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 260px at ${glintX}% ${glintY}%, rgba(255, 235, 150, 0.5) 0%, rgba(212, 165, 40, 0.2) 45%, transparent 75%)`,
            }}
          />
        )}

        {/* Mode 2: 3D Holographic Wireframe Grid Topology */}
        {renderMode === 2 && (
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen bg-[linear-gradient(rgba(56,189,248,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.25)_1px,transparent_1px)] bg-[size:20px_20px]"
            style={{
              maskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 85%)',
            }}
          />
        )}
      </div>

      {/* 4. Top Floating Minimalist 3D Status */}
      <div className="absolute top-2 inset-x-0 px-2 flex items-center justify-between gap-2 pointer-events-none z-30 font-mono text-[9.5px]">
        <div className="flex items-center gap-2 bg-[#06080e]/75 backdrop-blur-sm border border-[var(--ms-rule)] px-2.5 py-1 rounded-full">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a528] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4a528]" />
          </span>
          <span className="text-ink font-bold tracking-wider">
            3D VOLUMETRIC SCULPTURE
          </span>
          <span className="text-muted hidden sm:inline">
            // FREESTANDING
          </span>
        </div>

        <div className="text-[9px] text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 px-2.5 py-1 rounded-full font-bold tracking-wider backdrop-blur-sm">
          REAL-TIME 3D ACTIVE
        </div>
      </div>

      {/* 5. Floating Bottom Minimalist Telemetry & Mode Deck */}
      <div className="absolute bottom-2 z-30 flex flex-wrap items-center justify-center gap-2 font-mono text-[9.5px]">
        <div className="flex items-center gap-2 bg-[#06080e]/90 backdrop-blur-md border border-[var(--ms-rule)] px-3 py-1.5 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.85)]">
          {/* Real-time Rotation Readout */}
          <div className="flex items-center gap-2 text-muted pr-2 border-r border-[var(--ms-rule)]">
            <span className="text-accent font-semibold">
              YAW: {displayYaw >= 0 ? `+${displayYaw}` : displayYaw}°
            </span>
            <span>·</span>
            <span className="text-[#38bdf8] font-semibold">
              PITCH: {displayPitch >= 0 ? `+${displayPitch}` : displayPitch}°
            </span>
          </div>

          {/* 3D Mode Selector Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSwitchMode(0);
              }}
              className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${
                renderMode === 0
                  ? 'border border-[var(--ms-bronze)] bg-[var(--ms-bronze)] text-[#08080a]'
                  : 'border border-transparent text-muted hover:text-ink'
              }`}
            >
              REALISM
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSwitchMode(1);
              }}
              className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${
                renderMode === 1
                  ? 'border border-[#facc15] bg-[#facc15] text-[#08080a]'
                  : 'border border-transparent text-muted hover:text-ink'
              }`}
            >
              AURIC GLOW
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSwitchMode(2);
              }}
              className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${
                renderMode === 2
                  ? 'border border-[#38bdf8] bg-[#38bdf8] text-[#08080a]'
                  : 'border border-transparent text-muted hover:text-ink'
              }`}
            >
              3D MESH
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-2 py-0.5 rounded-full border border-lineSoft text-muted hover:text-accent hover:border-accent text-[9px] transition-colors ml-1"
              title="Reset 3D camera angle to center"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
