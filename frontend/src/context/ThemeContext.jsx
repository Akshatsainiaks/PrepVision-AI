// import React, { createContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("dark");

//   const applyTheme = (mode) => {
//     if (mode === "system") {
//       const prefersDark = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//       ).matches;

//       document.documentElement.setAttribute(
//         "data-theme",
//         prefersDark ? "dark" : "light"
//       );
//     } else {
//       document.documentElement.setAttribute("data-theme", mode);
//     }
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "dark";
//     setTheme(savedTheme);
//     applyTheme(savedTheme);

//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = () => {
//       if (localStorage.getItem("theme") === "system") {
//         applyTheme("system");
//       }
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const toggleTheme = (mode) => {
//     setTheme(mode);
//     localStorage.setItem("theme", mode);
//     applyTheme(mode);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }


import React, { createContext, useContext, useEffect, useState } from "react";

// Explicitly export the context
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const applyTheme = (mode) => {
    const root = document.documentElement;
    if (mode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", mode);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("theme") === "system") applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = (mode) => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    applyTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Helper hook to avoid "Uncaught SyntaxError" during imports
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};