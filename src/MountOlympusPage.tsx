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
   Roof reveal
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
    <section ref={ref} className="relative min-h-[160vh]">
      <Stars />
      <div className="sticky top-0 h-screen flex items-end justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="w-full max-w-5xl px-6">
          <svg viewBox="0 0 1200 380" className="w-full h-auto" aria-label="Temple roof">
            <defs>
              <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#c7cbd1" />
              </linearGradient>
              <linearGradient id="ledge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            {/* Pediment + ledge */}
            <polygon points="0,300 600,40 1200,300" fill="url(#stone)" />
            <rect x="60" y="300" width="1080" height="26" fill="url(#ledge)" />
            <rect x="60" y="326" width="1080" height="18" fill="rgba(0,0,0,0.12)" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================================
   Temple interior pillars
   ========================================================================== */
function TempleInterior() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  return (
    <section ref={ref} className="relative min-h-[220vh]">
      <Stars />
      <div className="sticky top-0 h-screen">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          {/* Pillars with gaps to show stars behind */}
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
          {/* Inner shading for depth */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to right,
                  rgba(0,0,0,0.12) 0px,
                  rgba(0,0,0,0.12) 6px,
                  rgba(0,0,0,0) 6px,
                  rgba(0,0,0,0) 140px,
                  rgba(0,0,0,0.12) 140px,
                  rgba(0,0,0,0.12) 146px,
                  rgba(0,0,0,0) 146px,
                  rgba(0,0,0,0) 280px
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
   GitHub iframe embed (bottom of second page)
   NOTE: GitHub blocks iframes; github1s renders safely inside an iframe.
   ========================================================================== */
function GitHubEmbed() {
  return (
    <section className="relative z-0 py-24 bg-gradient-to-b from-[#070b16] to-[#06080f]">
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
            // Use github1s for an embeddable, read-only viewer
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
   Main scene: gallery + roof + interior + long tail + GitHub
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

      {/* MERMAID GALLERY */}
      <section className="relative z-0 pb-32">
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

      {/* Spacer so you scroll a bit before the roof appears */}
      <section className="min-h-[120vh]" />

      {/* Roof → Interior */}
      <RoofReveal />
      <TempleInterior />

      {/* Long star-field tail for extra depth before the repo */}
      <section className="relative min-h-[200vh]">
        <Stars />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 300px at 50% 120%, rgba(0,0,0,0.18), rgba(0,0,0,0))",
          }}
        />
      </section>

      {/* Final: GitHub embed at the very bottom */}
      <GitHubEmbed />
    </main>
  );
}

/* ============================================================================
   Export: Intro → Main
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
