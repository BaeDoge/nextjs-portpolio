"use client";

import dynamic from "next/dynamic";

// Keep the interactive canvas and browser-only state out of server HTML.
// This avoids hydration mismatches caused by browser/runtime differences.
const KnowledgeMap = dynamic(() => import("./KnowledgeMap"), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Loading knowledge map"
      style={{
        minHeight: 220,
        border: "0.5px solid var(--neutral-alpha-medium)",
        borderRadius: 12,
        padding: 12,
        display: "grid",
        placeItems: "center",
        color: "var(--neutral-on-background-weak)",
        fontSize: 12,
      }}
    >
      …
    </div>
  ),
});

export default KnowledgeMap;
