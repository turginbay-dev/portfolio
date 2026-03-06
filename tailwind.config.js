/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/pages/**/*.html", "./src/scripts/**/*.js"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        charcoal: "#0B0B0F",
        graphite: "#111218",
        surface: "#151821",
        line: "rgba(255,255,255,0.08)",
        aqua: "#4FD1FF",
        cyan: "#7EE7FF",
        violet: "#8B7CFF",
        silver: "#C8D1DC",
        snow: "#F5F7FA",
        muted: "#9FA8B7",
        dim: "#697282"
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"]
      },
      maxWidth: {
        shell: "1440px"
      },
      boxShadow: {
        panel: "0 28px 90px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 1px rgba(126, 231, 255, 0.16), 0 30px 120px rgba(79, 209, 255, 0.14)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.05)"
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem"
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};
