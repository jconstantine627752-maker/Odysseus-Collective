import React, { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

type Props = {
  code: string;        // Mermaid code (flowchart TD)
  active?: boolean;    // When true, render/refresh
};

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#1f2937",        // marble-gray panel
    primaryTextColor: "#e5e7eb",
    primaryBorderColor: "#9ca3af",
    lineColor: "#9ca3af",
    secondaryColor: "#111827",
    tertiaryColor: "#111827",
    clusterBkg: "#0f172a",
    clusterBorder: "#475569",
    noteBkgColor: "#0b1220",
    noteTextColor: "#e5e7eb"
  }
});

export default function MermaidBlock({ code, active = false }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const renderId = useId(); // unique id per instance

  // Small helper to ensure DOM is ready for SVG namespaces
  function domReady(): Promise<void> {
    return new Promise((res) =>
      requestAnimationFrame(() => requestAnimationFrame(() => res()))
    );
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!active || !containerRef.current) return;
      await domReady();
      if (cancelled) return;

      // Render into an off-DOM element, then inject
      const sandbox = document.createElement("div");
      const { svg } = await mermaid.render(`m-${renderId}`, code, sandbox);
      if (cancelled || !containerRef.current) return;
      containerRef.current.innerHTML = svg;
      setReady(true);
    })().catch(() => {
      // keep page resilient if mermaid fails; no-op
    });
    return () => {
      cancelled = true;
    };
  }, [active, code, renderId]);

  return (
    <div
      ref={containerRef}
      aria-busy={!ready}
      className="
        w-full
        max-w-4xl
        mx-auto
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur
        shadow-[0_0_40px_rgba(255,255,255,0.06)]
        p-6
      "
      // “marble” feel via subtle layered gradient
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)), radial-gradient(1200px 300px at 50% -20%, rgba(255,255,255,0.06), rgba(255,255,255,0))"
      }}
    />
  );
}
