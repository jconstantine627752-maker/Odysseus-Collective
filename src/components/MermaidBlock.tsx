import React, { useEffect, useRef, useId, useState } from "react";
import mermaid from "mermaid";

type Props = { code: string; active?: boolean };

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryTextColor: "#E5E7EB",
    lineColor: "#D1D5DB",
    primaryBorderColor: "#D1D5DB",
    clusterBorder: "#E5E7EB",
    nodeBorder: "#E5E7EB",
    primaryColor: "#0F172A",
    secondaryColor: "#111827",
    tertiaryColor: "#111827",
    noteBkgColor: "#0f172a",
    noteTextColor: "#E5E7EB",
  },
});

export default function MermaidBlock({ code, active = false }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const renderId = useId();

  const domReady = () =>
    new Promise<void>((res) =>
      requestAnimationFrame(() => requestAnimationFrame(() => res()))
    );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!active || !containerRef.current) return;
      await domReady();
      if (cancelled) return;

      const sandbox = document.createElement("div");
      const { svg } = await mermaid.render(`m-${renderId}`, code, sandbox);
      if (cancelled || !containerRef.current) return;

      containerRef.current.innerHTML = svg;
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        svgEl.style.opacity = "0";
        svgEl.style.transform = "translateY(28px) scale(0.985)";
        svgEl.style.transition =
          "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)";
        svgEl.style.filter = "drop-shadow(0 8px 30px rgba(255,255,255,0.05))";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            svgEl.style.opacity = "1";
            svgEl.style.transform = "translateY(0) scale(1)";
          });
        });
      }
      setReady(true);
    })().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [active, code, renderId]);

  return (
    <div
      ref={containerRef}
      aria-busy={!ready}
      className="w-full max-w-6xl md:max-w-7xl mx-auto rounded-2xl border border-white/15 bg-white/5 p-8 md:p-10 backdrop-blur shadow-[0_10px_50px_rgba(0,0,0,0.45)]"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      }}
    />
  );
}
