"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export default function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x, y });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      <div className="absolute inset-0 grid-backdrop opacity-30" />
      <div className="absolute inset-0 bg-radial-glow" />

      {/* Parallax glow orbs */}
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-sky/20 blur-3xl"
        style={{ transform: `translate(${offset.x * 20}px, ${offset.y * 20}px)` }}
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-sky-light/10 blur-3xl"
        style={{ transform: `translate(${offset.x * -30}px, ${offset.y * -30}px)` }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6"
        >
          {profile.brand} · {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl"
        >
          Engineering software
          <span className="text-glow text-sky"> that feels alive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-ice/70"
        >
          {profile.tagline} I'm {profile.name}, a {profile.role.toLowerCase()} building
          across web, software, and hardware.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#work" className="btn-primary">
            View Work <span aria-hidden>→</span>
          </a>
          <a href={profile.cvPath} download className="btn-ghost">
            Download CV
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="h-10 w-6 rounded-full border border-line">
          <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-sky" />
        </div>
      </div>
    </section>
  );
}
