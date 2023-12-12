import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "400px": "400px",
        "230px":"230px",
        "550px":"550px",
      },
      margin:{
        "55px": "55px",
        "110px":"110px",
      },
      minWidth:{
        '992px':'992px',
      },
      maxWidth:{
        '1199px':'1199px',
        '960px':'960px'
      },
      screens:{
        'min992px':'992px',
      }
    },
  },
  plugins: [],
};
export default config;
