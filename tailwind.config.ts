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
        customCounterGray: "#595959",
        customPocketDarkGray: "#1f1f1f",
        customGray: "#f6f6f6",
        customPurple: "#6529FE",
        customActivePurple: "#754EFF",
        customTextPlaceholder: "#454545",
      },
    },
  },
  plugins: [],
} satisfies Config;
