import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MermaidBlock from "./components/MermaidBlock";
import OdysseusStatue from "./components/OdysseusStatue";

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
            duration: 18 + Math.random() * 12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================================
   Intro scene
   ========================================================================== */

function OlympusIntro({ onEnter }: { onEnter: () => void }) {
  return (
    <main className="relative min-h-screen overflow-hidden text-white bg-black">
      <Stars />
      <Mountains />
      <Clouds />

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

      {/* Clickable glow mask over the tower */}
      <motion.svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ width: 220, height: 780 }}
        viewBox="0 0 220 780"
        initial={{ opacity: 0.2 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.5 }}
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

/* ============================================================================
   GitHub iframe block (directly below Mermaid gallery)
   ========================================================================== */
function GitHubEmbed() {
  return (
    <section className="relative z-0 pt-4 pb-24 bg-gradient-to-b from-[#090f1c] to-[#070b16]">
      <Stars />
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-wide text-[#E5C970]">
            Repository
          </h2>
          <p className="text-white/80">
            Browse code directly from the Odysseus repository.
          </p>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur shadow-[0_10px_50px_rgba(0,0,0,0.45)] overflow-hidden">
          <iframe
            src="https://github1s.com/jconstantine627752-maker/Odysseus"
            title="Odysseus GitHub Repo"
            className="w-full h-[85vh] bg-white"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Main scene: marble Mermaid gallery + GitHub iframe + darker tail
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
      title: "Agents",
      blurb:
        "Lightweight chat layer with an OpenAI-compatible API for reasoning, orchestration, and custom commands.",
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
    {
      title: "Risk Controls",
      blurb: "Pre-trade checks and circuit breakers across services.",
      code: `
flowchart TD
  R[Risk Controls] --> Limits[Per-asset limits]
  R --> Slippage[Slippage guard]
  R --> Halt[Global halt triggers]
  Limits --> OK{Pass?}
  Slippage --> OK
  Halt -->|No| Block[Block trade]`,
    },
    {
      title: "Execution Flow",
      blurb: "Unified execution pipeline from intent to settlement.",
      code: `
flowchart TD
  I[Intent] --> Pre[Pre-checks]
  Pre --> Quote[Router quote]
  Quote --> Sign[Sign+Send]
  Sign --> Settle[Settlement]
  Settle --> Report[Metrics + logs]`,
    },
    {
      title: "Data Feeds",
      blurb: "Routing and risk rely on external and internal data.",
      code: `
flowchart TD
  Feeds[Data Feeds] --> Prices[DEX prices]
  Feeds --> Mkt[Market depth]
  Feeds --> RiskDB[Risk DB]
  Prices --> Router
  Mkt --> Router
  RiskDB --> Risk`,
    },
    {
      title: "Wallets & Keys",
      blurb: "Key management across networks with scoped permissions.",
      code: `
flowchart TD
  K[Key Mgmt] --> Cold[Cold storage]
  K --> Hot[Signer service]
  Hot --> Policy[Per-action policy]
  Policy --> Networks[Solana / BNB]`,
    },
    {
      title: "Observability",
      blurb: "Logs, metrics, and alerts across all modules.",
      code: `
flowchart TD
  Obs[Observability] --> Logs[Structured logs]
  Obs --> Metrics[Metrics]
  Obs --> Alerts[Alerts]
  Logs --> SIEM
  Metrics --> Dashboards
  Alerts --> Oncall`,
    },
    {
      title: "Deploy",
      blurb: "Local and cloud via Docker; static hosting for the UI.",
      code: `
flowchart TD
  Deploy[Docker Compose] --> Local[Local dev]
  Deploy --> Cloud[Render / Fly.io]
  UI[Static UI] --> CDN[CDN hosting]`,
    },
  ];

  const regal = { duration: 1.05, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white bg-gradient-to-b from-[#0b1020] via-[#090f1c] to-[#05070d]">
      {/* HERO */}
      <Stars />
      <section className="relative z-10 flex items-center justify-center h-screen px-6 text-center">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
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

      {/* MARBLE MERMAID GALLERY */}
      <section className="relative z-0 pb-20">
        <Stars />
        <div className="space-y-56 md:space-y-64 px-6">
          {diagrams.map(({ title, blurb, code }, idx) => (
            <div key={idx} className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5, margin: "-15% 0px -15% 0px" }}
                transition={regal}
                className="mb-7"
                style={{ willChange: "opacity, transform" }}
              >
                <H>{title}</H>
                <p className="text-white/80">{blurb}</p>
              </motion.div>

              <MermaidAuto code={code} />
            </div>
          ))}
        </div>
      </section>

      {/* GITHUB IFRAME — directly below the gallery */}
      <GitHubEmbed />

      {/* Odysseus Statue (click to open chat) */}
      <section className="relative z-0 py-24 bg-gradient-to-b from-[#070b16] to-[#04070e]">
        <Stars />
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold tracking-wide text-[#E5C970] mb-12">
            The Ancient One Awaits
          </h2>
          <OdysseusStatue />
        </div>
      </section>

      

      {/* LONG STAR FIELD TAIL (darker as you go) */}
      <section className="relative min-h-[250vh] bg-gradient-to-b from-[#070b16] via-[#04070e] to-[#000205]">
        <Stars />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 320px at 50% 120%, rgba(0,0,0,0.24), rgba(0,0,0,0))",
          }}
        />
      </section>
    </main>
  );
}

/* ============================================================================
   Export page with intro → main transition
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
