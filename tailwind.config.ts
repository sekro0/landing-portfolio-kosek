import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "2px",
      full: "9999px",
    },
    extend: {
      colors: {
        background: "#000000",
        surface: "#0A0A0A",
        line: "#1F2937",
        fg: "#FFFFFF",
        muted: "#9CA3AF",
        acid: "#CCFF00",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        mega: ["clamp(3rem, 9vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.035em" }],
        huge: ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        label: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.14em" }],
      },
      boxShadow: {
        acid: "0 0 0 1px rgba(204, 255, 0, 0.25), 0 0 48px -16px rgba(204, 255, 0, 0.35)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
