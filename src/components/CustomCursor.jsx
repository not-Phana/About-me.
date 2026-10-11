import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor Component - PK Corporation Precision Cursor Engine
 *
 * Implements full PK Corporation specifications:
 * 1. Core Dot: 6px amber circle with volume-preserving velocity stretch/squash.
 * 2. Core Ring: 34px circle (1.5px border, 60% opacity), lerp 0.2, no initial corner sweep.
 * 3. Target-locking: elements <= 380x80 morph ring to rounded rect (11px radius) with 12%/18% pull.
 * 4. Lock-on bounce (400ms), orbiting light streak (2.4s), breathing glow (2.2s).
 * 5. Solid amber buttons turn dot/ring dark (#1b1608).
 * 6. Text Mode: dot morphs into thin 2px bar matching font height (font-size x 1.35, clamped 16-46px), ring hides.
 * 7. Click effects: 10 sparks (every 3rd pale gold), shock ring, radial flash, outline pulse.
 * 8. Elastic scroll stretch: spring stiffness 220, damping 11 (up to 1.85x).
 * 9. 52px SVG scroll progress arc around cursor.
 * 10. Dynamic section tag pill (11px mono, 1.4s duration, ring pulse scale 1.35).
 * 11. Idle breathing after 2.5s without mouse movement.
 * 12. Reactive card borders glow (--gx, --gy, --gi) and warming links (--warm).
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringLabelRef = useRef(null);
  const effectsRef = useRef(null);
  const scrollArcRef = useRef(null);
  const scrollMeterRef = useRef(null);
  const sectionTagRef = useRef(null);

  useEffect(() => {
    // Only run when (hover: hover) and (pointer: fine)
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.body.classList.add('has-custom-cursor', 'pk-has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringLabel = ringLabelRef.current;
    const effects = effectsRef.current;
    const scrollArc = scrollArcRef.current;
    const scrollMeter = scrollMeterRef.current;
    const sectionTag = sectionTagRef.current;

    if (!dot || !ring) return;

    // State Variables
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;

    let ringX = -100;
    let ringY = -100;
    let targetRingX = -100;
    let targetRingY = -100;

    let ringWidth = 34;
    let ringHeight = 34;
    let targetRingWidth = 34;
    let targetRingHeight = 34;

    let isFirstMove = true;
    let isMouseDown = false;
    let isTextMode = false;
    let currentTextFontSize = 16;
    let isOverInput = false;

    let lockedTargetElement = null;
    let isSolidAmberTarget = false;
    let isLargeRow = false;
    let currentLabel = '';

    // Dot Squash/Stretch
    let dotAngle = 0;
    let dotScaleX = 1;
    let dotScaleY = 1;

    // Scroll Velocity & Elastic Spring
    let scrollVelocity = 0;
    let scrollStretch = 1;
    let scrollStretchVel = 0;
    const SPRING_K = 220;
    const SPRING_D = 11;

    // Scroll Arc
    let scrollFadeTimer = null;
    const ARC_CIRCUMFERENCE = 138.23; // 2 * PI * 22

    // Section Tag
    let sectionTagTimer = null;
    let isFirstLoad = true;

    // Idle Breathing Timer
    let idleTimer = null;
    let isIdle = false;

    // Cache Interactive Elements
    let interactiveCards = [];
    let warmingLinks = [];
    let leaningElements = [];

    const refreshElementCaches = () => {
      interactiveCards = Array.from(document.querySelectorAll('.card-panel, .spotlight-card, .hud-frame'));
      warmingLinks = Array.from(document.querySelectorAll('.warm-target, nav a, footer a'));
      leaningElements = Array.from(document.querySelectorAll('.lean-target, .btn-laser-sweep, .pk-keycap'));
    };
    refreshElementCaches();

    // ------------------------------------------------------------------------
    // Mouse Move
    // ------------------------------------------------------------------------
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (isFirstMove) {
        isFirstMove = false;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
        targetRingX = mouseX;
        targetRingY = mouseY;
        document.body.classList.remove('cursor-hidden');
      }

      // Reset Idle Breathing
      if (isIdle) {
        isIdle = false;
        ring.classList.remove('is-idle-breathing');
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isIdle = true;
        if (!lockedTargetElement && !isTextMode) {
          ring.classList.add('is-idle-breathing');
        }
      }, 2500);

      // Section Tag & Scroll Arc follows cursor
      if (scrollArc) {
        scrollArc.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      if (sectionTag && sectionTag.classList.contains('is-visible')) {
        sectionTag.style.transform = `translate(${mouseX + 24}px, ${mouseY + 24}px)`;
      }

      // Update Reactive Page Effects
      updateCardGlows();
      updateWarmingLinks();
      updateLeaning();
    };

    // ------------------------------------------------------------------------
    // Click & Sparks
    // ------------------------------------------------------------------------
    const handleMouseDown = (e) => {
      isMouseDown = true;

      // Requirement 24: Hide keyboard focus outline after mouse click
      if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }

      if (isTextMode) {
        dot.classList.add('is-pressed');
        spawnSparks(mouseX, mouseY, 5, true);
      } else {
        dot.classList.add('dot-flash');
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(0.8)`;

        spawnSparks(mouseX, mouseY, 10, false);
        spawnShockRing(mouseX, mouseY);
        spawnRadialFlash(mouseX, mouseY);

        // Clicked element outline pulse
        const target = e.target;
        if (target && target instanceof Element) {
          const clickable = target.closest('button, a, [role="button"], [role="tab"], .spotlight-card');
          if (clickable) {
            clickable.classList.remove('pk-outline-pulse');
            void clickable.offsetWidth;
            clickable.classList.add('pk-outline-pulse');
            setTimeout(() => clickable.classList.remove('pk-outline-pulse'), 500);
          }
        }
      }
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      dot.classList.remove('dot-flash', 'is-pressed');

      if (!prefersReducedMotion && !isTextMode) {
        ring.classList.remove('ring-spring-release');
        void ring.offsetWidth;
        ring.classList.add('ring-spring-release');
        setTimeout(() => ring.classList.remove('ring-spring-release'), 350);
      }
    };

    const spawnSparks = (cx, cy, count, isTextClick) => {
      if (prefersReducedMotion || !effects) return;

      const baseDist = isTextClick ? 14 : 26;
      for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'pk-spark';

        const isPaleGold = i % 3 === 0;
        spark.style.backgroundColor = isPaleGold ? 'var(--pale-gold, #ffd978)' : 'var(--accent, #c9a227)';
        if (isPaleGold) {
          spark.style.boxShadow = '0 0 6px var(--pale-gold, #ffd978)';
        }

        const baseAngle = (i * 360) / count;
        const jitter = (Math.random() - 0.5) * 14;
        const angle = (baseAngle + jitter) * (Math.PI / 180);
        const dist = baseDist + Math.random() * (isTextClick ? 6 : 10);
        const duration = isTextClick ? 280 + Math.random() * 80 : 380 + Math.random() * 160;

        spark.style.transform = `translate(${cx}px, ${cy}px) rotate(${baseAngle + jitter}deg)`;
        effects.appendChild(spark);

        const startTime = performance.now();
        const anim = (now) => {
          const t = Math.min((now - startTime) / duration, 1);
          const easeOut = 1 - Math.pow(1 - t, 3);
          const currentDist = easeOut * dist;
          const currentScale = 1 - t;
          const currentOpacity = 1 - t * t;

          spark.style.transform = `translate(${cx + Math.cos(angle) * currentDist}px, ${cy + Math.sin(angle) * currentDist}px) rotate(${baseAngle + jitter}deg) scaleX(${currentScale})`;
          spark.style.opacity = currentOpacity;

          if (t < 1) {
            requestAnimationFrame(anim);
          } else {
            spark.remove();
          }
        };
        requestAnimationFrame(anim);
      }
    };

    const spawnShockRing = (cx, cy) => {
      if (prefersReducedMotion || !effects) return;
      const shock = document.createElement('div');
      shock.className = 'pk-shock-ring';
      shock.style.left = `${cx}px`;
      shock.style.top = `${cy}px`;
      effects.appendChild(shock);
      setTimeout(() => shock.remove(), 450);
    };

    const spawnRadialFlash = (cx, cy) => {
      if (prefersReducedMotion || !effects) return;
      const flash = document.createElement('div');
      flash.className = 'pk-radial-flash';
      flash.style.left = `${cx}px`;
      flash.style.top = `${cy}px`;
      effects.appendChild(flash);
      setTimeout(() => flash.remove(), 280);
    };

    // ------------------------------------------------------------------------
    // Hover Context Detection
    // ------------------------------------------------------------------------
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Over Input/Textarea: Native cursor shows, custom cursor hides
      if (target.closest('input, textarea, [contenteditable="true"]')) {
        isOverInput = true;
        document.body.classList.add('cursor-over-input');
        return;
      } else {
        isOverInput = false;
        document.body.classList.remove('cursor-over-input');
      }

      // Text Mode
      const textTarget = target.closest('p, li, h1, h2, h3, h4, blockquote');
      const isClickable = target.closest('button, a, [role="button"], [role="tab"], input, textarea, select');

      if (textTarget && !isClickable) {
        isTextMode = true;
        const computed = window.getComputedStyle(textTarget);
        const fSize = parseFloat(computed.fontSize) || 16;
        currentTextFontSize = Math.min(Math.max(fSize * 1.35, 16), 46);

        dot.classList.add('mode-text');
        ring.classList.add('mode-text');
        return;
      } else {
        isTextMode = false;
        dot.classList.remove('mode-text');
        ring.classList.remove('mode-text');
      }

      // Small Links & Buttons (<= 380x80)
      const clickTarget = target.closest('a, button, [role="button"], [role="tab"], .pk-keycap');
      if (clickTarget) {
        const rect = clickTarget.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && rect.width <= 380 && rect.height <= 80) {
          if (lockedTargetElement !== clickTarget) {
            lockedTargetElement = clickTarget;

            // Check if solid amber
            const bg = window.getComputedStyle(clickTarget).backgroundColor;
            isSolidAmberTarget = clickTarget.classList.contains('bg-accent') ||
                                 clickTarget.classList.contains('btn-laser-sweep') ||
                                 bg.includes('212, 165, 40') ||
                                 bg.includes('201, 162, 39');

            if (isSolidAmberTarget) {
              dot.classList.add('dark-cursor');
              ring.classList.add('dark-cursor');
            } else {
              dot.classList.remove('dark-cursor');
              ring.classList.remove('dark-cursor');
            }

            if (!prefersReducedMotion) {
              ring.classList.remove('ring-lock-bounce');
              void ring.offsetWidth;
              ring.classList.add('ring-lock-bounce');
              setTimeout(() => ring.classList.remove('ring-lock-bounce'), 410);
            }

            ring.classList.add('is-locked');
          }
          return;
        }
      }

      // Clear Lock
      if (lockedTargetElement) {
        lockedTargetElement = null;
        isSolidAmberTarget = false;
        dot.classList.remove('dark-cursor');
        ring.classList.remove('dark-cursor', 'is-locked');
      }

      // Large Rows / Labeled
      const customTag = target.closest('[data-cursor]');
      const wideRow = target.closest('.row-item, .spotlight-card');

      if (customTag) {
        const labelType = customTag.getAttribute('data-cursor');
        if (['view', 'open', 'drag', 'type'].includes(labelType)) {
          isLargeRow = true;
          currentLabel = labelType;
          ring.classList.add('is-labeled');
          if (ringLabel) ringLabel.textContent = labelType;
          return;
        }
      } else if (wideRow) {
        isLargeRow = true;
        currentLabel = '';
        ring.classList.remove('is-labeled');
        ring.classList.add('is-large-row');
        return;
      }

      isLargeRow = false;
      currentLabel = '';
      ring.classList.remove('is-labeled', 'is-large-row');
    };

    const handleMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related) {
        lockedTargetElement = null;
        isLargeRow = false;
        ring.classList.remove('is-locked', 'is-labeled', 'is-large-row', 'dark-cursor');
        dot.classList.remove('dark-cursor');
      }
    };

    // ------------------------------------------------------------------------
    // Scroll Tracking & Spring Stretch
    // ------------------------------------------------------------------------
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - prevScrollY;
      prevScrollY = currentScrollY;

      scrollVelocity += delta * 0.6;
      scrollVelocity = Math.max(-90, Math.min(90, scrollVelocity));

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(currentScrollY / totalHeight, 0), 1) : 0;
      const offset = ARC_CIRCUMFERENCE * (1 - progress);
      if (scrollMeter) {
        scrollMeter.style.strokeDashoffset = offset;
      }

      if (scrollArc) {
        scrollArc.classList.add('is-visible');
        clearTimeout(scrollFadeTimer);
        scrollFadeTimer = setTimeout(() => {
          scrollArc.classList.remove('is-visible');
        }, 700);
      }
    };

    const handleWheel = (e) => {
      scrollVelocity += (e.deltaY || 0) * 0.25;
      scrollVelocity = Math.max(-90, Math.min(90, scrollVelocity));
    };

    // ------------------------------------------------------------------------
    // Section Tag Intersection Observer
    // ------------------------------------------------------------------------
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const secName = entry.target.getAttribute('data-section') ||
                            entry.target.getAttribute('id') ||
                            'FOLIO';
            if (isFirstLoad) return;
            showSectionTag(secName.toUpperCase());
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    document.querySelectorAll('section[id], section[data-section]').forEach((sec) => {
      sectionObserver.observe(sec);
    });

    setTimeout(() => {
      isFirstLoad = false;
    }, 600);

    const showSectionTag = (name) => {
      if (!sectionTag) return;
      sectionTag.textContent = name;
      sectionTag.style.transform = `translate(${mouseX + 24}px, ${mouseY + 24}px)`;
      sectionTag.classList.add('is-visible');

      if (!prefersReducedMotion) {
        ring.classList.remove('ring-section-pulse');
        void ring.offsetWidth;
        ring.classList.add('ring-section-pulse');
        setTimeout(() => ring.classList.remove('ring-section-pulse'), 430);
      }

      clearTimeout(sectionTagTimer);
      sectionTagTimer = setTimeout(() => {
        sectionTag.classList.remove('is-visible');
      }, 1400);
    };

    // ------------------------------------------------------------------------
    // Reactive Page Effects
    // ------------------------------------------------------------------------
    const smoothstep = (min, max, value) => {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    const updateCardGlows = () => {
      interactiveCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
        const dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);
        const dist = Math.hypot(dx, dy);

        const intensity = smoothstep(150, 0, dist);
        card.style.setProperty('--gx', `${mouseX - rect.left}px`);
        card.style.setProperty('--gy', `${mouseY - rect.top}px`);
        card.style.setProperty('--gi', intensity.toFixed(3));
      });
    };

    const updateWarmingLinks = () => {
      warmingLinks.forEach((link) => {
        const rect = link.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(mouseX - cx, mouseY - cy);

        if (dist < 130) {
          const factor = ((1 - dist / 130) * 0.8).toFixed(3);
          link.style.setProperty('--warm', factor);
        } else {
          link.style.setProperty('--warm', '0');
        }
      });
    };

    const updateLeaning = () => {
      leaningElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isHovered = mouseX >= rect.left && mouseX <= rect.right &&
                          mouseY >= rect.top && mouseY <= rect.bottom;
        if (isHovered) {
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const shiftX = (mouseX - cx) * 0.08;
          const shiftY = (mouseY - cy) * 0.15;
          el.style.transform = `translate(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px)`;
        } else {
          el.style.transform = 'translate(0px, 0px)';
        }
      });
    };

    // ------------------------------------------------------------------------
    // Master Animation Frame Loop
    // ------------------------------------------------------------------------
    let lastTime = performance.now();
    let animId = null;

    const mainTick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Dot Velocity
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.hypot(dx, dy);
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      if (!prefersReducedMotion && !isTextMode && speed > 1.5) {
        dotAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        dotScaleX = 1 + Math.min(speed / 28, 1.1);
        dotScaleY = 1 / Math.sqrt(dotScaleX);
      } else {
        dotScaleX += (1 - dotScaleX) * 0.35;
        dotScaleY += (1 - dotScaleY) * 0.35;
      }

      if (isTextMode) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        dot.style.width = '2px';
        dot.style.height = `${currentTextFontSize}px`;
      } else {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) rotate(${dotAngle}deg) scale(${dotScaleX.toFixed(3)}, ${dotScaleY.toFixed(3)})`;
        dot.style.width = '6px';
        dot.style.height = '6px';
      }

      // Ring Target Calculations
      let currentLerp = 0.20;

      if (lockedTargetElement) {
        const rect = lockedTargetElement.getBoundingClientRect();
        const elemCenterX = rect.left + rect.width / 2;
        const elemCenterY = rect.top + rect.height / 2;

        targetRingX = elemCenterX + (mouseX - elemCenterX) * 0.12;
        targetRingY = elemCenterY + (mouseY - elemCenterY) * 0.18;
        targetRingWidth = rect.width + 14;
        targetRingHeight = rect.height + 10;
        currentLerp = 0.30;
      } else if (isLargeRow) {
        targetRingX = mouseX;
        targetRingY = mouseY;
        targetRingWidth = currentLabel ? 62 : 54;
        targetRingHeight = currentLabel ? 62 : 54;
      } else {
        targetRingX = mouseX;
        targetRingY = mouseY;
        targetRingWidth = 34;
        targetRingHeight = 34;
      }

      ringX += (targetRingX - ringX) * currentLerp;
      ringY += (targetRingY - ringY) * currentLerp;
      ringWidth += (targetRingWidth - ringWidth) * 0.25;
      ringHeight += (targetRingHeight - ringHeight) * 0.25;

      // Scroll Stretch Spring Simulation
      scrollVelocity *= 0.87;
      if (!prefersReducedMotion) {
        const targetStretch = 1 + (Math.abs(scrollVelocity) / 90) * 0.85;
        const force = -SPRING_K * (scrollStretch - targetStretch) - SPRING_D * scrollStretchVel;
        scrollStretchVel += force * dt;
        scrollStretch += scrollStretchVel * dt;
      } else {
        scrollStretch = 1;
      }

      ring.style.width = `${ringWidth.toFixed(1)}px`;
      ring.style.height = `${ringHeight.toFixed(1)}px`;

      if (isMouseDown && !lockedTargetElement && !isTextMode) {
        ring.style.transform = `translate(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px) translate(-50%, -50%) scale(0.8, ${(0.8 * scrollStretch).toFixed(3)})`;
      } else {
        ring.style.transform = `translate(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px) translate(-50%, -50%) scale(1, ${scrollStretch.toFixed(3)})`;
      }

      animId = requestAnimationFrame(mainTick);
    };

    animId = requestAnimationFrame(mainTick);

    // Event Bindings
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(idleTimer);
      clearTimeout(scrollFadeTimer);
      clearTimeout(sectionTagTimer);
      sectionObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      document.body.classList.remove(
        'has-custom-cursor',
        'pk-has-custom-cursor',
        'cursor-hidden',
        'cursor-over-input'
      );
    };
  }, []);

  return (
    <>
      {/* Layer 9999: Main Dot & Ring */}
      <div className="cursor-layer-main" aria-hidden="true">
        <div ref={dotRef} id="pk-cursor-dot" />
        <div ref={ringRef} id="pk-cursor-ring">
          <span ref={ringLabelRef} id="pk-cursor-label">VIEW</span>
        </div>
      </div>

      {/* Layer 9998: Sparks & Shockwaves */}
      <div ref={effectsRef} className="cursor-layer-effects" id="pk-effects-container" aria-hidden="true" />

      {/* Layer 9997: Scroll Arc & Section Tag */}
      <div className="cursor-layer-telemetry" aria-hidden="true">
        <svg ref={scrollArcRef} id="pk-scroll-arc" viewBox="0 0 52 52">
          <circle
            ref={scrollMeterRef}
            id="pk-scroll-arc-meter"
            cx="26"
            cy="26"
            r="22"
          />
        </svg>
        <div ref={sectionTagRef} id="pk-section-tag">OVERVIEW</div>
      </div>
    </>
  );
}
