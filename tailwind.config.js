/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // Blue 600 - Trust/Professional
          hover: "#1D4ED8", // Blue 700
          active: "#1E40AF", // Blue 800
        },
        secondary: {
          DEFAULT: "#64748B", // Slate 500
          hover: "#475569", // Slate 600
        },
        background: "#F8FAFC", // Slate 50
        surface: "#FFFFFF",
        text: {
          primary: "#0F172A", // Slate 900
          secondary: "#475569", // Slate 600
          tertiary: "#94A3B8", // Slate 400
        },
        border: "#E2E8F0", // Slate 200
        error: "#EF4444", // Red 500
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "6px", // Main radius
        lg: "12px", // Card radius
        full: "9999px", // Pill radius
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)", // Premium ease-out
        "bounce-subtle": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        slow: "400ms",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        lift: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        enter: "enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        fade: "fadeIn 0.2s ease-out forwards",
      },
      keyframes: {
        enter: {
          "0%": {opacity: "0", transform: "translateY(10px)"},
          "100%": {opacity: "1", transform: "translateY(0)"},
        },
        fadeIn: {
          "0%": {opacity: "0"},
          "100%": {opacity: "1"},
        },
      },
    },
  },
  plugins: [],
};
