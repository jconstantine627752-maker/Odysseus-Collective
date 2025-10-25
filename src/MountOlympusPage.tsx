import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
   Background Layers
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
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        <motion.h1
          className="text-4xl md:text-5xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          The Odyssey Awaits
        </motion.h1>
        <motion.p
          className="text-lg text-white/80 max-w-xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
        >
          Ascend to the marble halls of the Odysseus Collective — a union of AI
          agents, Solana automation, and BNB logic.
        </motion.p>
        <motion.button
          onClick={onEnter}
          className="px-8 py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 backdrop-blur text-white font-semibold transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Enter Mount Olympus
        </motion.button>
      </div>
    </main>
  );
}

/* ============================================================================
   Main Scene (Marble Mermaid Gallery)
   ========================================================================== */
function MainScene() {
  const H = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl md:text-2xl font-semibold tracking-wide mb-3 text-[#E5C970]">
      {children}
    </h2>
  );

  const diagrams: { title: string; blurb: string; code: string }[] = [
    {
      title: "Unified AI & On-Chain Trading Platform",
      blurb:
        "Modular system combining conversational agents with rule-based trading. Built for transparency, safety, and local control. Deployable with Docker.",
      code: `
flowchart TD
  O[Odysseus Platform] --> A[Agents: Chat API & UI]
  O --> S[Solana Bot: Pump.fun + RugCheck + Jupiter]
  O --> B[BNB Module: HTTP swap service]
  O --> D[Unified Docker Workflow]`,
    },
    {
      title: "Odysseus Agents",
      blurb:
        "A lightweight chat layer exposing an OpenAI-compatible API for reasoning, orchestration, and custom commands.",
      code: `
flowchart TD
  A[Agents] --> API[OpenAI-compatible API]
  A --> Backends[Pluggable backends (OpenAI / local / hosted)]
  A --> Calls[Calls internal trade services]
  A --> UI[Optional UI]`,
    },
    {
      title: "Solana Bot",
      blurb:
        "Automated trading for Pump.fun tokens with RugCheck gating and Jupiter routing.",
      code: `
flowchart TD
  S[Solana Bot] --> Watch[Watch Pump.fun tokens]
  Watch --> Risk[RugCheck risk gate]
  Risk -->|pass| Route[Jupiter routing]
  Route --> Exec[Execute trade]`,
    },
    {
      title: "BNB Module",
      blurb: "HTTP microservice that executes live swaps on BNB Chain.",
      code: `
flowchart TD
  B[BNB Module] --> HTTP[HTTP endpoint]
  HTTP --> Swap[Live swap on BNB Chain]
  Swap --> Confirm[Confirm and return]`,
    },
  ];

  const regal = { duration: 1.15, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-b from-[#0b1020] via-[#090f1c] to-[#05070d]">
      <Stars />
      <section className="relative z-10 flex items-center justify-center h-screen px-6 text-center">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={regal}
        >
          <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
            Odysseus Collective
          </h1>
          <p className="text-white/90 leading-relaxed">
            Welcome to the Odysseus Collective. What hatred drives you to climb
            the mountain here?
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
