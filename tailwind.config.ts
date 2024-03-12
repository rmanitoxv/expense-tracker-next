import type { Config } from "tailwindcss"
import autoprefixer from "autoprefixer"
import { PluginCreator } from "tailwindcss/types/config"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
      },
    },
  },
  plugins: [autoprefixer as PluginCreator],
}

export default config
