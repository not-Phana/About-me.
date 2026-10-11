import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import {
  PKMonogram,
  IconGitHub,
  IconFacebook,
  IconMessageSquare,
  IconMail,
  IconArrowUpRight,
  IconCheck,
  IconCopy,
} from './Icons';

export default function Footer({ onNavigateHome, onPlaySound }) {
  const currentYear = new Date().getFullYear();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    onPlaySound?.('switch');
    onNavigateHome(sectionId);
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(PROFILE.email);
      onPlaySound?.('switch');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {}
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
            <p className="mt-4 max-w-md text-sm text-muted leading-relaxed">
              Built with curiosity, custom canvas physics, and code. Open to
              software experiments, architecture design, and direct collaboration.
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

          {/* Direct Transmission Channels & Platforms */}
          <div className="md:col-span-4 font-mono text-xs space-y-4">
            <div>
              <div className="flex items-center justify-between text-muted uppercase tracking-wider mb-2.5 text-[11px]">
                <span>DIRECT CHANNELS // CONTACT</span>
                <span className="flex items-center gap-1.5 text-[10px] text-accent font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span>ONLINE</span>
                </span>
              </div>
              <div className="space-y-1.5">
                {/* GitHub */}
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-bg text-accent group-hover:scale-110 transition-transform">
                      <IconGitHub className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent transition-colors">
                        @{PROFILE.githubUsername}
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        GITHUB // REPOSITORIES
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted group-hover:text-accent font-bold uppercase flex items-center gap-1">
                    <span>SRC</span>
                    <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>

                {/* Gmail */}
                <div className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift">
                  <a
                    href={PROFILE.emailMailto}
                    onClick={() => onPlaySound?.('switch')}
                    className="flex items-center gap-2 min-w-0 flex-1 mr-2"
                    title={`Send an email to ${PROFILE.email}`}
                  >
                    <span className="p-1 rounded bg-bg text-[#ea4335] group-hover:scale-110 transition-transform">
                      <IconMail className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent truncate transition-colors">
                        {PROFILE.email}
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        GMAIL // DIRECT INBOX
                      </div>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="border border-line/80 hover:border-accent bg-bg px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted hover:text-accent flex items-center gap-1 transition-colors shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <IconCheck className="w-2.5 h-2.5 text-[#4ade80]" />
                        <span className="text-[#4ade80] font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <IconCopy className="w-2.5 h-2.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Facebook Main */}
                <a
                  href={PROFILE.facebookMainUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-bg text-[#1877f2] group-hover:scale-110 transition-transform">
                      <IconFacebook className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent transition-colors">
                        Phanna Kurosaki
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        FACEBOOK // MAIN PROFILE
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted group-hover:text-accent font-bold uppercase flex items-center gap-1">
                    <span>MAIN</span>
                    <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>

                {/* Facebook DM */}
                <a
                  href={PROFILE.facebookDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlaySound?.('switch')}
                  className="group flex items-center justify-between border border-line bg-surface/70 hover:border-accent hover:bg-surface p-2 px-2.5 transition-all card-laser-lift"
                >
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-bg text-[#0084ff] group-hover:scale-110 transition-transform">
                      <IconMessageSquare className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold text-ink group-hover:text-accent transition-colors">
                        Direct Messenger
                      </div>
                      <div className="text-[9px] text-muted tracking-wider">
                        FACEBOOK // DM CHANNEL
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted group-hover:text-accent font-bold uppercase flex items-center gap-1">
                    <span>DM</span>
                    <IconArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-2.5 border-t border-line/60">
              <div className="text-muted uppercase tracking-wider mb-2 text-[10px]">
                LIVE APPS &amp; TOOLS
              </div>
              <div className="space-y-1.5 text-xs">
                <div>
                  <a
                    href="https://phanaach4889.github.io/PK-Khmer-Type/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
                  >
                    <span>PK Khmer Type</span>
                    <IconArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://phanaach4889.github.io/PK-game/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
                  >
                    <span>NEON PROTOCOL (PK-game)</span>
                    <IconArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                </div>
                <div>
                  <a
                    href="https://phanaach4889.github.io/PK-icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-ink transition-colors"
                  >
                    <span>PK Icons Studio</span>
                    <IconArrowUpRight className="w-3 h-3 text-muted" />
                  </a>
                </div>
              </div>
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
