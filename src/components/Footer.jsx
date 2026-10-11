import React from 'react';
import { PROFILE } from '../data/profile';
import { PKMonogram, IconGitHub, IconFacebook, IconArrowUpRight } from './Icons';

export default function Footer({ onNavigateHome }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    onNavigateHome(sectionId);
  };

  return (
    <footer className="bg-bg text-ink">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-line">
          {/* Brand Identity */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <PKMonogram className="w-7 h-7 text-ink" />
              <div>
                <div className="font-mono text-sm font-bold tracking-[0.16em] uppercase">
                  {PROFILE.brand} // {PROFILE.fullName}
                </div>
                <div className="font-mono text-xs text-muted">
                  Also known as {PROFILE.nickname}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted">
              Built with curiosity and code.
            </p>
          </div>

          {/* Section Links */}
          <div className="md:col-span-3 font-mono text-xs space-y-2.5">
            <div className="text-muted uppercase tracking-wider mb-3">
              SECTIONS
            </div>
            {[
              { id: 'home', label: '01 Home' },
              { id: 'about', label: '02 About' },
              { id: 'projects', label: '03 Projects' },
              { id: 'console', label: '04 Console' },
              { id: 'github', label: '05 GitHub' },
              { id: 'building', label: '06 Currently Building' },
              { id: 'journey', label: '07 The Journey' },
              { id: 'contact', label: '08 Contact' },
            ].map((item) => (
              <div key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="text-muted hover:text-ink transition-colors"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>

          {/* External Links & Platforms */}
          <div className="md:col-span-4 font-mono text-xs space-y-2.5">
            <div className="text-muted uppercase tracking-wider mb-3">
              LIVE PLATFORMS
            </div>
            <div>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
              >
                <IconGitHub className="w-3.5 h-3.5 text-accent" />
                <span>@{PROFILE.githubUsername}</span>
                <IconArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div>
              <a
                href={PROFILE.facebookMainUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
              >
                <IconFacebook className="w-3.5 h-3.5 text-accent" />
                <span>Facebook (Main)</span>
                <IconArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div>
              <a
                href={PROFILE.facebookDmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent transition-colors"
              >
                <IconFacebook className="w-3.5 h-3.5 text-accent" />
                <span>Facebook (DM)</span>
                <IconArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div className="pt-2 border-t border-line/60">
              <a
                href="https://phanaach4889.github.io/PK-Khmer-Type/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted hover:text-ink transition-colors"
              >
                <span>PK Khmer Type</span>
                <IconArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div>
              <a
                href="https://phanaach4889.github.io/PK-game/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted hover:text-ink transition-colors"
              >
                <span>NEON PROTOCOL (PK-game)</span>
                <IconArrowUpRight className="w-3 h-3" />
              </a>
            </div>
            <div>
              <a
                href="https://phanaach4889.github.io/PK-icons/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted hover:text-ink transition-colors"
              >
                <span>PK Icons Studio</span>
                <IconArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="px-6 py-4 sm:px-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted bg-surface/50">
          <div>
            &copy; {currentYear} {PROFILE.fullName} ({PROFILE.brand}). All rights reserved.
          </div>
          <div>Built with curiosity and code.</div>
        </div>
      </div>
    </footer>
  );
}
