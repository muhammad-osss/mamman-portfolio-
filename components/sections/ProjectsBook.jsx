"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, BookOpen } from "lucide-react";
import BookModel from "./BookModel";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import { projects } from "@/lib/data";

export default function ProjectsBook() {
  const [open, setOpen] = useState(false);

  return (
    <section id="work" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-3">Selected Work</p>
          <h2 className="section-heading">
            Open the book, <span className="text-sky">explore the work.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[380px_1fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto h-[360px] w-full max-w-sm">
              <Canvas camera={{ position: [0, 0, 3.4], fov: 42 }} dpr={[1, 1.8]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[2, 2, 2]} intensity={1.2} color="#7DD3FC" />
                <pointLight position={[-2, -1, 1]} intensity={0.5} color="#38BDF8" />
                <Suspense fallback={null}>
                  <BookModel open={open} />
                </Suspense>
              </Canvas>

              <button
                onClick={() => setOpen((o) => !o)}
                className="btn-primary absolute -bottom-4 left-1/2 -translate-x-1/2"
              >
                <BookOpen size={16} />
                {open ? "Close Book" : "Open Book"}
              </button>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <AnimatePresence>
              {open &&
                projects.map((project, i) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                  >
                    <GlassCard className="flex h-full flex-col justify-between">
                      <div>
                        <p className="eyebrow mb-2">{project.category}</p>
                        <h3 className="font-display text-xl font-semibold text-white">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm text-ice/70">{project.summary}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((s) => (
                            <li
                              key={s}
                              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-sky-light/80"
                            >
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 flex items-center gap-4">
                        <a
                          href={`/projects/${project.slug}`}
                          className="text-sm font-semibold text-sky-light hover:text-sky"
                        >
                          Case study →
                        </a>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-ice/60 hover:text-sky-light"
                          aria-label={`Live demo of ${project.title}`}
                        >
                          <ExternalLink size={18} />
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-ice/60 hover:text-sky-light"
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <Github size={18} />
                        </a>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
            </AnimatePresence>

            {!open && (
              <div className="col-span-2 flex h-full items-center justify-center rounded-2xl border border-dashed border-line p-10 text-center">
                <p className="font-mono text-sm text-ice/40">
                  Open the book to reveal projects
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
