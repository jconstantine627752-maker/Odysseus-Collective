import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import MermaidBlock from "./components/MermaidBlock";

/* ============================================================================
   Helpers
   ========================================================================== */
function MermaidAuto({ code }: { code: string }) {
  const [active, setActive] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: "opacity, transform" }}
      onViewportEnter={() => setActive(true)}
    >
      <MermaidBlock code={code} active={active} />
    </motion.div>
  );
}

/* ============================================================================
   Background layers
   ========================================================================== */
function Stars() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {Array.from({ length: 150 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/80 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
            animationDuration: `${2 + Math.random() * 3}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================================
   Intro Scene
   ========================================================================== */
function OlympusIntro({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="relative min-h-screen overflow-hidden text-white bg-black">
      <Stars />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center"
        aria-label="Olympus tower"
      >
        <motion.div
          className="bg-gray-500 rounded-full border-4 border-gray-200 shadow-2xl"
          style={{ width: 220, height: 50, marginBottom: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        />

        <div className="flex space-x-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 shadow-md"
              style={{ width: 12, height: 100 }}
            />
          ))}
        </div>

        <motion.div
          className="bg-gray-700 border-x-4 border-gray-500 shadow-lg"
          style={{ width: "160px", height: "400px" }}
          initial={{ y: 220, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          className="bg-gray-600 border-t-4 border-gray-400 rounded-t-lg shadow-xl"
          style={{ width: "200px", height: "220px" }}
          initial={{ y: 220, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <motion.svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: 220, height: 780 }}
        viewBox="0 0 220 780"
        initial={{ opacity: 0.2 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
        onClick={onEnter}
      >
        <rect x="0" y="0" width="220" height="780" fill="transparent" />
      </motion.svg>
    </main>
  );
}

/* ============================================================================
   Roof + Interior
   ========================================================================== */
function RoofReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 1, 0.95]);

  return (
    <section ref={ref} className="relative z-10 min-h-[160vh]">
      <Stars />
      <div className="sticky top-0 h-screen flex items-end justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="w-full max-w-5xl px-6">
          <svg viewBox="0 0 1200 380" className="w-full h-auto">
            <defs>
              <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#c7cbd1" />
              </linearGradient>
            </defs>
            <polygon points="0,300 600,40 1200,300" fill="url(#stone)" />
            <rect x="60" y="300" width="1080" height="26" fill="#e5e7eb" />
            <rect x="60" y="326" width="1080" height="18" fill="rgba(0,0,0,0.12)" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

function TempleInterior() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  return (
    <section ref={ref} className="relative z-10 min-h-[220vh]">
      <Stars />
      <div className="sticky top-0 h-screen">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to right,
                  rgba(229,231,235,0.92) 0px,
                  rgba(229,231,235,0.92) 140px,
                  rgba(17,24,39,0) 140px,
                  rgba(17,24,39,0) 280px
                )
              `,
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================================
   Main Scene
   ========================================================================== */
function MainScene() {
  const H = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl md:text-2xl font-semibold tracking-wide mb-3 text-[#E5C970]">
      {children}
    </h2>
  );

  const diagrams: { title: string; blurb: string; code: string }[] = [
    { title: "Example", blurb: "Sample flowchart.", code: `flowchart TD; A-->B;` },
  ];
  const regal = { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-b from-[#0b1020] via-[#090f1c] to-[#05070d]">
      <Stars />
      <section className="relative z-10 flex items-center justify-center h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
            Odysseus Collective
          </h1>
          <p className="text-white/90">
            Welcome to the Odysseus Collective. What hatred drives you to climb?
          </p>
        </motion.div>
      </section>

      <section className="relative z-0 pb-32">
        <Stars />
        <div className="space-y-56 md:space-y-64 px-6">
          {diagrams.map(({ title, blurb, code }, idx) => (
            <div key={idx} className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={regal}
                className="mb-7"
              >
                <H>{title}</H>
                <p className="text-white/80">{blurb}</p>
              </motion.div>
              <MermaidAuto code={code} />
            </div>
          ))}
        </div>
      </section>

      <section className="min-h-[120vh]" />
      <RoofReveal />
      <TempleInterior />

      <section className="relative z-0 min-h-[350vh]">
        <Stars />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 300px at 50% 120%, rgba(0,0,0,0.18), rgba(0,0,0,0))",
          }}
        />
      </section>
    </main>
  );
}

/* ============================================================================
   Export Page
   ========================================================================== */
export default function MountOlympusPage() {
  const [entered, setEntered] = useState(false);
  return (
    <AnimatePresence initial={false} mode="wait">
      {!entered ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <OlympusIntro onEnter={() => setEntered(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <MainScene />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
