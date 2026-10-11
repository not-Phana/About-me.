import React, { useRef, useEffect } from 'react';

/**
 * InteractiveCanvas Component
 * High-performance, compositor-friendly celestial constellation canvas.
 * Features:
 * - Radiant gold celestial nodes with breathing halos and distant silver stardust.
 * - Dynamic geometric constellation linkages with distance-based alpha.
 * - Gravitational cursor well with luminous radial illumination.
 * - Interactive click shockwave ripples pushing particles in wave physics.
 * - Cosmic shooting sparks travelling across constellation vertices.
 * - Auto-pauses with IntersectionObserver when off-screen.
 */
export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 170,
    };

    const ripples = [];
    const sparks = [];
    let lastSparkTime = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      // Spawn expanding shockwave ripple
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 6,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.65,
        speed: 5.5,
      });
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    parent.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Number of particles proportional to screen size (clamped 35-70 for 60+ FPS)
    const count = Math.min(70, Math.max(35, Math.floor((width * height) / 18000)));
    const particles = [];

    for (let i = 0; i < count; i++) {
      const isGold = Math.random() > 0.35;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: isGold ? Math.random() * 1.6 + 1.6 : Math.random() * 1.0 + 0.8,
        isGold,
        baseAlpha: isGold ? Math.random() * 0.4 + 0.35 : Math.random() * 0.25 + 0.15,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const spawnSpark = () => {
      if (particles.length < 2) return;
      const p1 = particles[Math.floor(Math.random() * particles.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 3;
      sparks.push({
        x: p1.x,
        y: p1.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.02,
        length: Math.random() * 25 + 15,
      });
    };

    let lastTime = performance.now();

    const render = (now) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min(32, now - lastTime) / 16.66;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Periodically spawn cosmic spark
      if (now - lastSparkTime > 3200 && Math.random() > 0.4) {
        spawnSpark();
        lastSparkTime = now;
      }

      // Cursor Radial Ambient Illumination
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.2
        );
        mouseGlow.addColorStop(0, 'rgba(212, 165, 40, 0.12)');
        mouseGlow.addColorStop(0.5, 'rgba(212, 165, 40, 0.04)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Process and render expanding shockwave ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed * dt;
        rip.alpha -= 0.012 * dt;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(212, 165, 40, ${rip.alpha * 0.55})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Push particles in ripple shockwave
        for (let i = 0; i < particles.length; i++) {
          const dx = particles[i].x - rip.x;
          const dy = particles[i].y - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - rip.radius) < 25) {
            const force = (1 - Math.abs(dist - rip.radius) / 25) * 2.2 * rip.alpha;
            particles[i].x += (dx / (dist || 1)) * force;
            particles[i].y += (dy / (dist || 1)) * force;
          }
        }
      }

      // Draw constellation connections
      const maxDistance = 125;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.pulsePhase += p1.pulseSpeed * dt;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alphaRatio = 1 - dist / maxDistance;
            const alpha = alphaRatio * (p1.isGold || p2.isGold ? 0.28 : 0.12);
            ctx.strokeStyle = p1.isGold || p2.isGold
              ? `rgba(212, 165, 40, ${alpha})`
              : `rgba(226, 232, 240, ${alpha})`;
            ctx.lineWidth = alphaRatio * 0.9;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw dynamic linkages to cursor
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouse.radius) {
            const mAlpha = (1 - mDist / mouse.radius) * 0.55;
            ctx.strokeStyle = `rgba(212, 165, 40, ${mAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Gravitational pull toward cursor
            p1.x -= (mdx / mDist) * 0.45 * dt;
            p1.y -= (mdy / mDist) * 0.45 * dt;
          }
        }

        // Update particle kinematics
        p1.x += p1.vx * dt;
        p1.y += p1.vy * dt;

        // Boundary containment
        if (p1.x < 0) { p1.x = 0; p1.vx *= -1; }
        else if (p1.x > width) { p1.x = width; p1.vx *= -1; }
        if (p1.y < 0) { p1.y = 0; p1.vy *= -1; }
        else if (p1.y > height) { p1.y = height; p1.vy *= -1; }

        // Draw breathing node with radiant halo
        const pulse = Math.sin(p1.pulsePhase) * 0.25;
        const currentAlpha = Math.max(0.1, Math.min(1, p1.baseAlpha + pulse));
        const currentRadius = p1.radius * (1 + pulse * 0.3);

        if (p1.isGold) {
          // Luminous aura for gold stars
          ctx.fillStyle = `rgba(212, 165, 40, ${currentAlpha * 0.28})`;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, currentRadius * 2.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(244, 243, 239, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(226, 232, 240, ${currentAlpha})`;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render cosmic shooting sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const spark = sparks[s];
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;
        spark.life -= spark.decay * dt;

        if (spark.life <= 0 || spark.x < 0 || spark.x > width || spark.y < 0 || spark.y > height) {
          sparks.splice(s, 1);
          continue;
        }

        const tailX = spark.x - (spark.vx / 4) * spark.length;
        const tailY = spark.y - (spark.vy / 4) * spark.length;

        const sparkGrad = ctx.createLinearGradient(spark.x, spark.y, tailX, tailY);
        sparkGrad.addColorStop(0, `rgba(254, 240, 138, ${spark.life * 0.85})`);
        sparkGrad.addColorStop(0.3, `rgba(212, 165, 40, ${spark.life * 0.5})`);
        sparkGrad.addColorStop(1, 'transparent');

        ctx.strokeStyle = sparkGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(spark.x, spark.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Spark head dot
        ctx.fillStyle = `rgba(255, 255, 255, ${spark.life})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    // Pause when off-screen to preserve CPU & GPU
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      parent.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
