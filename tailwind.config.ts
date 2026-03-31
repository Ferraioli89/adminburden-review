import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      },
      colors: {
        fondo: "#f3f0e9",
        tinta: "#10243f",
        marino: "#17365d",
        arena: "#e8dcc4",
        musgo: "#47624f",
        burdeos: "#6f2f35"
      },
      boxShadow: {
        card: "0 14px 40px rgba(15, 25, 35, 0.08)"
      },
      backgroundImage: {
        "paper-grid":
          "linear-gradient(rgba(16,36,63,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(16,36,63,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
