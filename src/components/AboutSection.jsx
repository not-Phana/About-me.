import React from 'react';
import { PROFILE } from '../data/profile';

export default function AboutSection() {
  return (
    <section id="about" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-line flex flex-col justify-between">
            <div>
              <div className="hud-label text-accent mb-3">
                SECTION 04 // ABOUT ME
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.08]">
                {PROFILE.aboutHeading}
              </h2>

              <div className="mt-8 space-y-5 text-base sm:text-lg text-muted leading-relaxed">
                {PROFILE.aboutParagraphs.map((paragraph, index) => (
                  <p key={index} className={index === 0 ? 'text-ink font-medium' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Identity Ledger */}
            <div className="mt-10 pt-8 border-t border-lineSoft">
              <div className="hud-label text-ink mb-4">
                DEVELOPER PROFILE SUMMARY
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="border border-line bg-surface p-3.5">
                  <dt className="text-muted">NAME / ALIAS</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {PROFILE.fullName} ({PROFILE.nickname})
                  </dd>
                </div>
                <div className="border border-line bg-surface p-3.5">
                  <dt className="text-muted">PERSONAL BRAND</dt>
                  <dd className="mt-1 text-sm font-semibold text-accent">
                    {PROFILE.brand}
                  </dd>
                </div>
                <div className="border border-line bg-surface p-3.5 sm:col-span-2">
                  <dt className="text-muted">MAIN FOCUS</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    Building software, websites, developer tools, and games through hands-on iteration
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Concise Development Philosophy List */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 bg-surface/20 flex flex-col justify-between">
            <div>
              <div className="hud-label text-accent mb-3">
                HOW I WORK // DEVELOPMENT PHILOSOPHY
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Principles behind what I create
              </h3>
              <p className="mt-2 text-sm text-muted">
                Five rules I follow across every repository and experiment.
              </p>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {PROFILE.philosophy.map((item) => (
                  <div
                    key={item.index}
                    className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                  >
                    <dt className="font-mono text-sm font-bold text-ink sm:w-64 shrink-0 flex items-baseline gap-3">
                      <span className="text-xs text-accent">{item.index}</span>
                      <span>{item.statement}</span>
                    </dt>
                    <dd className="text-sm text-muted leading-relaxed">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 border border-line bg-bg p-5 font-mono text-xs text-muted">
              <span className="text-accent font-semibold">HONESTY NOTE:</span>{' '}
              Everything on this site is built for learning and utility—no fake
              client lists, no fabricated metrics, and no paid walls.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
