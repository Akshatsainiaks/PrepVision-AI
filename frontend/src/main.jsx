// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ThemeProvider } from "./context/ThemeContext";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <ThemeProvider>
//           <QueryClientProvider client={queryClient}>
//             <App />
//           </QueryClientProvider>
//         </ThemeProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css"; // Ensure your CSS variables are defined here

// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { ThemeProvider } from "./context/ThemeContext";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // Optimized QueryClient for a smoother Dark UI experience
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false, // Prevents layout shifts on tab switch
//       retry: 1,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//     },
//   },
// });

// /* Force the global background immediately. 
//   This prevents white flashes before React hydrates.
// */
// document.documentElement.style.backgroundColor = "#020617"; // Matches var(--bg-primary)
// document.documentElement.classList.add("dark");

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <ThemeProvider>
//           <QueryClientProvider client={queryClient}>
//             <App />
//           </QueryClientProvider>
//         </ThemeProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


//next acc claude code
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext"; // ✅ add
import NotificationToastStack from "./components/NotificationToastStack.jsx"; // ✅ add

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

document.documentElement.style.backgroundColor = "#020617";
document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationProvider>   {/* ✅ wrap App */}
              <App />
              <NotificationToastStack />  {/* ✅ renders toasts on top of everything */}
            </NotificationProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);