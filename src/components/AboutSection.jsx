import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { IconArrowRight, IconArrowUpRight } from './Icons';

const PHILOSOPHY_SEQUENCE = [
  {
    numeral: 'I',
    greek: 'ΠΟΙΗΣΙΣ · POIĒSIS',
    word: 'Build.',
    statement: 'Turn ideas into working projects.',
  },
  {
    numeral: 'II',
    greek: 'ΕΠΙΣΤΗΜΗ · EPISTĒMĒ',
    word: 'Understand.',
    statement:
      'Learn how things work instead of relying entirely on tools.',
  },
  {
    numeral: 'III',
    greek: 'ΜΕΛΕΤΗ · MELETĒ',
    word: 'Improve.',
    statement:
      'Treat mistakes as opportunities to make the next version better.',
  },
];

const SCULPTURE_PLATES = [
  {
    id: 'frontal',
    code: 'PLATE I',
    label: 'Frontal Elevation',
    src: './assets/met-epikouros-11-90.jpg',
    alt: 'Marble head of the Greek philosopher Epikouros (Epicurus), frontal view. Pentelic marble, Roman copy of a 3rd century BCE Greek original. The Metropolitan Museum of Art, Accession No. 11.90 (Public Domain CC0).',
  },
  {
    id: 'profile',
    code: 'PLATE II',
    label: 'Profile Study',
    src: './assets/met-epikouros-profile.jpg',
    alt: 'Marble head of the Greek philosopher Epikouros (Epicurus), left-facing profile study. Pentelic marble, Roman copy of a 3rd century BCE Greek original. The Metropolitan Museum of Art, Accession No. 11.90 (Public Domain CC0).',
  },
];

export default function AboutSection({ onExploreProjects }) {
  const [activePlate, setActivePlate] = useState('frontal');
  const currentPlate =
    SCULPTURE_PLATES.find((p) => p.id === activePlate) || SCULPTURE_PLATES[0];

  const handleExploreClick = (e) => {
    if (onExploreProjects) {
      e.preventDefault();
      onExploreProjects();
    }
  };

  return (
    <section
      id="about"
      aria-labelledby="about-editorial-heading"
      className="greek-archive-section relative border-b border-[var(--ms-rule)] overflow-hidden"
    >
      {/* Subtle SVG Stone & Antique Paper Grain Texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
         xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="archive-paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#archive-paper-grain)" />
      </svg>

      {/* Main Manuscript Container */}
      <div className="relative mx-auto max-w-[1400px] border-x border-[var(--ms-rule)]">
        {/* Top Archival Folio Running Header */}
        <div className="border-b border-[var(--ms-rule)] px-6 py-3.5 sm:px-10 lg:px-14 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ms-marble)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--ms-bronze)] font-semibold">
              FOLIO IV
            </span>
            <span aria-hidden="true">·</span>
            <span>ARCHIVE OF THE BUILDER</span>
          </div>

          <div
            className="hidden md:flex items-center gap-3 font-classical text-xs tracking-[0.22em] text-[var(--ms-limestone)]"
            lang="el"
          >
            <span>ΓΝΩΘΙ ΣΑΥΤΟΝ</span>
            <span className="text-[var(--ms-marble)] font-mono text-[10px] tracking-[0.12em]">
              (KNOW THYSELF · DELPHI)
            </span>
          </div>

          <div className="text-[var(--ms-marble)]">
            CAT. NO. PK-MMXXVI · SEC. 04
          </div>
        </div>

        {/* Asymmetrical Editorial Exhibition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative">
          {/* ================================================================
              LEFT COLUMN (7 COLS): PERSONAL INTRODUCTION, BIOGRAPHY & PHILOSOPHY
              ================================================================ */}
          <div className="lg:col-span-7 relative z-10 p-6 sm:p-10 lg:p-16 xl:p-20 border-b lg:border-b-0 lg:border-r border-[var(--ms-rule)] flex flex-col justify-between">
            {/* Faint Manuscript Marginalia along the upper-left folio edge */}
            <div
              className="pointer-events-none select-none mb-6 flex items-center justify-between border-b border-[var(--ms-rule)] pb-4"
              aria-hidden="true"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ms-bronze)]">
                SECTION IV — PORTRAIT &amp; MANUSCRIPT
              </span>
              <span
                className="font-classical italic text-sm tracking-[0.15em] text-[var(--ms-marble)]"
                lang="el"
              >
                Τέχνη καὶ Ἐπιστήμη
              </span>
            </div>

            {/* Expressive Classical Serif Headline */}
            <div>
              <h2
                id="about-editorial-heading"
                className="font-classical text-4xl sm:text-6xl xl:text-[4.15rem] font-normal tracking-[-0.015em] text-[var(--ms-ivory)] leading-[1.04]"
              >
                <span className="block font-semibold">
                  A mind that builds.
                </span>
                <span className="block italic font-normal text-[var(--ms-limestone)] mt-1">
                  A journey still being written.
                </span>
              </h2>

              {/* Engraved Epigraph Rule */}
              <div className="mt-7 mb-8 flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[var(--ms-bronze)]" />
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
                  {PROFILE.fullName} · ALSO KNOWN AS {PROFILE.preferredName.toUpperCase()} /{' '}
                  {PROFILE.nickname}
                </span>
              </div>

              {/* Personal Biography — Clean, Comfortable Editorial Reading Measure */}
              <div className="space-y-5 max-w-[60ch] text-base sm:text-[1.08rem] text-[var(--ms-limestone)] leading-[1.78] font-normal">
                <p className="text-[var(--ms-ivory)] text-lg sm:text-[1.18rem] leading-[1.68] font-classical">
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
                  I use modern tools to expand what I can build, but I also want
                  to understand the work behind the result. Using AI as an
                  instrument is valuable only when paired with genuine curiosity
                  and a clear grasp of the underlying craft.
                </p>
                <p>
                  This is where my ideas become projects, mistakes become
                  lessons, and unfinished experiments become something better.
                </p>
              </div>
            </div>

            {/* Personal Philosophy — Three Simple Principles Set as an Editorial Sequence */}
            <div className="mt-12 pt-10 border-t border-[var(--ms-rule)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--ms-bronze)]">
                  § I–III · PERSONAL PHILOSOPHY OF CRAFT
                </span>
                <span
                  className="font-classical text-xs tracking-[0.2em] uppercase text-[var(--ms-marble)]"
                  lang="el"
                >
                  ΜΗΔΕΝ ΑΓΑΝ · NOTHING IN EXCESS
                </span>
              </div>

              <ol className="divide-y divide-[var(--ms-rule)] border-y border-[var(--ms-rule)]">
                {PHILOSOPHY_SEQUENCE.map((item) => (
                  <li
                    key={item.numeral}
                    className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                  >
                    <div className="sm:col-span-4 flex items-baseline gap-3">
                      <span className="font-classical italic text-lg text-[var(--ms-bronze)] w-6 shrink-0">
                        {item.numeral}.
                      </span>
                      <span className="font-classical text-2xl sm:text-[1.65rem] font-semibold text-[var(--ms-ivory)] tracking-tight">
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
                        {item.greek}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Bottom Colophon & Subtle Link to Explore Projects */}
            <div className="mt-10 pt-6 flex flex-wrap items-center justify-between gap-6">
              <a
                href="#projects"
                onClick={handleExploreClick}
                className="editorial-link font-classical text-xl sm:text-2xl italic text-[var(--ms-ivory)] hover:text-[var(--ms-bronze)] transition-colors"
              >
                <span>Explore the archive of projects</span>
                <IconArrowRight className="w-4 h-4 text-[var(--ms-bronze)]" />
              </a>

              <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--ms-marble)]">
                BRAND: <span className="text-[var(--ms-ivory)]">{PROFILE.brand}</span> ·
                HANDLE: <span className="text-[var(--ms-ivory)]">@{PROFILE.githubUsername}</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN (5 COLS): CLASSICAL MARBLE SCULPTURE & EPIGRAPHY
              ================================================================ */}
          <div className="lg:col-span-5 relative bg-[#090909] text-[#ede6d6] flex flex-col justify-between overflow-hidden">
            {/* Signature Element: Giant Partially Cropped Greek Epigraph Behind the Sculpture */}
            <div
              className="pointer-events-none select-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              {/* Fine Engraved Architectural Sightlines & Proportion Circle */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.14]"
                viewBox="0 0 500 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="250"
                  cy="310"
                  r="195"
                  stroke="#c8a464"
                  strokeWidth="0.75"
                  strokeDasharray="3 3"
                />
                <circle
                  cx="250"
                  cy="310"
                  r="145"
                  stroke="#ede6d6"
                  strokeWidth="0.5"
                />
                <line
                  x1="250"
                  y1="0"
                  x2="250"
                  y2="700"
                  stroke="#ede6d6"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1="310"
                  x2="500"
                  y2="310"
                  stroke="#ede6d6"
                  strokeWidth="0.5"
                />
              </svg>

              {/* Monumental Cropped Delphic Inscription Behind Sculpture */}
              <div
                lang="el"
                className="font-classical font-semibold tracking-[0.08em] leading-[0.86] text-[#ede6d6]/[0.075]"
              >
                <div className="text-[5.5rem] sm:text-[7.5rem] lg:text-[6.8rem] xl:text-[8.2rem] -ml-4 mt-6 whitespace-nowrap">
                  ΓΝΩΘΙ
                </div>
                <div className="text-[5.5rem] sm:text-[7.5rem] lg:text-[6.8rem] xl:text-[8.2rem] ml-6 whitespace-nowrap">
                  ΣΑΥΤΟΝ
                </div>
              </div>

              {/* Secondary Manuscript Inscription Fragment Near Lower Plinth */}
              <div
                lang="el"
                className="absolute bottom-44 -right-6 font-classical italic text-4xl sm:text-5xl tracking-[0.14em] text-[#ede6d6]/[0.05] whitespace-nowrap"
              >
                ΕΠΙΚΟΥΡΟΣ · ΑΘΗΝΑΙ
              </div>
            </div>

            {/* Top Museum Plate Header */}
            <div className="relative z-10 px-6 pt-6 sm:px-10 sm:pt-8 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-[#a09786]">
              <span>EXHIBITION NICHE // {currentPlate.code}</span>
              <div
                className="inline-flex items-center border border-[#2a2721] bg-[#12110e]/90"
                role="group"
                aria-label="Select sculpture study angle"
              >
                {SCULPTURE_PLATES.map((plate) => {
                  const active = plate.id === activePlate;
                  return (
                    <button
                      key={plate.id}
                      type="button"
                      onClick={() => setActivePlate(plate.id)}
                      className={`px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors ${
                        active
                          ? 'bg-[#c8a464] text-[#0b0b0c] font-semibold'
                          : 'text-[#a09786] hover:text-[#ede6d6]'
                      }`}
                    >
                      {plate.code}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Monumental Marble Sculpture Figure */}
            <figure className="sculpture-stage relative z-10 my-auto flex flex-col items-center justify-center px-4 sm:px-8 pt-4 pb-2">
              <div className="relative w-full max-w-[430px] aspect-[3/4] flex items-center justify-center overflow-hidden">
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
                      'radial-gradient(circle at 50% 46%, transparent 52%, #090909 96%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </figure>

            {/* Museum Archival Caption & Provenance Plaque */}
            <figcaption className="relative z-10 border-t border-[#26231d] bg-[#0d0c0a]/95 px-6 py-5 sm:px-10">
              <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#c8a464]">
                <span>
                  FIG. IV — MARBLE HEAD OF EPIKOUROS (341–270 BCE)
                </span>
                <span>{currentPlate.label}</span>
              </div>

              <p className="mt-2 font-classical text-sm sm:text-[15px] text-[#c7bda8] leading-relaxed">
                Pentelic marble portrait of the Greek philosopher Epicurus,
                founder of the Garden in Athens. Roman copy (2nd century CE) of
                a Greek Hellenistic original of ca. 270 BCE.
              </p>

              <div className="mt-3 pt-2.5 border-t border-[#1f1c17] flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-[0.1em] text-[#8f8778]">
                <span>
                  THE METROPOLITAN MUSEUM OF ART · ACC. NO. 11.90 · PUBLIC
                  DOMAIN (CC0)
                </span>
                <a
                  href="https://www.metmuseum.org/art/collection/search/248475"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#c8a464] hover:underline"
                >
                  <span>Verify Museum Record</span>
                  <IconArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  );
}
