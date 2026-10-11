import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { IconArrowRight, IconArrowUpRight } from './Icons';

const PHILOSOPHY_PRINCIPLES = [
  {
    numeral: 'I',
    greek: 'Ποίησις',
    word: 'Build.',
    statement: 'Turn ideas into working projects.',
  },
  {
    numeral: 'II',
    greek: 'Ἐπιστήμη',
    word: 'Understand.',
    statement: 'Learn how things work instead of relying entirely on tools.',
  },
  {
    numeral: 'III',
    greek: 'Μελέτη',
    word: 'Improve.',
    statement:
      'Treat mistakes as opportunities to make the next version better.',
  },
];

const SCULPTURE_PLATES = [
  {
    id: 'frontal',
    numeral: 'Plate I',
    shortTitle: 'Epikouros (Frontal)',
    title: 'Marble Head of Epikouros (Epicurus, 341–270 BCE)',
    meta: 'Pentelic marble · After a 3rd century BCE Greek original · The Metropolitan Museum of Art (Acc. 11.90, CC0)',
    url: 'https://www.metmuseum.org/art/collection/search/248475',
    src: './assets/met-epikouros-cutout.png',
    alt: 'Cutout Pentelic marble portrait head of the Greek philosopher Epikouros (Epicurus), frontal view. The Metropolitan Museum of Art, Accession No. 11.90 (Public Domain CC0).',
  },
  {
    id: 'profile',
    numeral: 'Plate II',
    shortTitle: 'Epikouros (Profile)',
    title: 'Marble Head of Epikouros — Lateral Study',
    meta: 'Pentelic marble · Three-quarter profile facing the manuscript · The Metropolitan Museum of Art (Acc. 11.90, CC0)',
    url: 'https://www.metmuseum.org/art/collection/search/248475',
    src: './assets/met-epikouros-profile-cutout.png',
    alt: 'Cutout Pentelic marble portrait head of the Greek philosopher Epikouros (Epicurus), profile study facing left toward the biography. The Metropolitan Museum of Art, Accession No. 11.90 (Public Domain CC0).',
  },
  {
    id: 'chrysippos',
    numeral: 'Plate III',
    shortTitle: 'Chrysippos (Logician)',
    title: 'Marble Portrait Head of the Philosopher Chrysippos (c. 279–206 BCE)',
    meta: 'Marble · Pioneer of formal propositional logic · The Metropolitan Museum of Art (Acc. 24.243, CC0)',
    url: 'https://www.metmuseum.org/art/collection/search/251787',
    src: './assets/met-chrysippos-cutout.png',
    alt: 'Cutout marble portrait head of the Greek philosopher Chrysippos. The Metropolitan Museum of Art, Accession No. 24.243 (Public Domain CC0).',
  },
];

export default function AboutSection({ onExploreProjects, onPlaySound }) {
  const [activePlateId, setActivePlateId] = useState('frontal');
  const [folioSurface, setFolioSurface] = useState('vellum'); // 'vellum' (warm parchment default) | 'stone'

  const currentPlate =
    SCULPTURE_PLATES.find((p) => p.id === activePlateId) || SCULPTURE_PLATES[0];

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
      aria-labelledby="about-manuscript-heading"
      data-folio={folioSurface}
      className="greek-archive-section relative border-b border-[var(--ms-rule-strong)] py-8 sm:py-14 lg:py-20 px-3 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Subtle Authentic Paper & Limestone Grain Texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.045]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="manuscript-paper-fiber">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#manuscript-paper-fiber)" />
      </svg>

      {/* ====================================================================
          BACKGROUND EPIGRAPHIC LAYER: LARGE CROPPED GREEK INSCRIPTIONS
          ==================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        {/* Top-Right Cropped Lapidary Greek Inscription extending beyond the section boundary */}
        <div
          lang="el"
          className="absolute -top-8 -right-10 font-classical font-semibold text-[6.5rem] sm:text-[10rem] lg:text-[13.5rem] tracking-[0.08em] leading-[0.82] text-[var(--ms-epigraph)] whitespace-nowrap"
        >
          ΓΝΩΘΙ
        </div>

        {/* Lower-Left Cropped Manuscript Epigraph */}
        <div
          lang="el"
          className="absolute -bottom-10 -left-8 font-classical italic text-[5.5rem] sm:text-[8.5rem] lg:text-[11rem] tracking-[0.06em] leading-none text-[var(--ms-faint)] whitespace-nowrap"
        >
          Τέχνη · Ἐπιστήμη
        </div>
      </div>

      {/* ====================================================================
          ENGRAVED DOUBLE-RULE MANUSCRIPT FOLIO SHEET
          ==================================================================== */}
      <div className="manuscript-double-frame relative mx-auto max-w-[1360px] bg-[var(--ms-bg)]/90">
        {/* Folio Top Archival Margin Bar */}
        <div className="border-b border-[var(--ms-rule)] px-6 py-3.5 sm:px-10 lg:px-14 flex flex-wrap items-center justify-between gap-4 font-classical text-xs sm:text-sm tracking-[0.18em] uppercase text-[var(--ms-marble)]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[var(--ms-bronze)]">
              FOLIO I · ARCHIVE OF THE BUILDER
            </span>
            <span aria-hidden="true">—</span>
            <span>PHANA KUROSAKI ({PROFILE.nickname})</span>
          </div>

          <div className="flex items-center gap-4">
            <span
              lang="el"
              className="hidden md:inline tracking-[0.24em] text-[var(--ms-limestone)]"
            >
              ΓΝΩΘΙ ΣΑΥΤΟΝ · ΜΗΔΕΝ ΑΓΑΝ
            </span>

            {/* Quiet Folio Paper / Stone Toggle */}
            <button
              type="button"
              onClick={() => {
                if (onPlaySound) onPlaySound('switch');
                setFolioSurface((prev) =>
                  prev === 'vellum' ? 'stone' : 'vellum'
                );
              }}
              className="border border-[var(--ms-rule-strong)] bg-[var(--ms-surface)] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ms-ivory)] hover:border-[var(--ms-bronze)] transition-colors"
              title="Switch manuscript material between Warm Parchment and Obsidian Stone"
            >
              {folioSurface === 'vellum'
                ? 'Folio: Warm Parchment'
                : 'Folio: Obsidian Stone'}
            </button>
          </div>
        </div>

        {/* ==================================================================
            MAIN ASYMMETRICAL EDITORIAL SPREAD
            Left: Personal Introduction, Biography & Philosophy
            Right: Monumental Cutout Marble Sculpture Integrated into the Folio
            ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative">
          {/* LEFT COLUMN (7 COLS): EDITORIAL BIOGRAPHY & THREE PRINCIPLES */}
          <div className="lg:col-span-7 relative z-10 p-6 sm:p-12 lg:p-16 xl:p-20 lg:border-r border-[var(--ms-rule)] flex flex-col justify-between">
            <div>
              {/* Small Uppercase Editorial Label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--ms-rubric)] font-semibold">
                  ABOUT ME · PERSONAL MANUSCRIPT
                </span>
                <span className="h-[1px] flex-1 bg-[var(--ms-rule)]" />
                <span className="font-classical italic text-sm text-[var(--ms-marble)]">
                  § I
                </span>
              </div>

              {/* Large Expressive Classical Serif Headline */}
              <h2
                id="about-manuscript-heading"
                className="font-classical text-[2.75rem] sm:text-[4.1rem] xl:text-[4.65rem] font-normal tracking-[-0.02em] text-[var(--ms-ivory)] leading-[1.02]"
              >
                <span className="block font-semibold">
                  A mind that builds.
                </span>
                <span className="block italic font-normal text-[var(--ms-bronze)] mt-1">
                  A journey still being written.
                </span>
              </h2>

              {/* Personal Biography */}
              <div className="mt-9 space-y-5 max-w-[58ch] text-base sm:text-[1.08rem] text-[var(--ms-limestone)] leading-[1.82]">
                <p className="manuscript-dropcap font-classical text-xl sm:text-[1.32rem] text-[var(--ms-ivory)] leading-[1.62]">
                  I&apos;m Phana Kurosaki, also known as Phana or KON—an
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
                  to understand the work behind the result. Relying on a tool is
                  never a substitute for understanding the craft underneath.
                </p>

                <p>
                  This is where my ideas become projects, mistakes become
                  lessons, and unfinished experiments become something better.
                </p>
              </div>
            </div>

            {/* Personal Philosophy — Three Simple Principles Set as an Editorial Sequence */}
            <div className="mt-12 pt-9 border-t border-[var(--ms-rule-strong)]">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--ms-marble)]">
                  PERSONAL PHILOSOPHY · THREE PRINCIPLES
                </span>
                <span
                  lang="el"
                  className="font-classical italic text-sm tracking-[0.12em] text-[var(--ms-bronze)]"
                >
                  Ποίησις · Ἐπιστήμη · Μελέτη
                </span>
              </div>

              <ol className="divide-y divide-[var(--ms-rule)] border-y border-[var(--ms-rule)]">
                {PHILOSOPHY_PRINCIPLES.map((item) => (
                  <li
                    key={item.numeral}
                    className="py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 items-baseline"
                  >
                    <div className="sm:col-span-4 flex items-baseline gap-3">
                      <span className="font-classical italic text-base text-[var(--ms-rubric)] w-5 shrink-0">
                        {item.numeral}.
                      </span>
                      <span className="font-classical text-2xl sm:text-[1.75rem] font-semibold text-[var(--ms-ivory)] tracking-tight">
                        {item.word}
                      </span>
                    </div>

                    <div className="sm:col-span-8 flex items-baseline justify-between gap-3">
                      <span className="font-classical text-lg sm:text-xl text-[var(--ms-limestone)] leading-snug">
                        {item.statement}
                      </span>
                      <span
                        lang="el"
                        className="hidden sm:inline font-classical italic text-sm text-[var(--ms-marble)] shrink-0"
                      >
                        {item.greek}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Subtle Link to Explore Projects */}
              <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="#projects"
                  onClick={handleExploreClick}
                  className="editorial-link font-classical text-xl sm:text-2xl italic text-[var(--ms-ivory)] hover:text-[var(--ms-bronze)] transition-colors"
                >
                  <span>Explore my projects and experiments</span>
                  <IconArrowRight className="w-4 h-4 text-[var(--ms-bronze)]" />
                </a>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
                  {PROFILE.brand} // @{PROFILE.githubUsername}
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN (5 COLS): MONUMENTAL CUTOUT MARBLE SCULPTURE
              Integrated directly onto the warm parchment page over giant
              ancient Greek stone inscriptions (no dark rectangular card box)
              ================================================================ */}
          <div className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden">
            {/* Signature Background Element Behind Sculpture:
                Giant Greek Inscription "ΓΝΩΘΙ ΣΑΥΤΟΝ" + Classical Geometric Compass Lines */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 overflow-hidden"
            >
              {/* Delicate Engraved Architectural Proportion Lines & Compass Circle */}
              <svg
                className="w-full h-full opacity-[0.28]"
                viewBox="0 0 500 720"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="255"
                  cy="315"
                  r="205"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="1"
                />
                <circle
                  cx="255"
                  cy="315"
                  r="152"
                  stroke="var(--ms-bronze)"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                />
                <line
                  x1="255"
                  y1="0"
                  x2="255"
                  y2="720"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="0.75"
                />
                <line
                  x1="0"
                  y1="315"
                  x2="500"
                  y2="315"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="0.75"
                />
              </svg>

              {/* Giant Greek Inscription Partially Hidden Behind the Marble Bust */}
              <div
                lang="el"
                className="absolute inset-x-0 top-14 sm:top-16 flex flex-col items-center font-classical font-semibold tracking-[0.1em] leading-[0.86] text-[var(--ms-ivory)] opacity-[0.13]"
              >
                <span className="text-[5.2rem] sm:text-[7rem] lg:text-[6.2rem] xl:text-[7.5rem]">
                  ΓΝΩΘΙ
                </span>
                <span className="text-[5.2rem] sm:text-[7rem] lg:text-[6.2rem] xl:text-[7.5rem] ml-6">
                  ΣΑΥΤΟΝ
                </span>
              </div>

              {/* Faint Classical Greek Manuscript Excerpt Behind the Lower Bust */}
              <div
                lang="el"
                className="absolute bottom-40 inset-x-8 font-classical italic text-xs sm:text-sm leading-relaxed tracking-[0.08em] text-[var(--ms-ivory)] opacity-[0.16] text-justify"
              >
                Πᾶσα τέχνη περὶ γένεσίν ἐστι, καὶ τὸ τεχνάζειν καὶ θεωρεῖν ὅπως
                ἂν γένηταί τι τῶν ἐνδεχομένων καὶ εἶναι καὶ μὴ εἶναι, καὶ ὧν ἡ
                ἀρχὴ ἐν τῷ ποιοῦντι ἀλλὰ μὴ ἐν τῷ ποιουμένῳ·
              </div>
            </div>

            {/* Top Archival Catalogue Reference */}
            <div className="relative z-10 flex items-center justify-between border-b border-[var(--ms-rule)] pb-3 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
              <span>FIG. I · CLASSICAL SCULPTURE STUDY</span>
              <span lang="el" className="font-classical text-xs tracking-[0.2em] text-[var(--ms-bronze)]">
                Γνῶθι σαυτόν (“Know thyself”)
              </span>
            </div>

            {/* Monumental Cutout Marble Bust Emerging in Front of the Inscription */}
            <figure className="sculpture-stage relative z-10 my-auto py-4 sm:py-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[430px] lg:-ml-6 aspect-[4/5] flex items-center justify-center">
                <img
                  key={currentPlate.src}
                  src={currentPlate.src}
                  alt={currentPlate.alt}
                  className="sculpture-cutout-shadow w-full h-full object-contain select-none"
                />
              </div>
            </figure>

            {/* Restrained Museum Catalogue Caption & Study Plate Selector */}
            <figcaption className="relative z-10 border-t border-[var(--ms-rule-strong)] pt-4 bg-[var(--ms-bg)]/85 backdrop-blur-[2px]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-rubric)] font-semibold">
                  {currentPlate.numeral} — ARCHIVAL RECORD
                </span>

                {/* Subtle Study Plate Switcher */}
                <div
                  className="inline-flex items-center gap-1"
                  role="group"
                  aria-label="Switch classical sculpture study plate"
                >
                  {SCULPTURE_PLATES.map((plate) => {
                    const active = plate.id === activePlateId;
                    return (
                      <button
                        key={plate.id}
                        type="button"
                        onClick={() => {
                          if (onPlaySound) onPlaySound('key');
                          setActivePlateId(plate.id);
                        }}
                        className={`px-2 py-0.5 border font-mono text-[9px] tracking-[0.1em] uppercase transition-colors ${
                          active
                            ? 'border-[var(--ms-bronze)] bg-[var(--ms-bronze)] text-[#f5efe2] font-semibold'
                            : 'border-[var(--ms-rule-strong)] text-[var(--ms-marble)] hover:text-[var(--ms-ivory)]'
                        }`}
                      >
                        {plate.numeral}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="font-classical text-base sm:text-lg font-semibold text-[var(--ms-ivory)] leading-snug">
                {currentPlate.title}
              </div>

              <p className="mt-1 font-mono text-[10px] tracking-[0.06em] text-[var(--ms-marble)] leading-relaxed">
                {currentPlate.meta}
              </p>

              <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ms-bronze)]">
                <span>AUTHENTIC MUSEUM PHOTOGRAPHY</span>
                <a
                  href={currentPlate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <span>Met Museum Catalogue</span>
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
