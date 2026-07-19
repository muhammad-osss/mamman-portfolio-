/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05070C",
        panel: "#0A1120",
        panel2: "#0E1826",
        sky: {
          DEFAULT: "#38BDF8",
          light: "#7DD3FC",
          dim: "#0EA5E9",
        },
        ice: "#E6F4FF",
        line: "rgba(125,211,252,0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(56,189,248,0.25)",
        "glow-sm": "0 0 18px rgba(56,189,248,0.35)",
        "glow-lg": "0 0 90px rgba(56,189,248,0.22)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(125,211,252,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,248,0.06) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.18), transparent 60%)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};
