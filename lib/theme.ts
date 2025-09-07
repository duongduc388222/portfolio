export const theme = {
  primary: "#0ea5e9", // cyan/blue family
  accent: "#1d4ed8",
  warn: "#ef4444",
  bg: "#0b1020",
  grid: "rgba(255,255,255,0.06)",
  // Extended palette based on existing portfolio
  colors: {
    primary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    accent: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    warn: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    background: {
      primary: "#0b1020",
      secondary: "#1e3a8a",
      tertiary: "#0c1445",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e2e8f0",
      muted: "#94a3b8",
    },
    glass: {
      light: "rgba(255, 255, 255, 0.1)",
      medium: "rgba(255, 255, 255, 0.15)",
      strong: "rgba(255, 255, 255, 0.2)",
    },
    grid: {
      primary: "rgba(255,255,255,0.06)",
      secondary: "rgba(255,255,255,0.03)",
      accent: "rgba(14, 165, 233, 0.1)",
    },
  },
  // Animation configurations
  animations: {
    bounceSlow: {
      keyframes: {
        "0%, 100%": { transform: "translateY(0) scale(1)" },
        "50%": { transform: "translateY(-4px) scale(1.05)" },
      },
      duration: "2s",
      iterationCount: "infinite",
      timingFunction: "ease-in-out",
    },
    sudokuFloat: {
      keyframes: {
        "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
        "25%": { transform: "translateY(-8px) translateX(4px)" },
        "50%": { transform: "translateY(6px) translateX(-6px)" },
        "75%": { transform: "translateY(-4px) translateX(8px)" },
      },
      duration: "15s",
      iterationCount: "infinite",
      timingFunction: "ease-in-out",
    },
    neuralPulse: {
      keyframes: {
        "0%, 100%": { opacity: "0.3" },
        "50%": { opacity: "0.8" },
      },
      duration: "3s",
      iterationCount: "infinite",
      timingFunction: "ease-in-out",
    },
  },
  // Typography
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },
  // Spacing and layout
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export type Theme = typeof theme;
