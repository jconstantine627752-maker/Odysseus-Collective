import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MermaidBlock from "./components/MermaidBlock";

/* ---------- Small helper that renders Mermaid when the block is visible ---------- */
function MermaidAuto({ code }: { code: string }) {
  const [active, setActive] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onViewportEnter={() => setActive(true)}
    >
      <MermaidBlock code={code} active={active} />
    </motion.div>
  );
}

/* ---------------------------------- Stars ---------------------------------- */
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

/* ------------------------------- Mountains ------------------------------- */
function Mountains() {
  return (
    <div className="absolute bottom-0 w-full h-[45vh] bg-gradient-to-t from-gray-900 to-transparent overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="absolute bg-gray-700 opacity-80"
          style={{
            bottom: 0,
            left: `${i * 15 - 10}%`,
            width: "50%",
            height: `${30 + Math.random() * 40}vh`,
            clipPath:
              "polygon(0% 100%, 20% 40%, 50% 20%, 80% 50%, 100% 100%)",
            filter: "blur(3px)",
          }}
        />
      ))}
    </div>
  );
}

/* --------------------------------- Clouds --------------------------------- */
function Clouds() {
  return (
    <div className="absolute bottom-0 w-full h-[35vh] overflow-hidden">
      <div className="absolute bottom-0 w-full h-[20vh] bg-white/30 blur-3xl" />
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/40 rounded-full blur-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `${Math.random() * 8}%`,
            width: `${120 + Math.random() * 220}px`,
            height: `${60 + Math.random() * 100}px`,
          }}
          animate={{ x: [0, 25, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 15 + Math.random() * 10,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------- Intro Scene ------------------------------ */
function OlympusIntro({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="relative min-h-screen overflow-hidden text-white bg-black">
      <Stars />
      <Mountains />
      <Clouds />

      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        aria-label="Olympus tower"
      >
        <motion.div
          className="bg-gray-500 rounded-full border-4 border-gray-200 shadow-2xl"
          style={{ width: 220, height: 50, marginBottom: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
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
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        />

        <motion.div
          className="bg-gray-600 border-t-4 border-gray-400 rounded-t-lg shadow-xl"
          style={{ width: "200px", height: "220px" }}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
      </div>

      {/* Clickable glow mask over the tower */}
      <motion.svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: 220, height: 780 }}
        viewBox="0 0 220 780"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.4 }}
        onClick={onEnter}
      >
        <defs>
          <mask id="towerUnion">
            <rect x="0" y="0" width="220" height="780" fill="black" />
            <rect x="0" y="0" width="220" height="50" rx="25" fill="white" />
            <rect x="30" y="60" width="160" height="500" fill="white" />
            <rect
              x="10"
              y="560"
              width="200"
              height="220"
              rx="100"
              fill="white"
            />
          </mask>
          <filter id="softGoldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="30" result="blur" />
            <feFlood floodColor="#EEDC82" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="0"
          y="0"
          width="220"
          height="780"
          mask="url(#towerUnion)"
          fill="transparent"
          pointerEvents="all"
        />

        <g mask="url(#towerUnion)" filter="url(#softGoldGlow)">
          <rect
            x="0"
            y="0"
            width="220"
            height="780"
            fill="#EEDC82"
            opacity="0.25"
          />
        </g>
      </motion.svg>
    </main>
  );
}

/* ------------------------------- Main Scene ------------------------------- */
function MainScene() {
  const H = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl md:text-2xl font-semibold tracking-wide mb-4 text-[#E5C970]">
      {children}
    </h2>
  );

  // Mermaid graph sources (top → down)
  const gOverview = `
flowchart TD
  O[Odysseus Platform] --> A[Agents: Chat API & UI]
  O --> S[Solana Bot: Pump.fun + RugCheck + Jupiter]
  O --> B[BNB Module: HTTP swap service]
  O --> D[Unified Docker Workflow]
`;
  const gAgents = `
flowchart TD
  A[Agents] --> API[OpenAI-compatible API]
  A --> Backends[Pluggable backends (OpenAI / local / hosted)]
  A --> Calls[Calls internal trade services]
  A --> UI[Optional UI]
`;
  const gSolana = `
flowchart TD
  S[Solana Bot] --> Watch[Watch Pump.fun tokens]
  Watch --> Risk[RugCheck risk gate]
  Risk -->|pass| Route[Jupiter routing]
  Route --> Exec[Execute trade]
`;
  const gBNB = `
flowchart TD
  B[BNB Module] --> HTTP[HTTP endpoint]
  HTTP --> Swap[Live swap on BNB Chain]
  Swap --> Confirm[Confirm and return]
`;

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-b from-[#0b1020] via-[#090f1c] to-[#05070d]">
      {/* HERO */}
      <Stars />
      <section className="relative z-10 flex items-center justify-center h-screen px-6 text-center">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
            Odysseus Collective
          </h1>
          <p className="text-white/90 leading-relaxed">
            Welcome to the Odysseus Collective. What hatred drives you to climb
            the mountain here?
          </p>
        </div>
      </section>

      {/* SCROLLING MERMAID SECTIONS */}
      <section className="relative z-0 pb-32">
        <Stars />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20" />

        <div className="space-y-24 px-6">
          {/* Overview */}
          <div className="max-w-5xl mx-auto">
            <H>Unified AI & On-Chain Trading Platform</H>
            <p className="text-white/80 mb-6">
              Modular system combining conversational agents with rule-based
              trading. Built for transparency, safety, and local control.
              Deployable with Docker.
            </p>
            <MermaidAuto code={gOverview} />
          </div>

          {/* Agents */}
          <div className="max-w-5xl mx-auto">
            <H>Agents</H>
            <p className="text-white/80 mb-6">
              Lightweight chat layer with an OpenAI-compatible API for
              reasoning, orchestration, and custom commands.
            </p>
            <MermaidAuto code={gAgents} />
          </div>

          {/* Solana Bot */}
          <div className="max-w-5xl mx-auto">
            <H>Solana Bot</H>
            <p className="text-white/80 mb-6">
              Automated trading for Pump.fun tokens with RugCheck gating and
              Jupiter routing.
            </p>
            <MermaidAuto code={gSolana} />
          </div>

          {/* BNB Module */}
          <div className="max-w-5xl mx-auto">
            <H>BNB Module</H>
            <p className="text-white/80 mb-6">
              HTTP microservice that executes live swaps on BNB Chain.
            </p>
            <MermaidAuto code={gBNB} />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------------------- Export Page ------------------------------ */
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
          transition={{ duration: 0.4 }}
        >
          <OlympusIntro onEnter={() => setEntered(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <MainScene />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
