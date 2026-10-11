import React from 'react';
import { PROFILE } from '../data/profile';
import { IconArrowUpRight, IconCompass } from './Icons';

export default function JourneySection() {
  return (
    <section id="journey" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-[1400px] border-x border-line">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 8 Columns: Verified Milestones */}
          <div className="lg:col-span-8 p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-line">
            <div className="hud-label text-accent mb-3">
              SECTION 07 // BUILDER MILESTONES
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
              The Journey So Far
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted max-w-2xl">
              Verified milestones sourced from my GitHub repository creation
              dates, commit history, and local project builds.
            </p>

            <ol className="mt-8 divide-y divide-line border-y border-line">
              {PROFILE.journeyMilestones.map((milestone) => (
                <li
                  key={milestone.code + milestone.title}
                  className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
                >
                  <div className="sm:col-span-3 font-mono">
                    <div className="text-xs font-bold text-accent">
                      {milestone.date}
                    </div>
                    <div className="text-[11px] text-muted mt-0.5">
                      {milestone.category}
                    </div>
                  </div>

                  <div className="sm:col-span-9">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-bold text-ink">
                        {milestone.title}
                      </h3>
                      {milestone.link && (
                        <a
                          href={milestone.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline"
                        >
                          <span>Inspect Repo</span>
                          <IconArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right 4 Columns: What I'm Exploring */}
          <div className="lg:col-span-4 p-6 sm:p-10 lg:p-14 bg-surface/30 flex flex-col justify-between">
            <div>
              <div className="hud-label text-accent mb-3 flex items-center gap-2">
                <IconCompass className="w-4 h-4" />
                <span>WHAT I&apos;M EXPLORING</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink">
                Current Learning &amp; Technical Focus
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Areas of programming and system design I am actively studying
                through my projects:
              </p>

              <ul className="mt-6 space-y-3">
                {PROFILE.exploringTopics.map((topic, idx) => (
                  <li
                    key={topic}
                    className="border border-line bg-bg p-3.5 font-mono text-xs text-ink flex items-start gap-3"
                  >
                    <span className="text-accent font-bold">
                      0{idx + 1}
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-line font-mono text-xs text-muted">
              Easy to update in{' '}
              <code className="text-ink bg-surface px-1.5 py-0.5 border border-line">
                src/data/profile.js
              </code>{' '}
              as new milestones ship.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
