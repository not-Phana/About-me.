import { useEffect } from 'react';

const DECODE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789<>/_';
// Spaces and punctuation (. , ! ? ' and curly apostrophe ’ plus common symbol separators) are never scrambled
const KEEP_CHAR_RE = /^[\s.,!?'’&/—–\-:()"]$/;

/**
 * Decodes a heading's text from random characters into its final letters,
 * locking in left-to-right with per-letter timing: index * 30ms + random 0-190ms.
 */
function runHeadingDecode(h2, prefersReducedMotion) {
  if (!h2 || h2.dataset.decoded === 'true') return;
  h2.dataset.decoded = 'true';

  const parentSection = h2.closest('section');
  if (parentSection) {
    parentSection.classList.add('show', 'revealed');
  }
  h2.classList.add('show');

  // Plain heading (no nested child elements)
  if (h2.children.length === 0) {
    const final =
      h2.dataset.final ?? h2.textContent.replace(/\s+/g, ' ').trim();
    h2.dataset.final = final;
    h2.setAttribute('aria-label', final);

    if (prefersReducedMotion) {
      h2.textContent = final;
      return;
    }

    const chars = Array.from(final);
    const lockTimes = chars.map(
      (_, index) => index * 30 + Math.random() * 190
    );
    const maxLock = Math.max(0, ...lockTimes);
    let startTime = null;
    let rafId = 0;

    const finish = () => {
      if (rafId) cancelAnimationFrame(rafId);
      h2.textContent = final;
    };

    const safetyTimer = setTimeout(finish, maxLock + 80);

    const frame = (now) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      let output = '';
      let allLocked = true;

      for (let i = 0; i < chars.length; i += 1) {
        const ch = chars[i];
        if (KEEP_CHAR_RE.test(ch) || elapsed >= lockTimes[i]) {
          output += ch;
        } else {
          allLocked = false;
          output +=
            DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
        }
      }

      if (allLocked) {
        clearTimeout(safetyTimer);
        h2.textContent = final;
      } else {
        h2.textContent = output;
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return;
  }

  // Heading with child spans (e.g. two-line classical heading): preserve child DOM while decoding left-to-right
  const childLeaves = Array.from(h2.children);
  let globalIndex = 0;
  let maxLock = 0;
  const segments = childLeaves.map((el) => {
    const text =
      el.dataset.final ?? el.textContent.replace(/\s+/g, ' ').trim();
    el.dataset.final = text;
    const chars = Array.from(text);
    const lockTimes = chars.map(() => {
      const t = globalIndex * 30 + Math.random() * 190;
      if (t > maxLock) maxLock = t;
      globalIndex += 1;
      return t;
    });
    return { el, text, chars, lockTimes };
  });

  const combinedFinal = segments.map((s) => s.text).join(' ');
  h2.dataset.final = combinedFinal;
  h2.setAttribute('aria-label', combinedFinal);

  if (prefersReducedMotion) {
    segments.forEach((s) => {
      s.el.textContent = s.text;
    });
    return;
  }

  let startTime = null;
  let rafId = 0;

  const finishSegments = () => {
    if (rafId) cancelAnimationFrame(rafId);
    segments.forEach((seg) => {
      seg.el.textContent = seg.text;
    });
  };

  const safetyTimer = setTimeout(finishSegments, maxLock + 80);

  const frame = (now) => {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    let allLocked = true;

    segments.forEach((seg) => {
      let out = '';
      for (let i = 0; i < seg.chars.length; i += 1) {
        const ch = seg.chars[i];
        if (KEEP_CHAR_RE.test(ch) || elapsed >= seg.lockTimes[i]) {
          out += ch;
        } else {
          allLocked = false;
          out +=
            DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
        }
      }
      seg.el.textContent = out;
    });

    if (allLocked) {
      clearTimeout(safetyTimer);
      segments.forEach((seg) => {
        seg.el.textContent = seg.text;
      });
    } else {
      rafId = requestAnimationFrame(frame);
    }
  };

  rafId = requestAnimationFrame(frame);
}

/**
 * Checks whether at least 70% of an element is currently visible in the viewport.
 */
function is70PercentVisible(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  if (rect.height <= 0) return false;
  const visibleTop = Math.max(0, rect.top);
  const visibleBottom = Math.min(vh, rect.bottom);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return visibleHeight / rect.height >= 0.7;
}

/**
 * useScrollReveal Hook
 * 1. Prepares every h2 with dataset.final and aria-label.
 * 2. Uses an IntersectionObserver (threshold: 0.7) for h2 headings to trigger
 *    the left-to-right requestAnimationFrame text decode + 46px amber rule once.
 * 3. Observes sections with `.reveal-on-scroll` to add `.show` / `.revealed`.
 * 4. Full graceful degradation for prefers-reduced-motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    );

    const revealSection = (el) => {
      if (!el.classList.contains('revealed')) {
        el.classList.add('revealed', 'show');
      }
    };

    const prepareHeadings = () => {
      document.querySelectorAll('h2').forEach((h2) => {
        if (!h2.dataset.final) {
          const finalText = h2.textContent.replace(/\s+/g, ' ').trim();
          h2.dataset.final = finalText;
          h2.setAttribute('aria-label', finalText);
        }
      });
    };

    prepareHeadings();

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(revealSection);
      document
        .querySelectorAll('h2')
        .forEach((h2) => runHeadingDecode(h2, true));
      return undefined;
    }

    // Section observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealSection(entry.target);
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.04,
      }
    );

    // Heading observer with threshold 0.7 per specification
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runHeadingDecode(entry.target, prefersReducedMotion);
            headingObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    const observeAll = (isInitial = false) => {
      prepareHeadings();

      const sections = document.querySelectorAll(
        '.reveal-on-scroll:not(.revealed)'
      );
      sections.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          if (isInitial) {
            setTimeout(() => revealSection(el), 40 + idx * 50);
          } else {
            revealSection(el);
          }
        } else {
          sectionObserver.observe(el);
        }
      });

      const headings = document.querySelectorAll(
        'h2:not([data-decoded="true"])'
      );
      headings.forEach((h2) => {
        if (is70PercentVisible(h2)) {
          runHeadingDecode(h2, prefersReducedMotion);
        } else {
          headingObserver.observe(h2);
        }
      });
    };

    observeAll(true);

    // Listen to DOM mutations for dynamically mounted sections or route changes
    const mutationObserver = new MutationObserver(() => {
      observeAll(false);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Safety fallback for section visibility
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(revealSection);
    }, 1800);

    return () => {
      clearTimeout(fallbackTimer);
      sectionObserver.disconnect();
      headingObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
