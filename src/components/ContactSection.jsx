import React, { useState } from 'react';
import { PROFILE } from '../data/profile';
import {
  IconGitHub,
  IconArrowUpRight,
  IconCheck,
  IconTerminal,
  IconCode,
} from './Icons';

export default function ContactSection() {
  const [cardMode, setCardMode] = useState('card'); // 'card' | 'json'
  const [copiedField, setCopiedField] = useState('');

  const handleCopy = (key, text) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedField(key);
      setTimeout(() => setCopiedField(''), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  const identityJson = JSON.stringify(
    {
      name: PROFILE.fullName,
      alias: [PROFILE.preferredName, PROFILE.nickname, PROFILE.brand],
      github: PROFILE.githubUrl,
      flagship: 'https://phanaach4889.github.io/PK-Khmer-Type/',
      focus: ['Software', 'Websites', 'Developer Tools', 'Games'],
      status: 'Independent Builder · Always Learning',
    },
    null,
    2
  );

  return (
    <section id="contact" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="p-6 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 reveal-on-scroll reveal-delay-1">
            <div className="hud-label text-accent mb-3">
              SECTION 08 // DIRECT TRANSMISSION &amp; CHANNELS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Have an idea? Let&apos;s connect.
            </h2>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
              GitHub is my primary home for code, repositories, issue
              discussions, and project updates. Follow my builds, inspect the
              source code, or clone any repository directly on GitHub.
            </p>

            {/* Quick Copy Action Strip */}
            <div className="mt-8 flex flex-wrap gap-3">
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
                    <span>Copy Profile URL</span>
                  </>
                )}
              </button>

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
                <span className="text-muted">DEVELOPER IDENTITY NODE</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCardMode('card')}
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
                    onClick={() => setCardMode('json')}
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
                  <div>
                    <div className="font-mono text-xs text-muted">
                      GITHUB ACCOUNT // PRIMARY HANDLE
                    </div>
                    <div className="font-display text-2xl font-bold text-ink mt-0.5">
                      github.com/{PROFILE.githubUsername}
                    </div>
                  </div>

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
                <div className=" relative border border-line bg-bg p-3.5 font-mono text-[11px] text-ink overflow-x-auto">
                  <pre className="m-0 leading-relaxed">{identityJson}</pre>
                </div>
              )}

              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between bg-invertBg text-invertFg px-6 py-4 hud-label hover:opacity-90 transition-opacity"
              >
                <span className="flex items-center gap-2.5">
                  <IconGitHub className="w-4 h-4" />
                  <span>Connect on GitHub (@{PROFILE.githubUsername})</span>
                </span>
                <IconArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
