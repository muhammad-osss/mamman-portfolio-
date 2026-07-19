"use client";

import { useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import RobotModel from "./RobotModel";
import ParticleField from "./ParticleField";
import { profile } from "@/lib/data";
import useReducedMotion from "@/hooks/useReducedMotion";

const BOOT_LINES = [
  "INITIALIZING SYSTEM...",
  "LOADING PORTFOLIO CORE...",
  "CALIBRATING VISUAL INTERFACE...",
  "SYSTEM ONLINE.",
];

const SESSION_KEY = "mrpg_intro_seen";

export default function RobotIntro({ onEnter }) {
  const reducedMotion = useReducedMotion();
  const [skipped, setSkipped] = useState(false);
  const [stage, setStage] = useState("boot"); // boot -> greet -> ready
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Skip entirely on repeat visits within the same session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) {
      setSkipped(true);
      onEnter?.();
    }
  }, [onEnter]);

  useEffect(() => {
    if (skipped) return;
    if (reducedMotion) {
      setStage("ready");
      setLineIndex(BOOT_LINES.length);
      return;
    }

    if (stage === "boot" && lineIndex < BOOT_LINES.length) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 480);
      return () => clearTimeout(t);
    }
    if (stage === "boot" && lineIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => setStage("greet"), 400);
      return () => clearTimeout(t);
    }
    if (stage === "greet") {
      const t = setTimeout(() => setStage("ready"), 2400);
      return () => clearTimeout(t);
    }
  }, [stage, lineIndex, skipped, reducedMotion]);

  const handleEnter = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
    onEnter?.();
    setExiting(true);
    setTimeout(() => setSkipped(true), 750);
  }, [onEnter]);

  if (skipped) return null;

  const robotStage = stage === "greet" ? "greet" : stage === "ready" ? "point" : "idle";

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void"
        style={{ pointerEvents: exiting ? "none" : "auto" }}
      >
        <div className="absolute inset-0 grid-backdrop opacity-40" />
        <div className="absolute inset-0 bg-radial-glow" />

        <button
          onClick={handleEnter}
          className="absolute top-6 right-6 z-20 font-mono text-xs uppercase tracking-[0.2em] text-ice/50 transition-colors hover:text-sky-light"
          aria-label="Skip intro animation"
        >
          Skip intro →
        </button>

        {/* 3D robot */}
        <div className="relative h-[46vh] w-full max-w-md sm:h-[52vh]">
          <Canvas camera={{ position: [0, 0.2, 3.4], fov: 40 }} dpr={[1, 1.8]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[2, 2, 2]} intensity={1.4} color="#7DD3FC" />
            <pointLight position={[-2, -1, 1]} intensity={0.6} color="#38BDF8" />
            <ParticleField />
            <RobotModel stage={robotStage} position={[0, -0.2, 0]} />
          </Canvas>
        </div>

        {/* Boot terminal */}
        {stage === "boot" && (
          <div className="relative z-10 -mt-4 h-24 font-mono text-xs text-sky-light/80 sm:text-sm">
            {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
              <p key={i} className={i === lineIndex - 1 ? "text-glow" : "opacity-50"}>
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Greeting + logo reveal */}
        {(stage === "greet" || stage === "ready") && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 -mt-4 flex flex-col items-center text-center px-6"
          >
            <p className="eyebrow mb-3">AI SYSTEM ONLINE</p>
            <h1 className="text-glow font-display text-3xl font-semibold text-white sm:text-4xl">
              Welcome to {profile.name} Portfolio
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-sky-light/70">
              {profile.brand}
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <AnimatePresence>
          {stage === "ready" && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={handleEnter}
              className="btn-primary relative z-10 mt-8"
            >
              Enter Portfolio
              <span aria-hidden>→</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
