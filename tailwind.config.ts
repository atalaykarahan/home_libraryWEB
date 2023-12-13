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
        "135px":"135px",
        "100px":"100px",
        "235px":"235px",
        "130px":"130px",
        "50px":"50px",
        "-10px":"-10px",
        "15px":"15px",
      },
      margin:{
        "55px": "55px",
        "110px":"110px",
        "30px":"30px",
        "50px":"50px",
        "16.6666666667%":"16.6666666667%",
      },
      minWidth:{
        
      },
      maxWidth:{
        "540px":"540px",
        "720px":"720px",
        "960px":"960px",
        "1140px":"1140px",
        "1320px":"1320px",
      },
      screens:{
        'w992':'992px',
        'w320':'320px',
        'w575':'575px',
        'w576':'576px',
        'w767':'767px',
        'w768':'768px',
        'w991':'991px',
        'w1199':'1199px',
        'w1200':'1200px',
        'w1400':'1400px',
      },
      width:{
        '66.66':'66.6666666667%',
      },
      flex:{
        '2':'0 0 auto',
      },
      inset:{
        "-10px":"-10px",
        "-110px":"-110px",
      },
      fontSize:{

      },
    },
  },
  plugins: [],
};
export default config;
