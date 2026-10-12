import React, { useState, useEffect } from 'react';
import {
  IconBrain,
  IconZap,
  IconSparkles,
  IconArrowRight,
  IconArrowUpRight,
  IconCheck,
  IconCpu,
  IconShield,
  IconClock,
  IconTerminal,
} from './Icons';

const COGNITIVE_CORES = [
  {
    key: 'logic',
    name: 'Logic Lab',
    tag: 'DEDUCTION',
    faculty: 'Propositional Logic & Sequence Reasoning',
    desc: 'Procedural boolean rules, symbolic permutations, and sequence extrapolation to train formal problem-solving.',
    color: '#38bdf8',
  },
  {
    key: 'memory',
    name: 'Memory Core',
    tag: 'RECALL',
    faculty: 'Working Memory & Visual-Spatial Span',
    desc: 'Multi-item spatial matrices and sequential flashing patterns to expand short-term memory cache.',
    color: '#818cf8',
  },
  {
    key: 'pattern',
    name: 'Pattern Hunter',
    tag: 'ABSTRACTION',
    faculty: 'Hidden Geometric Invariant Detection',
    desc: 'Spotting mathematical and symmetry transformations across morphing glyphs before conscious deliberation.',
    color: '#c084fc',
  },
  {
    key: 'spatial',
    name: 'Spatial Challenge',
    tag: 'KINEMATICS',
    faculty: 'Mental Vector Rotation & Mapping',
    desc: '3D coordinate rotation and mental isometric origami to sharpen architectural visualization.',
    color: '#2dd4bf',
  },
  {
    key: 'strategy',
    name: 'Strategy Room',
    tag: 'HEURISTICS',
    faculty: 'Constraint-Bound Forward Planning',
    desc: 'Resource-limited move optimization and decision-tree pruning under adversarial constraints.',
    color: '#f59e0b',
  },
  {
    key: 'math',
    name: 'Math Reactor',
    tag: 'ARITHMETIC',
    faculty: 'High-Speed Mental Calculation & Estimation',
    desc: 'Order-of-magnitude estimation, modular arithmetic, and rapid mental computation against a shrinking clock.',
    color: '#a3e635',
  },
  {
    key: 'deduction',
    name: 'Deduction Files',
    tag: 'SYNTHESIS',
    faculty: 'Multi-Hypothesis Clue Synthesis',
    desc: 'Resolving complex murder-mystery style clue matrices to identify necessary and sufficient conditions.',
    color: '#fb7185',
  },
  {
    key: 'inhibition',
    name: 'Neural Interference',
    tag: 'CONTROL',
    faculty: 'Impulse Inhibition & Cognitive Flexibility',
    desc: 'Stroop-effect interference drills forcing the brain to suppress instinctive reflexes in favor of conscious intent.',
    color: '#f43f5e',
  },
  {
    key: 'quantum',
    name: 'Quantum Focus',
    tag: 'DUAL N-BACK',
    faculty: 'Fluid Intelligence & Dual Working Memory',
    desc: 'Simultaneous visual-spatial and auditory N-Back tracking—scientifically proven to increase fluid intelligence.',
    color: '#38bdf8',
  },
];

const HEMISPHERES = {
  integrated: {
    title: 'Integrated Mind (Bidirectional Resonance)',
    sub: 'Unified Cognitive Architecture',
    desc: 'High-performance software engineering demands continuous resonance between lateral creative intuition and rigorous algorithmic verification. The left hemisphere conceptualizes architectural visions; the right hemisphere verifies state machines and memory bounds.',
    stats: 'Harmonized 60 FPS Neural Synchronization',
  },
  left: {
    title: 'Left Hemisphere (Organic Cortex)',
    sub: 'Intuitive Heuristics & Creative Synthesis',
    desc: 'The biological cortex: lateral thinking, analogy formation across disparate domains, qualitative ergonomics, and creative concept drafting before translating into formal code.',
    stats: 'High-Density Creative Synthesis & Analogical Modeling',
  },
  right: {
    title: 'Right Hemisphere (Geometric Neural Circuit)',
    sub: 'Propositional Logic & Algorithmic Deduction',
    desc: 'The computational processor: holding deep state trees in working memory, inhibiting impulsive assumptions, verifying zero-leak bounds, and executing 9 procedural cognitive drill engines.',
    stats: 'Discrete Mathematical Verification & Spaced Repetition',
  },
};

export default function BrainLabShowcase({ onSelectProject, onPlaySound }) {
  const [activeHemisphere, setActiveHemisphere] = useState('integrated');
  const [selectedCoreKey, setSelectedCoreKey] = useState('quantum');

  // Mini Synaptic Reflex Drill State
  const [drillState, setDrillState] = useState('idle'); // 'idle' | 'flashing' | 'ready' | 'success'
  const [drillSequence, setDrillSequence] = useState([1, 3, 2]);
  const [userSequence, setUserSequence] = useState([]);
  const [latency, setLatency] = useState(null);
  const [streak, setStreak] = useState(0);
  const [activeFlashNode, setActiveFlashNode] = useState(null);

  const selectedCore =
    COGNITIVE_CORES.find((c) => c.key === selectedCoreKey) || COGNITIVE_CORES[8];
  const hemiInfo = HEMISPHERES[activeHemisphere];

  const handleHemisphereSelect = (hemi) => {
    onPlaySound?.('switch');
    setActiveHemisphere(hemi);
  };

  const handleCoreSelect = (key) => {
    onPlaySound?.('switch');
    setSelectedCoreKey(key);
  };

  // Run Synapse Reflex Drill
  const startDrill = () => {
    onPlaySound?.('switch');
    setDrillState('flashing');
    setUserSequence([]);
    setLatency(null);

    // Generate random 3-step sequence from nodes 1, 2, 3, 4
    const seq = [
      Math.floor(Math.random() * 4) + 1,
      Math.floor(Math.random() * 4) + 1,
      Math.floor(Math.random() * 4) + 1,
    ];
    setDrillSequence(seq);

    // Flash sequence with delays
    seq.forEach((nodeId, idx) => {
      setTimeout(() => {
        setActiveFlashNode(nodeId);
        onPlaySound?.('beep');
        setTimeout(() => setActiveFlashNode(null), 300);
      }, (idx + 1) * 450);
    });

    setTimeout(() => {
      setDrillState('ready');
      window._drillStartTime = performance.now();
    }, 450 * 4);
  };

  const handleNodeClick = (nodeId) => {
    if (drillState !== 'ready') return;
    onPlaySound?.('switch');

    const nextUserSeq = [...userSequence, nodeId];
    setUserSequence(nextUserSeq);

    const stepIdx = nextUserSeq.length - 1;
    if (nodeId !== drillSequence[stepIdx]) {
      // Missed step
      setDrillState('idle');
      setStreak(0);
      return;
    }

    if (nextUserSeq.length === drillSequence.length) {
      // Complete!
      const elapsed = Math.round(performance.now() - (window._drillStartTime || performance.now()));
      setLatency(elapsed);
      setDrillState('success');
      setStreak((prev) => prev + 1);
      onPlaySound?.('beep');
    }
  };

  return (
    <div className="mt-12 border border-line bg-[#090b11] p-6 sm:p-10 lg:p-12 relative overflow-hidden card-laser-lift group reveal-on-scroll reveal-delay-2">
      {/* Background Subtle Radial Amber Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl select-none"
      />

      {/* Flagship Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-lineSoft relative z-10">
        <div>
          <div className="hud-label text-accent mb-2 flex items-center gap-2">
            <IconBrain className="w-4 h-4 text-accent" />
            <span>SPECIAL WORKBENCH 05 // DIGITAL SECOND BRAIN</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink flex items-center gap-3">
            <span>PK Brain Lab</span>
            <span className="text-xs font-mono border border-accent/40 bg-accentDim text-accent px-2.5 py-1 rounded-sm uppercase tracking-wider font-semibold hidden sm:inline-block">
              Cognitive Architecture
            </span>
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-muted font-mono">
            Dual-Hemisphere Neural Training Engine &amp; Executive Function Gym · E:\make my brain better
          </p>
        </div>

        {/* Global Telemetry Chips */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <div className="border border-line bg-surface/80 px-2.5 py-1 text-ink flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span>9 COGNITIVE CORES</span>
          </div>
          <div className="border border-line bg-surface/80 px-2.5 py-1 text-muted">
            DUAL N-BACK TRAINER
          </div>
          <div className="border border-line bg-surface/80 px-2.5 py-1 text-accent font-bold">
            ADAPTIVE REAL-TIME
          </div>
        </div>
      </div>

      {/* Main Dual-Column Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 relative z-10 items-start">
        {/* Left Column: Interactive Golden Brain Emblem & Synapse Nodes */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 border border-line bg-[#06080c] relative rounded-sm">
          {/* Rotating Synapse Halo Orbits */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-accent/20 border-dashed animate-spin [animation-duration:28s]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-accent/15 select-none"
          />

          {/* Central Interactive Golden Brain Vector */}
          <div className="relative z-10 my-4 flex flex-col items-center">
            <div className="relative group/brain cursor-pointer p-4 transition-transform duration-300 hover:scale-105">
              <img
                src="./assets/pk-brain-logo.svg"
                alt="PK Brain Lab Golden Dual-Hemisphere Emblem"
                className="w-40 sm:w-48 h-auto object-contain filter drop-shadow-[0_0_24px_rgba(212,165,40,0.45)] select-none"
              />

              {/* Pulsing Central Core Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent/30 animate-ping pointer-events-none" />
            </div>

            {/* Hemisphere Quick Switcher Buttons */}
            <div className="flex items-center gap-1.5 mt-4 font-mono text-[11px] bg-surface/90 border border-line p-1">
              <button
                type="button"
                onClick={() => handleHemisphereSelect('left')}
                className={`px-2.5 py-1 transition-colors uppercase ${
                  activeHemisphere === 'left'
                    ? 'bg-accent text-[#0b0b0c] font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Organic Cortex
              </button>
              <button
                type="button"
                onClick={() => handleHemisphereSelect('integrated')}
                className={`px-2.5 py-1 transition-colors uppercase ${
                  activeHemisphere === 'integrated'
                    ? 'bg-accent text-[#0b0b0c] font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Unified
              </button>
              <button
                type="button"
                onClick={() => handleHemisphereSelect('right')}
                className={`px-2.5 py-1 transition-colors uppercase ${
                  activeHemisphere === 'right'
                    ? 'bg-accent text-[#0b0b0c] font-bold'
                    : 'text-muted hover:text-ink'
                }`}
              >
                Neural Circuit
              </button>
            </div>
          </div>

          {/* Synapse Reflex Drill Mini-Game */}
          <div className="w-full mt-6 pt-5 border-t border-lineSoft font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] text-muted mb-2.5">
              <span className="flex items-center gap-1.5 text-ink font-semibold">
                <IconZap className="w-3.5 h-3.5 text-accent" />
                <span>SYNAPTIC REFLEX DRILL</span>
              </span>
              <span className="text-accent">
                {streak > 0 ? `STREAK: ${streak} [PERFECT]` : 'READY TO TEST'}
              </span>
            </div>

            {/* 4 Interactive Synapse Node Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[1, 2, 3, 4].map((nodeId) => {
                const isFlashing = activeFlashNode === nodeId;
                const isSelected = userSequence.includes(nodeId);
                return (
                  <button
                    key={nodeId}
                    type="button"
                    onClick={() => handleNodeClick(nodeId)}
                    disabled={drillState !== 'ready'}
                    className={`h-11 border flex flex-col items-center justify-center font-mono font-bold transition-all text-xs ${
                      isFlashing
                        ? 'border-accent bg-accent text-[#0b0b0c] shadow-[0_0_16px_rgba(212,165,40,0.9)] scale-105'
                        : isSelected
                        ? 'border-[#4ade80] bg-[#4ade80]/20 text-[#4ade80]'
                        : drillState === 'ready'
                        ? 'border-accent/60 bg-surface hover:border-accent text-ink cursor-pointer hover:bg-accentDim'
                        : 'border-line bg-surface/50 text-muted/60 opacity-70'
                    }`}
                  >
                    <span>N{nodeId}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={startDrill}
                disabled={drillState === 'flashing'}
                className="w-full py-1.5 px-3 border border-accent bg-accentDim text-accent hover:bg-accent hover:text-[#0b0b0c] font-bold text-xs uppercase transition-colors disabled:opacity-50 text-center"
              >
                {drillState === 'flashing'
                  ? 'Memorize Pulse Sequence...'
                  : drillState === 'ready'
                  ? 'Tap Matching Nodes in Order'
                  : drillState === 'success'
                  ? `Reflex: ${latency}ms · Test Again`
                  : 'Start Synapse Test'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Architectural Philosophy & 9 Cognitive Cores */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          {/* Active Hemisphere Card */}
          <div className="border border-line bg-surface/40 p-5 sm:p-6 rounded-sm">
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
              <span className="text-accent font-bold uppercase tracking-wider">
                ACTIVE HEMISPHERE
              </span>
              <span className="border border-line bg-surface px-2 py-0.5 text-[10px]">
                {hemiInfo.stats}
              </span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-ink">
              {hemiInfo.title}
            </h4>
            <div className="font-mono text-xs text-accent mt-0.5">
              {hemiInfo.sub}
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed font-sans">
              {hemiInfo.desc}
            </p>
          </div>

          {/* 9 Cognitive Cores Selector Grid */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-2.5">
              <span className="text-ink font-bold uppercase tracking-wider">
                9 SPECIALIZED COGNITIVE TRAINING CORES
              </span>
              <span className="text-muted text-[11px]">Click core to inspect faculty</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 font-mono text-xs">
              {COGNITIVE_CORES.map((core) => {
                const isSelected = core.key === selectedCoreKey;
                return (
                  <button
                    key={core.key}
                    type="button"
                    onClick={() => handleCoreSelect(core.key)}
                    className={`border p-2.5 text-left transition-all flex flex-col justify-between min-h-[64px] ${
                      isSelected
                        ? 'border-accent bg-accentDim ring-1 ring-accent'
                        : 'border-line bg-surface/60 hover:border-accent/60 hover:bg-surface text-muted hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider truncate"
                        style={{ color: isSelected ? 'var(--accent)' : core.color }}
                      >
                        {core.tag}
                      </span>
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      )}
                    </div>
                    <div className={`font-bold text-xs truncate ${isSelected ? 'text-ink' : 'text-ink/80'}`}>
                      {core.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Core Detail Box */}
            <div className="mt-3 border border-lineSoft bg-[#06080c] p-4 font-mono text-xs leading-relaxed">
              <div className="flex items-center justify-between gap-2 border-b border-lineSoft pb-2 mb-2">
                <span className="font-bold text-accent uppercase flex items-center gap-1.5">
                  <IconSparkles className="w-3.5 h-3.5" />
                  <span>{selectedCore.name} [{selectedCore.tag}]</span>
                </span>
                <span className="text-[10px] text-muted">
                  Faculty: {selectedCore.faculty}
                </span>
              </div>
              <p className="text-muted leading-relaxed">
                {selectedCore.desc}
              </p>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-lineSoft flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-muted">
              <IconShield className="w-3.5 h-3.5 text-accent" />
              <span>Offline-First · 100% Vector Geometry · Zero-Emoji Standard</span>
            </div>

            <button
              type="button"
              onClick={() => onSelectProject('pk-brain-lab')}
              className="inline-flex items-center gap-2 bg-invertBg text-invertFg px-5 py-2.5 hud-label hover:opacity-90 transition-opacity font-bold"
            >
              <span>Inspect Full Project Dossier</span>
              <IconArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
