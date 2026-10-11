import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import {
  IconGitHub,
  IconFacebook,
  IconMessageSquare,
  IconMail,
  IconCopy,
  IconArrowUpRight,
  IconCheck,
  IconTerminal,
  IconCode,
} from './Icons';

export default function ContactSection({ onPlaySound }) {
  const [cardMode, setCardMode] = useState('card'); // 'card' | 'json'
  const [copiedField, setCopiedField] = useState('');

  const handleCopy = (key, text) => {
    try {
      navigator.clipboard.writeText(text);
      onPlaySound?.('switch');
      setCopiedField(key);
      setTimeout(() => setCopiedField(''), 2200);
    } catch {
      // Ignore clipboard failure
    }
  };

  const identityJson = JSON.stringify(
    {
      name: PROFILE.fullName,
      alias: [PROFILE.preferredName, PROFILE.nickname, PROFILE.brand],
      email: PROFILE.email,
      github: PROFILE.githubUrl,
      facebook_main: PROFILE.facebookMainUrl,
      facebook_dm: PROFILE.facebookDmUrl,
      flagship: 'https://phanaach4889.github.io/PK-Khmer-Type/',
      focus: ['Software', 'Websites', 'Developer Tools', 'Games'],
      status: 'Independent Builder · Always Learning',
    },
    null,
    2
  );

  return (
    <section id="contact" className="border-b border-line bg-bg relative overflow-hidden">
      {/* Background Architectural Kinetic Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-8 left-6 lg:left-16 overflow-hidden opacity-[0.045] font-classical font-semibold text-[5.5rem] sm:text-[8.5rem] lg:text-[11.5rem] tracking-[0.08em] text-accent leading-none whitespace-nowrap z-0"
        data-bg-motion="contact-watermark"
      >
        TRANSMISSION // 08
      </div>

      <div className="mx-auto max-w-[1400px] border-x border-line relative z-10">
        <div className="p-6 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 reveal-on-scroll reveal-delay-1">
            <div className="hud-label text-accent mb-3">
              SECTION 08 // DIRECT TRANSMISSION &amp; CHANNELS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Have an idea? Let&apos;s connect.
            </h2>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
              Whether you want to collaborate on a developer tool, propose a software
              architecture, or just discuss technology—my direct inbox, GitHub, and
              social channels are open for incoming signals.
            </p>

            {/* Quick Copy Action Strip */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* Copy Gmail Address */}
              <button
                type="button"
                onClick={() => handleCopy('email', PROFILE.email)}
                className="inline-flex items-center gap-2 border border-line bg-surface hover:border-accent px-4 py-2.5 font-mono text-xs text-ink transition-colors card-laser-lift"
              >
                {copiedField === 'email' ? (
                  <>
                    <IconCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span className="text-[#4ade80] font-bold">
                      GMAIL COPIED: {PROFILE.email}
                    </span>
                  </>
                ) : (
                  <>
                    <IconMail className="w-3.5 h-3.5 text-[#ea4335]" />
                    <span>Copy Gmail Address</span>
                  </>
                )}
              </button>

              {/* Copy GitHub URL */}
              <button
                type="button"
                onClick={() => handleCopy('url', PROFILE.githubUrl)}
                className="inline-flex items-center gap-2 border border-line bg-surface hover:border-accent px-4 py-2.5 font-mono text-xs text-ink transition-colors card-laser-lift"
              >
                {copiedField === 'url' ? (
                  <>
                    <IconCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span className="text-[#4ade80] font-bold">
                      GITHUB URL COPIED
                    </span>
                  </>
                ) : (
                  <>
                    <IconGitHub className="w-3.5 h-3.5 text-accent" />
                    <span>Copy GitHub Profile</span>
                  </>
                )}
              </button>

              {/* Copy Git Clone Command */}
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    'clone',
                    'git clone https://github.com/phanaach4889/About-me..git'
                  )
                }
                className="inline-flex items-center gap-2 border border-line bg-surface hover:border-accent px-4 py-2.5 font-mono text-xs text-ink transition-colors card-laser-lift"
              >
                {copiedField === 'clone' ? (
                  <>
                    <IconCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span className="text-[#4ade80] font-bold">
                      CLONE COMMAND COPIED
                    </span>
                  </>
                ) : (
                  <>
                    <IconTerminal className="w-3.5 h-3.5 text-accent" />
                    <span>Copy git clone Portfolio</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 reveal-on-scroll reveal-delay-2">
            <div className="hud-frame border border-line bg-surface p-6 sm:p-8 space-y-5 card-laser-lift">
              <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs">
                <span className="text-muted flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span>TRANSMISSION NODE</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onPlaySound?.('switch');
                      setCardMode('card');
                    }}
                    className={`px-2 py-0.5 border text-[10px] uppercase ${
                      cardMode === 'card'
                        ? 'border-accent bg-accent text-[#0b0b0c] font-bold'
                        : 'border-line bg-bg text-muted hover:text-ink'
                    }`}
                  >
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onPlaySound?.('switch');
                      setCardMode('json');
                    }}
                    className={`px-2 py-0.5 border text-[10px] uppercase inline-flex items-center gap-1 ${
                      cardMode === 'json'
                        ? 'border-accent bg-accent text-[#0b0b0c] font-bold'
                        : 'border-line bg-bg text-muted hover:text-ink'
                    }`}
                  >
                    <IconCode className="w-3 h-3" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              {cardMode === 'card' ? (
                <>
                  {/* Handle & Email Tiles */}
                  <div className="space-y-2 font-mono text-xs">
                    {/* Primary GitHub Handle */}
                    <div className="border border-line bg-bg p-3">
                      <div className="text-[10px] text-muted flex items-center justify-between">
                        <span>GITHUB ACCOUNT // CODE REPOSITORIES</span>
                        <span className="text-accent font-bold">PRIMARY</span>
                      </div>
                      <div className="font-display text-lg sm:text-xl font-bold text-ink mt-0.5 flex items-center gap-2">
                        <IconGitHub className="w-4 h-4 text-accent" />
                        <span>github.com/{PROFILE.githubUsername}</span>
                      </div>
                    </div>

                    {/* Verified Direct Gmail */}
                    <div className="border border-line bg-bg p-3">
                      <div className="text-[10px] text-muted flex items-center justify-between">
                        <span>DIRECT INBOX // ELECTRONIC MAIL</span>
                        <span className="text-[#ea4335] font-bold">VERIFIED</span>
                      </div>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <a
                          href={PROFILE.emailMailto}
                          onClick={() => onPlaySound?.('switch')}
                          className="font-display text-lg sm:text-xl font-bold text-ink hover:text-accent truncate transition-colors flex items-center gap-2"
                        >
                          <IconMail className="w-4 h-4 text-[#ea4335]" />
                          <span>{PROFILE.email}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy('email-node', PROFILE.email)}
                          className="border border-line hover:border-accent bg-surface px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted hover:text-accent flex items-center gap-1 transition-colors shrink-0"
                          title="Copy email to clipboard"
                        >
                          {copiedField === 'email-node' ? (
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
                    </div>
                  </div>

                  {/* Builder Meta Grid */}
                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    <div className="border border-line bg-bg p-3">
                      <div className="text-[10px] text-muted">BUILDER</div>
                      <div className="text-ink font-bold mt-0.5">
                        {PROFILE.fullName}
                      </div>
                    </div>
                    <div className="border border-line bg-bg p-3">
                      <div className="text-[10px] text-muted">ALIAS / BRAND</div>
                      <div className="text-accent font-bold mt-0.5">
                        {PROFILE.nickname} // {PROFILE.brand}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative border border-line bg-bg p-3.5 font-mono text-[11px] text-ink overflow-x-auto">
                  <pre className="m-0 leading-relaxed">{identityJson}</pre>
                </div>
              )}

              {/* 4 High-Tech Action Channels */}
              <div className="space-y-2 pt-1">
                {/* GitHub & Gmail Primary Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center justify-between bg-invertBg text-invertFg px-4 py-3 hud-label hover:opacity-90 transition-opacity card-laser-lift"
                  >
                    <span className="flex items-center gap-2">
                      <IconGitHub className="w-4 h-4 text-accent" />
                      <span>GitHub Profile</span>
                    </span>
                    <IconArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href={PROFILE.emailMailto}
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center justify-between border border-accent/40 bg-accentDim hover:border-accent text-accent px-4 py-3 hud-label transition-colors card-laser-lift"
                  >
                    <span className="flex items-center gap-2">
                      <IconMail className="w-4 h-4 text-[#ea4335]" />
                      <span>Send Direct Email</span>
                    </span>
                    <IconArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Facebook Main & DM Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={PROFILE.facebookMainUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center justify-between border border-line bg-bg hover:border-accent px-4 py-3 font-mono text-xs text-ink hover:text-accent transition-colors card-laser-lift"
                  >
                    <span className="flex items-center gap-2">
                      <IconFacebook className="w-4 h-4 text-[#1877f2]" />
                      <span>Facebook (Main)</span>
                    </span>
                    <IconArrowUpRight className="w-3.5 h-3.5 text-muted" />
                  </a>

                  <a
                    href={PROFILE.facebookDmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlaySound?.('switch')}
                    className="inline-flex items-center justify-between border border-line bg-bg hover:border-accent px-4 py-3 font-mono text-xs text-ink hover:text-accent transition-colors card-laser-lift"
                  >
                    <span className="flex items-center gap-2">
                      <IconMessageSquare className="w-4 h-4 text-[#0084ff]" />
                      <span>Facebook (DM)</span>
                    </span>
                    <IconArrowUpRight className="w-3.5 h-3.5 text-muted" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
