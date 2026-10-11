import React, { useRef, useEffect } from 'react';

/**
 * InteractiveCanvas Component
 * High-performance, compositor-friendly particle constellation canvas.
 * Draws subtle cyber/celestial nodes connected by dynamic geometric lines.
 * Reacts dynamically to cursor coordinates with gentle gravitational spring physics.
 * Automatically halts requestAnimationFrame loop when scrolled out of view.
 */
export default function InteractiveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
    };

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

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Number of particles proportional to screen size (clamped for top performance)
    const count = Math.min(50, Math.max(24, Math.floor((width * height) / 22000)));
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1.2,
        baseAlpha: Math.random() * 0.35 + 0.2,
      });
    }

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.strokeStyle = `rgba(212, 165, 40, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Draw connections to cursor
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.35;
          ctx.strokeStyle = `rgba(212, 165, 40, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          // Gentle magnetic pull toward mouse
          particles[i].x -= (mdx / mDist) * 0.5;
          particles[i].y -= (mdy / mDist) * 0.5;
        }

        // Update position
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;

        // Bounce on boundaries
        if (particles[i].x < 0 || particles[i].x > width) particles[i].vx *= -1;
        if (particles[i].y < 0 || particles[i].y > height) particles[i].vy *= -1;

        // Draw node dot
        ctx.fillStyle = `rgba(212, 165, 40, ${particles[i].baseAlpha})`;
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    // Pause when off-screen to preserve CPU & battery
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
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-60 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
