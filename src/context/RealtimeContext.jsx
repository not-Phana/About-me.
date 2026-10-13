import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

const RealtimeContext = createContext(null);

function formatTwoDigits(n) {
  return String(n).padStart(2, '0');
}

function formatUptime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hrs > 0) {
    return `${formatTwoDigits(hrs)}:${formatTwoDigits(mins)}:${formatTwoDigits(secs)}`;
  }
  return `${formatTwoDigits(mins)}:${formatTwoDigits(secs)}`;
}

export function RealtimeProvider({ children }) {
  // Clocks
  const [clocks, setClocks] = useState(() => {
    const now = new Date();
    return {
      local: now.toLocaleTimeString('en-GB', { hour12: false }),
      utc: now.toISOString().slice(11, 19) + ' UTC',
      phnomPenh:
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Phnom_Penh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now) + ' ICT',
    };
  });

  // Session Uptime
  const [uptimeSec, setUptimeSec] = useState(0);

  // FPS Monitor
  const [fps, setFps] = useState(60);

  // Network Latency Ping
  const [latencyMs, setLatencyMs] = useState(24);

  // Memory & Event Loop Telemetry
  const [memoryMb, setMemoryMb] = useState(42);
  const [eventLoopLag, setEventLoopLag] = useState(0.4);

  // Interaction Counters
  const [interactions, setInteractions] = useState({
    keystrokes: 0,
    clicks: 0,
    mouse: { x: 0, y: 0 },
    scrollPct: 0,
  });

  // Rhythmic Heartbeat (~72 BPM = every ~833ms)
  const [heartbeat, setHeartbeat] = useState(false);

  // Dynamic 8-band audio equalizer heights (%)
  const [eqBands, setEqBands] = useState([45, 65, 80, 55, 90, 70, 60, 40]);

  // Keep track of interaction counts without excessive re-renders
  const keystrokesRef = useRef(0);
  const clicksRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 1. Clock & Uptime & Heartbeat Loop (1000ms / 500ms intervals)
  useEffect(() => {
    const clockTimer = setInterval(() => {
      const now = new Date();
      setClocks({
        local: now.toLocaleTimeString('en-GB', { hour12: false }),
        utc: now.toISOString().slice(11, 19) + ' UTC',
        phnomPenh:
          new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Phnom_Penh',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(now) + ' ICT',
      });
      setUptimeSec((prev) => prev + 1);

      // Memory estimation (native performance.memory if supported or dynamic cycle)
      if (typeof performance !== 'undefined' && performance.memory) {
        const used = Math.round(
          performance.memory.usedJSHeapSize / (1024 * 1024)
        );
        setMemoryMb(used || 42);
      } else {
        // Organic simulated jitter between 38MB and 45MB
        setMemoryMb(40 + Math.floor(Math.sin(Date.now() / 6000) * 4));
      }
    }, 1000);

    const beatTimer = setInterval(() => {
      setHeartbeat((prev) => !prev);
    }, 833); // ~72 BPM

    return () => {
      clearInterval(clockTimer);
      clearInterval(beatTimer);
    };
  }, []);

  // 2. Real-Time FPS & EQ Spectrum Loop (via requestAnimationFrame)
  useEffect(() => {
    let animId;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;

    const tick = (now) => {
      frameCount++;
      const delta = now - lastFpsUpdate;

      if (delta >= 500) {
        const computedFps = Math.round((frameCount * 1000) / delta);
        setFps(Math.min(120, Math.max(24, computedFps)));
        frameCount = 0;
        lastFpsUpdate = now;

        // Organic audio spectrum fluctuation
        const timeSec = now / 1000;
        setEqBands([
          Math.round(40 + Math.sin(timeSec * 3.5) * 35),
          Math.round(55 + Math.cos(timeSec * 4.2) * 35),
          Math.round(70 + Math.sin(timeSec * 5.1) * 25),
          Math.round(45 + Math.cos(timeSec * 2.8) * 35),
          Math.round(85 + Math.sin(timeSec * 6.0) * 15),
          Math.round(60 + Math.cos(timeSec * 4.9) * 30),
          Math.round(50 + Math.sin(timeSec * 3.1) * 35),
          Math.round(40 + Math.cos(timeSec * 5.5) * 30),
        ]);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 3. Network Latency Ping Loop (Every 25 seconds)
  const measurePing = useCallback(async () => {
    const start = performance.now();
    try {
      // Lightweight cache-busting fetch against local document or API
      await fetch(`/?ping=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
      });
      const end = performance.now();
      const roundTrip = Math.round(end - start);
      setLatencyMs(Math.max(6, Math.min(250, roundTrip)));
    } catch {
      // Fallback sensible jitter
      setLatencyMs(18 + Math.floor(Math.random() * 12));
    }
  }, []);

  useEffect(() => {
    measurePing();
    const pingTimer = setInterval(measurePing, 25000);
    return () => clearInterval(pingTimer);
  }, [measurePing]);

  // 4. Global User Interaction Listeners (Keystrokes, Clicks, Mouse, Scroll)
  useEffect(() => {
    const handleKeyDown = () => {
      keystrokesRef.current++;
      setInteractions((prev) => ({
        ...prev,
        keystrokes: keystrokesRef.current,
      }));
    };

    const handlePointerDown = () => {
      clicksRef.current++;
      setInteractions((prev) => ({
        ...prev,
        clicks: clicksRef.current,
      }));
    };

    let moveThrottle = 0;
    const handlePointerMove = (e) => {
      const now = performance.now();
      if (now - moveThrottle > 100) {
        moveThrottle = now;
        mouseRef.current = { x: e.clientX, y: e.clientY };
        setInteractions((prev) => ({
          ...prev,
          mouse: { x: e.clientX, y: e.clientY },
        }));
      }
    };

    let scrollThrottle = 0;
    const handleScroll = () => {
      const now = performance.now();
      if (now - scrollThrottle > 150) {
        scrollThrottle = now;
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct =
          totalHeight > 0
            ? Math.min(100, Math.round((window.scrollY / totalHeight) * 100))
            : 0;
        setInteractions((prev) => ({
          ...prev,
          scrollPct: pct,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const value = {
    clocks,
    uptimeSec,
    uptimeFormatted: formatUptime(uptimeSec),
    fps,
    latencyMs,
    memoryMb,
    eventLoopLag,
    interactions,
    heartbeat,
    eqBands,
    streamActive: true,
    pingRefresh: measurePing,
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const ctx = useContext(RealtimeContext);
  if (!ctx) {
    // Graceful fallback if called outside provider
    const now = new Date();
    return {
      clocks: {
        local: now.toLocaleTimeString('en-GB', { hour12: false }),
        utc: now.toISOString().slice(11, 19) + ' UTC',
        phnomPenh: 'ICT 14:59:00',
      },
      uptimeSec: 0,
      uptimeFormatted: '00:00',
      fps: 60,
      latencyMs: 24,
      memoryMb: 42,
      eventLoopLag: 0.4,
      interactions: { keystrokes: 0, clicks: 0, mouse: { x: 0, y: 0 }, scrollPct: 0 },
      heartbeat: false,
      eqBands: [45, 65, 80, 55, 90, 70, 60, 40],
      streamActive: true,
      pingRefresh: () => {},
    };
  }
  return ctx;
}
