import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        pitch: {
          black: "var(--mfa-color-pitch-black, #030d08)",
          dark: "var(--mfa-color-pitch-dark, #071911)",
          surface: "var(--mfa-color-pitch-surface, #0b251a)",
          card: "var(--mfa-color-pitch-card, #0e3022)",
          border: "var(--mfa-color-pitch-border, #184734)",
          borderLight: "var(--mfa-color-pitch-border-light, #25664b)",
        },
        volt: {
          DEFAULT: "var(--mfa-color-volt, #d6ff00)",
          hover: "var(--mfa-color-volt-hover, #c2ea00)",
          muted: "var(--mfa-color-volt-muted, rgba(214, 255, 0, 0.15))",
        },
        gold: "var(--mfa-color-gold, #ffbe1a)",
        badgeRed: "var(--mfa-color-red, #ef4444)",
      },
      fontFamily: {
        display: ['var(--font-display)', 'Barlow Condensed', 'Oswald', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'jersey-pattern': 'repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 12px)',
        'pitch-radial': 'radial-gradient(ellipse at top, #0b3524 0%, #030d08 70%)',
      },
      boxShadow: {
        'volt-glow': '0 0 25px -4px rgba(214, 255, 0, 0.35)',
        'pitch-card': '0 8px 30px -4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
