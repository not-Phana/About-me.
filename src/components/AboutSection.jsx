import React, { useState, useRef } from 'react';
import { PROFILE } from '../data/profile';
import { IconArrowRight, IconArrowUpRight } from './Icons';

const PHILOSOPHY_PRINCIPLES = [
  {
    numeral: 'I',
    greek: 'Ποίησις',
    greekMeaning: 'Poiesis · Bringing into existence',
    word: 'Build.',
    statement: 'Turn ideas into working projects.',
    annotation:
      'From concept to working code: prototypes, engines, tools, and interfaces built from the ground up.',
  },
  {
    numeral: 'II',
    greek: 'Ἐπιστήμη',
    word: 'Understand.',
    greekMeaning: 'Episteme · Deep comprehension of craft',
    statement: 'Learn how things work instead of relying entirely on tools.',
    annotation:
      'Inspect the event loop, study language internals, and master the craft behind every abstraction.',
  },
  {
    numeral: 'III',
    greek: 'Μελέτη',
    word: 'Improve.',
    greekMeaning: 'Melete · Disciplined iterative refinement',
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
    origin: 'Oracle of Delphi · Inscribed on the Temple of Apollo',
    reflection:
      'Understand your capabilities, inspect your own code, and master the craft behind every tool.',
  },
  {
    id: 'meden',
    greek: 'ΜΗΔΕΝ ΑΓΑΝ',
    latin: 'Mēden Agan',
    meaning: 'Nothing in excess.',
    origin: 'Delphic Maxim · Attributed to Solon of Athens',
    reflection:
      'Strive for architectural restraint: zero bloat, clean dependencies, and intentional design.',
  },
  {
    id: 'chalepa',
    greek: 'ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ',
    latin: 'Chalepa Ta Kala',
    meaning: 'Fine things are difficult to build.',
    origin: 'Classical Proverb · Recorded in Plato’s Republic',
    reflection:
      'True software craftsmanship and complex systems demand deliberate patience and discipline.',
  },
];

const SCULPTURE_PLATES = [
  {
    id: 'kintsugi',
    numeral: 'Plate I',
    shortTitle: 'Auric Kintsugi (Aphrodite)',
    title: 'Pentelic Marble & Auric Kintsugi · Classical Greek Bust',
    meta: 'Pentelic marble with gold lacquer repair · Embodying Χαλεπὰ τὰ καλά (Noble Resilience) · Private Collection & Archival Specimen',
    url: '#about',
    src: './assets/kintsugi-venus-plate.png',
    alt: 'Classical Pentelic marble sculpture bust repaired with luminous gold kintsugi seams.',
    inscription: 'ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ',
    epoch: 'Hellenistic · Auric Kintsugi',
    isFramedPlate: true,
  },
  {
    id: 'frontal',
    numeral: 'Plate II',
    shortTitle: 'Epikouros (Frontal)',
    title: 'Marble Head of Epikouros (Epicurus, 341–270 BCE)',
    meta: 'Pentelic marble · Roman copy of 3rd c. BCE Greek original · The Metropolitan Museum of Art (Acc. 11.90, CC0 Public Domain)',
    url: 'https://www.metmuseum.org/art/collection/search/248475',
    src: './assets/met-epikouros-cutout.png',
    alt: 'Cutout Pentelic marble portrait head of Greek philosopher Epikouros, frontal view. The Metropolitan Museum of Art, Accession No. 11.90 (CC0 Public Domain).',
    inscription: 'ΓΝΩΘΙ ΣΑΥΤΟΝ',
    epoch: 'Hellenistic · 3rd Century BCE',
  },
  {
    id: 'profile',
    numeral: 'Plate III',
    shortTitle: 'Epikouros (Profile)',
    title: 'Marble Head of Epikouros — Lateral Study',
    meta: 'Pentelic marble · Three-quarter profile study facing the biography · The Metropolitan Museum of Art (Acc. 11.90, CC0 Public Domain)',
    url: 'https://www.metmuseum.org/art/collection/search/248475',
    src: './assets/met-epikouros-profile-cutout.png',
    alt: 'Cutout Pentelic marble portrait head of Greek philosopher Epikouros, profile study. The Metropolitan Museum of Art, Accession No. 11.90 (CC0 Public Domain).',
    inscription: 'ΜΗΔΕΝ ΑΓΑΝ',
    epoch: 'Hellenistic · Classical Profile',
  },
  {
    id: 'chrysippos',
    numeral: 'Plate IV',
    shortTitle: 'Chrysippos (Logician)',
    title: 'Marble Portrait Head of Chrysippos (c. 279–206 BCE)',
    meta: 'Fine Greek marble · Pioneer of formal propositional logic · The Metropolitan Museum of Art (Acc. 24.243, CC0 Public Domain)',
    url: 'https://www.metmuseum.org/art/collection/search/251787',
    src: './assets/met-chrysippos-cutout.png',
    alt: 'Cutout marble portrait head of Greek philosopher Chrysippos of Soli. The Metropolitan Museum of Art, Accession No. 24.243 (CC0 Public Domain).',
    inscription: 'ΧΑΛΕΠΑ ΤΑ ΚΑΛΑ',
    epoch: 'Stoic School · Formal Logic',
  },
];

export default function AboutSection({ onExploreProjects, onPlaySound }) {
  const [activePlateId, setActivePlateId] = useState('kintsugi');
  const [activeMaximId, setActiveMaximId] = useState('chalepa');
  const [showScholiaTranslation, setShowScholiaTranslation] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 40 });
  const [sculptureTilt, setSculptureTilt] = useState({ rx: 0, ry: 0 });

  const stageRef = useRef(null);

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
    if (plateId === 'kintsugi') setActiveMaximId('chalepa');
    else if (plateId === 'frontal') setActiveMaximId('gnothi');
    else if (plateId === 'profile') setActiveMaximId('meden');
    else if (plateId === 'chrysippos') setActiveMaximId('chalepa');
  };

  const handleSelectMaxim = (maximId) => {
    onPlaySound?.('switch');
    setActiveMaximId(maximId);
    if (maximId === 'gnothi') setActivePlateId('frontal');
    else if (maximId === 'meden') setActivePlateId('profile');
    else if (maximId === 'chalepa') setActivePlateId('kintsugi');
  };

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setSpotlightPos({ x, y });
    const rx = -((e.clientY - rect.top) / rect.height - 0.5) * 18;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    setSculptureTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setSpotlightPos({ x: 50, y: 40 });
    setSculptureTilt({ rx: 0, ry: 0 });
  };

  return (
    <section
      id="about"
      aria-labelledby="about-manuscript-heading"
      className="greek-archive-section relative border-b border-line py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden reveal-on-scroll"
    >
      {/* Subtle Museum Stone Grain Texture */}
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

      {/* Background Monumental Greek Inscriptions Chiseled in Stone */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        <div
          lang="el"
          data-bg-motion="about-epigraph-1"
          className="epigraph-ambient absolute -top-12 -right-8 font-classical font-semibold text-[7rem] sm:text-[11rem] lg:text-[14rem] tracking-[0.1em] leading-[0.8] text-[var(--ms-epigraph)] whitespace-nowrap"
        >
          ΓΝΩΘΙ
        </div>
        <div
          lang="el"
          data-bg-motion="about-epigraph-2"
          className="epigraph-ambient absolute -bottom-10 -left-6 font-classical italic text-[5.5rem] sm:text-[8rem] lg:text-[10.5rem] tracking-[0.06em] leading-none text-[var(--ms-faint)] whitespace-nowrap"
        >
          Τέχνη // Ἐπιστήμη
        </div>

        {/* Ambient floating philosophical runes */}
        <div
          lang="el"
          data-bg-motion="rune-1"
          className="rune-float-slow pointer-events-none absolute top-1/6 left-2 font-classical text-xl lg:text-2xl text-[var(--ms-bronze)]/15 font-bold select-none"
        >
          Ψ // 01
        </div>
        <div
          lang="el"
          data-bg-motion="rune-2"
          className="rune-float-medium pointer-events-none absolute top-3/4 right-3 font-classical text-xl lg:text-2xl text-[var(--ms-bronze)]/15 font-bold select-none"
        >
          Ω // 02
        </div>
        <div
          lang="el"
          data-bg-motion="rune-3"
          className="rune-float-fast pointer-events-none absolute bottom-8 left-6 font-classical text-lg lg:text-xl text-[var(--ms-bronze)]/12 font-bold select-none"
        >
          Δ // 03
        </div>
      </div>

      {/* Main Archival Folio Container */}
      <div className="manuscript-double-frame relative mx-auto max-w-[1380px] bg-[var(--ms-bg)]/95">
        {/* Folio Top Archival Header Bar */}
        <div className="border-b border-[var(--ms-rule)] px-5 py-3 sm:px-8 lg:px-12 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[var(--ms-bronze)]">
              FOLIO 02 // EXHIBIT: THE BUILDER&apos;S ESSAY
            </span>
            <span aria-hidden="true" className="text-[var(--ms-rule-strong)]">
              /
            </span>
            <span>
              {PROFILE.fullName.toUpperCase()} ({PROFILE.brand})
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

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative">
          {/* LEFT COLUMN: Personal Biography & Three Principles */}
          <div className="lg:col-span-7 relative z-10 p-6 sm:p-10 lg:p-14 xl:p-16 lg:border-r border-[var(--ms-rule)] flex flex-col justify-between reveal-on-scroll reveal-delay-1">
            <div>
              {/* Editorial Section Rubric */}
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

              {/* Personal Biography Paragraphs */}
              <div className="mt-8 space-y-4 max-w-[58ch] text-[15px] sm:text-[17px] text-[var(--ms-limestone)] leading-[1.8]">
                <p className="manuscript-dropcap font-classical text-xl sm:text-[1.28rem] text-[var(--ms-ivory)] leading-[1.6]">
                  I&apos;m {PROFILE.fullName}, also known as {PROFILE.displayName} or {PROFILE.nickname}—an
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

              {/* Classical Scholia on Technē (Aristotle) */}
              <div className="mt-7 p-4 border border-[var(--ms-rule)] bg-[var(--ms-surface)]/40 relative">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ms-marble)] uppercase mb-2">
                  <span>SCHOLIA // ARISTOTLE ON CRAFT &amp; MAKING</span>
                  <button
                    type="button"
                    onClick={() => setShowScholiaTranslation((prev) => !prev)}
                    className="text-[var(--ms-bronze)] hover:underline font-bold"
                  >
                    {showScholiaTranslation ? 'HIDE TRANSLATION' : 'TRANSLATE'}
                  </button>
                </div>

                <div
                  lang="el"
                  className="font-classical italic text-sm text-[var(--ms-ivory)] leading-relaxed"
                >
                  &laquo;Πᾶσα τέχνη περὶ γένεσίν ἐστι, καὶ τὸ τεχνάζειν καὶ θεωρεῖν ὅπως ἂν γένηταί τι τῶν ἐνδεχομένων καὶ εἶναι καὶ μὴ εἶναι, καὶ ὧν ἡ ἀρχὴ ἐν τῷ ποιοῦντι ἀλλὰ μὴ ἐν τῷ ποιουμένῳ·&raquo;
                </div>

                {showScholiaTranslation && (
                  <p className="mt-2 pt-2 border-t border-[var(--ms-rule)] font-classical text-sm text-[var(--ms-limestone)] leading-relaxed italic animate-enter">
                    &ldquo;Every craft is concerned with bringing something into being—studying how something may be produced whose origin is in the maker, not the made.&rdquo;
                    <span className="block mt-1 font-mono not-italic text-[10px] text-[var(--ms-marble)]">
                      — Nicomachean Ethics VI.4 (1140a)
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Three Principles of Building */}
            <div className="mt-10 pt-8 border-t border-[var(--ms-rule-strong)]">
              <div className="flex items-baseline justify-between gap-4 mb-5">
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

              <div className="space-y-3.5">
                {PHILOSOPHY_PRINCIPLES.map((item) => (
                  <div
                    key={item.numeral}
                    className="p-4 sm:p-5 border border-[var(--ms-rule)] bg-[var(--ms-surface)]/50 card-laser-lift group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ms-rule)] pb-2 mb-2.5">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs font-bold text-[var(--ms-bronze)]">
                          {item.numeral} //
                        </span>
                        <span className="font-classical text-2xl sm:text-3xl font-semibold text-[var(--ms-ivory)] group-hover:text-[var(--ms-bronze)] transition-colors">
                          {item.word}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          lang="el"
                          className="font-classical italic text-sm text-[var(--ms-bronze)]"
                        >
                          {item.greek}
                        </span>
                        <span className="text-[var(--ms-marble)] text-xs hidden sm:inline">
                          ({item.greekMeaning})
                        </span>
                      </div>
                    </div>

                    <div className="font-classical text-lg sm:text-xl text-[var(--ms-ivory)] leading-snug">
                      {item.statement}
                    </div>

                    <div className="mt-1.5 font-mono text-xs text-[var(--ms-marble)] leading-relaxed">
                      {item.annotation}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Link to Explore Projects */}
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

          {/* RIGHT COLUMN: Classical Marble Sculpture & Museum Plaque */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 overflow-hidden bg-[var(--ms-surface)]/30 transition-colors reveal-on-scroll reveal-delay-2"
          >
            {/* Dynamic Interactive Gallery Chiaroscuro Spotlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 320px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(212, 165, 40, 0.12) 0%, transparent 75%)`,
              }}
            />

            {/* Background Euclidean Vector & Greek Epigraphy */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 overflow-hidden"
            >
              <svg
                className="w-full h-full opacity-[0.2]"
                viewBox="0 0 500 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="250"
                  cy="280"
                  r="210"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="1"
                />
                <circle
                  cx="250"
                  cy="280"
                  r="155"
                  stroke="var(--ms-bronze)"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="250"
                  cy="280"
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
                  y1="280"
                  x2="500"
                  y2="280"
                  stroke="var(--ms-rule-strong)"
                  strokeWidth="0.75"
                />
              </svg>

              <div
                lang="el"
                data-bg-motion="about-know-thyself"
                className="absolute inset-x-0 top-8 flex flex-col items-center font-classical font-semibold tracking-[0.12em] leading-[0.84] text-[var(--ms-ivory)] opacity-[0.08]"
              >
                <span className="text-[5.5rem] sm:text-[7rem] lg:text-[6.2rem] xl:text-[7.4rem]">
                  ΓΝΩΘΙ
                </span>
                <span className="text-[5.5rem] sm:text-[7rem] lg:text-[6.2rem] xl:text-[7.4rem] ml-4">
                  ΣΑΥΤΟΝ
                </span>
              </div>
            </div>

            {/* Top Plate Reference Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-[var(--ms-rule)] pb-3 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-marble)]">
              <span>{currentPlate.epoch}</span>
              <span
                lang="el"
                className="font-classical text-xs tracking-[0.18em] text-[var(--ms-bronze)] font-semibold"
              >
                {currentPlate.inscription}
              </span>
            </div>

            {/* Centerpiece Sculpture Head / Archival Folio Plate with 3D Perspective Rotation */}
            <figure className="sculpture-stage relative z-10 my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
              <div
                className="relative w-full max-w-[360px] aspect-[4/5] flex items-center justify-center transition-transform duration-150 ease-out"
                style={{
                  transform: `perspective(850px) rotateX(${sculptureTilt.rx}deg) rotateY(${sculptureTilt.ry}deg)`,
                }}
              >
                {/* Rotating Delphic halo orbit */}
                <div
                  className="delphic-ring-spin pointer-events-none absolute w-[330px] h-[330px] rounded-full border border-[var(--ms-bronze)]/25 border-dashed select-none"
                  aria-hidden="true"
                />

                {currentPlate.isFramedPlate ? (
                  <div className="relative w-full max-w-[305px] sm:max-w-[330px] aspect-square rounded-xs p-2 border border-[var(--ms-rule-strong)] bg-[#090b10]/90 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,165,40,0.2)] backdrop-blur-md transition-all duration-300 group overflow-hidden">
                    {/* Inner Archival Matting & Corner Brackets */}
                    <div className="relative w-full h-full overflow-hidden border border-[var(--ms-bronze)]/40 bg-[#06070a] flex items-center justify-center">
                      {/* 4 Golden Corner Accents */}
                      <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[var(--ms-bronze)] z-10 pointer-events-none" />
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[var(--ms-bronze)] z-10 pointer-events-none" />
                      <span className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[var(--ms-bronze)] z-10 pointer-events-none" />
                      <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[var(--ms-bronze)] z-10 pointer-events-none" />

                      <img
                        key={currentPlate.src}
                        src={currentPlate.src}
                        alt={currentPlate.alt}
                        className="sculpture-floating w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {/* Atmospheric vignette */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06070a]/50 via-transparent to-[#06070a]/25" />
                    </div>
                  </div>
                ) : (
                  <img
                    key={currentPlate.src}
                    src={currentPlate.src}
                    alt={currentPlate.alt}
                    className="sculpture-floating sculpture-cutout-shadow w-full h-full object-contain select-none"
                  />
                )}
              </div>
            </figure>

            {/* Museum Catalogue Plaque & Inscription Decoder */}
            <div className="relative z-10 border border-[var(--ms-rule-strong)] bg-[var(--ms-surface2)]/95 p-4 sm:p-5 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--ms-rule)] pb-2.5 mb-2.5">
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--ms-bronze)] font-bold">
                  {currentPlate.numeral} // ARCHIVAL RECORD
                </span>

                {/* Study Plate Selector */}
                <div
                  className="inline-flex items-center gap-1"
                  role="group"
                  aria-label="Switch sculpture plate"
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

              <div className="font-classical text-base sm:text-lg font-semibold text-[var(--ms-ivory)] leading-snug">
                {currentPlate.title}
              </div>

              <p className="mt-1 font-mono text-[10px] tracking-[0.04em] text-[var(--ms-marble)] leading-relaxed">
                {currentPlate.meta}
              </p>

              {/* Delphic Maxims Decoder */}
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
                            ? 'border-[var(--ms-bronze)] bg-[var(--ms-bronze)]/20 text-[var(--ms-bronze)] font-bold'
                            : 'border-[var(--ms-rule)] bg-[var(--ms-surface)] text-[var(--ms-limestone)] hover:text-[var(--ms-ivory)]'
                        }`}
                      >
                        {m.greek}
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 border border-[var(--ms-rule)] bg-[var(--ms-surface)] text-[11px] font-mono leading-relaxed">
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
                <span>AUTHENTIC MET PHOTOGRAPHY</span>
                <a
                  href={currentPlate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  <span>Met Collection Record</span>
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
