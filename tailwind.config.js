/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],

  theme: {
    extend: {
      colors: {
        mainbg: "rgba(6, 5, 53, 1)",
        wlColor: "rgba(240, 240, 240, 1)",
        bgBlue: "rgba(60, 151, 239, 1)",
        bgblack: "rgba(0, 0, 0, 1)",
        grayTrans: " rgba(217, 217, 217, 0.22)",
        commitbg: "rgba(36, 36, 73, 1)",
        filebg: "rgba(37, 96, 152, 1)",
        bgcririque: "rgba(32, 95, 185, 1)",
        bgblackone: "rgba(0, 0, 0, 1)",
        bgblacktwo: "rgba(34, 32, 32, 0.44)",
        inputscolor: "rgba(255, 255, 255, 0.64)",
        greybg: "rgba(179, 197, 214, 1)",
        bluecolor: "rgba(1, 167, 243, 1)",
        // blueBg: "#453DE0",
        // purple: "rgba(153, 102, 255, 1)",
        // smaoy: "rgba(75, 192, 192, 1)",
        // blue2: "rgba(54, 162, 235, 1)",
        // red2: "rgba(255, 99, 132, 1)",
      },
      boxShadow: {
        t: "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)", // top
        r: "4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)", // right
        b: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // bottom
        l: "-4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06)", // left
      },
      backgroundImage: {
        "svg-pattern": 'url("./assets/bg.svg")',
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      linearGradientColors: {
        "gray-transparent": [
          "rgba(217, 217, 217, 0.37)",
          "rgba(217, 217, 217, 0)",
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
};
