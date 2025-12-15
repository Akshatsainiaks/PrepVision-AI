// import { Routes, Route } from "react-router-dom";
// import React from "react";

// import Landing from "./pages/Landing";     // <-- NEW landing page
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// import Dashboard from "./pages/Dashboard";
// import Questions from "./pages/Questions";
// import AddQuestion from "./pages/AddQuestion";
// import MockInterview from "./pages/MockInterview";
// import ChatPage from "./pages/ChatPage";
// import LeaderboardPage from "./pages/LeaderboardPage";
// import Profile from "./pages/Profile";
// import Settings from "./pages/Settings";
// import Notifications from "./pages/Notifications";
// import Careers from "./pages/Careers";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white">

//       <Routes>

//         {/* 🌟 PUBLIC ROUTES */}
//         <Route path="/" element={<Landing />} />           {/* Landing Page */}
//         <Route path="/login" element={<Login />} />        {/* Login Page */}
//         <Route path="/register" element={<Register />} />  {/* Register Page */}
//         <Route path="/careers" element={<Careers />} />

//         {/* 🔐 AUTH PROTECTED ROUTES */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute>
//               <Settings />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/questions"
//           element={
//             <ProtectedRoute>
//               <Questions />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/add-question"
//           element={
//             <ProtectedRoute>
//               <AddQuestion />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/mock"
//           element={
//             <ProtectedRoute>
//               <MockInterview />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/chat"
//           element={
//             <ProtectedRoute>
//               <ChatPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/leaderboard"
//           element={
//             <ProtectedRoute>
//               <LeaderboardPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute>
//               <Notifications />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//     </div>
//   );
// }


import { Routes, Route } from "react-router-dom";
import React from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Careers from "./pages/Careers";

import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import MockInterview from "./pages/MockInterview";
import ChatPage from "./pages/ChatPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import QuestionDetails from "./pages/QuestionDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import CompanyQuestions from "./pages/CompanyQuestions";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Routes>

        {/* 🌟 PUBLIC ROUTES (NO SIDEBAR) */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/careers" element={<Careers />} />

        {/* 🔐 PROTECTED ROUTES (WITH SIDEBAR) */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/company/:company" element={<CompanyQuestions />} />
          <Route path="/company/:company/:type" element={<CompanyQuestions />} />
          <Route path="/question/:id" element={<QuestionDetails />} />          
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/mock" element={<MockInterview />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

      </Routes>
    </div>
  );
}
