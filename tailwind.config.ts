import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        koreaBlue: "#0047A0",
        koreaRed: "#c92c38",
        koreaBlueMuda: "#0071ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
