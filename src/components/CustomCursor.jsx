import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor Component
 * Modern high-performance dual-layer custom cursor:
 * - Ultra-fast glowing center dot with zero latency.
 * - Smooth lerp-interpolated lagging follower ring.
 * - Contextual shape morphing for buttons/links (expands ring) and text inputs (morphs into vertical I-beam).
 * - Click feedback (tactile snap scale).
 * - Graceful fallback on touchscreens.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only enable on desktop devices that support hover & fine pointer
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    document.body.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId = null;
    let isHidden = true;

    // Linear interpolation factor (0.16 = fluid silky lag)
    const LERP_FACTOR = 0.16;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (isHidden) {
        isHidden = false;
        document.body.classList.remove('cursor-hidden');
      }

      // Fast zero-latency dot tracking
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const updateRingPhysics = () => {
      ringX += (mouseX - ringX) * LERP_FACTOR;
      ringY += (mouseY - ringY) * LERP_FACTOR;

      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animId = requestAnimationFrame(updateRingPhysics);
    };

    animId = requestAnimationFrame(updateRingPhysics);

    // Event delegation for contextual shape morphing
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      if (
        target.closest(
          'input[type="text"], input[type="email"], input[type="search"], textarea, [contenteditable="true"]'
        )
      ) {
        document.body.classList.remove('cursor-hover');
        document.body.classList.add('cursor-text');
      } else if (
        target.closest(
          'button, a, [role="button"], [role="tab"], .pk-keycap, .spotlight-card, [tabindex="0"], .cursor-pointer'
        )
      ) {
        document.body.classList.remove('cursor-text');
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover', 'cursor-text');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.add('cursor-active');
    };

    const handleMouseUp = () => {
      document.body.classList.remove('cursor-active');
    };

    const handleMouseLeave = () => {
      isHidden = true;
      document.body.classList.add('cursor-hidden');
    };

    const handleMouseEnter = () => {
      isHidden = false;
      document.body.classList.remove('cursor-hidden');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove(
        'has-custom-cursor',
        'cursor-hover',
        'cursor-text',
        'cursor-active',
        'cursor-hidden'
      );
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
