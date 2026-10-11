import { useEffect } from 'react';

/**
 * useBackgroundTextMotion
 * High-performance 60+ FPS kinetic motion engine for all background typography.
 * Implements:
 * 1. Smooth mouse parallax with inertial spring/lerp (multi-plane depth).
 * 2. Scroll-driven vertical and horizontal glide.
 * 3. Continuous organic floating oscillation (sinusoidal waves).
 * 4. Zero layout thrashing: uses transform3d with will-change.
 */
const MOTION_PRESETS = {
  'hero-name-1': {
    mouseX: -0.045,
    mouseY: -0.035,
    scrollFactor: 0.12,
    floatAmpX: 20,
    floatAmpY: 15,
    floatSpeed: 0.0009,
    rotAmp: 0.8,
    phase: 0,
  },
  'hero-name-2': {
    mouseX: 0.038,
    mouseY: 0.042,
    scrollFactor: -0.1,
    floatAmpX: -18,
    floatAmpY: -16,
    floatSpeed: 0.0011,
    rotAmp: -0.7,
    phase: 1.5,
  },
  'hero-epigraph': {
    mouseX: -0.02,
    mouseY: -0.015,
    scrollFactor: 0.06,
    floatAmpX: 12,
    floatAmpY: 9,
    floatSpeed: 0.0008,
    rotAmp: 0.4,
    phase: 0.8,
  },
  'hero-greek': {
    mouseX: 0.025,
    mouseY: -0.02,
    scrollFactor: -0.05,
    floatAmpX: -14,
    floatAmpY: 10,
    floatSpeed: 0.0012,
    rotAmp: -0.5,
    phase: 2.3,
  },
  'about-epigraph-1': {
    mouseX: 0.048,
    mouseY: -0.038,
    scrollFactor: 0.15,
    floatAmpX: 22,
    floatAmpY: -18,
    floatSpeed: 0.0007,
    rotAmp: 1.0,
    phase: 1.2,
  },
  'about-epigraph-2': {
    mouseX: -0.042,
    mouseY: 0.038,
    scrollFactor: -0.14,
    floatAmpX: -20,
    floatAmpY: 17,
    floatSpeed: 0.0009,
    rotAmp: -0.8,
    phase: 3.1,
  },
  'about-know-thyself': {
    mouseX: 0.03,
    mouseY: 0.03,
    scrollFactor: 0.08,
    floatAmpX: 15,
    floatAmpY: 13,
    floatSpeed: 0.0008,
    rotAmp: 0.5,
    phase: 0.5,
  },
  'rune-1': {
    mouseX: -0.065,
    mouseY: -0.055,
    scrollFactor: 0.22,
    floatAmpX: 24,
    floatAmpY: 22,
    floatSpeed: 0.0014,
    rotAmp: 3.5,
    phase: 0.2,
  },
  'rune-2': {
    mouseX: 0.06,
    mouseY: 0.065,
    scrollFactor: -0.2,
    floatAmpX: -22,
    floatAmpY: 20,
    floatSpeed: 0.0013,
    rotAmp: -3.0,
    phase: 1.8,
  },
  'rune-3': {
    mouseX: -0.055,
    mouseY: 0.06,
    scrollFactor: 0.24,
    floatAmpX: 20,
    floatAmpY: -24,
    floatSpeed: 0.0015,
    rotAmp: 4.0,
    phase: 2.9,
  },
  'projects-watermark': {
    mouseX: -0.038,
    mouseY: 0.032,
    scrollFactor: 0.14,
    floatAmpX: 18,
    floatAmpY: -15,
    floatSpeed: 0.0008,
    rotAmp: -0.6,
    phase: 0.7,
  },
  'console-watermark': {
    mouseX: 0.036,
    mouseY: -0.032,
    scrollFactor: -0.13,
    floatAmpX: -17,
    floatAmpY: 17,
    floatSpeed: 0.0009,
    rotAmp: 0.7,
    phase: 2.1,
  },
  'github-watermark': {
    mouseX: -0.042,
    mouseY: 0.036,
    scrollFactor: 0.15,
    floatAmpX: 19,
    floatAmpY: -16,
    floatSpeed: 0.0008,
    rotAmp: -0.8,
    phase: 1.4,
  },
  'building-watermark': {
    mouseX: 0.04,
    mouseY: -0.034,
    scrollFactor: -0.14,
    floatAmpX: -17,
    floatAmpY: 15,
    floatSpeed: 0.0009,
    rotAmp: 0.6,
    phase: 3.0,
  },
  'journey-watermark': {
    mouseX: -0.038,
    mouseY: 0.036,
    scrollFactor: 0.15,
    floatAmpX: 16,
    floatAmpY: -17,
    floatSpeed: 0.0008,
    rotAmp: -0.7,
    phase: 0.9,
  },
  'contact-watermark': {
    mouseX: 0.042,
    mouseY: -0.038,
    scrollFactor: -0.15,
    floatAmpX: -19,
    floatAmpY: 16,
    floatSpeed: 0.0009,
    rotAmp: 0.8,
    phase: 2.5,
  },
};

export function useBackgroundTextMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cache elements and their configurations
    let elements = [];
    const scanElements = () => {
      elements = Array.from(document.querySelectorAll('[data-bg-motion]')).map((el) => {
        el.style.willChange = 'transform';
        const motionKey = el.getAttribute('data-bg-motion') || 'hero-name-1';
        const config = MOTION_PRESETS[motionKey] || MOTION_PRESETS['hero-name-1'];
        return { el, config };
      });
    };

    scanElements();

    const observer = new MutationObserver(() => {
      scanElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let currentScrollY = window.scrollY;
    let animId = null;

    const handleMouseMove = (e) => {
      // Normalize mouse to center (-1 to 1)
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetMouseX = e.clientX - cx;
      targetMouseY = e.clientY - cy;
    };

    const handleScroll = () => {
      currentScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;

      // Smooth lerp on mouse for physical inertia
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      const motionScale = prefersReducedMotion ? 0.25 : 1;

      elements.forEach(({ el, config }) => {
        // 1. Continuous organic float wave
        const floatX = Math.cos(elapsed * config.floatSpeed + config.phase) * config.floatAmpX * motionScale;
        const floatY = Math.sin(elapsed * config.floatSpeed + config.phase) * config.floatAmpY * motionScale;
        const rotate = Math.sin(elapsed * config.floatSpeed * 0.7 + config.phase) * config.rotAmp * motionScale;

        // 2. Interactive mouse parallax drift
        const mouseShiftX = currentMouseX * config.mouseX * motionScale;
        const mouseShiftY = currentMouseY * config.mouseY * motionScale;

        // 3. Scroll parallax drift with soft clamping to keep text in bounds
        const rawScrollShift = currentScrollY * config.scrollFactor * 0.12;
        const scrollShiftY = Math.max(-85, Math.min(85, rawScrollShift)) * motionScale;

        const totalX = (floatX + mouseShiftX).toFixed(2);
        const totalY = (floatY + mouseShiftY + scrollShiftY).toFixed(2);
        const totalRot = rotate.toFixed(2);

        el.style.transform = `translate3d(${totalX}px, ${totalY}px, 0px) rotate(${totalRot}deg)`;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
