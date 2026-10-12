import React, { useState } from 'react';

/**
 * Renders either the verified real screenshot of a project (with graceful fallback
 * if an image fails to load) or an authentic, custom-designed architectural SVG
 * preview based on the actual project's functionality.
 */
export default function ProjectPreviewVisual({ project, className = '' }) {
  const [imgError, setImgError] = useState(false);

  if (project.coverImage && !imgError && project.previewType !== 'neon-game') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#0d0e12] ${className}`}>
        <img
          src={project.coverImage}
          alt={`${project.name} preview`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 border border-white/5" />
      </div>
    );
  }

  if (project.previewType === 'neon-game') {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#07090e] flex flex-col justify-between p-5 select-none ${className}`}
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-[#6ee7b7] opacity-80">
          <span>SECTOR 01 // 4200x4200 GRID</span>
          <span>60 FPS CANVAS + WEBAUDIO</span>
        </div>
        <div className="my-auto flex flex-col items-center justify-center py-4">
          {!imgError && project.coverImage ? (
            <img
              src={project.coverImage}
              alt="NEON PROTOCOL OVERDRIVE Logo"
              onError={() => setImgError(true)}
              className="w-full max-w-[340px] h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="font-display text-2xl font-bold tracking-tight text-white">
              NEON PROTOCOL // OVERDRIVE
            </div>
          )}
        </div>
        <div className="grid grid-cols-6 gap-1.5 font-mono text-[10px] text-[#94a3b8]">
          {['[Q] KATANA', '[R] ION BEAM', '[F] STASIS', '[X] CLONE', '[E] SERAPH', '[SPC] DASH'].map(
            (slot) => (
              <div
                key={slot}
                className="border border-[#1e293b] bg-[#0f172a]/90 px-1.5 py-1 text-center truncate"
              >
                {slot}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  if (project.previewType === 'pk-icons') {
    const samplePaths = [
      <path key="1" d="M12 5v14M5 12h14" />,
      <polyline key="2" points="16 18 22 12 16 6 8 6 2 12 8 18" />,
      <path key="3" d="M12 2a10 10 0 1 0 10 10H12V2z" />,
      <rect key="4" x="3" y="3" width="18" height="18" rx="3" />,
      <polygon key="5" points="12 2 2 7 12 12 22 7 12 2" />,
      <circle key="6" cx="12" cy="12" r="8" />,
      <path key="7" d="M4 17l6-6-6-6M12 19h8" />,
      <path key="8" d="M12 2L15 8l6 1-4.5 4.5 1 6.5-5.5-3-5.5 3 1-6.5L3 9l6-1z" />,
      <path key="9" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
      <path key="10" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
      <circle key="11" cx="11" cy="11" r="7" />,
      <path key="12" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    ];

    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#0c0d10] p-5 flex flex-col justify-between select-none ${className}`}
      >
        <div className="flex items-center justify-between border-b border-[#22252d] pb-2.5 font-mono text-[11px] text-[#8c9099]">
          <span className="text-[#eceae4] font-semibold">PK-icons // 24x24 Grid</span>
          <span className="text-[#d4a528]">50 Vectors · Stroke 2px</span>
        </div>
        <div className="grid grid-cols-6 gap-2 my-3">
          {samplePaths.map((p, idx) => (
            <div
              key={idx}
              className="aspect-square border border-[#22252d] bg-[#13151a] flex items-center justify-center text-[#eceae4] group-hover:border-[#d4a528]/50 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                {p}
              </svg>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-[#8c9099]">
          <span>viewBox=&quot;0 0 24 24&quot;</span>
          <span>SVG / JS / ZIP Export</span>
        </div>
      </div>
    );
  }

  if (project.previewType === 'studio-code') {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#090d16] p-5 flex flex-col justify-between font-mono text-[11px] select-none ${className}`}
      >
        <div className="flex items-center justify-between border-b border-[#1e2636] pb-2 text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#38bdf8]" />
            <span className="text-[#f8fafc] font-semibold">PK Studio Code</span>
          </div>
          <span className="text-[10px] text-[#38bdf8]">Monaco + REPL</span>
        </div>
        <div className="my-2 space-y-1.5 text-[11px] leading-relaxed">
          <div className="text-[#64748b]">// ideController.js — Multi-model workspace</div>
          <div>
            <span className="text-[#38bdf8]">const</span>{' '}
            <span className="text-[#f8fafc]">editor</span> = monaco.editor.create(container, &#123;
          </div>
          <div className="pl-4 text-[#cbd5e1]">
            theme: <span className="text-[#fde047]">&apos;pk-future&apos;</span>,
          </div>
          <div className="pl-4 text-[#cbd5e1]">
            bracketPairColorization: <span className="text-[#4ade80]">true</span>,
          </div>
          <div className="text-[#f8fafc]">&#125;);</div>
        </div>
        <div className="border-t border-[#1e2636] pt-2 flex items-center justify-between text-[10px] text-[#64748b]">
          <span>AST Diagnostics: 0 Errors</span>
          <span>Local Build</span>
        </div>
      </div>
    );
  }

  if (project.previewType === 'kon-ai') {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#0b0d12] p-5 flex flex-col justify-between font-mono text-[11px] select-none ${className}`}
      >
        <div className="flex items-center justify-between border-b border-[#222631] pb-2">
          <span className="text-[#eceae4] font-semibold">KON // Code Workbench</span>
          <span className="text-[#d4a528] text-[10px]">SSE Stream · Port 5000</span>
        </div>
        <div className="my-3 space-y-2">
          <div className="border border-[#222631] bg-[#13161f] p-2.5 text-[#94a3b8] text-[11px]">
            Prompt: Explain how Coeng subscript stacking works in the input loop.
          </div>
          <div className="border-l-2 border-[#d4a528] pl-2.5 text-[#eceae4] text-[11px]">
            Tracing <span className="text-[#d4a528]">typing.js</span>: Base consonant is buffered first, then U+17D2 joins the next keystroke.
          </div>
        </div>
        <div className="flex gap-1.5 text-[10px] text-[#8c9099]">
          <span className="border border-[#222631] px-2 py-0.5">Explain</span>
          <span className="border border-[#222631] px-2 py-0.5">Debug</span>
          <span className="border border-[#222631] px-2 py-0.5">Refactor</span>
        </div>
      </div>
    );
  }

  if (project.previewType === 'pk-music') {
    const bars = [35, 68, 52, 84, 64, 42, 76, 90, 58, 45];
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#0c0d10] p-5 flex flex-col justify-between font-mono text-[11px] select-none ${className}`}
      >
        <div className="flex items-center justify-between border-b border-[#23252c] pb-2">
          <span className="text-[#eceae4] font-semibold">PK Music Desktop v0.1</span>
          <span className="text-[#8c9099] text-[10px]">pkmedia:// Protocol</span>
        </div>
        <div className="my-3 flex items-end justify-between gap-1.5 h-20 px-2">
          {bars.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <div
                className="w-full bg-[#d4a528]/80 transition-all duration-300 group-hover:bg-[#d4a528]"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#8c9099] border-t border-[#23252c] pt-2">
          <span>10-Band BiquadFilter EQ</span>
          <span>FLAC / MP3 / LRC</span>
        </div>
      </div>
    );
  }

  if (project.previewType === 'brain-lab') {
    return (
      <div
        className={`relative w-full h-full overflow-hidden bg-[#090b10] p-6 flex flex-col justify-between select-none ${className}`}
      >
        <div className="flex items-center justify-between border-b border-line pb-2.5 font-mono text-[11px] text-muted">
          <span className="text-ink font-semibold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
            <span>PK Brain Lab // Neural Core</span>
          </span>
          <span className="text-accent font-bold">9 Cognitive Cores</span>
        </div>

        <div className="my-auto py-4 flex flex-col items-center justify-center relative">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-accent/20 border-dashed animate-spin [animation-duration:20s]" />
            <img
              src="./assets/pk-brain-logo.svg"
              alt="PK Brain Lab Golden Emblem"
              className="w-24 h-24 object-contain filter drop-shadow-[0_0_16px_rgba(212,165,40,0.4)]"
            />
          </div>
          <div className="mt-2 font-mono text-xs text-accent font-bold tracking-wider uppercase">
            Dual-Hemisphere Architecture
          </div>
          <div className="text-[10px] text-muted font-mono mt-0.5">
            Organic Cortex · Digital Synapse Circuit
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px] text-center">
          <div className="border border-line bg-surface/80 p-1.5 text-muted truncate">
            Dual N-Back
          </div>
          <div className="border border-line bg-surface/80 p-1.5 text-muted truncate">
            Adaptive Engine
          </div>
          <div className="border border-line bg-surface/80 p-1.5 text-muted truncate">
            Reflex Latency
          </div>
        </div>
      </div>
    );
  }

  // Default architectural fallback preview (e.g., Arachne Desktop Clock or future entries)
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#0c0d10] p-5 flex flex-col justify-between font-mono select-none ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#23252c] pb-2 text-[11px] text-[#8c9099]">
        <span className="text-[#eceae4] font-semibold">{project.name}</span>
        <span>{project.category}</span>
      </div>
      <div className="my-auto py-4 text-center">
        <div className="font-mono text-3xl font-bold tracking-widest text-[#eceae4]">
          00 : 45 : 12
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#d4a528]">
          ALARM · TIMER · STOPWATCH
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#23252c] pt-2 text-[10px] text-[#8c9099]">
        <span>{project.technologies?.slice(0, 3).join(' · ')}</span>
        <span>{project.status}</span>
      </div>
    </div>
  );
}
