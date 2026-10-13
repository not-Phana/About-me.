import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Sculpture3DCanvas
 * Monumental 3D Interactive Exhibition Stage.
 * 
 * Features:
 * 1. Deep luxury dark museum gallery background with dynamic chiaroscuro spotlight.
 * 2. Monumental Greek & Latin architectural typography layered BEHIND the sculpture.
 * 3. High-resolution golden Kintsugi marble bust in the FOREGROUND, occluding the letters.
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

      // Lerp smoothing factor
      const ease = 0.085;
      currentYaw.current += (targetYaw.current - currentYaw.current) * ease;
      currentPitch.current += (targetPitch.current - currentPitch.current) * ease;

      // Update state for UI telemetry
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
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

    if (isDragging) {
      const deltaX = (e.clientX - dragStart.current.x) / rect.width;
      const deltaY = (e.clientY - dragStart.current.y) / rect.height;
      targetYaw.current = Math.max(-1.2, Math.min(1.2, targetYaw.current + deltaX * 1.5));
      targetPitch.current = Math.max(-1.0, Math.min(1.0, targetPitch.current - deltaY * 1.5));
      dragStart.current = { x: e.clientX, y: e.clientY };
    } else {
      // Gentle tracking when hovering
      targetYaw.current = Math.max(-1, Math.min(1, nx * 0.85));
      targetPitch.current = Math.max(-1, Math.min(1, ny * 0.75));
    }

    setSpotlight({
      x: Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(10, Math.min(90, ((e.clientY - rect.top) / rect.height) * 100)),
    });
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
    // Smoothly return towards resting center
    targetYaw.current = 0.08;
    targetPitch.current = -0.05;
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
  const bgTextTransform = `translate3d(${yaw * -18}px, ${pitch * 14}px, -45px) scale(0.96)`;

  // Layer 2: Foreground Statue Parallax (moves forward and tilts toward cursor)
  const statueTransform = `perspective(1000px) rotateX(${-pitch * 16}deg) rotateY(${yaw * 20}deg) translate3d(${yaw * 24}px, ${-pitch * 16}px, 35px) scale(1.02)`;

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
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing overflow-hidden border border-[var(--ms-rule-strong)] bg-[#05070a] shadow-[0_30px_70px_rgba(0,0,0,0.95)] ${className}`}
      style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      title="Click and drag to rotate the statue in 3D, or move cursor to track dynamic lighting"
    >
      {/* 1. Deep Dark Gallery Background & Ambient Chiaroscuro Lighting */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(ellipse 90% 80% at ${spotlight.x}% ${spotlight.y}%, 
              ${renderMode === 1 ? 'rgba(212, 165, 40, 0.28)' : 'rgba(212, 165, 40, 0.16)'} 0%, 
              rgba(212, 165, 40, 0.04) 50%, 
              rgba(5, 7, 10, 0.98) 85%
            ),
            radial-gradient(circle at 50% 90%, rgba(10, 15, 25, 0.9) 0%, #05070a 100%)
          `,
        }}
      />

      {/* Subtle Museum Archival Grid Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#d4a528_1px,transparent_1px),linear-gradient(to_bottom,#d4a528_1px,transparent_1px)] bg-[size:32px_32px]"
      />

      {/* Rotating Delphic Celestial Orbit Rings */}
      <div
        aria-hidden="true"
        className="delphic-ring-spin pointer-events-none absolute -inset-10 rounded-full border border-[var(--ms-bronze)]/15 border-dashed z-0"
        style={{
          transform: `translate3d(${yaw * -8}px, ${pitch * 8}px, -60px)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-12 rounded-full border border-[var(--ms-bronze)]/10 z-0"
        style={{
          transform: `translate3d(${yaw * -12}px, ${pitch * 10}px, -50px)`,
        }}
      />

      {/* 2. LAYER 1: MONUMENTAL TEXT LAYERED BEHIND THE STATUE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between pt-12 pb-14 px-4 z-10 overflow-hidden transition-transform duration-75 ease-out select-none"
        style={{
          transform: bgTextTransform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Giant Monolithic Title (e.g. K I N T S U G I) behind head & hair curls */}
        <div
          className="font-classical font-black text-center whitespace-nowrap tracking-[0.24em] sm:tracking-[0.34em] leading-none transition-all duration-300"
          style={{
            fontSize: 'clamp(3.6rem, 10.5vw, 6.2rem)',
            WebkitTextStroke: renderMode === 1 ? '1.8px rgba(250, 204, 21, 0.92)' : '1.5px rgba(212, 165, 40, 0.72)',
            color: renderMode === 1 ? 'rgba(250, 204, 21, 0.22)' : 'rgba(212, 165, 40, 0.12)',
            textShadow: renderMode === 1 
              ? '0 0 45px rgba(250, 204, 21, 0.5), 0 0 90px rgba(212, 165, 40, 0.25)' 
              : '0 0 35px rgba(212, 165, 40, 0.35)',
          }}
        >
          {primaryTitle}
        </div>

        {/* Monumental Classical Greek Epigraph behind neck & shoulders */}
        <div
          lang="el"
          className="font-classical italic font-semibold text-center whitespace-nowrap tracking-[0.16em] sm:tracking-[0.24em] transition-all duration-300"
          style={{
            fontSize: 'clamp(2.4rem, 7vw, 4.4rem)',
            WebkitTextStroke: renderMode === 1 ? '1.5px rgba(250, 204, 21, 0.75)' : '1.3px rgba(220, 185, 75, 0.58)',
            color: renderMode === 1 ? 'rgba(250, 204, 21, 0.16)' : 'rgba(220, 185, 75, 0.10)',
            textShadow: '0 0 28px rgba(212, 165, 40, 0.28)',
          }}
        >
          {greekEpigraph}
        </div>

        {/* Archival Specimen Attribution Watermark */}
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.26em] text-[var(--ms-bronze)]/45 uppercase">
          {secondaryTag}
        </div>
      </div>

      {/* 3. LAYER 2: FOREGROUND STATUE IN FRONT OF THE MONUMENTAL TEXT */}
      <div
        className="relative w-full h-full flex items-center justify-center z-20 transition-transform duration-75 ease-out pointer-events-none"
        style={{
          transform: statueTransform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Full Sculpture Cutout Bust */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="w-auto h-[90%] sm:h-[94%] max-w-[96%] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.98)] transition-all duration-300"
          style={{
            filter: renderMode === 1
              ? 'drop-shadow(0 25px 50px rgba(0,0,0,0.98)) drop-shadow(0 0 50px rgba(245,195,45,0.5)) contrast(1.08)'
              : renderMode === 2
              ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.95)) drop-shadow(0 0 30px rgba(56,189,248,0.35)) hue-rotate(20deg)'
              : 'drop-shadow(0 22px 45px rgba(0,0,0,0.95)) drop-shadow(0 0 30px rgba(212,165,40,0.28))',
          }}
        />

        {/* Mode 1: Auric Specular Light Glint Sweep across Golden Seams */}
        {renderMode === 1 && (
          <div
            className="pointer-events-none absolute inset-0 mix-blend-color-dodge transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 220px at ${glintX}% ${glintY}%, rgba(255, 235, 150, 0.45) 0%, rgba(212, 165, 40, 0.15) 45%, transparent 75%)`,
            }}
          />
        )}

        {/* Mode 2: 3D Holographic Wireframe Grid Topology */}
        {renderMode === 2 && (
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen bg-[linear-gradient(rgba(56,189,248,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.25)_1px,transparent_1px)] bg-[size:18px_18px]"
            style={{
              maskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 85%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 50%, transparent 85%)',
            }}
          />
        )}
      </div>

      {/* 4. Top 3D HUD Navigation Bar */}
      <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-[#05070a]/95 via-[#05070a]/70 to-transparent flex items-center justify-between gap-2 pointer-events-none z-30 font-mono text-[9.5px]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4a528] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4a528]" />
          </span>
          <span className="text-ink font-bold tracking-wider">
            3D DEPTH STAGE
          </span>
          <span className="text-muted hidden sm:inline">
            // PARALLAX OCCLUSION
          </span>
        </div>

        <div className="text-[9px] text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 px-2 py-0.5 font-bold tracking-wider">
          REAL-TIME 3D ACTIVE
        </div>
      </div>

      {/* 4 Golden Architectural Corner Brackets */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[var(--ms-bronze)] pointer-events-none z-30" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[var(--ms-bronze)] pointer-events-none z-30" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[var(--ms-bronze)] pointer-events-none z-30" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[var(--ms-bronze)] pointer-events-none z-30" />

      {/* 5. Bottom 3D Telemetry Controls & Render Mode Deck */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#05070a]/98 via-[#05070a]/80 to-transparent flex flex-wrap items-center justify-between gap-2 z-30 font-mono text-[9.5px]">
        {/* Real-time Rotation Readout */}
        <div className="flex items-center gap-2 text-muted">
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
            className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
              renderMode === 0
                ? 'border-[var(--ms-bronze)] bg-[var(--ms-bronze)] text-[#08080a]'
                : 'border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-ink'
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
            className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
              renderMode === 1
                ? 'border-[#facc15] bg-[#facc15] text-[#08080a]'
                : 'border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-ink'
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
            className={`px-2 py-0.5 border text-[9px] font-bold transition-all ${
              renderMode === 2
                ? 'border-[#38bdf8] bg-[#38bdf8] text-[#08080a]'
                : 'border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-ink'
            }`}
          >
            3D MESH
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-2 py-0.5 border border-lineSoft bg-[#0a0d14]/80 text-muted hover:text-accent hover:border-accent text-[9px] transition-colors ml-1"
            title="Reset 3D camera angle to center"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
