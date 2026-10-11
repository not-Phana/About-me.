import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * High-performance compositor-driven scroll reveal observer.
 * Automatically observes all elements with `.reveal-on-scroll` class,
 * reveals in-viewport elements immediately, and unobserves upon reveal.
 * Full graceful degradation for prefers-reduced-motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    )?.matches;

    const revealElement = (el) => {
      if (!el.classList.contains('revealed')) {
        el.classList.add('revealed');
      }
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-on-scroll').forEach(revealElement);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.04,
      }
    );

    const observeAll = (isInitial = false) => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          if (isInitial) {
            setTimeout(() => revealElement(el), 60 + idx * 70);
          } else {
            revealElement(el);
          }
        } else {
          observer.observe(el);
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

    // Safety fallback: ensure nothing stays invisible even if viewport calculation misses
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll').forEach(revealElement);
    }, 1800);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
