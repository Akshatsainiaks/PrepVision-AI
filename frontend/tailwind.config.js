// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       animation: {
//         shimmer: "shimmer 1.5s infinite",
//       },
//       keyframes: {
//         shimmer: {
//           "0%": { transform: "translateX(-100%)" },
//           "100%": { transform: "translateX(100%)" },
//         },
//       },
//     },
//   },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* App backgrounds */
        app: "#0b1020",
        card: "#12172a",

        /* Brand */
        primary: "#7c3aed", // purple
        primarySoft: "rgba(124, 58, 237, 0.15)",

        /* Text */
        textPrimary: "#f9fafb",
        textSecondary: "#9ca3af",

        /* Borders */
        borderSoft: "rgba(255, 255, 255, 0.06)",
      },

      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)",
        glow: "0 0 0 1px rgba(124,58,237,0.4)",
      },

      animation: {
        shimmer: "shimmer 1.5s infinite",
        fadeIn: "fadeIn 0.4s ease-out",
      },

      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
