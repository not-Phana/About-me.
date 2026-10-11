import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import { IconArrowRight, IconArrowUpRight } from './Icons';

const PHILOSOPHY_PRINCIPLES = [
  {
    numeral: 'I',
    greek: 'Ποίησις',
    word: 'Build.',
    statement: 'Turn ideas into working projects.',
    annotation:
      'From concept to working code: prototypes, engines, tools, and interfaces built from the ground up.',
  },
  {
    numeral: 'II',
    greek: 'Ἐπιστήμη',
    word: 'Understand.',
    statement: 'Learn how things work instead of relying entirely on tools.',
    annotation:
      'Inspect the event loop, study language internals, and master the craft behind every abstraction.',
  },
  {
    numeral: 'III',
    greek: 'Μελέτη',
    word: 'Improve.',
    statement:
      'Treat mistakes as opportunities to make the next version better.',
    annotation:
      'Iterative refinement: refactor, optimize performance, and turn lessons into stronger architecture.',
  },
];

const DELPHIC_MAXIMS = [
  {
    id: 'gnothi',
    greek: 'ΓΝΩΘΙ ΣΑΥΤΟΝ',
    latin: 'Gnōthi Sauton',
    meaning: 'Know thyself.',
    origin: 'Oracle of Delphi (Attributed to Chilon / Thales)',
    reflection:
      'Understand your capabilities, inspect your own code, and master the tools you wield.',
  },
  {
    id: 'meden',
    greek: 'ΜΗΔΕΝ ΑΓΑΝ',
    latin: 'Mēden Agan',
    meaning: 'Nothing in excess.',
    origin: 'Oracle of Delphi (Attributed to Solon of Athens)',
    reflection:
      'Strive for architectural restraint: zero bloat, clean dependencies, and intentional design.',
  },
  {
    id: 'chalepa',
    greek: 'ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ',
    latin: 'Chalepa Ta Kala',
    meaning: 'Fine things are difficult to build.',
    origin: 'Classical Proverb (Plato, Republic & Cratylus)',
    reflection:
      'True software craftsmanship and complex systems demand deliberate patience and discipline.',
  },
];

const SCULPTURE_PLATES = [
  {
    id: 'frontal',
    numeral: 'Plate I',
    shortTitle: 'Epikouros (Frontal)',
    title: 'Marble Head of Epikouros (Epicurus, 341–270 BCE)',
    meta: 'Pentelic marble · Roman copy of a 3rd century BCE Greek original · The Metropolitan Museum of Art (Acc. 11.90, CC0 Public Domain)',
    url: 'https://www.metmuseum.org/art/collection/search/248475',
    src: './assets/met-epikouros-cutout.png',
    alt: 'Cutout Pentelic marble portrait head of Greek philosopher Epikouros (Epicurus), frontal view. The Metropolitan Museum of Art, Accession No. 11.90 (CC0 Public Domain).',
    inscription: 'ΓΝΩΘΙ ΣΑΥΤΟΝ',
  },
  {
    id: 'profile',
    numeral: 'Plate II',
    shortTitle: 'Epikouros (Lateral Study)',
    title: 'Marble Head of Epikouros — Profile Study',
    meta: 'Pentelic marble · Three-quarter profile study facing the builder biography · The Metropolitan Museum of Art (Acc. 11.90, CC0 Public Domain)',
    url: 'https://www.metmuseum.org/art/collection/search/248475',
    src: './assets/met-epikouros-profile-cutout.png',
    alt: 'Cutout Pentelic marble portrait head of Greek philosopher Epikouros, profile study. The Metropolitan Museum of Art, Accession No. 11.90 (CC0 Public Domain).',
    inscription: 'ΜΗΔΕΝ ΑΓΑΝ',
  },
  {
    id: 'chrysippos',
    numeral: 'Plate III',
    shortTitle: 'Chrysippos (Logician)',
    title: 'Marble Portrait Head of Chrysippos (c. 279–206 BCE)',
    meta: 'Fine Greek marble · Pioneer of propositional logic and formal syllogisms · The Metropolitan Museum of Art (Acc. 24.243, CC0 Public Domain)',
    url: 'https://www.metmuseum.org/art/collection/search/251787',
    src: './assets/met-chrysippos-cutout.png',
    alt: 'Cutout marble portrait head of Greek philosopher Chrysippos of Soli. The Metropolitan Museum of Art, Accession No. 24.243 (CC0 Public Domain).',
    inscription: 'ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ',
  },
];

export default function AboutSection({ onExploreProjects, onPlaySound }) {
  const [activePlateId, setActivePlateId] = useState('frontal');
  const [activeMaximId, setActiveMaximId] = useState('gnothi');

  const currentPlate =
    SCULPTURE_PLATES.find((p) => p.id === activePlateId) || SCULPTURE_PLATES[0];

  const currentMaxim =
    DELPHIC_MAXIMS.find((m) => m.id === activeMaximId) || DELPHIC_MAXIMS[0];

  const handleExploreClick = (e) => {
    if (onExploreProjects) {
      e.preventDefault();
      onPlaySound?.('switch');
      onExploreProjects();
    }
  };

  const handleSelectPlate = (plateId) => {
    onPlaySound?.('keycap');
    setActivePlateId(plateId);
    if (plateId === 'frontal') setActiveMaximId('gnothi');
    else if (plateId === 'profile') setActiveMaximId('meden');
    else if (plateId === 'chrysippos') setActiveMaximId('chalepa');
  };

  const handleSelectMaxim = (maximId) => {
    onPlaySound?.('switch');
    setActiveMaximId(maximId);
    if (maximId === 'gnothi') setActivePlateId('frontal');
    else if (maximId === 'meden') setActivePlateId('profile');
    else if (maximId === 'chalepa') setActivePlateId('chrysippos');
  };

  return (
    <section
      id="about"
      aria-labelledby="about-manuscript-heading"
      className="greek-archive-section relative border-b border-line py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Subtle Museum Basalt & Limestone Grain Texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <filter id="gallery-stone-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#gallery-stone-grain)" />
      </svg>

      {/* ====================================================================
          BACKGROUND EPIGRAPHIC LAYER: MONUMENTAL CHISELED GREEK LETTERS
          ==================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        {/* Top-Right Monumental Greek Inscription carved into the gallery wall */}
        <div
          lang="el"
          className="absolute -top-12 -right-8 font-classical font-semibold text-[7rem] sm:text-[11rem] lg:text-[14rem] tracking-[0.1em] leading-[0.8] text-[var(--ms-epigraph)] whitespace-nowrap"
        >
          ΓΝΩΘΙ
        </div>

        {/* Lower-Left Historical Epigraph */}
        <div
          lang="el"
          className="absolute -bottom-10 -left-6 font-classical italic text-[5.5rem] sm:text-[8rem] lg:text-[10.5rem] tracking-[0.06em] leading-none text-[var(--ms-faint)] whitespace-nowrap"
        >
          Τέχνη // Ἐπιστήμη
        </div>
      </div>

      {/* ====================================================================
          MONUMENTAL ARCHIVAL FOLIO SPREAD
          ==================================================================== */}
      <div className="manuscript-double-frame relative mx-auto max-w-[1380px] bg-[var(--ms-bg)]/95">
        {/* Folio Top Archival Catalogue Bar */}
        <div className="border-b border-[var(--ms-rule)] px-5 py-3 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--ms-bronze)]">
              EXHIBIT FOLIO II · THE BUILDER&apos;S ESSAY
            </span>
            <span aria-hidden="true" className="text-[var(--ms-rule-strong)]">
              /
            </span>
            <span>
              PHANA KUROSAKI ({PROFILE.brand})
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              lang="el"
              className="hidden md:inline font-classical text-xs tracking-[0.2em] text-[var(--ms-limestone)]"
            >
              ΓΝΩΘΙ ΣΑΥΤΟΝ · ΜΗΔΕΝ ΑΓΑΝ · ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ
            </span>
            <span className="border border-[var(--ms-rule-strong)] bg-[var(--ms-surface)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--ms-limestone)]">
              MET ACC. 11.90
            </span>
          </div>
        </div>

        {/* ==================================================================
            ASYMMETRICAL EDITORIAL SPREAD
            Left (7 cols): Phana's Biography, Craft Ethos & Three Principles
            Right (5 cols): The Monumental Marble Sculpture & Epigraphy
            ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative">
          {/* LEFT COLUMN: EDITORIAL BIOGRAPHY & PHILOSOPHY */}
          <div className="lg:col-span-7 relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 lg:border-r border-[var(--ms-rule)] flex flex-col justify-between">
            <div>
              {/* Uppercase Editorial Section Tag */}
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--ms-bronze)] font-bold">
                  ABOUT ME // IDENTITY &amp; PHILOSOPHY
                </span>
                <span className="h-[1px] flex-1 bg-[var(--ms-rule)]" />
                <span className="font-classical italic text-sm text-[var(--ms-marble)]">
                  § II
                </span>
              </div>

              {/* Classical Serif Headline */}
              <h2
                id="about-manuscript-heading"
                className="font-classical text-[2.65rem] sm:text-[3.8rem] xl:text-[4.4rem] font-normal tracking-[-0.025em] text-[var(--ms-ivory)] leading-[1.04]"
              >
                <span className="block font-semibold">
                  A mind that builds.
                </span>
                <span className="block italic font-normal text-[var(--ms-bronze)] mt-1">
                  A journey still being written.
                </span>
              </h2>

              {/* Personal Biography */}
              <div className="mt-8 space-y-4 max-w-[58ch] text-[15px] sm:text-[17px] text-[var(--ms-limestone)] leading-[1.8]">
                <p className="manuscript-dropcap font-classical text-xl sm:text-[1.28rem] text-[var(--ms-ivory)] leading-[1.6]">
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

            {/* Personal Philosophy — Three Principles */}
            <div className="mt-10 pt-8 border-t border-[var(--ms-rule-strong)]">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--ms-marble)] font-semibold">
                  THREE PRINCIPLES OF BUILDING
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
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline group"
                  >
                    <div className="sm:col-span-4 flex items-baseline gap-2.5">
                      <span className="font-classical italic text-base text-[var(--ms-bronze)] font-semibold w-5 shrink-0">
                        {item.numeral}.
                      </span>
                      <span className="font-classical text-2xl sm:text-[1.65rem] font-semibold text-[var(--ms-ivory)] group-hover:text-[var(--ms-bronze)] transition-colors">
                        {item.word}
                      </span>
                    </div>

                    <div className="sm:col-span-8 flex flex-col justify-center">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-classical text-base sm:text-lg text-[var(--ms-ivory)] leading-snug">
                          {item.statement}
                        </span>
                        <span
                          lang="el"
                          className="font-classical italic text-sm text-[var(--ms-bronze)] shrink-0 opacity-80"
                        >
                          {item.greek}
                        </span>
                      </div>
                      <span className="mt-0.5 font-mono text-[11px] text-[var(--ms-marble)] leading-normal">
                        {item.annotation}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Editorial Link to Explore Projects */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="#projects"
                  onClick={handleExploreClick}
                  className="editorial-link font-classical text-lg sm:text-xl italic text-[var(--ms-ivory)] hover:text-[var(--ms-bronze)] transition-colors"
                >
                  <span>Explore my projects and experiments</span>
                  <IconArrowRight className="w-4 h-4 text-[var(--ms-bronze)] shrink-0" />
                </a>

                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
                  {PROFILE.brand} // GITHUB: @{PROFILE.githubUsername}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MONUMENTAL MARBLE SCULPTURE & EPIGRAPHY */}
          <div className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden bg-[var(--ms-surface)]/40">
            {/* Signature Engraved Geometric Architecture & Greek Background */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 overflow-hidden"
            >
              {/* Euclidean Geometry Vector & Proportional Compass Lines */}
              <svg
                className="w-full h-full opacity-[0.24]"
                viewBox="0 0 500 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="250"
                  cy="300"
                  r="210"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="1"
                />
                <circle
                  cx="250"
                  cy="300"
                  r="155"
                  stroke="var(--ms-bronze)"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="250"
                  cy="300"
                  r="95"
                  stroke="var(--ms-rule)"
                  strokeWidth="0.75"
                />
                <line
                  x1="250"
                  y1="0"
                  x2="250"
                  y2="700"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="0.75"
                />
                <line
                  x1="0"
                  y1="300"
                  x2="500"
                  y2="300"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="0.75"
                />
              </svg>

              {/* Giant Greek Inscription Behind Sculpture */}
              <div
                lang="el"
                className="absolute inset-x-0 top-10 flex flex-col items-center font-classical font-semibold tracking-[0.12em] leading-[0.84] text-[var(--ms-ivory)] opacity-[0.09]"
              >
                <span className="text-[5.5rem] sm:text-[7.5rem] lg:text-[6.5rem] xl:text-[7.8rem]">
                  ΓΝΩΘΙ
                </span>
                <span className="text-[5.5rem] sm:text-[7.5rem] lg:text-[6.5rem] xl:text-[7.8rem] ml-4">
                  ΣΑΥΤΟΝ
                </span>
              </div>

              {/* Classical Aristotle Nicomachean Ethics Excerpt on Technē */}
              <div
                lang="el"
                className="absolute bottom-36 inset-x-6 font-classical italic text-xs sm:text-[13px] leading-relaxed tracking-[0.06em] text-[var(--ms-ivory)] opacity-[0.15] text-justify"
              >
                Πᾶσα τέχνη περὶ γένεσίν ἐστι, καὶ τὸ τεχνάζειν καὶ θεωρεῖν ὅπως
                ἂν γένηταί τι τῶν ἐνδεχομένων καὶ εἶναι καὶ μὴ εἶναι, καὶ ὧν ἡ
                ἀρχὴ ἐν τῷ ποιοῦντι ἀλλὰ μὴ ἐν τῷ ποιουμένῳ·
              </div>
            </div>

            {/* Top Archival Plaque Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-[var(--ms-rule)] pb-3 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
              <span>CLASSICAL SCULPTURE PLATE</span>
              <span
                lang="el"
                className="font-classical text-xs tracking-[0.18em] text-[var(--ms-bronze)] font-semibold"
              >
                {currentPlate.inscription}
              </span>
            </div>

            {/* Monumental Cutout Marble Head with Realistic Gallery Shadow */}
            <figure className="sculpture-stage relative z-10 my-auto py-4 sm:py-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[390px] aspect-[4/5] flex items-center justify-center">
                <img
                  key={currentPlate.src}
                  src={currentPlate.src}
                  alt={currentPlate.alt}
                  className="sculpture-cutout-shadow w-full h-full object-contain select-none"
                />
              </div>
            </figure>

            {/* Museum Catalogue Plaque & Plate Switcher */}
            <div className="relative z-10 border border-[var(--ms-rule-strong)] bg-[var(--ms-surface2)]/90 p-4 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ms-rule)] pb-2.5 mb-2.5">
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-bronze)] font-bold">
                  {currentPlate.numeral} · MUSEUM RECORD
                </span>

                {/* Interactive Plate Selector */}
                <div
                  className="inline-flex items-center gap-1"
                  role="group"
                  aria-label="Switch classical sculpture plate"
                >
                  {SCULPTURE_PLATES.map((plate) => {
                    const active = plate.id === activePlateId;
                    return (
                      <button
                        key={plate.id}
                        type="button"
                        onClick={() => handleSelectPlate(plate.id)}
                        className={`px-2 py-0.5 border font-mono text-[9px] tracking-[0.1em] uppercase transition-colors ${
                          active
                            ? 'border-[var(--ms-bronze)] bg-[var(--ms-bronze)] text-[#0b0b0c] font-bold'
                            : 'border-[var(--ms-rule)] bg-[var(--ms-surface)] text-[var(--ms-marble)] hover:text-[var(--ms-ivory)]'
                        }`}
                      >
                        {plate.numeral}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="font-classical text-base font-semibold text-[var(--ms-ivory)] leading-snug">
                {currentPlate.title}
              </div>

              <p className="mt-1 font-mono text-[10px] tracking-[0.04em] text-[var(--ms-marble)] leading-relaxed">
                {currentPlate.meta}
              </p>

              {/* Interactive Inscription Decoder */}
              <div className="mt-3 pt-2.5 border-t border-[var(--ms-rule)]">
                <div className="flex items-center justify-between mb-1.5 font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--ms-marble)]">
                  <span>DELPHIC MAXIMS // CLICK TO DECODE</span>
                  <span className="text-[var(--ms-bronze)] font-semibold">
                    {currentMaxim.latin}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1 mb-2">
                  {DELPHIC_MAXIMS.map((m) => {
                    const isSelected = m.id === activeMaximId;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectMaxim(m.id)}
                        className={`px-1.5 py-1 text-center font-classical text-xs tracking-wider border transition-colors ${
                          isSelected
                            ? 'border-[var(--ms-bronze)] bg-[var(--ms-bronze)]/15 text-[var(--ms-bronze)] font-bold'
                            : 'border-[var(--ms-rule)] bg-[var(--ms-surface)] text-[var(--ms-limestone)] hover:text-[var(--ms-ivory)]'
                        }`}
                      >
                        {m.greek}
                      </button>
                    );
                  })}
                </div>

                <div className="p-2 border border-[var(--ms-rule)] bg-[var(--ms-surface)] text-[11px] font-mono leading-relaxed">
                  <div className="text-[var(--ms-ivory)] font-bold">
                    &ldquo;{currentMaxim.meaning}&rdquo;
                  </div>
                  <div className="text-[var(--ms-marble)] text-[10px] mt-0.5">
                    {currentMaxim.origin}
                  </div>
                  <div className="text-[var(--ms-limestone)] text-[10px] mt-1 italic">
                    {currentMaxim.reflection}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--ms-bronze)]">
                <span>AUTHENTIC MUSEUM PHOTOGRAPHY</span>
                <a
                  href={currentPlate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <span>Met Museum Collection</span>
                  <IconArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
