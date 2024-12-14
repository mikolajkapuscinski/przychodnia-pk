import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        backgound: "#F1EFEE",
        orange: "#EF7158",
        "light-orange": "#f39481",

        aquamarine: "#63A3B2",
        "light-aquamarine": "#86B6C1",
        "default-white": "#FBFBFB",
        "default-gray": "#E5E0DD",

        "default-black": "#443A35",
        "light-brown": "#C1C1C1",

        "dark-yellow": "#FBD178",
      },
      borderRadius: {
        DEFAULT: ".25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
