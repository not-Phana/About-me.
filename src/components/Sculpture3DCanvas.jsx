import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Sculpture3DCanvas
 * Pure Editorial Classical Sculpture Stage (Unboxed & Clean).
 * 
 * Features:
 * 1. Freestanding, unboxed composition with zero UI clutter or tacky debug pills.
 * 2. Big & Tall Monumental Sculpture Bust with luminous golden kintsugi seams.
 * 3. Monumental Typography Layered BEHIND the sculpture (K I N T S U G I / ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ).
 * 4. Rotating Delphic celestial orbit rings in open space.
 * 5. Calm and stable presentation on hover with smooth optional click-and-drag rotation.
 * 
 * Strict Zero-Emoji Policy: No Unicode emojis anywhere; crisp inline SVGs only.
 */

export default function Sculpture3DCanvas({
  src,
  alt = 'Classical Greek Sculpture',
  plate,
  maxim,
  className = '',
  onPlaySound,
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });

  // Physics / Lerp interpolation
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);
  const currentYaw = useRef(0);
  const currentPitch = useRef(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const animFrameId = useRef(null);

  // Inscription text based on plate & maxim
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

  // Smooth lerp interpolation for optional drag
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const ease = 0.085;
      currentYaw.current += (targetYaw.current - currentYaw.current) * ease;
      currentPitch.current += (targetPitch.current - currentPitch.current) * ease;

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Mouse interaction: Only moves when deliberately dragging; completely static on hover
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || !isDragging) return;

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
  }, [isDragging]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    onPlaySound?.('switch');
  }, [onPlaySound]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    targetYaw.current = 0;
    targetPitch.current = 0;
    setSpotlight({ x: 50, y: 40 });
  }, []);

  const yaw = currentYaw.current;
  const pitch = currentPitch.current;

  // Layer 1: Background Text Parallax
  const bgTextTransform = `translate3d(${yaw * -20}px, ${pitch * 16}px, -50px) scale(0.97)`;

  // Layer 2: Foreground Statue Parallax
  const statueTransform = `perspective(1200px) rotateX(${-pitch * 15}deg) rotateY(${yaw * 18}deg) translate3d(${yaw * 28}px, ${-pitch * 18}px, 40px) scale(1.03)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full flex flex-col items-center justify-center select-none ${isDragging ? 'cursor-grabbing' : 'cursor-default'} ${className}`}
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      title="Classical Greek marble bust with golden kintsugi seams"
    >
      {/* 1. Ambient Gallery Dark Illumination & Chiaroscuro Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(ellipse 95% 85% at ${spotlight.x}% ${spotlight.y}%, 
              rgba(212, 165, 40, 0.16) 0%, 
              rgba(212, 165, 40, 0.03) 50%, 
              transparent 85%
            )
          `,
        }}
      />

      {/* Rotating Delphic Celestial Orbit Rings in open space */}
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
            WebkitTextStroke: '1.5px rgba(212, 165, 40, 0.72)',
            color: 'rgba(212, 165, 40, 0.12)',
            textShadow: '0 0 40px rgba(212, 165, 40, 0.35)',
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
            WebkitTextStroke: '1.4px rgba(220, 185, 75, 0.62)',
            color: 'rgba(220, 185, 75, 0.12)',
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
          className="w-auto h-[460px] sm:h-[580px] lg:h-[760px] xl:h-[840px] max-h-[88vh] max-w-[98%] object-contain drop-shadow-[0_35px_70px_rgba(0,0,0,0.98)] drop-shadow-[0_0_45px_rgba(212,165,40,0.32)] transition-all duration-300"
        />
      </div>
    </div>
  );
}
