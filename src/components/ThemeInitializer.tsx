"use client";

import { useEffect } from "react";

type ThemeConfig = {
  brand: string;
  accent: string;
  neutral: string;
  solid: string;
  "solid-style": string;
  border: string;
  surface: string;
  transition: string;
  scaling: string;
  "viz-style": string;
};

export default function ThemeInitializer({ config }: { config: ThemeConfig }) {
  useEffect(() => {
    const root = document.documentElement;

    try {
      Object.entries(config).forEach(([key, value]) => {
        root.setAttribute(`data-${key}`, value);
      });

      const savedTheme = localStorage.getItem("data-theme");
      const theme =
        !savedTheme || savedTheme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : savedTheme;

      root.setAttribute("data-theme", theme);

      Object.keys(config).forEach((key) => {
        const value = localStorage.getItem(`data-${key}`);
        if (value) root.setAttribute(`data-${key}`, value);
      });
    } catch (error) {
      console.error("Failed to initialize theme:", error);
      root.setAttribute("data-theme", "dark");
    }
  }, [config.brand, config.accent, config.neutral, config.solid, config["solid-style"], config.border, config.surface, config.transition, config.scaling, config["viz-style"]]);

  return null;
}
