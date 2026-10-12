import React, { useState, useEffect, useRef } from 'react';
import {
  IconBrain,
  IconZap,
  IconSparkles,
  IconArrowRight,
  IconCpu,
  IconShield,
  IconTerminal,
} from './Icons';

/**
 * 7 Major Cortical Regions of Phana's Brain Map
 * Each node has coordinates for both Lateral (side profile) and Dual-Hemisphere (top-down) views.
 */
const BRAIN_REGIONS = [
  {
    id: 'prefrontal',
    code: 'NODE 01',
    lobe: 'PREFRONTAL CORTEX',
    title: 'Systems Architecture & First-Principles Engine',
    greek: 'Ποίησις · Poiesis (Bringing into Existence)',
    wave: '42.8 Hz Gamma',
    load: 94,
    color: '#d4a528',
    lateralPos: { x: 205, y: 175 },
    hemiPos: { x: 265, y: 125 },
    coords: 'ANT-L [X: +28.4mm, Y: +64.2mm, Z: +18.0mm]',
    summary:
      'The executive command center where raw ideas are decomposed into clean state machines, data flows, and zero-template architectures.',
    narrative:
      'Before writing a single line of code, this region maps out how the system should work from first principles. Rather than relying on heavy boilerplates or black-box templates, it designs modular boundaries, state invariants, and custom engines from the ground up.',
    outputs: [
      'Zero-Template Architecture',
      'State Machine Design',
      'First-Principles Decomposition',
      'System Invariant Proofs',
    ],
    relatedProjects: [
      { id: 'pk-studio-code', label: 'PK Studio Code' },
      { id: 'pk-khmer-type', label: 'PK Khmer Type' },
    ],
    connections: ['linguistic', 'callosum', 'spatial'],
  },
  {
    id: 'linguistic',
    code: 'NODE 02',
    lobe: 'BROCA & WERNICKE AREA',
    title: 'Bilingual Khmer Abugida & Code Syntax Core',
    greek: 'Λόγος · Logos (Structured Language & Grammar)',
    wave: '35.4 Hz Beta',
    load: 91,
    color: '#38bdf8',
    lateralPos: { x: 278, y: 248 },
    hemiPos: { x: 235, y: 230 },
    coords: 'TMP-F [X: -48.1mm, Y: +16.5mm, Z: -4.2mm]',
    summary:
      'Processes multi-layer human scripts alongside formal programming ASTs—bridging Khmer NiDA Unicode mechanics with English and JavaScript/TypeScript.',
    narrative:
      'Khmer is an abugida where dependent vowels and Coeng subscript consonants stack around a base consonant across 4 keyboard modifier layers (Base, Shift, Ctrl, AltGr). This cortical hub translates linguistic structure into deterministic input loops and Monaco AST diagnostics.',
    outputs: [
      'Khmer NiDA Unicode (U+1780–U+17FF)',
      '4-Layer Modifier State Tracking',
      'JavaScript / TypeScript ASTs',
      '218 Progressive Typing Lessons',
    ],
    relatedProjects: [
      { id: 'pk-khmer-type', label: 'PK Khmer Type' },
      { id: 'pk-studio-code', label: 'PK Studio Code' },
    ],
    connections: ['prefrontal', 'auditory', 'cerebellum'],
  },
  {
    id: 'callosum',
    code: 'NODE 03',
    lobe: 'CORPUS CALLOSUM BRIDGE',
    title: 'Human Architect + AI Agent Orchestration',
    greek: 'Σύνοψις · Synopsis (Unified Multi-Agent Synthesis)',
    wave: '60.0 Hz Hyper-Sync',
    load: 98,
    color: '#4ade80',
    lateralPos: { x: 365, y: 192 },
    hemiPos: { x: 380, y: 215 },
    coords: 'MED-C [X: 0.0mm, Y: +8.0mm, Z: +22.5mm]',
    summary:
      'The high-bandwidth neural commissure linking biological creative intent with autonomous coding agents (Antigravity, Codex) and local AI companions (KON).',
    narrative:
      'Software engineering here is a tight feedback loop between human vision and AI execution. This bridge formulates precise architectural specifications, orchestrates autonomous terminal agents, audits every diff line-by-line, and ensures I understand the craft beneath every abstraction.',
    outputs: [
      'Human-in-the-Loop AI Steering',
      'Antigravity & Codex Workflows',
      'KON Local SSE Streaming',
      'Strict Code Review & Verification',
    ],
    relatedProjects: [
      { id: 'kon-ai-companion', label: 'KON (PK Intelligence)' },
      { id: 'pk-studio-code', label: 'PK Studio Code' },
    ],
    connections: ['prefrontal', 'spatial', 'occipital', 'auditory'],
  },
  {
    id: 'spatial',
    code: 'NODE 04',
    lobe: 'PARIETAL SPATIAL CORTEX',
    title: '60 FPS Kinematics, Vectors & Physics Loop',
    greek: 'Κίνησις · Kinesis (Spatial Motion & Geometry)',
    wave: '46.2 Hz Gamma',
    load: 89,
    color: '#c084fc',
    lateralPos: { x: 425, y: 112 },
    hemiPos: { x: 495, y: 145 },
    coords: 'PAR-D [X: +34.0mm, Y: -42.8mm, Z: +54.1mm]',
    summary:
      'Computes real-time 2D/3D coordinate geometry, collision vectors, 3D ergonomic finger travel paths, and dual-layer cursor lerp physics.',
    narrative:
      'Maintains mental coordinate spaces in continuous motion—powering the 4,200×4,200 cyber-arena combat engine in NEON PROTOCOL // OVERDRIVE, 3D kinematic hand guides over virtual keyboards, and zero-latency spring/lerp cursor tracking.',
    outputs: [
      '60 FPS HTML5 Canvas Engines',
      'Vector Collision & Raycasting',
      '3D Hand & Finger Kinematics',
      'Dual-Layer Cursor Lerp Math',
    ],
    relatedProjects: [
      { id: 'neon-protocol-overdrive', label: 'NEON PROTOCOL // OVERDRIVE' },
      { id: 'pk-khmer-type', label: 'PK Khmer Type' },
    ],
    connections: ['prefrontal', 'callosum', 'occipital', 'cerebellum'],
  },
  {
    id: 'occipital',
    code: 'NODE 05',
    lobe: 'OCCIPITAL VISUAL CORTEX',
    title: '24×24 SVG Precision & Cyber-Classical UI',
    greek: 'Εἶδος · Eidos (Visual Form & Geometric Restraint)',
    wave: '38.6 Hz Beta',
    load: 93,
    color: '#f59e0b',
    lateralPos: { x: 568, y: 198 },
    hemiPos: { x: 515, y: 310 },
    coords: 'OCC-P [X: +18.2mm, Y: -86.4mm, Z: +12.0mm]',
    summary:
      'Enforces the strict zero-emoji visual standard, 24×24 pixel-aligned stroke geometry, 1px architectural grids, and high-contrast typography.',
    narrative:
      'Every visual element is treated as precision engineering. This cortex replaces generic system emojis with custom-crafted 24×24 SVG vector icons (PK Icons Studio) and blends classical Greek archival typography with dark-mode HUD telemetry.',
    outputs: [
      '50+ Custom 24×24 SVG Icons',
      'Strict Zero-Emoji Standard',
      '1px Hairline Grid Systems',
      'Cyber-Classical Design Tokens',
    ],
    relatedProjects: [
      { id: 'pk-icons-studio', label: 'PK Icons Studio' },
      { id: 'phana-coffee-shop', label: 'Phana Coffee Shop' },
    ],
    connections: ['spatial', 'callosum', 'cerebellum'],
  },
  {
    id: 'auditory',
    code: 'NODE 06',
    lobe: 'TEMPORAL-AUDITORY SYNTH',
    title: 'Procedural WebAudio & Working Memory Cache',
    greek: 'Ἁρμονία · Harmonia (Mathematical Acoustic Synthesis)',
    wave: '24.0 Hz Alpha-Beta',
    load: 86,
    color: '#2dd4bf',
    lateralPos: { x: 392, y: 278 },
    hemiPos: { x: 255, y: 325 },
    coords: 'TMP-A [X: -54.6mm, Y: -24.0mm, Z: -8.5mm]',
    summary:
      'Synthesizes real-time sound directly from browser WebAudio oscillators and 10-band biquad equalizers with zero external MP3 dependencies.',
    narrative:
      'Instead of loading static audio assets, this region constructs sound mathematically—generating tactile mechanical keyboard switch clicks, multi-BPM procedural synth tracks, and desktop 10-band FLAC/MP3 audio pipelines alongside Dual N-Back working memory training.',
    outputs: [
      'Procedural WebAudio Oscillators',
      '10-Band BiquadFilter EQ',
      'Mechanical Keyswitch Acoustics',
      'Dual N-Back Memory Span',
    ],
    relatedProjects: [
      { id: 'pk-music-player', label: 'PK Music (Desktop v0.1)' },
      { id: 'neon-protocol-overdrive', label: 'NEON PROTOCOL // OVERDRIVE' },
    ],
    connections: ['linguistic', 'callosum', 'cerebellum'],
  },
  {
    id: 'cerebellum',
    code: 'NODE 07',
    lobe: 'CEREBELLUM & DEEP CORE',
    title: 'Iterative Discipline (Μελέτη) & Reflex Mastery',
    greek: 'Μελέτη · Melete (Deliberate Practice & Refinement)',
    wave: '18.5 Hz SMR-Beta',
    load: 95,
    color: '#fb7185',
    lateralPos: { x: 528, y: 336 },
    hemiPos: { x: 380, y: 355 },
    coords: 'CRB-I [X: 0.0mm, Y: -64.0mm, Z: -32.0mm]',
    summary:
      'Turns deliberate repetition into high-speed execution—governing PK Brain Lab cognitive drills, debugging stamina, and continuous refactoring.',
    narrative:
      'Mistakes are treated as telemetry to make the next iteration stronger. This hindbrain engine drives 9 cognitive training modules in PK Brain Lab (Logic, Memory, Pattern, Spatial, Strategy, Math, Deduction, Interference, Quantum Focus) to keep mental reflexes sharp.',
    outputs: [
      'PK Brain Lab (9 Cognitive Cores)',
      'High-WPM Bilingual Touch Typing',
      'Iterative Bug Refactoring',
      'Millisecond Reflex Calibration',
    ],
    relatedProjects: [
      { id: 'arachne-desktop-clock', label: 'Arachne Desktop Clock' },
      { id: 'pk-khmer-type', label: 'PK Khmer Type' },
    ],
    connections: ['spatial', 'occipital', 'auditory', 'linguistic'],
  },
];

/**
 * Directed / Undirected Axon Pathways between Cortical Regions
 */
const AXON_PATHWAYS = [
  ['prefrontal', 'linguistic'],
  ['prefrontal', 'callosum'],
  ['prefrontal', 'spatial'],
  ['linguistic', 'callosum'],
  ['linguistic', 'auditory'],
  ['linguistic', 'cerebellum'],
  ['callosum', 'spatial'],
  ['callosum', 'occipital'],
  ['callosum', 'auditory'],
  ['spatial', 'occipital'],
  ['spatial', 'cerebellum'],
  ['occipital', 'cerebellum'],
  ['auditory', 'cerebellum'],
  ['prefrontal', 'occipital'],
];

/**
 * Generates deterministic sub-cortical micro-neurons distributed inside the brain contour
 */
const MICRO_NEURONS = Array.from({ length: 44 }, (_, i) => {
  const angle = i * 2.39996; // Golden angle distribution
  const radius = Math.sqrt((i + 1) / 44);
  // Elliptical brain interior center ~(380, 215), rx=210, ry=115
  const lx = 375 + Math.cos(angle) * radius * 195 + (i % 3 === 0 ? -15 : 10);
  const ly = 205 + Math.sin(angle) * radius * 105;

  // Dual hemisphere coordinates
  const side = i % 2 === 0 ? -1 : 1;
  const hx = 380 + side * (42 + Math.abs(Math.cos(angle)) * radius * 165);
  const hy = 225 + Math.sin(angle * 1.3) * radius * 135;

  return {
    id: i,
    lx: Math.max(155, Math.min(595, lx)),
    ly: Math.max(88, Math.min(355, ly)),
    hx: Math.max(165, Math.min(595, hx)),
    hy: Math.max(85, Math.min(370, hy)),
    phase: (i * 0.73) % (Math.PI * 2),
    speed: 0.8 + (i % 5) * 0.35,
    size: 1.4 + (i % 3) * 0.6,
  };
});

export default function BrainLabShowcase({ onSelectProject, onPlaySound }) {
  const [selectedId, setSelectedId] = useState('callosum');
  const [hoveredId, setHoveredId] = useState(null);
  const [viewMode, setViewMode] = useState('lateral'); // 'lateral' | 'hemispheres' | 'connectome'
  const [neuralState, setNeuralState] = useState('active'); // 'calm' | 'active' | 'overdrive'
  const [autoTour, setAutoTour] = useState(true);
  const [surgeCount, setSurgeCount] = useState(0);

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const reticleRef = useRef({ x: 365, y: 192 });
  const pulsesRef = useRef([]);
  const ripplesRef = useRef([]);

  const activeRegionId = hoveredId || selectedId;
  const activeRegion =
    BRAIN_REGIONS.find((r) => r.id === activeRegionId) || BRAIN_REGIONS[2];

  // Auto-tour cycling through Phana's brain regions unless paused or hovered
  useEffect(() => {
    if (!autoTour || hoveredId) return undefined;
    const timer = setInterval(() => {
      setSelectedId((prev) => {
        const idx = BRAIN_REGIONS.findIndex((r) => r.id === prev);
        const nextIdx = (idx + 1) % BRAIN_REGIONS.length;
        return BRAIN_REGIONS[nextIdx].id;
      });
    }, 5200);
    return () => clearInterval(timer);
  }, [autoTour, hoveredId]);

  // Trigger a massive cascade of neural impulses across all pathways
  const triggerSynapticSurge = () => {
    onPlaySound?.('beep');
    setSurgeCount((c) => c + 1);

    const newPulses = [];
    AXON_PATHWAYS.forEach(([fromId, toId], idx) => {
      newPulses.push({
        fromId,
        toId,
        t: (idx % 4) * 0.08,
        speed: 0.016 + (idx % 3) * 0.005,
        color: idx % 2 === 0 ? '#d4a528' : '#38bdf8',
        size: 3.4,
        surge: true,
      });
      newPulses.push({
        fromId: toId,
        toId: fromId,
        t: 0.15 + (idx % 3) * 0.1,
        speed: 0.014 + (idx % 4) * 0.004,
        color: '#4ade80',
        size: 3.0,
        surge: true,
      });
    });

    BRAIN_REGIONS.forEach((r) => {
      const pos = viewMode === 'hemispheres' ? r.hemiPos : r.lateralPos;
      ripplesRef.current.push({
        x: pos.x,
        y: pos.y,
        r: 6,
        maxR: 54,
        alpha: 0.95,
        color: r.color,
      });
    });

    pulsesRef.current.push(...newPulses);
  };

  // Main 60 FPS HTML5 Canvas Neural Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animId = null;
    let time = 0;

    // Seed initial travelling action potentials
    if (pulsesRef.current.length === 0) {
      AXON_PATHWAYS.forEach(([fromId, toId], idx) => {
        pulsesRef.current.push({
          fromId,
          toId,
          t: (idx * 0.19) % 1,
          speed: 0.0055 + (idx % 4) * 0.0018,
          color: idx % 3 === 0 ? '#38bdf8' : '#d4a528',
          size: 2.4,
        });
      });
    }

    const speedMultiplier =
      neuralState === 'overdrive' ? 2.15 : neuralState === 'calm' ? 0.6 : 1.1;

    const getRegionPos = (id) => {
      const reg = BRAIN_REGIONS.find((r) => r.id === id);
      if (!reg) return { x: 380, y: 215 };
      return viewMode === 'hemispheres' ? reg.hemiPos : reg.lateralPos;
    };

    const render = () => {
      time += 0.016 * speedMultiplier;
      const W = 760;
      const H = 460;

      ctx.clearRect(0, 0, W, H);

      // 1. Subtle fMRI Cortical Scan Sweep Beam
      const scanX = 120 + ((time * 52) % 520);
      const scanGrad = ctx.createLinearGradient(scanX - 45, 0, scanX + 45, 0);
      scanGrad.addColorStop(0, 'rgba(212, 165, 40, 0)');
      scanGrad.addColorStop(0.5, 'rgba(212, 165, 40, 0.055)');
      scanGrad.addColorStop(1, 'rgba(212, 165, 40, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanX - 45, 45, 90, 355);

      // 2. Update & Draw Sub-Cortical Micro-Neurons
      const microPositions = MICRO_NEURONS.map((n) => {
        const baseX = viewMode === 'hemispheres' ? n.hx : n.lx;
        const baseY = viewMode === 'hemispheres' ? n.hy : n.ly;
        const ox = Math.cos(time * n.speed + n.phase) * 6.5;
        const oy = Math.sin(time * n.speed * 0.9 + n.phase) * 5.5;
        return {
          ...n,
          x: baseX + ox,
          y: baseY + oy,
        };
      });

      // Connect nearby micro-neurons with delicate synaptic filaments
      ctx.lineWidth = 0.75;
      for (let i = 0; i < microPositions.length; i += 1) {
        const a = microPositions[i];
        for (let j = i + 1; j < microPositions.length; j += 1) {
          const b = microPositions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = viewMode === 'connectome' ? 92 : 68;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (viewMode === 'connectome' ? 0.34 : 0.18);
            ctx.strokeStyle = `rgba(212, 165, 40, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Mouse neural excitation filaments
        if (mouseRef.current.active) {
          const mdx = a.x - mouseRef.current.x;
          const mdy = a.y - mouseRef.current.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 115) {
            const mAlpha = (1 - mDist / 115) * 0.55;
            ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          }
        }
      }

      // Draw micro-neuron somas
      microPositions.forEach((n) => {
        const pulse = 0.45 + 0.55 * Math.sin(time * 2.2 + n.phase);
        ctx.fillStyle = `rgba(236, 229, 216, ${(0.25 + pulse * 0.45).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Major Curved Axon Highways & Active Connections
      AXON_PATHWAYS.forEach(([fromId, toId], idx) => {
        const p1 = getRegionPos(fromId);
        const p2 = getRegionPos(toId);
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2 - (idx % 2 === 0 ? 22 : -18);

        const isHighlighted =
          fromId === activeRegionId || toId === activeRegionId;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(mx, my, p2.x, p2.y);

        if (isHighlighted) {
          ctx.strokeStyle = 'rgba(212, 165, 40, 0.58)';
          ctx.lineWidth = 1.85;
        } else {
          ctx.strokeStyle = 'rgba(236, 229, 216, 0.14)';
          ctx.lineWidth = 1.05;
        }
        ctx.stroke();
      });

      // 4. Update & Draw Travelling Action Potentials (Comet Pulses)
      for (let i = pulsesRef.current.length - 1; i >= 0; i -= 1) {
        const p = pulsesRef.current[i];
        p.t += p.speed * speedMultiplier;

        if (p.t >= 1) {
          const dest = getRegionPos(p.toId);
          // Trigger arrival ripple on active or surge pulses
          if (p.surge || p.toId === activeRegionId || Math.random() < 0.35) {
            ripplesRef.current.push({
              x: dest.x,
              y: dest.y,
              r: 5,
              maxR: p.surge ? 42 : 26,
              alpha: p.surge ? 0.75 : 0.45,
              color: p.color,
            });
          }

          if (p.surge) {
            pulsesRef.current.splice(i, 1);
            continue;
          } else {
            // Reverse or pick next connected pathway
            p.t = 0;
            const temp = p.fromId;
            p.fromId = p.toId;
            p.toId = temp;
          }
        }

        const p1 = getRegionPos(p.fromId);
        const p2 = getRegionPos(p.toId);
        const pathwayIdx = AXON_PATHWAYS.findIndex(
          ([a, b]) =>
            (a === p.fromId && b === p.toId) || (a === p.toId && b === p.fromId)
        );
        const curveOffset = (pathwayIdx % 2 === 0 ? 22 : -18);
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2 - curveOffset;

        // Quadratic Bezier point at t
        const t = Math.max(0, Math.min(1, p.t));
        const invT = 1 - t;
        const x = invT * invT * p1.x + 2 * invT * t * mx + t * t * p2.x;
        const y = invT * invT * p1.y + 2 * invT * t * my + t * t * p2.y;

        // Draw glowing comet tail (3 trailing segments)
        for (let tail = 1; tail <= 3; tail += 1) {
          const tt = Math.max(0, t - tail * 0.032);
          const invTT = 1 - tt;
          const tx = invTT * invTT * p1.x + 2 * invTT * tt * mx + tt * tt * p2.x;
          const ty = invTT * invTT * p1.y + 2 * invTT * tt * my + tt * tt * p2.y;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = (0.45 - tail * 0.11);
          ctx.beginPath();
          ctx.arc(tx, ty, Math.max(1, p.size - tail * 0.55), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Draw primary action potential head
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Update & Draw Synaptic Arrival Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i -= 1) {
        const rp = ripplesRef.current[i];
        rp.r += 0.85 * speedMultiplier;
        rp.alpha *= 0.95;
        if (rp.r >= rp.maxR || rp.alpha < 0.03) {
          ripplesRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.strokeStyle = rp.color;
        ctx.globalAlpha = rp.alpha;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 6. Smooth Lerp HUD Target Reticle toward Active Brain Region
      const targetPos = getRegionPos(activeRegionId);
      reticleRef.current.x += (targetPos.x - reticleRef.current.x) * 0.14;
      reticleRef.current.y += (targetPos.y - reticleRef.current.y) * 0.14;

      const rx = reticleRef.current.x;
      const ry = reticleRef.current.y;

      // Active Region Ambient Radial Glow
      const glowGrad = ctx.createRadialGradient(rx, ry, 2, rx, ry, 68);
      glowGrad.addColorStop(0, `${activeRegion.color}38`);
      glowGrad.addColorStop(0.55, `${activeRegion.color}12`);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(rx, ry, 68, 0, Math.PI * 2);
      ctx.fill();

      // Rotating Tactical Lock Reticle around Active Node
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(time * 0.75);
      ctx.strokeStyle = activeRegion.color;
      ctx.lineWidth = 1.4;
      const reticleRadius = 22;
      for (let seg = 0; seg < 4; seg += 1) {
        const startA = (seg * Math.PI) / 2 + 0.22;
        const endA = startA + Math.PI / 2 - 0.44;
        ctx.beginPath();
        ctx.arc(0, 0, reticleRadius, startA, endA);
        ctx.stroke();
      }
      ctx.restore();

      // 7. Bottom 3-Channel Live EEG Brainwave Oscilloscope Strip (y: 416..452)
      ctx.save();
      ctx.strokeStyle = 'rgba(212, 165, 40, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, 412);
      ctx.lineTo(740, 412);
      ctx.stroke();

      // EEG Wave 1: Gamma (Gold)
      ctx.strokeStyle = 'rgba(212, 165, 40, 0.75)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      for (let x = 140; x <= 735; x += 4) {
        const y =
          432 +
          Math.sin(x * 0.065 - time * 6.5) * 5.5 * speedMultiplier +
          Math.cos(x * 0.14 - time * 9.2) * 3.2;
        if (x === 140) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // EEG Wave 2: Beta (Cyan)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (let x = 140; x <= 735; x += 4) {
        const y =
          434 +
          Math.sin(x * 0.042 - time * 4.2 + 1.4) * 4.8 +
          Math.sin(x * 0.11 - time * 5.8) * 2.4;
        if (x === 140) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [activeRegionId, activeRegion.color, viewMode, neuralState]);

  const handleStageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 760 / rect.width;
    const scaleY = 460 / rect.height;
    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      active: true,
    };
  };

  const handleStageMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleSelectRegion = (id) => {
    onPlaySound?.('switch');
    setSelectedId(id);
    setAutoTour(false);
  };

  return (
    <div className="border-t border-line bg-[#07090e] relative overflow-hidden">
      {/* Subtle Radial Cortical Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 w-[28rem] h-[28rem] rounded-full bg-accent/5 blur-3xl select-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 w-[30rem] h-[30rem] rounded-full bg-[#38bdf8]/5 blur-3xl select-none"
      />

      {/* Top Architectural Header & Narrative Introduction */}
      <div className="p-6 sm:p-10 lg:p-12 border-b border-line relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="hud-label text-accent mb-3 flex items-center gap-2">
              <IconBrain className="w-4 h-4 text-accent" />
              <span>NEURAL TOPOGRAPHY // INTERACTIVE MOVING MAP OF MY BRAIN</span>
            </div>
            <h3 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
              Inside the Mind That Builds.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
              Every project on this site begins as a pattern of connected thoughts before it ever becomes code.
              This live, moving neural map traces how my brain links{' '}
              <span className="text-ink font-medium">first-principles systems architecture</span>,{' '}
              <span className="text-ink font-medium">bilingual Khmer–English linguistics</span>,{' '}
              <span className="text-ink font-medium">60 FPS spatial geometry</span>,{' '}
              <span className="text-ink font-medium">procedural WebAudio math</span>, and{' '}
              <span className="text-ink font-medium">human–AI agent orchestration</span>—alongside{' '}
              <span className="text-accent font-mono">PK Brain Lab</span>, my personal cognitive workbench built to train working memory and focus.
            </p>
          </div>

          {/* Interactive Map Mode & Excitation Controls */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-1.5 bg-surface/90 border border-line p-1">
              {[
                { id: 'lateral', label: '01 // Lateral Cortex' },
                { id: 'hemispheres', label: '02 // Dual Hemispheres' },
                { id: 'connectome', label: '03 // Deep Connectome' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    onPlaySound?.('switch');
                    setViewMode(mode.id);
                  }}
                  className={`px-3 py-1.5 transition-colors uppercase text-[11px] ${
                    viewMode === mode.id
                      ? 'bg-accent text-[#0b0b0c] font-bold'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={triggerSynapticSurge}
                className="inline-flex items-center gap-1.5 border border-accent bg-accentDim text-accent hover:bg-accent hover:text-[#0b0b0c] px-3.5 py-1.5 font-bold uppercase tracking-wider text-[11px] transition-colors"
              >
                <IconZap className="w-3.5 h-3.5" />
                <span>Fire Synaptic Surge {surgeCount > 0 ? `[${surgeCount}]` : ''}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onPlaySound?.('switch');
                  setNeuralState((s) =>
                    s === 'active' ? 'overdrive' : s === 'overdrive' ? 'calm' : 'active'
                  );
                }}
                className="border border-line bg-surface px-3 py-1.5 text-[11px] text-ink hover:border-accent transition-colors uppercase"
              >
                State: <span className="text-accent font-bold">{neuralState}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onPlaySound?.('switch');
                  setAutoTour((a) => !a);
                }}
                className={`border px-3 py-1.5 text-[11px] uppercase transition-colors ${
                  autoTour
                    ? 'border-[#4ade80]/50 bg-[#4ade80]/10 text-[#4ade80]'
                    : 'border-line bg-surface text-muted hover:text-ink'
                }`}
              >
                Auto-Scan: {autoTour ? 'ON' : 'PAUSED'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Split Stage: Left 7-Col Moving Brain Map + Right 5-Col Cortical Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-line relative z-10">
        {/* LEFT 7 COLUMNS: LIVE MOVING BRAIN MAP (CANVAS + ANATOMICAL SVG) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-line bg-[#05070b] flex flex-col justify-between relative overflow-hidden">
          {/* Top HUD Telemetry Bar */}
          <div className="px-5 py-3 border-b border-lineSoft flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-muted bg-surface/30">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#4ade80] animate-ping" />
              <span className="text-ink font-semibold uppercase">
                LIVE CORTICAL TELEMETRY // 60 FPS NEURAL STREAM
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-accent">{activeRegion.coords}</span>
              <span className="hidden sm:inline border border-line px-2 py-0.5 text-[10px] text-ink">
                7 LOBES · 44 MICRO-NODES
              </span>
            </div>
          </div>

          {/* Interactive Brain Map Viewport */}
          <div
            className="relative w-full aspect-[760/460] select-none cursor-crosshair overflow-hidden"
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
          >
            {/* Subtle Architectural Coordinate Grid Background */}
            <svg
              viewBox="0 0 760 460"
              className="absolute inset-0 w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="brain-grid-pattern"
                  width="38"
                  height="38"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 38 0 L 0 0 0 38"
                    fill="none"
                    stroke="rgba(236, 229, 216, 0.035)"
                    strokeWidth="1"
                  />
                </pattern>
                <radialGradient id="cortex-ambient" cx="50%" cy="46%" r="48%">
                  <stop offset="0%" stopColor="rgba(212, 165, 40, 0.11)" />
                  <stop offset="65%" stopColor="rgba(56, 189, 248, 0.04)" />
                  <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                </radialGradient>
              </defs>

              <rect width="760" height="460" fill="url(#brain-grid-pattern)" />
              <ellipse cx="380" cy="215" rx="285" ry="175" fill="url(#cortex-ambient)" />

              {/* Stereotaxic Axis Crosshairs */}
              <line
                x1="380"
                y1="25"
                x2="380"
                y2="405"
                stroke="rgba(236,229,216,0.06)"
                strokeDasharray="4 6"
              />
              <line
                x1="80"
                y1="215"
                x2="680"
                y2="215"
                stroke="rgba(236,229,216,0.06)"
                strokeDasharray="4 6"
              />

              {/* ANATOMICAL BRAIN CONTOURS: LATERAL SIDE-PROFILE VIEW */}
              {viewMode !== 'hemispheres' && (
                <g
                  className="transition-opacity duration-500"
                  style={{ opacity: viewMode === 'connectome' ? 0.38 : 0.95 }}
                >
                  {/* Outer Cerebral Cortex Silhouette */}
                  <path
                    d="M 135 235
                       C 122 185, 148 122, 215 92
                       C 275 64, 355 56, 435 66
                       C 515 76, 588 112, 622 172
                       C 644 212, 632 262, 592 286
                       C 555 296, 515 288, 482 298
                       C 435 322, 362 332, 295 312
                       C 252 298, 242 268, 212 264
                       C 172 264, 142 256, 135 235 Z"
                    fill="rgba(14, 18, 27, 0.72)"
                    stroke="rgba(212, 165, 40, 0.55)"
                    strokeWidth="2"
                  />

                  {/* Inner Cortical Pial Double-Outline */}
                  <path
                    d="M 146 230
                       C 136 186, 158 130, 220 102
                       C 278 76, 355 68, 432 77
                       C 506 86, 576 120, 608 175
                       C 628 210, 616 254, 582 276
                       C 545 285, 508 278, 474 288
                       C 428 310, 360 318, 298 300
                       C 258 288, 248 258, 214 254
                       C 178 254, 152 248, 146 230 Z"
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.22)"
                    strokeWidth="1"
                    strokeDasharray="6 4"
                  />

                  {/* Cerebellum (Hindbrain) with Arbor Vitae Striations */}
                  <path
                    d="M 476 302
                       C 528 292, 588 302, 606 335
                       C 618 362, 590 388, 535 390
                       C 488 392, 456 368, 462 336
                       C 464 318, 468 308, 476 302 Z"
                    fill="rgba(18, 22, 34, 0.82)"
                    stroke="rgba(251, 113, 133, 0.52)"
                    strokeWidth="1.75"
                  />
                  {/* Cerebellar Folia Curves */}
                  <path
                    d="M 478 322 Q 538 312 595 330 M 472 340 Q 535 330 598 348 M 474 358 Q 535 350 588 366 M 488 374 Q 535 368 570 379"
                    fill="none"
                    stroke="rgba(251, 113, 133, 0.28)"
                    strokeWidth="1.1"
                  />

                  {/* Brainstem / Spinal Telemetry Bus */}
                  <path
                    d="M 392 320 C 402 355, 412 382, 418 408
                       M 452 332 C 458 362, 464 385, 470 408
                       M 412 325 L 434 408 M 432 328 L 452 408"
                    fill="none"
                    stroke="rgba(212, 165, 40, 0.32)"
                    strokeWidth="1.4"
                    strokeDasharray="3 3"
                  />

                  {/* Corpus Callosum Medial Arch (Internal Structural Core) */}
                  <path
                    d="M 235 215
                       C 230 162, 315 136, 415 148
                       C 468 155, 495 182, 480 212
                       C 468 228, 442 222, 435 205
                       C 425 182, 345 170, 278 196
                       C 258 205, 245 224, 235 215 Z"
                    fill="rgba(74, 222, 128, 0.07)"
                    stroke="rgba(74, 222, 128, 0.38)"
                    strokeWidth="1.3"
                  />

                  {/* Major Cortical Sulci & Gyri Folds (Sylvian, Central, Frontal, Parietal, Temporal) */}
                  <path
                    d="M 248 262 C 305 242, 375 228, 458 202
                       M 348 64 C 355 118, 338 175, 318 236
                       M 162 192 C 215 178, 265 186, 312 168
                       M 192 135 C 245 124, 288 138, 332 122
                       M 365 118 C 425 112, 478 128, 528 158
                       M 445 74 C 458 124, 485 162, 538 192
                       M 285 282 C 348 272, 415 262, 478 242
                       M 538 192 C 572 198, 598 218, 620 232
                       M 522 246 C 562 242, 592 254, 608 268"
                    fill="none"
                    stroke="rgba(212, 165, 40, 0.26)"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                  />

                  {/* Anatomical Lobe Labels Embedded on Stage */}
                  <g className="font-mono text-[9px] fill-[#9e9689] opacity-75">
                    <text x="148" y="95">FRONTAL LOBE // EXEC</text>
                    <text x="415" y="54">PARIETAL // KINEMATICS</text>
                    <text x="582" y="138">OCCIPITAL // SVG</text>
                    <text x="245" y="346">TEMPORAL // LINGUISTICS &amp; AUDIO</text>
                    <text x="515" y="403">CEREBELLUM // MELETE</text>
                  </g>
                </g>
              )}

              {/* ANATOMICAL BRAIN CONTOURS: TOP-DOWN DUAL-HEMISPHERE VIEW */}
              {viewMode === 'hemispheres' && (
                <g className="transition-opacity duration-500">
                  {/* Left Hemisphere (Logical / Systems / Linguistic) */}
                  <path
                    d="M 368 78
                       C 368 62, 315 58, 255 82
                       C 185 110, 148 168, 152 238
                       C 156 308, 198 368, 272 386
                       C 328 398, 368 386, 368 362
                       Z"
                    fill="rgba(14, 18, 27, 0.78)"
                    stroke="rgba(56, 189, 248, 0.55)"
                    strokeWidth="2"
                  />
                  {/* Right Hemisphere (Creative / Spatial / Visual) */}
                  <path
                    d="M 392 78
                       C 392 62, 445 58, 505 82
                       C 575 110, 612 168, 608 238
                       C 604 308, 562 368, 488 386
                       C 432 398, 392 386, 392 362
                       Z"
                    fill="rgba(14, 18, 27, 0.78)"
                    stroke="rgba(212, 165, 40, 0.55)"
                    strokeWidth="2"
                  />

                  {/* Corpus Callosum Commissural Bridge Fibers */}
                  <path
                    d="M 345 155 Q 380 145 415 155
                       M 340 185 Q 380 178 420 185
                       M 338 215 Q 380 215 422 215
                       M 340 245 Q 380 252 420 245
                       M 345 275 Q 380 285 415 275"
                    fill="none"
                    stroke="rgba(74, 222, 128, 0.52)"
                    strokeWidth="2"
                  />

                  {/* Left & Right Hemisphere Cortical Sulci */}
                  <path
                    d="M 215 135 Q 285 152 355 138
                       M 175 205 Q 265 215 355 198
                       M 182 278 Q 268 268 355 282
                       M 235 338 Q 295 322 355 342
                       M 545 135 Q 475 152 405 138
                       M 585 205 Q 495 215 405 198
                       M 578 278 Q 492 268 405 282
                       M 525 338 Q 465 322 405 342"
                    fill="none"
                    stroke="rgba(236, 229, 216, 0.2)"
                    strokeWidth="1.3"
                  />

                  <g className="font-mono text-[10px] fill-[#ece5d8] font-bold">
                    <text x="165" y="54" fill="#38bdf8">
                      LEFT HEMISPHERE // LOGIC, AST &amp; LINGUISTICS
                    </text>
                    <text x="418" y="54" fill="#d4a528">
                      RIGHT HEMISPHERE // SPATIAL, UI &amp; VISION
                    </text>
                  </g>
                </g>
              )}
            </svg>

            {/* 60 FPS HTML5 Canvas Layer (Action Potentials, Micro-Neurons, Reticle, EEG) */}
            <canvas
              ref={canvasRef}
              width={760}
              height={460}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Interactive Clickable SVG Cortical Region Nodes Overlay */}
            <svg
              viewBox="0 0 760 460"
              className="absolute inset-0 w-full h-full"
              role="group"
              aria-label="Interactive Cortical Regions of Phana's Brain"
            >
              {BRAIN_REGIONS.map((region) => {
                const pos =
                  viewMode === 'hemispheres' ? region.hemiPos : region.lateralPos;
                const isSelected = region.id === activeRegionId;
                const isConnected = activeRegion.connections.includes(region.id);

                return (
                  <g
                    key={region.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => handleSelectRegion(region.id)}
                    onMouseEnter={() => setHoveredId(region.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="cursor-pointer group/node"
                  >
                    {/* Invisible Larger Hit Target for Effortless Clicking */}
                    <circle r="26" fill="transparent" />

                    {/* Outer Halo Ring */}
                    <circle
                      r={isSelected ? 16 : isConnected ? 12 : 9}
                      fill={isSelected ? `${region.color}28` : 'rgba(9, 11, 17, 0.85)'}
                      stroke={region.color}
                      strokeWidth={isSelected ? 2.2 : isConnected ? 1.5 : 1.1}
                      className="transition-all duration-300"
                    />

                    {/* Inner Core Soma */}
                    <circle
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#ffffff' : region.color}
                    />

                    {/* Node Floating Callout Pill */}
                    <g transform="translate(0, -24)">
                      <rect
                        x="-58"
                        y="-14"
                        width="116"
                        height="18"
                        rx="2"
                        fill={isSelected ? region.color : 'rgba(9, 11, 17, 0.92)'}
                        stroke={region.color}
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="-2"
                        textAnchor="middle"
                        className="font-mono text-[9.5px] font-bold uppercase tracking-wider"
                        fill={isSelected ? '#090b10' : '#ece5d8'}
                      >
                        {region.code} · {region.lobe.split(' ')[0]}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Bottom Left EEG Legend Overlay */}
              <g transform="translate(22, 428)" className="font-mono text-[9.5px]">
                <text x="0" y="0" fill="#d4a528" fontWeight="bold">
                  EEG // LIVE WAVEFORM
                </text>
                <text x="0" y="13" fill="#9e9689">
                  {activeRegion.wave}
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Quick-Select Cortical Strip (7 Nodes) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-px bg-line border-t border-line font-mono text-[11px]">
            {BRAIN_REGIONS.map((region) => {
              const isSelected = region.id === activeRegionId;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => handleSelectRegion(region.id)}
                  onMouseEnter={() => setHoveredId(region.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`p-2.5 text-left transition-colors flex flex-col justify-between ${
                    isSelected
                      ? 'bg-accentDim border-t-2 border-accent text-ink'
                      : 'bg-[#080a0f] hover:bg-surface text-muted hover:text-ink'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="text-[9px] font-bold"
                      style={{ color: region.color }}
                    >
                      {region.code}
                    </span>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: isSelected ? region.color : 'transparent',
                      }}
                    />
                  </div>
                  <div className="font-bold truncate mt-1 text-[11px]">
                    {region.lobe.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT 5 COLUMNS: ACTIVE BRAIN REGION DOSSIER & EXPLANATORY TEXT */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#080b11] flex flex-col justify-between space-y-6">
          <div>
            {/* Region Header Telemetry */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-lineSoft font-mono text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="px-2 py-0.5 text-[#090b10] font-bold text-[10px] uppercase"
                  style={{ backgroundColor: activeRegion.color }}
                >
                  {activeRegion.code}
                </span>
                <span className="text-ink font-bold uppercase tracking-wider">
                  {activeRegion.lobe}
                </span>
              </div>
              <span className="text-accent font-semibold text-[11px]">
                {activeRegion.wave}
              </span>
            </div>

            {/* Region Main Title & Greek Principle */}
            <div className="mt-5">
              <div className="font-mono text-xs text-accent mb-1">
                {activeRegion.greek}
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-bold text-ink leading-tight">
                {activeRegion.title}
              </h4>
            </div>

            {/* Synaptic Load Meter */}
            <div className="mt-4 bg-surface/60 border border-line p-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-muted">CORTICAL ENGAGEMENT &amp; SYNAPTIC DENSITY</span>
                <span className="text-ink font-bold">{activeRegion.load}% ACTIVE</span>
              </div>
              <div className="w-full h-1.5 bg-[#05070b] overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${activeRegion.load}%`,
                    backgroundColor: activeRegion.color,
                  }}
                />
              </div>
            </div>

            {/* Rich Explanatory Narrative Text */}
            <div className="mt-5 space-y-3 text-sm text-muted leading-relaxed">
              <p className="text-ink font-medium leading-relaxed">
                {activeRegion.summary}
              </p>
              <p className="leading-relaxed">
                {activeRegion.narrative}
              </p>
            </div>

            {/* Cognitive & Engineering Outputs */}
            <div className="mt-6">
              <div className="font-mono text-[11px] text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <IconSparkles className="w-3.5 h-3.5 text-accent" />
                <span>What This Brain Region Powers</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {activeRegion.outputs.map((item) => (
                  <div
                    key={item}
                    className="border border-line bg-surface/50 px-3 py-2 text-ink flex items-center gap-2"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: activeRegion.color }}
                    />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connected Lobes & Real Project Links Footer */}
          <div className="pt-5 border-t border-lineSoft space-y-4 font-mono text-xs">
            <div>
              <div className="text-[10px] text-muted uppercase tracking-wider mb-2">
                SYNAPTIC PATHWAYS (CLICK TO TRACE AXON):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeRegion.connections.map((connId) => {
                  const target = BRAIN_REGIONS.find((r) => r.id === connId);
                  if (!target) return null;
                  return (
                    <button
                      key={connId}
                      type="button"
                      onClick={() => handleSelectRegion(connId)}
                      className="border border-line bg-surface hover:border-accent px-2.5 py-1 text-[11px] text-muted hover:text-ink transition-colors flex items-center gap-1.5"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: target.color }}
                      />
                      <span>{target.lobe}</span>
                      <IconArrowRight className="w-3 h-3" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <span className="text-[11px] text-muted">
                Born from this lobe:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeRegion.relatedProjects.map((proj) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => onSelectProject?.(proj.id)}
                    className="inline-flex items-center gap-1.5 border border-accent/50 bg-accentDim text-accent hover:bg-accent hover:text-[#090b10] px-3 py-1 font-bold text-[11px] transition-colors"
                  >
                    <span>Inspect {proj.label}</span>
                    <IconArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
