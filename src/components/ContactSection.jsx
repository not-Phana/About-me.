import React from 'react';
import { PROFILE } from '../data/profile';
import { IconGitHub, IconArrowUpRight } from './Icons';

export default function ContactSection() {
  return (
    <section id="contact" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="p-6 sm:p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="hud-label text-accent mb-3">
              SECTION 06 // CONNECT
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Have an idea? Let&apos;s connect.
            </h2>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
              GitHub is my primary home for code, repositories, issue
              discussions, and project updates. Follow my builds or explore my
              source repositories directly on GitHub.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-line bg-surface p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-xs">
                <span className="text-muted">PRIMARY CHANNEL</span>
                <span className="text-accent font-semibold">VERIFIED PROFILE</span>
              </div>

              <div>
                <div className="font-mono text-xs text-muted">
                  GITHUB ACCOUNT
                </div>
                <div className="font-display text-2xl font-bold text-ink mt-0.5">
                  github.com/{PROFILE.githubUsername}
                </div>
              </div>

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
