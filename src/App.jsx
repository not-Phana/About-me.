import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectGrid from './components/ProjectGrid';
import ProjectDetail from './components/ProjectDetail';
import InteractiveConsole from './components/InteractiveConsole';
import GitHubSection from './components/GitHubSection';
import CurrentlyBuilding from './components/CurrentlyBuilding';
import AboutSection from './components/AboutSection';
import JourneySection from './components/JourneySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import ScrollRail from './components/ScrollRail';
import { PROJECTS } from './data/projects';
import { playTactileClick } from './utils/sound';

function parseHashRoute(hash) {
  const clean = (hash || '').replace(/^#\/?/, '');
  if (clean.startsWith('project/')) {
    const slug = clean.slice('project/'.length).trim();
    return { view: 'detail', slug };
  }
  return { view: 'home', section: clean || 'home' };
}

export default function App() {
  const [route, setRoute] = useState(() => parseHashRoute(window.location.hash));
  const [activeSection, setActiveSection] = useState('home');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    try {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [accentPreset, setAccentPreset] = useState(() => {
    try {
      const saved = localStorage.getItem('pk-accent') || 'amber';
      document.documentElement.setAttribute('data-accent', saved);
      return saved;
    } catch {
      return 'amber';
    }
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('pk-sound');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  const triggerSound = useCallback(
    (type = 'switch') => {
      playTactileClick(type, soundEnabled);
    },
    [soundEnabled]
  );

  // Sync theme to document root & localStorage
  const toggleTheme = useCallback(() => {
    playTactileClick('switch', soundEnabled);
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('pk-theme', next);
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, [soundEnabled]);

  const handleChangeAccent = useCallback(
    (nextAccent) => {
      playTactileClick('switch', soundEnabled);
      setAccentPreset(nextAccent);
      try {
        document.documentElement.setAttribute('data-accent', nextAccent);
        localStorage.setItem('pk-accent', nextAccent);
      } catch {
        // Ignore storage errors
      }
    },
    [soundEnabled]
  );

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playTactileClick('pulse', true);
      try {
        localStorage.setItem('pk-sound', String(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  }, []);

  // Global Ctrl+K / Cmd+K shortcut for Command Palette
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playTactileClick('switch', soundEnabled);
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [soundEnabled]);

  // Listen to browser hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHashRoute(window.location.hash);
      setRoute(parsed);
      if (parsed.view === 'home' && parsed.section) {
        const el = document.getElementById(parsed.section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // IntersectionObserver to highlight current section in Navbar
  useEffect(() => {
    if (route.view !== 'home') return undefined;

    const sectionIds = [
      'home',
      'projects',
      'console',
      'github',
      'building',
      'about',
      'journey',
      'contact',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'building' || id === 'journey') {
              setActiveSection('about');
            } else {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [route.view]);

  const handleSelectProject = useCallback(
    (projectId) => {
      playTactileClick('switch', soundEnabled);
      window.location.hash = `project/${projectId}`;
      setRoute({ view: 'detail', slug: projectId });
    },
    [soundEnabled]
  );

  const handleNavigateHome = useCallback(
    (sectionId = 'home') => {
      playTactileClick('switch', soundEnabled);
      if (window.location.hash.startsWith('#project/')) {
        window.history.pushState(null, '', `#${sectionId}`);
      } else {
        window.location.hash = sectionId;
      }
      setRoute({ view: 'home', section: sectionId });
      setActiveSection(sectionId);

      requestAnimationFrame(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    },
    [soundEnabled]
  );

  const selectedProject =
    route.view === 'detail'
      ? PROJECTS.find((p) => p.id === route.slug) || null
      : null;

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-invertBg focus:text-invertFg focus:px-4 focus:py-2 hud-label"
      >
        Skip to content
      </a>

      <Navbar
        activeSection={activeSection}
        onNavigateHome={handleNavigateHome}
        isDetailView={route.view === 'detail'}
        theme={theme}
        onToggleTheme={toggleTheme}
        accentPreset={accentPreset}
        onChangeAccent={handleChangeAccent}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenCommandPalette={() => {
          triggerSound('switch');
          setCommandPaletteOpen(true);
        }}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        projects={PROJECTS}
        onSelectProject={handleSelectProject}
        onNavigateHome={handleNavigateHome}
        theme={theme}
        onToggleTheme={toggleTheme}
        accentPreset={accentPreset}
        onChangeAccent={handleChangeAccent}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <ScrollRail
        isDetailView={route.view === 'detail'}
        onNavigateHome={handleNavigateHome}
        onPlaySound={triggerSound}
      />

      <main id="main-content" className="flex-1">
        {route.view === 'detail' ? (
          <ProjectDetail
            project={selectedProject}
            requestedSlug={route.slug}
            allProjects={PROJECTS}
            onBack={() => handleNavigateHome('projects')}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <>
            <HeroSection
              onExploreProjects={() => handleNavigateHome('projects')}
              onSelectProject={handleSelectProject}
              onPlaySound={triggerSound}
              onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            />
            <ProjectGrid
              projects={PROJECTS}
              onSelectProject={handleSelectProject}
            />
            <InteractiveConsole
              onSelectProject={handleSelectProject}
              onChangeAccent={handleChangeAccent}
              onToggleTheme={toggleTheme}
              onPlaySound={triggerSound}
            />
            <GitHubSection />
            <CurrentlyBuilding
              projects={PROJECTS}
              onSelectProject={handleSelectProject}
            />
            <AboutSection />
            <JourneySection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer onNavigateHome={handleNavigateHome} />
    </div>
  );
}
