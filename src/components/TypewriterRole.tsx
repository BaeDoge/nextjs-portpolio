"use client";
import Typewriter from "typewriter-effect";

export function TypewriterRole() {
  return (
    <span style={{ color: "var(--brand-on-background-strong)" }}>
      <Typewriter
        options={{
          strings: [
            "AI Platform Engineer",
            "Kubernetes Operator",
            "Large-scale customer service",
            "Full Stack Developer",
            "Youth Leader",
          ],
          autoStart: true,
          loop: true,
          delay: 60,
          deleteSpeed: 30,
        }}
      />
    </span>
  );
}