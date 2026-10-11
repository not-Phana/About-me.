import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { IconArrowRight, IconArrowUpRight } from './Icons';

const GREEK_EPIGRAPHS = [
  {
    id: 'gnothi',
    greek: 'ΓΝΩΘΙ ΣΑΥΤΟΝ',
    translit: 'Gnōthi sauton',
    translation: 'Know thyself.',
    source: 'Delphic Maxim I · Pronaos of the Temple of Apollo at Delphi',
    connection:
      'Understanding your own limits, curiosity, and reasoning before outsourcing decisions to automated tools.',
  },
  {
    id: 'techne',
    greek: 'ΤΕΧΝΗ ΚΑΙ ΕΠΙΣΤΗΜΗ',
    translit: 'Technē kai Epistēmē',
    translation: 'Craft and reasoned understanding.',
    source: 'Aristotle · Nicomachean Ethics, Book VI (1139b–1140a)',
    connection:
      'Pairing hands-on building (technē) with a genuine grasp of how the underlying code and systems operate (epistēmē).',
  },
  {
    id: 'meden',
    greek: 'ΜΗΔΕΝ ΑΓΑΝ',
    translit: 'Mēden agan',
    translation: 'Nothing in excess.',
    source: 'Delphic Maxim II · Inscribed at Delphi',
    connection:
      'Restraint in software design: clear typography, purposeful structure, and zero unnecessary bloat.',
  },
];

const PHILOSOPHY_SEQUENCE = [
  {
    numeral: 'I',
    stephanus: '401a',
    greek: 'ΠΟΙΗΣΙΣ · POIĒSIS',
    word: 'Build.',
    statement: 'Turn ideas into working projects.',
    scholium:
      'In classical Greek thought, poiēsis is the act of bringing something from non-existence into reality. Rather than leaving concepts as notes, I turn them into usable software—from a 218-lesson Khmer typing platform to custom SVG icon tools and browser games.',
  },
  {
    numeral: 'II',
    stephanus: '401b',
    greek: 'ΕΠΙΣΤΗΜΗ · EPISTĒMĒ',
    word: 'Understand.',
    statement:
      'Learn how things work instead of relying entirely on tools.',
    scholium:
      'Modern AI and frameworks can generate code in seconds, but true capability comes from epistēmē—comprehending why a state transition works, how Unicode consonant clusters render, and how audio oscillators synthesize sound.',
  },
  {
    numeral: 'III',
    stephanus: '401c',
    greek: 'ΜΕΛΕΤΗ · MELETĒ',
    word: 'Improve.',
    statement:
      'Treat mistakes as opportunities to make the next version better.',
    scholium:
      'Meletē means disciplined practice and iterative refinement. Every broken layout, failed build, or unfinished prototype becomes raw material for making the next release sharper and more reliable.',
  },
];

const SCULPTURE_PLATES = [
  {
    id: 'frontal',
    code: 'PLATE I',
    shortLabel: 'Epikouros · Frontal',
    title: 'Marble Head of Epikouros (Epicurus, 341–270 BCE)',
    epigraphTop: 'ΓΝΩΘΙ',
    epigraphBottom: 'ΣΑΥΤΟΝ',
    epigraphSub: 'ΕΠΙΚΟΥΡΟΣ · ΑΘΗΝΑΙ',
    role: 'Philosopher of Inquiry & First Principles',
    src: './assets/met-epikouros-11-90.jpg',
    accession: 'Acc. No. 11.90 · Rogers Fund, 1911',
    medium: 'Pentelic marble · Height 19 5/8 in. (49.8 cm)',
    date: 'Roman copy (2nd century CE) of a Greek original of ca. 270 BCE',
    metUrl: 'https://www.metmuseum.org/art/collection/search/248475',
    caption:
      'Carved in luminous Pentelic marble, this portrait of Epicurus—founder of the Garden in Athens—embodies direct observation, intellectual independence, and the pursuit of clear understanding.',
    alt: 'Marble head of the Greek philosopher Epikouros (Epicurus), frontal view. Pentelic marble, Roman copy of a 3rd century BCE Greek original. The Metropolitan Museum of Art, Accession No. 11.90 (Public Domain CC0).',
  },
  {
    id: 'profile',
    code: 'PLATE II',
    shortLabel: 'Epikouros · Profile',
    title: 'Marble Head of Epikouros — Lateral Study',
    epigraphTop: 'ΤΕΧΝΗ',
    epigraphBottom: 'ΕΠΙΣΤΗΜΗ',
    epigraphSub: 'ΚΗΠΟΣ · ΑΘΗΝΑΙ',
    role: 'Lateral Profile Study Facing the Manuscript',
    src: './assets/met-epikouros-profile.jpg',
    accession: 'Acc. No. 11.90 · Rogers Fund, 1911',
    medium: 'Pentelic marble · Lateral three-quarter elevation',
    date: 'Roman copy (2nd century CE) after the 3rd century BCE Greek bronze',
    metUrl: 'https://www.metmuseum.org/art/collection/search/248475',
    caption:
      'Seen in left profile facing the biographical folio, the deep-set brow and sculpted locks illustrate the high Hellenistic mastery of natural form and contemplative focus.',
    alt: 'Marble head of the Greek philosopher Epikouros (Epicurus), left-facing profile study. Pentelic marble. The Metropolitan Museum of Art, Accession No. 11.90 (Public Domain CC0).',
  },
  {
    id: 'chrysippos',
    code: 'PLATE III',
    shortLabel: 'Chrysippos · Logic',
    title: 'Marble Portrait Head of Chrysippos (c. 279–206 BCE)',
    epigraphTop: 'ΛΟΓΙΚΗ',
    epigraphBottom: 'ΣΥΣΤΗΜΑ',
    epigraphSub: 'ΧΡΥΣΙΠΠΟΣ · ΣΤΟΑ',
    role: 'Pioneer of Propositional Logic & Formal Systems',
    src: './assets/met-chrysippos-24-243.jpg',
    accession: 'Acc. No. 24.243 · Fletcher Fund, 1924',
    medium: 'Marble · Height 10 3/8 in. (26.4 cm)',
    date: 'Roman copy (1st century CE) of a Hellenistic Greek original of the late 3rd century BCE',
    metUrl: 'https://www.metmuseum.org/art/collection/search/251787',
    caption:
      'Chrysippos of Soli formulated the first formal system of propositional logic (connectives of IF-THEN, AND, OR, NOT)—the direct philosophical ancestor of Boolean algebra and modern programming.',
    alt: 'Marble portrait head of the Greek philosopher Chrysippos. The Metropolitan Museum of Art, Accession No. 24.243 (Public Domain CC0).',
  },
];

const CODEX_WORKS = [
  {
    liber: 'LIBER I',
    greek: 'ΓΛΩΣΣΑ',
    id: 'pk-khmer-type',
    title: 'PK Khmer Type',
    note: '218-lesson Khmer Standard & NiDA typing curriculum with 3D hand kinematics.',
  },
  {
    liber: 'LIBER II',
    greek: 'ΟΡΓΑΝΟΝ',
    id: 'pk-studio-code',
    title: 'PK Studio Code',
    note: 'Monaco-powered code workbench & multi-buffer developer environment.',
  },
  {
    liber: 'LIBER III',
    greek: 'ΝΟΥΣ',
    id: 'kon-assistant',
    title: 'KON Intelligence',
    note: 'Personal AI engineering assistant & local streaming reasoning workspace.',
  },
  {
    liber: 'LIBER IV',
    greek: 'ΚΙΝΗΣΙΣ',
    id: 'neon-protocol',
    title: 'Neon Protocol',
    note: '60fps HTML5 Canvas tactical cyber-defense engine with procedural synth.',
  },
];

export default function AboutSection({
  onExploreProjects,
  onSelectProject,
  onPlaySound,
}) {
  const [activePlateId, setActivePlateId] = useState('frontal');
  const [curatorialLens, setCuratorialLens] = useState('canon'); // 'gallery' | 'canon' | 'epigraphy'
  const [folioMaterial, setFolioMaterial] = useState('auto'); // 'auto' | 'stone' | 'vellum'
  const [activeScholium, setActiveScholium] = useState('I');
  const [activeEpigraphId, setActiveEpigraphId] = useState('gnothi');

  const currentPlate =
    SCULPTURE_PLATES.find((p) => p.id === activePlateId) || SCULPTURE_PLATES[0];
  const currentEpigraph =
    GREEK_EPIGRAPHS.find((e) => e.id === activeEpigraphId) || GREEK_EPIGRAPHS[0];

  const handleExploreClick = (e) => {
    if (onExploreProjects) {
      e.preventDefault();
      if (onPlaySound) onPlaySound('switch');
      onExploreProjects();
    }
  };

  return (
    <section
      id="about"
      aria-labelledby="about-editorial-heading"
      data-folio={folioMaterial === 'auto' ? undefined : folioMaterial}
      className="greek-archive-section relative border-b border-[var(--ms-rule)] overflow-hidden"
    >
      {/* Subtle SVG Stone & Antique Paper Grain Texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="archive-paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#archive-paper-grain)" />
      </svg>

      {/* Main Manuscript Container */}
      <div className="relative mx-auto max-w-[1400px] border-x border-[var(--ms-rule)]">
        {/* ================================================================
            TOP ARCHIVAL FOLIO RUNNING HEADER & MATERIAL SWITCHER
            ================================================================ */}
        <div className="border-b border-[var(--ms-rule)] px-6 py-3.5 sm:px-10 lg:px-14 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ms-marble)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--ms-bronze)] font-semibold">
              FOLIO IV · RECTO
            </span>
            <span aria-hidden="true">—</span>
            <span>ARCHIVE OF THE BUILDER // PHANA KUROSAKI (KON)</span>
          </div>

          {/* Interactive Manuscript Material Switcher: Stone Stele vs Vellum Parchment */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden sm:inline text-[10px] text-[var(--ms-marble)]">
              MANUSCRIPT SURFACE:
            </span>
            <div
              className="inline-flex border border-[var(--ms-rule-strong)] bg-[var(--ms-surface)]"
              role="group"
              aria-label="Manuscript surface material"
            >
              {[
                { id: 'stone', label: 'I. Obsidian Stele' },
                { id: 'vellum', label: 'II. Vellum Parchment' },
              ].map((mode) => {
                const isSelected =
                  folioMaterial === mode.id ||
                  (folioMaterial === 'auto' && mode.id === 'stone');
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      if (onPlaySound) onPlaySound('switch');
                      setFolioMaterial(mode.id);
                    }}
                    className={`px-3 py-1 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                      isSelected
                        ? 'bg-[var(--ms-bronze)] text-[#0d0c0a] font-semibold'
                        : 'text-[var(--ms-marble)] hover:text-[var(--ms-ivory)]'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================
            INTERACTIVE EPIGRAPHIC ARCHIVE BAR (VERIFIED GREEK INSCRIPTIONS)
            ================================================================ */}
        <div className="border-b border-[var(--ms-rule)] bg-[var(--ms-surface)]/60 px-6 py-3 sm:px-10 lg:px-14 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-marble)] mr-1">
              INSCRIPTION GLOSS:
            </span>
            {GREEK_EPIGRAPHS.map((ep) => {
              const active = ep.id === activeEpigraphId;
              return (
                <button
                  key={ep.id}
                  type="button"
                  onClick={() => {
                    if (onPlaySound) onPlaySound('key');
                    setActiveEpigraphId(ep.id);
                  }}
                  lang="el"
                  className={`px-2.5 py-1 border font-classical text-xs tracking-[0.16em] transition-colors ${
                    active
                      ? 'border-[var(--ms-bronze)] bg-[var(--ms-parchment)] text-[var(--ms-ivory)] font-semibold'
                      : 'border-[var(--ms-rule)] text-[var(--ms-marble)] hover:text-[var(--ms-ivory)]'
                  }`}
                >
                  {ep.greek}
                </button>
              );
            })}
          </div>

          <div className="font-classical text-sm text-[var(--ms-limestone)] flex flex-wrap items-baseline gap-2">
            <span className="italic text-[var(--ms-bronze)] font-semibold">
              &ldquo;{currentEpigraph.translation}&rdquo;
            </span>
            <span className="text-xs text-[var(--ms-marble)] font-mono">
              — {currentEpigraph.source}
            </span>
          </div>
        </div>

        {/* ================================================================
            MAIN ASYMMETRICAL EDITORIAL EXHIBITION GRID
            ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative">
          {/* Background Cropped Manuscript Watermark Across Left Column */}
          <div
            aria-hidden="true"
            lang="el"
            className="pointer-events-none select-none absolute -left-8 top-24 font-classical text-[6.5rem] sm:text-[9rem] font-semibold tracking-[0.12em] leading-none text-[var(--ms-epigraph)] opacity-60"
          >
            ΓΝΩΘΙ
          </div>

          {/* ================================================================
              LEFT COLUMN (7 COLS): PERSONAL BIOGRAPHY & PHILOSOPHICAL SEQUENCE
              ================================================================ */}
          <div className="lg:col-span-7 relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 border-b lg:border-b-0 lg:border-r border-[var(--ms-rule)] flex flex-col justify-between">
            {/* Editorial Section Header */}
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-[var(--ms-rule)] pb-3.5">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ms-bronze)]">
                  SECTION IV — PORTRAIT OF THE BUILDER
                </span>
                <span
                  className="font-classical italic text-sm tracking-[0.14em] text-[var(--ms-marble)]"
                  lang="el"
                >
                  Γνῶθι σαυτόν · Τέχνη καὶ Ἐπιστήμη
                </span>
              </div>

              {/* Expressive Classical Serif Headline */}
              <h2
                id="about-editorial-heading"
                className="font-classical text-4xl sm:text-6xl xl:text-[4.25rem] font-normal tracking-[-0.015em] text-[var(--ms-ivory)] leading-[1.03]"
              >
                <span className="block font-semibold">
                  A mind that builds.
                </span>
                <span className="block italic font-normal text-[var(--ms-limestone)] mt-1">
                  A journey still being written.
                </span>
              </h2>

              {/* Engraved Identity Sub-rule */}
              <div className="mt-6 mb-8 flex flex-wrap items-center gap-4">
                <span className="h-[1px] w-12 bg-[var(--ms-bronze)]" />
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
                  {PROFILE.fullName} · PREFERRED: {PROFILE.displayName.toUpperCase()} ·
                  ALIAS: {PROFILE.nickname} · BRAND: {PROFILE.brand}
                </span>
              </div>

              {/* Personal Biography with Stephanus-Style Manuscript Line Numbers & Aldine Drop Cap */}
              <div className="relative pl-0 sm:pl-9 sm:border-l border-[var(--ms-rule)]">
                {/* Classical Stephanus Margin Line Markers (Desktop/Tablet) */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex flex-col justify-between absolute left-2 top-1 bottom-1 font-mono text-[9px] text-[var(--ms-marble)]/60 select-none"
                >
                  <span>400a</span>
                  <span>400b</span>
                  <span>400c</span>
                  <span>400d</span>
                </div>

                <div className="space-y-5 max-w-[60ch] text-base sm:text-[1.06rem] text-[var(--ms-limestone)] leading-[1.78]">
                  <p className="manuscript-dropcap text-[var(--ms-ivory)] text-lg sm:text-[1.18rem] leading-[1.68] font-classical">
                    I&apos;m Phana Kurosaki—also known as Phana or KON—an
                    independent builder who enjoys turning ideas into working
                    projects.
                  </p>
                  <p>
                    From web development and developer tools to experiments with
                    AI and interactive software, I like exploring what I can
                    create, learning how things work, and improving my projects
                    along the way.
                  </p>
                  <p>
                    I use modern tools to expand what I can build, but I also
                    want to understand the work behind the result. Using AI as a
                    tool is most meaningful when paired with genuine curiosity
                    and a clear understanding of the craft underneath.
                  </p>
                  <p>
                    This is where my ideas become projects, mistakes become
                    lessons, and unfinished experiments become something better.
                  </p>
                </div>
              </div>
            </div>

            {/* ==============================================================
                PERSONAL PHILOSOPHY SEQUENCE (I. BUILD · II. UNDERSTAND · III. IMPROVE)
                ============================================================== */}
            <div className="mt-12 pt-9 border-t border-[var(--ms-rule)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ms-bronze)]">
                  § I–III · THREE PRINCIPLES OF CRAFT (CLICK TO READ SCHOLIUM)
                </span>
                <span
                  className="font-classical text-xs tracking-[0.2em] uppercase text-[var(--ms-marble)]"
                  lang="el"
                >
                  ΜΗΔΕΝ ΑΓΑΝ · NOTHING IN EXCESS
                </span>
              </div>

              <ol className="divide-y divide-[var(--ms-rule)] border-y border-[var(--ms-rule)]">
                {PHILOSOPHY_SEQUENCE.map((item) => {
                  const isExpanded = activeScholium === item.numeral;
                  return (
                    <li key={item.numeral} className="py-4 sm:py-5">
                      <button
                        type="button"
                        onClick={() => {
                          if (onPlaySound) onPlaySound('key');
                          setActiveScholium(
                            isExpanded ? '' : item.numeral
                          );
                        }}
                        aria-expanded={isExpanded}
                        className="w-full text-left grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline group"
                      >
                        <div className="sm:col-span-4 flex items-baseline gap-3">
                          <span className="font-classical italic text-lg text-[var(--ms-bronze)] w-6 shrink-0">
                            {item.numeral}.
                          </span>
                          <span className="font-classical text-2xl sm:text-[1.7rem] font-semibold text-[var(--ms-ivory)] group-hover:text-[var(--ms-bronze)] transition-colors tracking-tight">
                            {item.word}
                          </span>
                        </div>

                        <div className="sm:col-span-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                          <span className="text-sm sm:text-base text-[var(--ms-limestone)] leading-relaxed">
                            {item.statement}
                          </span>
                          <span
                            className="font-mono text-[10px] tracking-[0.14em] text-[var(--ms-marble)] shrink-0"
                            lang="el"
                          >
                            [{item.stephanus}] {item.greek}
                          </span>
                        </div>
                      </button>

                      {/* Expandable Manuscript Marginalia Gloss (Scholium) */}
                      {isExpanded && (
                        <div className="mt-3 sm:ml-9 pl-4 border-l border-[var(--ms-bronze)] font-classical text-base italic text-[var(--ms-limestone)] leading-relaxed">
                          <span className="font-mono not-italic text-[10px] tracking-[0.14em] uppercase text-[var(--ms-bronze)] block mb-1">
                            SCHOLIUM AD § {item.numeral} ({item.greek}):
                          </span>
                          {item.scholium}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Bottom Editorial Link & Archival Signature */}
            <div className="mt-9 pt-6 flex flex-wrap items-center justify-between gap-6">
              <a
                href="#projects"
                onClick={handleExploreClick}
                className="editorial-link font-classical text-xl sm:text-2xl italic text-[var(--ms-ivory)] hover:text-[var(--ms-bronze)] transition-colors"
              >
                <span>Explore the archive of projects</span>
                <IconArrowRight className="w-4 h-4 text-[var(--ms-bronze)]" />
              </a>

              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ms-marble)]">
                FOLIO SIGNED: <span className="text-[var(--ms-ivory)]">PK // KON</span> ·
                ANNO MMXXVI
              </div>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN (5 COLS): CLASSICAL MARBLE SCULPTURE EXHIBITION
              ================================================================ */}
          <div className="lg:col-span-5 relative bg-[#090909] text-[#efe8d8] flex flex-col justify-between overflow-hidden">
            {/* Background Layer: Monumental Greek Epigraphy & Classical Proportion Geometry */}
            <div
              className="pointer-events-none select-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              {/* Engraved Vitruvian / Polykleitos Golden Ratio Geometric Canon SVG */}
              <svg
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  curatorialLens === 'canon'
                    ? 'opacity-[0.34]'
                    : curatorialLens === 'epigraphy'
                    ? 'opacity-[0.16]'
                    : 'opacity-[0.07]'
                }`}
                viewBox="0 0 500 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer & Inner Harmonic Proportion Rings */}
                <circle
                  cx="250"
                  cy="315"
                  r="205"
                  stroke="#cda869"
                  strokeWidth="0.85"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="250"
                  cy="315"
                  r="126.7"
                  stroke="#efe8d8"
                  strokeWidth="0.6"
                />
                {/* Golden Ratio Rectangle (250x404) */}
                <rect
                  x="125"
                  y="113"
                  width="250"
                  height="404"
                  stroke="#cda869"
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                />
                {/* Central Vertical & Cranial Sightlines */}
                <line
                  x1="250"
                  y1="0"
                  x2="250"
                  y2="700"
                  stroke="#efe8d8"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1="255"
                  x2="500"
                  y2="255"
                  stroke="#cda869"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1="315"
                  x2="500"
                  y2="315"
                  stroke="#efe8d8"
                  strokeWidth="0.5"
                />
                {/* Diagonal Harmonic Chords */}
                <line
                  x1="125"
                  y1="113"
                  x2="375"
                  y2="517"
                  stroke="#cda869"
                  strokeWidth="0.45"
                />
                <line
                  x1="375"
                  y1="113"
                  x2="125"
                  y2="517"
                  stroke="#cda869"
                  strokeWidth="0.45"
                />
                {curatorialLens === 'canon' && (
                  <>
                    <text
                      x="132"
                      y="128"
                      fill="#cda869"
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="9"
                      letterSpacing="1.5"
                    >
                      Φ = 1.61803 · ΚΑΝΩΝ
                    </text>
                    <text
                      x="256"
                      y="249"
                      fill="#efe8d8"
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="8"
                      letterSpacing="1.2"
                    >
                      AXIS OCULI · II:III
                    </text>
                  </>
                )}
              </svg>

              {/* Monumental Cropped Greek Stone Inscription Behind Sculpture */}
              <div
                lang="el"
                className={`font-classical font-semibold tracking-[0.07em] leading-[0.86] transition-opacity duration-500 ${
                  curatorialLens === 'epigraphy'
                    ? 'text-[#cda869]/[0.22]'
                    : 'text-[#efe8d8]/[0.085]'
                }`}
              >
                <div className="text-[5.2rem] sm:text-[7.2rem] lg:text-[6.5rem] xl:text-[8rem] -ml-3 mt-10 whitespace-nowrap">
                  {currentPlate.epigraphTop}
                </div>
                <div className="text-[5.2rem] sm:text-[7.2rem] lg:text-[6.5rem] xl:text-[8rem] ml-6 whitespace-nowrap">
                  {currentPlate.epigraphBottom}
                </div>
              </div>

              {/* Lower Epigraphic Fragment */}
              <div
                lang="el"
                className={`absolute bottom-52 -right-4 font-classical italic text-3xl sm:text-5xl tracking-[0.14em] whitespace-nowrap transition-opacity duration-500 ${
                  curatorialLens === 'epigraphy'
                    ? 'text-[#efe8d8]/[0.16]'
                    : 'text-[#efe8d8]/[0.055]'
                }`}
              >
                {currentPlate.epigraphSub}
              </div>
            </div>

            {/* Top Curatorial Controls: Plate Switcher & Lens Mode */}
            <div className="relative z-10 px-6 pt-6 sm:px-8 sm:pt-7 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[#a09786]">
                <span>MUSEUM ARCHIVE // {currentPlate.code}</span>
                <span>MET OPEN ACCESS · CC0</span>
              </div>

              {/* Sculpture Plate Selector (Epikouros Frontal / Profile / Chrysippos Logic) */}
              <div
                className="grid grid-cols-3 border border-[#2a2620] bg-[#12100d]/90 divide-x divide-[#2a2620]"
                role="group"
                aria-label="Select classical sculpture exhibit plate"
              >
                {SCULPTURE_PLATES.map((plate) => {
                  const active = plate.id === activePlateId;
                  return (
                    <button
                      key={plate.id}
                      type="button"
                      onClick={() => {
                        if (onPlaySound) onPlaySound('switch');
                        setActivePlateId(plate.id);
                      }}
                      className={`px-2 py-2 text-center font-mono text-[10px] tracking-[0.08em] uppercase transition-colors ${
                        active
                          ? 'bg-[#cda869] text-[#090909] font-semibold'
                          : 'text-[#a09786] hover:text-[#efe8d8]'
                      }`}
                    >
                      <span className="block">{plate.code}</span>
                      <span className="block text-[9px] opacity-80 truncate mt-0.5">
                        {plate.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Curatorial Inspection Lens Switcher */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#8f8777]">
                  CURATORIAL LENS:
                </span>
                <div
                  className="inline-flex border border-[#2a2620] bg-[#12100d]/90"
                  role="group"
                  aria-label="Curatorial overlay mode"
                >
                  {[
                    { id: 'gallery', label: 'Chiaroscuro' },
                    { id: 'canon', label: 'Canon Φ' },
                    { id: 'epigraphy', label: 'Epigraphia' },
                  ].map((lens) => (
                    <button
                      key={lens.id}
                      type="button"
                      onClick={() => {
                        if (onPlaySound) onPlaySound('key');
                        setCuratorialLens(lens.id);
                      }}
                      className={`px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] uppercase transition-colors ${
                        curatorialLens === lens.id
                          ? 'bg-[#2a2620] text-[#cda869] font-semibold'
                          : 'text-[#8f8777] hover:text-[#efe8d8]'
                      }`}
                    >
                      {lens.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Monumental Marble Sculpture Figure */}
            <figure className="sculpture-stage relative z-10 my-auto flex flex-col items-center justify-center px-4 sm:px-8 py-3">
              <div className="relative w-full max-w-[420px] aspect-[3/4] flex items-center justify-center overflow-hidden">
                <img
                  key={currentPlate.src}
                  src={currentPlate.src}
                  alt={currentPlate.alt}
                  loading="lazy"
                  className="sculpture-plate-img w-full h-full object-contain select-none"
                />

                {/* Subtle museum chiaroscuro edge vignette so the sculpture merges naturally into the dark stone niche */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 46%, transparent 50%, #090909 95%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </figure>

            {/* Museum Archival Caption & Provenance Plaque */}
            <figcaption className="relative z-10 border-t border-[#26231d] bg-[#0c0b09]/95 px-6 py-5 sm:px-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[#cda869]">
                <span>{currentPlate.title}</span>
                <span>{currentPlate.code}</span>
              </div>

              <div className="mt-1 font-mono text-[10px] text-[#8f8777]">
                {currentPlate.date} · {currentPlate.medium}
              </div>

              <p className="mt-2.5 font-classical text-sm sm:text-[15px] text-[#c9bfa9] leading-relaxed">
                {currentPlate.caption}
              </p>

              <div className="mt-3.5 pt-2.5 border-t border-[#1f1c17] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.1em] text-[#8f8777]">
                <span>
                  THE METROPOLITAN MUSEUM OF ART · {currentPlate.accession.toUpperCase()}
                </span>
                <a
                  href={currentPlate.metUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#cda869] hover:underline"
                >
                  <span>Verify Museum Record</span>
                  <IconArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </figcaption>
          </div>
        </div>

        {/* ================================================================
            BOTTOM FOLIO BAND: CODEX OPERUM (CLASSICAL CATALOGUE OF WORKS)
            ================================================================ */}
        <div className="border-t border-[var(--ms-rule)] bg-[var(--ms-surface)]/50">
          <div className="px-6 py-3 sm:px-10 lg:px-14 border-b border-[var(--ms-rule)] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
            <span>
              CODEX OPERUM // SELECTED WORKS BY PHANA KUROSAKI (CLICK TO INSPECT)
            </span>
            <span lang="el" className="font-classical text-xs tracking-[0.2em]">
              ΕΡΓΑ ΚΑΙ ΗΜΕΡΑΙ · WORKS &amp; STUDIES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--ms-rule)]">
            {CODEX_WORKS.map((work) => (
              <button
                key={work.id}
                type="button"
                onClick={() => {
                  if (onPlaySound) onPlaySound('switch');
                  if (onSelectProject) {
                    onSelectProject(work.id);
                  } else if (onExploreProjects) {
                    onExploreProjects();
                  }
                }}
                className="p-5 sm:p-6 text-left hover:bg-[var(--ms-parchment)]/60 transition-colors group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.14em] text-[var(--ms-bronze)] mb-2">
                    <span>{work.liber}</span>
                    <span lang="el" className="text-[var(--ms-marble)]">
                      {work.greek}
                    </span>
                  </div>
                  <div className="font-classical text-xl font-semibold text-[var(--ms-ivory)] group-hover:text-[var(--ms-bronze)] transition-colors">
                    {work.title}
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--ms-limestone)] leading-relaxed">
                    {work.note}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[var(--ms-rule)] flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ms-marble)] group-hover:text-[var(--ms-ivory)]">
                  <span>Inspect Folio</span>
                  <IconArrowRight className="w-3 h-3 text-[var(--ms-bronze)]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
