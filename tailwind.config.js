/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
      },
      colors: {
        dark: {
          50: "#e6f0f4",
          100: "#cce0e9",
          200: "#99c1d3",
          300: "#66a3bd",
          400: "#3384a7",
          500: "#006591",
          600: "#00516f",
          700: "#003C56",
          800: "#002d41",
          850: "#002435",
          900: "#001b29",
          950: "#00111a",
        },
        accent: {
          DEFAULT: "#FF581A",
          50: "#fff4ee",
          100: "#ffe6d5",
          200: "#ffcaa8",
          300: "#ffa570",
          400: "#ff8040",
          500: "#FF581A",
          600: "#e04400",
          700: "#b93500",
        },
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-left": "slideInLeft 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
