import React, { useState, useEffect, useRef } from 'react';
import {
  IconBrain,
  IconZap,
  IconSparkles,
  IconArrowRight,
} from './Icons';

/**
 * 7 Primary Cortical Macro-Cores of Phana's Brain Map
 */
const BRAIN_REGIONS = [
  {
    id: 'prefrontal',
    code: 'NODE 01',
    lobe: 'PREFRONTAL CORTEX',
    subRegion: 'Brodmann Area 9/10/46 · Anterior Executive Pole',
    title: 'Systems Architecture & First-Principles Engine',
    greek: 'Ποίησις · Poiesis (Bringing into Existence)',
    wave: '42.8 Hz Gamma',
    load: 94,
    color: '#d4a528',
    lateralPos: { x: 188, y: 176 },
    hemiPos: { x: 258, y: 122 },
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
    subRegion: 'Brodmann Area 44/45/22 · Perisylvian Language Tract',
    title: 'Bilingual Khmer Abugida & Code Syntax Core',
    greek: 'Λόγος · Logos (Structured Language & Grammar)',
    wave: '35.4 Hz Beta',
    load: 91,
    color: '#38bdf8',
    lateralPos: { x: 266, y: 248 },
    hemiPos: { x: 228, y: 228 },
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
    subRegion: 'Commissural White-Matter Tract · Thalamocortical Hub',
    title: 'Human Architect + AI Agent Orchestration',
    greek: 'Σύνοψις · Synopsis (Unified Multi-Agent Synthesis)',
    wave: '60.0 Hz Hyper-Sync',
    load: 98,
    color: '#4ade80',
    lateralPos: { x: 358, y: 186 },
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
    subRegion: 'Brodmann Area 5/7/40 · Dorsal Stream & Motor Crown',
    title: '60 FPS Kinematics, Vectors & Physics Loop',
    greek: 'Κίνησις · Kinesis (Spatial Motion & Geometry)',
    wave: '46.2 Hz Gamma',
    load: 89,
    color: '#c084fc',
    lateralPos: { x: 422, y: 104 },
    hemiPos: { x: 502, y: 142 },
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
    subRegion: 'Brodmann Area 17/18/19 · Primary Striate Cortex V1–V5',
    title: '24×24 SVG Precision & Cyber-Classical UI',
    greek: 'Εἶδος · Eidos (Visual Form & Geometric Restraint)',
    wave: '38.6 Hz Beta',
    load: 93,
    color: '#f59e0b',
    lateralPos: { x: 575, y: 196 },
    hemiPos: { x: 522, y: 312 },
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
    subRegion: 'Brodmann Area 41/42 · Heschl Gyrus & Hippocampal Loop',
    title: 'Procedural WebAudio & Working Memory Cache',
    greek: 'Ἁρμονία · Harmonia (Mathematical Acoustic Synthesis)',
    wave: '24.0 Hz Alpha-Beta',
    load: 86,
    color: '#2dd4bf',
    lateralPos: { x: 392, y: 278 },
    hemiPos: { x: 252, y: 328 },
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
    subRegion: 'Arbor Vitae Hindbrain · Corticospinal Motor Reflex Bus',
    title: 'Iterative Discipline (Μελέτη) & Reflex Mastery',
    greek: 'Μελέτη · Melete (Deliberate Practice & Refinement)',
    wave: '18.5 Hz SMR-Beta',
    load: 95,
    color: '#fb7185',
    lateralPos: { x: 528, y: 342 },
    hemiPos: { x: 380, y: 358 },
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
 * Primary Multi-Strand White-Matter Axon Highways (DTI Tractography Bundles)
 */
const AXON_PATHWAYS = [
  ['prefrontal', 'linguistic', 24],
  ['prefrontal', 'callosum', -18],
  ['prefrontal', 'spatial', -36],
  ['linguistic', 'callosum', 16],
  ['linguistic', 'auditory', 28],
  ['linguistic', 'cerebellum', 34],
  ['callosum', 'spatial', -22],
  ['callosum', 'occipital', -14],
  ['callosum', 'auditory', 20],
  ['spatial', 'occipital', -32],
  ['spatial', 'cerebellum', 18],
  ['occipital', 'cerebellum', 26],
  ['auditory', 'cerebellum', 22],
  ['prefrontal', 'occipital', -52],
  ['callosum', 'cerebellum', 12],
];

/**
 * 24 Secondary Sub-Cortical Relay Ganglia (Intermediate Synaptic Clusters)
 */
const RELAY_GANGLIA = [
  { lx: 152, ly: 215, hx: 205, hy: 165, color: '#d4a528', label: 'FP-1' },
  { lx: 175, ly: 132, hx: 225, hy: 105, color: '#d4a528', label: 'BA-9' },
  { lx: 238, ly: 118, hx: 295, hy: 98, color: '#d4a528', label: 'BA-8' },
  { lx: 298, ly: 86, hx: 332, hy: 118, color: '#c084fc', label: 'M1' },
  { lx: 356, ly: 76, hx: 432, hy: 112, color: '#c084fc', label: 'S1' },
  { lx: 482, ly: 94, hx: 545, hy: 135, color: '#c084fc', label: 'BA-7' },
  { lx: 546, ly: 134, hx: 575, hy: 195, color: '#f59e0b', label: 'V3' },
  { lx: 608, ly: 218, hx: 572, hy: 268, color: '#f59e0b', label: 'V1' },
  { lx: 582, ly: 266, hx: 528, hy: 342, color: '#f59e0b', label: 'V2' },
  { lx: 492, ly: 256, hx: 452, hy: 282, color: '#2dd4bf', label: 'BA-37' },
  { lx: 446, ly: 225, hx: 318, hy: 268, color: '#38bdf8', label: 'WERN' },
  { lx: 325, ly: 298, hx: 215, hy: 292, color: '#2dd4bf', label: 'BA-21' },
  { lx: 222, ly: 245, hx: 192, hy: 225, color: '#38bdf8', label: 'BA-45' },
  { lx: 298, ly: 165, hx: 345, hy: 165, color: '#4ade80', label: 'CC-G' },
  { lx: 412, ly: 168, hx: 418, hy: 168, color: '#4ade80', label: 'CC-S' },
  { lx: 368, ly: 222, hx: 380, hy: 248, color: '#4ade80', label: 'THAL' },
  { lx: 335, ly: 238, hx: 315, hy: 212, color: '#2dd4bf', label: 'INS' },
  { lx: 465, ly: 318, hx: 342, hy: 338, color: '#fb7185', label: 'PONS' },
  { lx: 568, ly: 322, hx: 428, hy: 345, color: '#fb7185', label: 'CRB-L' },
  { lx: 558, ly: 368, hx: 380, hy: 385, color: '#fb7185', label: 'CRB-V' },
  { lx: 426, ly: 362, hx: 380, hy: 402, color: '#4ade80', label: 'MED' },
  { lx: 248, ly: 198, hx: 285, hy: 175, color: '#d4a528', label: 'STR' },
  { lx: 472, ly: 168, hx: 482, hy: 225, color: '#c084fc', label: 'ANG' },
  { lx: 525, ly: 212, hx: 538, hy: 245, color: '#f59e0b', label: 'MT+' },
];

/**
 * 88 Sub-Cortical Micro-Pyramidal Neurons Constrained Inside the Brain Contour
 */
const MICRO_NEURONS = Array.from({ length: 88 }, (_, i) => {
  const angle = i * 2.3999632; // Golden ratio spiral
  const rNorm = Math.sqrt((i + 1) / 88);

  // Shape the lateral distribution to match the brain + cerebellum contour
  let lx = 372 + Math.cos(angle) * rNorm * 215;
  let ly = 198 + Math.sin(angle) * rNorm * 112;

  // Pull anterior ventral points up out of the temporal notch
  if (lx < 255 && ly > 245) ly -= 42;
  // Extend some points into the cerebellum posterior-inferior lobe
  if (i % 9 === 0) {
    lx = 485 + ((i * 17) % 105);
    ly = 308 + ((i * 13) % 68);
  }

  // Dual-hemisphere top-down distribution
  const side = i % 2 === 0 ? -1 : 1;
  const hx = 380 + side * (28 + Math.abs(Math.cos(angle)) * rNorm * 188);
  const hy = 222 + Math.sin(angle * 1.15) * rNorm * 145;

  const colors = ['#d4a528', '#38bdf8', '#4ade80', '#c084fc', '#f59e0b', '#2dd4bf', '#fb7185'];

  return {
    id: i,
    lx: Math.max(142, Math.min(612, lx)),
    ly: Math.max(74, Math.min(378, ly)),
    hx: Math.max(162, Math.min(598, hx)),
    hy: Math.max(76, Math.min(378, hy)),
    phase: (i * 0.87) % (Math.PI * 2),
    speed: 0.65 + (i % 6) * 0.28,
    size: 1.1 + (i % 4) * 0.45,
    color: colors[i % colors.length],
  };
});

/**
 * Corona Radiata Fanning Projection Fibers (From Thalamus/Callosum Core to Cortex)
 */
const CORONA_RADIATA = [
  'M 358 186 C 295 162, 225 148, 156 162',
  'M 358 186 C 288 142, 228 112, 182 114',
  'M 358 186 C 305 132, 265 98, 232 86',
  'M 358 186 C 325 128, 305 88, 292 68',
  'M 358 186 C 352 125, 350 85, 348 62',
  'M 358 186 C 382 125, 398 85, 412 64',
  'M 358 186 C 412 132, 448 94, 478 76',
  'M 358 186 C 438 142, 495 114, 542 104',
  'M 358 186 C 462 158, 535 142, 592 146',
  'M 358 186 C 475 182, 558 184, 618 194',
  'M 358 186 C 472 206, 552 224, 608 244',
  'M 358 186 C 435 235, 488 268, 538 282',
  'M 358 186 C 385 245, 405 285, 425 315',
  'M 358 186 C 335 242, 312 278, 285 304',
];

export default function BrainLabShowcase({ onSelectProject, onPlaySound }) {
  const [selectedId, setSelectedId] = useState('callosum');
  const [viewMode, setViewMode] = useState('lateral'); // 'lateral' | 'hemispheres' | 'connectome'
  const [neuralState, setNeuralState] = useState('active'); // 'calm' | 'active' | 'overdrive'
  const [surgeCount, setSurgeCount] = useState(0);

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const reticleRef = useRef({ x: 358, y: 186 });
  const pulsesRef = useRef([]);
  const ripplesRef = useRef([]);
  const sparksRef = useRef([]);

  const activeRegionId = selectedId;
  const activeRegion =
    BRAIN_REGIONS.find((r) => r.id === activeRegionId) || BRAIN_REGIONS[2];

  // Trigger a massive multi-hop cascade of neural impulses across all DTI pathways
  const triggerSynapticSurge = () => {
    onPlaySound?.('beep');
    setSurgeCount((c) => c + 1);

    const newPulses = [];
    AXON_PATHWAYS.forEach(([fromId, toId, curve], idx) => {
      // Multi-strand parallel fiber burst
      [-1, 0, 1].forEach((strand) => {
        newPulses.push({
          fromId,
          toId,
          curve: curve + strand * 9,
          t: (idx % 4) * 0.06 + Math.abs(strand) * 0.04,
          speed: 0.014 + (idx % 3) * 0.004,
          color: strand === 0 ? '#ffffff' : idx % 2 === 0 ? '#d4a528' : '#38bdf8',
          size: strand === 0 ? 3.2 : 2.3,
          surge: true,
        });
      });
    });

    BRAIN_REGIONS.forEach((r) => {
      const pos = viewMode === 'hemispheres' ? r.hemiPos : r.lateralPos;
      ripplesRef.current.push({
        x: pos.x,
        y: pos.y,
        r: 6,
        maxR: 58,
        alpha: 0.95,
        color: r.color,
      });
    });

    pulsesRef.current.push(...newPulses);
  };

  // Main 60 FPS HTML5 Canvas Deep-Connectome & DTI Neural Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animId = null;
    let time = 0;

    // Seed 36 continuous travelling action-potential pulses across parallel DTI strands
    if (pulsesRef.current.length === 0) {
      AXON_PATHWAYS.forEach(([fromId, toId, curve], idx) => {
        pulsesRef.current.push({
          fromId,
          toId,
          curve,
          t: (idx * 0.17) % 1,
          speed: 0.0048 + (idx % 4) * 0.0014,
          color: idx % 3 === 0 ? '#38bdf8' : idx % 3 === 1 ? '#d4a528' : '#4ade80',
          size: 2.3,
        });
        pulsesRef.current.push({
          fromId: toId,
          toId: fromId,
          curve: curve + 8,
          t: ((idx * 0.29) + 0.45) % 1,
          speed: 0.0042 + (idx % 3) * 0.0016,
          color: idx % 2 === 0 ? '#c084fc' : '#2dd4bf',
          size: 1.9,
        });
      });
    }

    const speedMultiplier =
      neuralState === 'overdrive' ? 2.1 : neuralState === 'calm' ? 0.6 : 1.05;

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

      // 1. Update & Draw 88 Sub-Cortical Micro-Pyramidal Neurons & Dendritic Mesh
      const microPositions = MICRO_NEURONS.map((n) => {
        const baseX = viewMode === 'hemispheres' ? n.hx : n.lx;
        const baseY = viewMode === 'hemispheres' ? n.hy : n.ly;
        const ox = Math.cos(time * n.speed + n.phase) * 5.2;
        const oy = Math.sin(time * n.speed * 0.85 + n.phase) * 4.5;
        return {
          ...n,
          x: baseX + ox,
          y: baseY + oy,
        };
      });

      // Synaptic Mesh Connections between Micro-Neurons
      ctx.lineWidth = 0.65;
      const maxConnectDist = viewMode === 'connectome' ? 76 : 54;
      for (let i = 0; i < microPositions.length; i += 1) {
        const a = microPositions[i];
        for (let j = i + 1; j < microPositions.length; j += 1) {
          const b = microPositions[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > maxConnectDist || Math.abs(dy) > maxConnectDist) continue;
          const dist = Math.hypot(dx, dy);
          if (dist < maxConnectDist) {
            const alpha =
              (1 - dist / maxConnectDist) * (viewMode === 'connectome' ? 0.36 : 0.19);
            ctx.strokeStyle =
              i % 3 === 0
                ? `rgba(56, 189, 248, ${alpha.toFixed(3)})`
                : `rgba(212, 165, 40, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Interactive Cursor Dendritic Lightning Excitation
        if (mouseRef.current.active) {
          const mdx = a.x - mouseRef.current.x;
          const mdy = a.y - mouseRef.current.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < 108) {
            const mAlpha = (1 - mDist / 108) * 0.65;
            ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            // Midpoint jitter for bio-electric synaptic arc feel
            const jx = (mouseRef.current.x + a.x) / 2 + Math.sin(time * 18 + i) * 3.5;
            const jy = (mouseRef.current.y + a.y) / 2 + Math.cos(time * 18 + i) * 3.5;
            ctx.lineTo(jx, jy);
            ctx.lineTo(a.x, a.y);
            ctx.stroke();
          }
        }
      }

      // Draw Micro-Neuron Somas
      microPositions.forEach((n) => {
        const pulse = 0.4 + 0.6 * Math.sin(time * 2.6 + n.phase);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.25 + pulse * 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 2. Draw 24 Secondary Sub-Cortical Relay Ganglia (With Micro-Labels & Synaptic Rings)
      RELAY_GANGLIA.forEach((g, idx) => {
        const gx = viewMode === 'hemispheres' ? g.hx : g.lx;
        const gy = viewMode === 'hemispheres' ? g.hy : g.ly;
        const osc = 0.5 + 0.5 * Math.sin(time * 3.1 + idx);

        ctx.strokeStyle = g.color;
        ctx.globalAlpha = 0.22 + osc * 0.25;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(gx, gy, 4.5 + osc * 2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = g.color;
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.arc(gx, gy, 2.2, 0, Math.PI * 2);
        ctx.fill();

        if (viewMode === 'connectome' || idx % 2 === 0) {
          ctx.fillStyle = 'rgba(236, 229, 216, 0.38)';
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(g.label, gx + 6, gy + 2.5);
        }
      });
      ctx.globalAlpha = 1;

      // 3. Draw Multi-Strand DTI White-Matter Fiber Bundles Between Major Lobes
      AXON_PATHWAYS.forEach(([fromId, toId, curve]) => {
        const p1 = getRegionPos(fromId);
        const p2 = getRegionPos(toId);
        const isHighlighted =
          fromId === activeRegionId || toId === activeRegionId;

        // Draw 3 parallel white-matter fiber strands per tract
        [-7, 0, 7].forEach((offset, sIdx) => {
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2 + curve + offset;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(mx, my, p2.x, p2.y);

          if (isHighlighted) {
            ctx.strokeStyle =
              sIdx === 1
                ? `${activeRegion.color}99`
                : 'rgba(212, 165, 40, 0.28)';
            ctx.lineWidth = sIdx === 1 ? 1.85 : 0.9;
          } else {
            ctx.strokeStyle =
              sIdx === 1
                ? 'rgba(236, 229, 216, 0.16)'
                : 'rgba(236, 229, 216, 0.06)';
            ctx.lineWidth = sIdx === 1 ? 1.1 : 0.65;
          }
          ctx.stroke();
        });
      });

      // 4. Update & Draw Travelling Action Potentials (Multi-Point Glowing Comet Trains)
      for (let i = pulsesRef.current.length - 1; i >= 0; i -= 1) {
        const p = pulsesRef.current[i];
        p.t += p.speed * speedMultiplier;

        if (p.t >= 1) {
          const dest = getRegionPos(p.toId);
          if (p.surge || p.toId === activeRegionId || Math.random() < 0.28) {
            ripplesRef.current.push({
              x: dest.x,
              y: dest.y,
              r: 5,
              maxR: p.surge ? 44 : 26,
              alpha: p.surge ? 0.8 : 0.42,
              color: p.color,
            });
          }

          if (p.surge) {
            pulsesRef.current.splice(i, 1);
            continue;
          } else {
            p.t = 0;
            const temp = p.fromId;
            p.fromId = p.toId;
            p.toId = temp;
          }
        }

        const p1 = getRegionPos(p.fromId);
        const p2 = getRegionPos(p.toId);
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2 + (p.curve || 18);

        const t = Math.max(0, Math.min(1, p.t));
        const invT = 1 - t;
        const x = invT * invT * p1.x + 2 * invT * t * mx + t * t * p2.x;
        const y = invT * invT * p1.y + 2 * invT * t * my + t * t * p2.y;

        // 5-segment comet tail
        for (let tail = 1; tail <= 5; tail += 1) {
          const tt = Math.max(0, t - tail * 0.024);
          const invTT = 1 - tt;
          const tx = invTT * invTT * p1.x + 2 * invTT * tt * mx + tt * tt * p2.x;
          const ty = invTT * invTT * p1.y + 2 * invTT * tt * my + tt * tt * p2.y;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0.05, 0.52 - tail * 0.095);
          ctx.beginPath();
          ctx.arc(tx, ty, Math.max(0.8, p.size - tail * 0.38), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Glowing action potential head
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. Descending Brainstem / Corticospinal Data Packets (Lateral Mode)
      if (viewMode !== 'hemispheres') {
        for (let b = 0; b < 6; b += 1) {
          const bt = ((time * 0.65 + b * 0.17) % 1);
          const bx = 402 + b * 11 + bt * 18;
          const by = 322 + bt * 84;
          ctx.fillStyle = b % 2 === 0 ? '#d4a528' : '#4ade80';
          ctx.globalAlpha = (1 - bt) * 0.75;
          ctx.beginPath();
          ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // 6. Update & Draw Synaptic Arrival Shockwave Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i -= 1) {
        const rp = ripplesRef.current[i];
        rp.r += 0.9 * speedMultiplier;
        rp.alpha *= 0.95;
        if (rp.r >= rp.maxR || rp.alpha < 0.03) {
          ripplesRef.current.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.strokeStyle = rp.color;
        ctx.globalAlpha = rp.alpha;
        ctx.lineWidth = 1.35;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 7. Smooth Lerp Dual-Ring Tactical Reticle on Selected Cortical Node
      const targetPos = getRegionPos(activeRegionId);
      reticleRef.current.x += (targetPos.x - reticleRef.current.x) * 0.16;
      reticleRef.current.y += (targetPos.y - reticleRef.current.y) * 0.16;

      const rx = reticleRef.current.x;
      const ry = reticleRef.current.y;

      const glowGrad = ctx.createRadialGradient(rx, ry, 2, rx, ry, 76);
      glowGrad.addColorStop(0, `${activeRegion.color}42`);
      glowGrad.addColorStop(0.5, `${activeRegion.color}14`);
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(rx, ry, 76, 0, Math.PI * 2);
      ctx.fill();

      // Outer Counter-Rotating Precision Ring
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(time * 0.75);
      ctx.strokeStyle = activeRegion.color;
      ctx.lineWidth = 1.5;
      for (let seg = 0; seg < 4; seg += 1) {
        const startA = (seg * Math.PI) / 2 + 0.2;
        const endA = startA + Math.PI / 2 - 0.4;
        ctx.beginPath();
        ctx.arc(0, 0, 23, startA, endA);
        ctx.stroke();
      }
      ctx.rotate(-time * 1.45);
      ctx.strokeStyle = 'rgba(236, 229, 216, 0.45)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 29, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 8. Bottom 4-Channel EEG Oscilloscope + 28-Band Frequency Spectrum Analyzer (y: 412..454)
      ctx.save();
      ctx.strokeStyle = 'rgba(212, 165, 40, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(16, 412);
      ctx.lineTo(744, 412);
      ctx.stroke();

      // 28-Band Real-Time Spectral Bars (x: 565..740)
      for (let b = 0; b < 28; b += 1) {
        const barH =
          4 +
          Math.abs(
            Math.sin(time * 5.2 + b * 0.45) * 11 * speedMultiplier +
              Math.cos(time * 8.1 - b * 0.3) * 6
          );
        const bx = 568 + b * 6.2;
        const by = 448 - barH;
        ctx.fillStyle = b % 2 === 0 ? activeRegion.color : '#38bdf8';
        ctx.globalAlpha = 0.68;
        ctx.fillRect(bx, by, 3.8, barH);
      }
      ctx.globalAlpha = 1;

      // EEG Wave 1: Gamma (Gold)
      ctx.strokeStyle = 'rgba(212, 165, 40, 0.8)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      for (let x = 135; x <= 550; x += 3) {
        const y =
          429 +
          Math.sin(x * 0.075 - time * 7.2) * 5.2 * speedMultiplier +
          Math.cos(x * 0.16 - time * 10.4) * 3.1;
        if (x === 135) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // EEG Wave 2: Beta (Cyan)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (let x = 135; x <= 550; x += 3) {
        const y =
          434 +
          Math.sin(x * 0.048 - time * 4.8 + 1.4) * 4.5 +
          Math.sin(x * 0.12 - time * 6.4) * 2.4;
        if (x === 135) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // EEG Wave 3: Alpha-Theta (Emerald)
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.42)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 135; x <= 550; x += 3) {
        const y =
          439 +
          Math.cos(x * 0.032 - time * 3.1 + 0.7) * 3.8;
        if (x === 135) ctx.moveTo(x, y);
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
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink">
              Inside the Mind That Builds.
            </h2>
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
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Split Stage: Left 7-Col Moving Brain Map + Right 5-Col Cortical Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-line relative z-10">
        {/* LEFT 7 COLUMNS: LIVE MOVING BRAIN MAP (CANVAS + ANATOMICAL SVG) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-line bg-[#05070b] flex flex-col justify-between relative overflow-hidden">
          {/* Top HUD Telemetry Bar (Fixed single-line height so stage never shifts) */}
          <div className="h-11 px-5 border-b border-lineSoft flex items-center justify-between gap-2 font-mono text-[11px] text-muted bg-surface/30 whitespace-nowrap overflow-hidden">
            <div className="flex items-center gap-2 shrink-0">
              <span className="h-2 w-2 rounded-full bg-[#4ade80] animate-ping" />
              <span className="text-ink font-semibold uppercase">
                DTI CONNECTOME STREAM // 119 NEURAL NODES · 45 TRACTS
              </span>
            </div>
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="text-accent truncate">{activeRegion.coords}</span>
              <span className="hidden sm:inline border border-line px-2 py-0.5 text-[10px] text-ink shrink-0">
                60 FPS REAL-TIME
              </span>
            </div>
          </div>

          {/* Interactive Brain Map Viewport */}
          <div
            className="relative w-full aspect-[760/460] select-none cursor-crosshair overflow-hidden"
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
          >
            {/* High-Complexity Anatomical SVG Brain Architecture */}
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
                <pattern
                  id="brain-micro-grid"
                  width="9.5"
                  height="9.5"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 9.5 0 L 0 0 0 9.5"
                    fill="none"
                    stroke="rgba(212, 165, 40, 0.018)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <radialGradient id="cortex-ambient" cx="50%" cy="45%" r="48%">
                  <stop offset="0%" stopColor="rgba(212, 165, 40, 0.13)" />
                  <stop offset="55%" stopColor="rgba(56, 189, 248, 0.05)" />
                  <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                </radialGradient>
              </defs>

              <rect width="760" height="460" fill="url(#brain-micro-grid)" />
              <rect width="760" height="460" fill="url(#brain-grid-pattern)" />
              <ellipse cx="380" cy="210" rx="295" ry="185" fill="url(#cortex-ambient)" />

              {/* Stereotaxic Cranial Measurement Ring & Degree Ticks */}
              <circle
                cx="380"
                cy="212"
                r="268"
                fill="none"
                stroke="rgba(236, 229, 216, 0.05)"
                strokeWidth="1"
                strokeDasharray="2 8"
              />
              <line
                x1="380"
                y1="18"
                x2="380"
                y2="405"
                stroke="rgba(236,229,216,0.055)"
                strokeDasharray="3 5"
              />
              <line
                x1="60"
                y1="212"
                x2="700"
                y2="212"
                stroke="rgba(236,229,216,0.055)"
                strokeDasharray="3 5"
              />

              {/* Top-Left HUD Cortical Layer Depth Telemetry */}
              <g transform="translate(18, 24)" className="font-mono text-[8.5px] fill-[#9e9689]">
                <text x="0" y="0" fill="#d4a528" fontWeight="bold">
                  NEOCORTEX LAMINAR DEPTH (I–VI)
                </text>
                <text x="0" y="13">L-I   MOLECULAR PLEXUS ··· 98%</text>
                <text x="0" y="24">L-III PYRAMIDAL COMMISSURE 94%</text>
                <text x="0" y="35">L-V   GANGLIONIC BETZ ···· 96%</text>
                <text x="0" y="46">L-VI  THALAMIC FEEDBACK ·· 92%</text>
              </g>

              {/* Top-Right HUD Callosal Bandwidth Telemetry */}
              <g transform="translate(565, 24)" className="font-mono text-[8.5px] fill-[#9e9689]">
                <text x="0" y="0" fill="#38bdf8" fontWeight="bold">
                  HEMISPHERE SYNCHRONIZATION
                </text>
                <text x="0" y="13">ANTERIOR-POSTERIOR: 172.4 mm</text>
                <text x="0" y="24">CALLOSAL FLUX: 14.8 Gbit/s</text>
                <text x="0" y="35">SYNAPTIC DENSITY: HIGH-ORDER</text>
              </g>

              {/* ================================================================= */}
              {/* MODE 01 & 03: HYPER-DETAILED ANATOMICAL LATERAL CORTEX ARCHITECTURE */}
              {/* ================================================================= */}
              {viewMode !== 'hemispheres' && (
                <g style={{ opacity: viewMode === 'connectome' ? 0.42 : 0.98 }}>
                  {/* Outer Subarachnoid Halo Envelope */}
                  <path
                    d="M 126 232
                       C 114 182, 138 116, 208 84
                       C 272 54, 355 46, 438 56
                       C 522 66, 598 106, 632 168
                       C 654 212, 642 266, 598 292
                       C 562 302, 522 294, 488 304
                       C 438 328, 362 338, 292 318
                       C 248 304, 238 272, 208 268
                       C 166 268, 134 258, 126 232 Z"
                    fill="none"
                    stroke="rgba(56, 189, 248, 0.16)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />

                  {/* Scalloped Gyral Cerebral Cortex Silhouette (Realistic Cortical Crown Folds) */}
                  <path
                    d="M 134 230
                       Q 125 212, 132 194
                       Q 132 172, 146 154
                       Q 156 132, 178 116
                       Q 198 98, 226 88
                       Q 254 74, 286 68
                       Q 318 60, 352 59
                       Q 388 57, 422 63
                       Q 458 67, 492 78
                       Q 526 89, 556 108
                       Q 586 126, 608 152
                       Q 628 178, 632 208
                       Q 636 238, 618 262
                       Q 602 284, 574 288
                       Q 542 292, 512 290
                       Q 482 292, 456 308
                       Q 424 322, 386 325
                       Q 346 328, 308 316
                       Q 274 306, 256 286
                       Q 242 268, 222 262
                       Q 192 264, 164 256
                       Q 140 248, 134 230 Z"
                    fill="rgba(11, 15, 24, 0.84)"
                    stroke="rgba(212, 165, 40, 0.68)"
                    strokeWidth="2.1"
                  />

                  {/* Color-Coded Lobe Sectoral Sub-Divisions */}
                  {/* Frontal & Prefrontal Lobe Sector */}
                  <path
                    d="M 134 230 Q 125 180, 178 116 Q 245 72, 344 60 C 348 118, 336 175, 314 232 C 275 245, 248 262, 222 262 Q 155 262, 134 230 Z"
                    fill="rgba(212, 165, 40, 0.045)"
                    stroke="rgba(212, 165, 40, 0.22)"
                    strokeWidth="0.9"
                  />
                  {/* Parietal Somatosensory & Spatial Sector */}
                  <path
                    d="M 344 60 Q 435 56, 542 98 C 515 142, 488 175, 458 202 C 395 218, 355 225, 314 232 C 336 175, 348 118, 344 60 Z"
                    fill="rgba(192, 132, 252, 0.045)"
                    stroke="rgba(192, 132, 252, 0.22)"
                    strokeWidth="0.9"
                  />
                  {/* Occipital Striate Visual Sector */}
                  <path
                    d="M 542 98 Q 625 148, 632 215 Q 628 278, 568 288 C 532 288, 502 288, 478 242 C 468 220, 462 210, 458 202 C 488 175, 515 142, 542 98 Z"
                    fill="rgba(245, 158, 11, 0.045)"
                    stroke="rgba(245, 158, 11, 0.22)"
                    strokeWidth="0.9"
                  />
                  {/* Temporal Linguistic & Auditory Sector */}
                  <path
                    d="M 248 262 C 305 242, 375 228, 458 202 C 468 225, 482 265, 502 290 C 445 322, 365 332, 296 312 C 260 298, 252 275, 248 262 Z"
                    fill="rgba(45, 212, 191, 0.045)"
                    stroke="rgba(45, 212, 191, 0.22)"
                    strokeWidth="0.9"
                  />

                  {/* Corona Radiata Fanning White-Matter Projection Fibers */}
                  <g
                    fill="none"
                    stroke="rgba(74, 222, 128, 0.16)"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  >
                    {CORONA_RADIATA.map((d, i) => (
                      <path key={i} d={d} />
                    ))}
                  </g>

                  {/* Deep Limbic System: Corpus Callosum, Fornix, Thalamus & Hippocampal Arch */}
                  <path
                    d="M 228 212
                       C 222 154, 312 128, 418 142
                       C 474 150, 502 178, 486 212
                       C 474 228, 446 222, 438 204
                       C 426 178, 342 164, 274 192
                       C 254 202, 238 222, 228 212 Z"
                    fill="rgba(74, 222, 128, 0.09)"
                    stroke="rgba(74, 222, 128, 0.52)"
                    strokeWidth="1.5"
                  />
                  {/* Callosal Striations */}
                  <path
                    d="M 252 192 L 245 174 M 278 180 L 274 158 M 308 172 L 306 148 M 340 168 L 342 144 M 372 168 L 376 144 M 404 172 L 410 148 M 434 180 L 444 156 M 458 194 L 474 174"
                    stroke="rgba(74, 222, 128, 0.32)"
                    strokeWidth="1"
                  />
                  {/* Thalamus & Hippocampal Spiral Loop */}
                  <ellipse
                    cx="366"
                    cy="210"
                    rx="38"
                    ry="22"
                    fill="rgba(56, 189, 248, 0.07)"
                    stroke="rgba(56, 189, 248, 0.35)"
                    strokeWidth="1.1"
                    strokeDasharray="4 2"
                  />

                  {/* Intricate Labyrinth of Cortical Sulci & Gyri Folds */}
                  <g
                    fill="none"
                    stroke="rgba(212, 165, 40, 0.34)"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                  >
                    {/* Lateral Sulcus (Sylvian Fissure) & Central Sulcus (Rolando) */}
                    <path
                      d="M 236 260 C 298 242, 372 226, 462 198"
                      stroke="rgba(56, 189, 248, 0.48)"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M 344 60 C 350 105, 342 148, 326 192 C 320 210, 316 222, 312 234"
                      stroke="rgba(192, 132, 252, 0.48)"
                      strokeWidth="1.7"
                    />
                    {/* Precentral & Postcentral Sulci */}
                    <path d="M 312 64 C 318 108, 310 152, 294 202 C 290 218, 284 228, 278 242" />
                    <path d="M 378 60 C 384 106, 374 152, 358 198 C 352 212, 348 220, 344 226" />
                    {/* Superior, Middle & Inferior Frontal Gyri Convolutions */}
                    <path d="M 148 206 C 175 194, 204 206, 232 192 C 258 178, 276 188, 296 174" />
                    <path d="M 158 168 C 186 154, 215 166, 244 150 C 268 136, 288 146, 306 132" />
                    <path d="M 184 128 C 212 114, 242 124, 268 108 C 286 96, 300 104, 314 92" />
                    <path d="M 144 234 C 168 226, 192 238, 216 226 C 236 216, 254 228, 272 218" />
                    <path d="M 172 182 Q 192 170, 208 184 M 224 136 Q 242 122, 258 138" />
                    {/* Parietal & Supramarginal / Angular Gyri Convolutions */}
                    <path d="M 382 94 C 418 88, 452 104, 486 96 C 512 90, 534 108, 554 118" />
                    <path d="M 368 138 C 408 130, 444 148, 482 140 C 512 134, 538 154, 566 168" />
                    <path d="M 416 64 C 424 92, 414 118, 432 142 C 446 162, 438 182, 456 196" />
                    <path d="M 476 76 C 486 106, 474 132, 496 158 C 512 178, 504 198, 524 214" />
                    {/* Occipital Calcarine & Parieto-Occipital Sulci */}
                    <path d="M 542 98 C 526 134, 502 166, 472 196" stroke="rgba(245, 158, 11, 0.45)" />
                    <path d="M 518 218 C 552 208, 584 222, 626 214" stroke="rgba(245, 158, 11, 0.45)" />
                    <path d="M 538 162 C 568 154, 594 172, 622 176" />
                    <path d="M 504 248 C 538 238, 572 254, 608 252" />
                    <path d="M 564 128 Q 582 148, 568 172 M 578 192 Q 598 212, 582 238" />
                    {/* Superior, Middle & Inferior Temporal Sulci */}
                    <path d="M 262 278 C 318 264, 378 248, 448 224 C 472 216, 492 224, 512 214" />
                    <path d="M 284 298 C 342 286, 402 272, 468 252 C 488 246, 508 256, 528 248" />
                    <path d="M 318 314 C 368 306, 418 296, 466 282" />
                    <path d="M 295 256 Q 312 272, 332 258 M 368 242 Q 386 258, 406 244 M 428 262 Q 446 278, 464 264" />
                  </g>

                  {/* CEREBELLUM (HINDBRAIN) WITH INTRICATE ARBOR VITAE ("TREE OF LIFE") */}
                  <g>
                    <path
                      d="M 468 300
                         C 524 288, 592 298, 612 334
                         C 624 364, 594 392, 536 394
                         C 484 396, 450 370, 456 336
                         C 458 316, 462 306, 468 300 Z"
                      fill="rgba(16, 18, 30, 0.9)"
                      stroke="rgba(251, 113, 133, 0.65)"
                      strokeWidth="1.85"
                    />
                    {/* 8 Layered Cerebellar Folia Striations */}
                    <path
                      d="M 472 312 Q 538 300 598 320
                         M 466 322 Q 538 310 606 332
                         M 462 332 Q 536 320 608 344
                         M 460 342 Q 535 332 604 356
                         M 462 352 Q 535 344 596 366
                         M 468 362 Q 535 356 586 376
                         M 478 372 Q 535 368 572 384
                         M 494 382 Q 532 378 556 389"
                      fill="none"
                      stroke="rgba(251, 113, 133, 0.25)"
                      strokeWidth="0.95"
                    />
                    {/* Arbor Vitae White-Matter Fractal Tree Inside Cerebellum */}
                    <path
                      d="M 462 336 C 495 334, 532 338, 578 346
                         M 488 335 L 516 314 M 504 323 L 528 312 M 504 323 L 496 312
                         M 512 337 L 548 320 M 532 328 L 562 322
                         M 528 339 L 568 334 M 546 336 L 584 332
                         M 495 336 L 522 362 M 510 350 L 538 368
                         M 522 338 L 556 364 M 540 352 L 572 366
                         M 544 341 L 582 356"
                      fill="none"
                      stroke="rgba(251, 113, 133, 0.75)"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* BRAINSTEM: PONS, MEDULLA OBLONGATA & CORTICOSPINAL DATA BUS */}
                  <g>
                    <path
                      d="M 382 316
                         C 374 334, 378 356, 396 368
                         C 406 382, 412 396, 416 408
                         L 474 408
                         C 468 388, 462 364, 456 336
                         Z"
                      fill="rgba(14, 20, 32, 0.85)"
                      stroke="rgba(74, 222, 128, 0.42)"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M 392 318 C 402 352, 414 380, 422 408
                         M 406 320 C 416 352, 426 380, 434 408
                         M 420 322 C 430 354, 438 380, 446 408
                         M 434 326 C 442 356, 450 382, 458 408
                         M 446 330 C 454 358, 462 384, 468 408"
                      fill="none"
                      stroke="rgba(212, 165, 40, 0.38)"
                      strokeWidth="1.15"
                      strokeDasharray="3 3"
                    />
                  </g>

                  {/* Anatomical Lobe Classification Callouts */}
                  <g className="font-mono text-[8.5px] fill-[#9e9689] opacity-80">
                    <text x="128" y="88">ANTERIOR FRONTAL // POIESIS</text>
                    <text x="395" y="46">DORSAL PARIETAL // KINESIS 60FPS</text>
                    <text x="586" y="128">STRIATE V1–V5 // SVG</text>
                    <text x="208" y="348">PERISYLVIAN // KHMER &amp; AST</text>
                    <text x="518" y="405">ARBOR VITAE // MELETE</text>
                  </g>
                </g>
              )}

              {/* ================================================================= */}
              {/* MODE 02: HYPER-DETAILED TOP-DOWN DUAL-HEMISPHERE ARCHITECTURE     */}
              {/* ================================================================= */}
              {viewMode === 'hemispheres' && (
                <g>
                  {/* Left Hemisphere (Logical, Linguistic, AST & Systems) */}
                  <path
                    d="M 368 74
                       Q 342 58, 305 66
                       Q 265 72, 232 92
                       Q 196 112, 174 146
                       Q 154 182, 150 224
                       Q 148 268, 168 308
                       Q 192 348, 232 372
                       Q 276 392, 326 392
                       Q 364 390, 368 364
                       Z"
                    fill="rgba(11, 16, 26, 0.86)"
                    stroke="rgba(56, 189, 248, 0.68)"
                    strokeWidth="2.1"
                  />

                  {/* Right Hemisphere (Spatial, Visual UI, Acoustic & Creative) */}
                  <path
                    d="M 392 74
                       Q 418 58, 455 66
                       Q 495 72, 528 92
                       Q 564 112, 586 146
                       Q 606 182, 610 224
                       Q 612 268, 592 308
                       Q 568 348, 528 372
                       Q 484 392, 434 392
                       Q 396 390, 392 364
                       Z"
                    fill="rgba(11, 16, 26, 0.86)"
                    stroke="rgba(212, 165, 40, 0.68)"
                    strokeWidth="2.1"
                  />

                  {/* High-Density Corpus Callosum Inter-Hemispheric Commissure */}
                  <g stroke="rgba(74, 222, 128, 0.52)" strokeWidth="1.5" fill="none">
                    <path d="M 332 135 Q 380 122 428 135" />
                    <path d="M 326 155 Q 380 144 434 155" />
                    <path d="M 322 175 Q 380 166 438 175" />
                    <path d="M 318 195 Q 380 190 442 195" />
                    <path d="M 316 215 Q 380 215 444 215" />
                    <path d="M 318 235 Q 380 240 442 235" />
                    <path d="M 322 255 Q 380 264 438 255" />
                    <path d="M 326 275 Q 380 286 434 275" />
                    <path d="M 332 295 Q 380 308 428 295" />
                  </g>

                  {/* Left & Right Hemisphere Complex Gyral Folds */}
                  <g fill="none" stroke="rgba(56, 189, 248, 0.28)" strokeWidth="1.25">
                    <path d="M 235 95 C 275 112, 318 104, 364 118" />
                    <path d="M 192 138 C 248 156, 308 142, 364 158" />
                    <path d="M 164 188 C 232 204, 302 186, 364 202" />
                    <path d="M 156 242 C 228 234, 298 252, 364 244" />
                    <path d="M 176 296 C 242 282, 304 302, 364 288" />
                    <path d="M 214 346 C 268 328, 318 346, 364 334" />
                    <path d="M 255 78 C 248 145, 232 215, 248 315" strokeDasharray="3 3" />
                  </g>
                  <g fill="none" stroke="rgba(212, 165, 40, 0.28)" strokeWidth="1.25">
                    <path d="M 525 95 C 485 112, 442 104, 396 118" />
                    <path d="M 568 138 C 512 156, 452 142, 396 158" />
                    <path d="M 596 188 C 528 204, 458 186, 396 202" />
                    <path d="M 604 242 C 532 234, 462 252, 396 244" />
                    <path d="M 584 296 C 518 282, 456 302, 396 288" />
                    <path d="M 546 346 C 492 328, 442 346, 396 334" />
                    <path d="M 505 78 C 512 145, 528 215, 512 315" strokeDasharray="3 3" />
                  </g>

                  <g className="font-mono text-[9.5px] font-bold">
                    <text x="155" y="48" fill="#38bdf8">
                      LEFT HEMISPHERE // ANALYTICAL, KHMER UNICODE &amp; AST
                    </text>
                    <text x="412" y="48" fill="#d4a528">
                      RIGHT HEMISPHERE // SPATIAL 60FPS, SVG &amp; SYNTHESIS
                    </text>
                  </g>
                </g>
              )}
            </svg>

            {/* 60 FPS HTML5 Canvas Layer (DTI Tracts, 119 Nodes, Action Potentials, Reticle, EEG + Spectrum) */}
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
                    className="cursor-pointer"
                  >
                    {/* Invisible Larger Hit Target for Effortless Clicking */}
                    <circle r="26" fill="transparent" />

                    {/* Outer Halo Ring */}
                    <circle
                      r={isSelected ? 16 : isConnected ? 12 : 9}
                      fill={isSelected ? `${region.color}28` : 'rgba(9, 11, 17, 0.88)'}
                      stroke={region.color}
                      strokeWidth={isSelected ? 2.2 : isConnected ? 1.5 : 1.1}
                    />

                    {/* Inner Core Soma */}
                    <circle
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#ffffff' : region.color}
                    />

                    {/* Stationary Node Callout Pill */}
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
              <g transform="translate(18, 428)" className="font-mono text-[9px]">
                <text x="0" y="0" fill="#d4a528" fontWeight="bold">
                  EEG + FFT SPECTRUM
                </text>
                <text x="0" y="13" fill="#9e9689">
                  {activeRegion.wave}
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Quick-Select Cortical Strip (7 Stationary Nodes) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-px bg-line border-t border-line font-mono text-[11px]">
            {BRAIN_REGIONS.map((region) => {
              const isSelected = region.id === activeRegionId;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => handleSelectRegion(region.id)}
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

        {/* RIGHT 5 COLUMNS: ACTIVE BRAIN REGION DOSSIER & EXPLANATORY TEXT (Locked Height) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 bg-[#080b11] flex flex-col justify-between">
          <div>
            {/* Region Header Telemetry */}
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-lineSoft font-mono text-xs whitespace-nowrap overflow-hidden">
              <div className="flex items-center gap-2 overflow-hidden">
                <span
                  className="px-2 py-0.5 text-[#090b10] font-bold text-[10px] uppercase shrink-0"
                  style={{ backgroundColor: activeRegion.color }}
                >
                  {activeRegion.code}
                </span>
                <span className="text-ink font-bold uppercase tracking-wider truncate">
                  {activeRegion.lobe}
                </span>
              </div>
              <span className="text-accent font-semibold text-[11px] shrink-0">
                {activeRegion.wave}
              </span>
            </div>

            {/* Region Main Title & Greek Principle */}
            <div className="mt-5 min-h-[96px]">
              <div className="font-mono text-[11px] text-muted mb-1 truncate">
                {activeRegion.subRegion}
              </div>
              <div className="font-mono text-xs text-accent mb-1 truncate">
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
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${activeRegion.load}%`,
                    backgroundColor: activeRegion.color,
                  }}
                />
              </div>
            </div>

            {/* Rich Explanatory Narrative Text */}
            <div className="mt-5 space-y-3 text-sm text-muted leading-relaxed min-h-[168px]">
              <p className="text-ink font-medium leading-relaxed">
                {activeRegion.summary}
              </p>
              <p className="leading-relaxed">
                {activeRegion.narrative}
              </p>
            </div>

            {/* Cognitive & Engineering Outputs */}
            <div className="mt-5">
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
          <div className="pt-5 mt-6 border-t border-lineSoft space-y-4 font-mono text-xs">
            <div className="min-h-[68px]">
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
