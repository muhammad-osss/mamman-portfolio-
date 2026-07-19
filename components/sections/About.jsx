"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { profile, skills, timeline } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-3">About</p>
          <h2 className="section-heading">
            From first line of code <span className="text-sky">to studio.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-ice/70">
            I'm {profile.name}, founder of {profile.brand}. I work across web
            development, software engineering, and hardware — building products
            that are fast, considered, and built to last.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Timeline */}
          <div className="relative border-l border-line pl-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08} className="relative mb-10 last:mb-0">
                <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-void">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky shadow-glow-sm" />
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-sky-light/80">
                  {item.year}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-ice/60">{item.body}</p>
              </Reveal>
            ))}
          </div>

          {/* Skills */}
          <Reveal>
            <h3 className="font-display text-lg font-semibold text-white">
              Core skills
            </h3>
            <div className="mt-6 space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-ice/80">{skill.name}</span>
                    <span className="font-mono text-xs text-sky-light/70">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-sky-dim to-sky-light shadow-glow-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
