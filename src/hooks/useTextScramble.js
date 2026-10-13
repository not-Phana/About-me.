import { useState, useEffect, useRef } from 'react';

const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789<>/_';
const KEEP_CHAR_RE = /^[\s.,!?'’]$/;

/**
 * useTextScramble Hook
 * Left-to-right text decode reveal driven by requestAnimationFrame and IntersectionObserver (threshold: 0.7).
 * Respects `prefers-reduced-motion: reduce`.
 */
export function useTextScramble(originalText) {
  const [displayText, setDisplayText] = useState(originalText);
  const elementRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || hasPlayedRef.current) return undefined;

    el.dataset.final = originalText;
    el.setAttribute('aria-label', originalText);

    const prefersReduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      setDisplayText(originalText);
      hasPlayedRef.current = true;
      return undefined;
    }

    let rafId = null;

    const triggerDecode = () => {
      if (hasPlayedRef.current) return;
      hasPlayedRef.current = true;

      const chars = Array.from(originalText);
      const lockTimes = chars.map(
        (_, index) => index * 30 + Math.random() * 190
      );
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        let result = '';
        let allLocked = true;

        for (let i = 0; i < chars.length; i += 1) {
          const ch = chars[i];
          if (KEEP_CHAR_RE.test(ch) || elapsed >= lockTimes[i]) {
            result += ch;
          } else {
            allLocked = false;
            result +=
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }

        if (allLocked) {
          setDisplayText(originalText);
        } else {
          setDisplayText(result);
          rafId = requestAnimationFrame(step);
        }
      };

      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          triggerDecode();
          observer.disconnect();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [originalText]);

  return { elementRef, displayText };
}
