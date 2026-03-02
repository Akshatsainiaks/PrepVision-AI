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


// import { Routes, Route } from "react-router-dom";
// import React from "react";

// /* 🌐 Public Pages */
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Careers from "./pages/Careers";

// /* 🔐 Protected Pages */
// import Dashboard from "./pages/Dashboard";
// import Activity from "./pages/Activity"
// import History from "./pages/History";
// import InterviewDetail from "./pages/InterviewDetail";
// import Questions from "./pages/Questions";
// import AddQuestion from "./pages/AddQuestion";
// import ChatPage from "./pages/ChatPage";
// import LeaderboardPage from "./pages/LeaderboardPage";
// import Profile from "./pages/Profile";
// import CreditHistory from "./pages/CreditHistory";
// import Settings from "./pages/Settings";
// import Notifications from "./pages/Notifications";
// import Credits from "./pages/Credits";
// import CompanyQuestions from "./pages/CompanyQuestions";
// import QuestionDetails from "./pages/QuestionDetails";

// /* 🎯 Mock Interview Flow */
// import MockInterview from "./pages/MockInterview";
// import WrittenInterview from "./pages/WrittenInterview";
// import MockWrittenInterview from "./pages/MockWrittenInterview";
// import MockWrittenReport from "./pages/MockWrittenReport";
// import LiveInterview from "./pages/LiveInterview";

// /* 🔒 Layout & Auth */
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProtectedLayout from "./components/layout/ProtectedLayout";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Routes>

//         {/* PUBLIC */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/careers" element={<Careers />} />

//         {/* PROTECTED */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <ProtectedLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/activity" element={<Activity />} />
//           <Route path="/history" element={<History />} />
//           <Route path="/history/:id" element={<InterviewDetail />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/credit-history" element={<CreditHistory />} />
//           <Route path="/settings" element={<Settings />} />

//           <Route path="/questions" element={<Questions />} />
//           <Route path="/company/:company" element={<CompanyQuestions />} />
//           <Route path="/company/:company/:type" element={<CompanyQuestions />} />
//           <Route path="/question/:id" element={<QuestionDetails />} />
//           <Route path="/add-question" element={<AddQuestion />} />

//           {/* MOCK INTERVIEW */}
//           <Route path="/mock" element={<MockInterview />} />
//           <Route path="/mock/written" element={<WrittenInterview />} />
//           <Route path="/mock/written/interview/:sessionId" element={<MockWrittenInterview />} />
//           <Route path="/mock/written/report/:sessionId" element={<MockWrittenReport />} />

//           {/* ✅ LIVE INTERVIEW */}
//           <Route path="/mock/live/session/:sessionId" element={<LiveInterview />} />

//           {/* OTHER */}
//           <Route path="/chat" element={<ChatPage />} />
//           <Route path="/leaderboard" element={<LeaderboardPage />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route path="/credits" element={<Credits />} />
//         </Route>

//       </Routes>
//     </div>
//   );
// }


//new
// import { Routes, Route } from "react-router-dom";
// import React, { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
// import ServerOffline from "./components/ServerOffline"; // Import the dedicated file

// /* 🌐 Public Pages */
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Careers from "./pages/Careers";

// /* 🔐 Protected Pages */
// import Dashboard from "./pages/Dashboard";
// import Activity from "./pages/Activity"
// import History from "./pages/History";
// import InterviewDetail from "./pages/InterviewDetail";
// import Questions from "./pages/Questions";
// import AddQuestion from "./pages/AddQuestion";
// import ChatPage from "./pages/ChatPage";
// import LeaderboardPage from "./pages/LeaderboardPage";
// import Profile from "./pages/Profile";
// import CreditHistory from "./pages/CreditHistory";
// import Settings from "./pages/Settings";
// import Notifications from "./pages/Notifications";
// import Credits from "./pages/Credits";
// import CompanyQuestions from "./pages/CompanyQuestions";
// import QuestionDetails from "./pages/QuestionDetails";

// /* 🎯 Mock Interview Flow */
// import MockInterview from "./pages/MockInterview";
// import WrittenInterview from "./pages/WrittenInterview";
// import MockWrittenInterview from "./pages/MockWrittenInterview";
// import MockWrittenReport from "./pages/MockWrittenReport";
// import LiveInterview from "./pages/LiveInterview";

// /* 🔒 Layout & Auth */
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProtectedLayout from "./components/layout/ProtectedLayout";

// export default function App() {
//   const { loading, isServerOff, loadUser } = useContext(AuthContext);

//   // 1. Initial loading state to prevent UI flicker
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // 2. Use the dedicated ServerOffline file
//   if (isServerOff) {
//     return <ServerOffline onRetry={loadUser} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/careers" element={<Careers />} />

//         {/* PROTECTED */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <ProtectedLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/activity" element={<Activity />} />
//           <Route path="/history" element={<History />} />
//           <Route path="/history/:id" element={<InterviewDetail />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/credit-history" element={<CreditHistory />} />
//           <Route path="/settings" element={<Settings />} />

//           <Route path="/questions" element={<Questions />} />
//           <Route path="/company/:company" element={<CompanyQuestions />} />
//           <Route path="/company/:company/:type" element={<CompanyQuestions />} />
//           <Route path="/question/:id" element={<QuestionDetails />} />
//           <Route path="/add-question" element={<AddQuestion />} />

//           {/* MOCK INTERVIEW */}
//           <Route path="/mock" element={<MockInterview />} />
//           <Route path="/mock/written" element={<WrittenInterview />} />
//           <Route path="/mock/written/interview/:sessionId" element={<MockWrittenInterview />} />
//           <Route path="/mock/written/report/:sessionId" element={<MockWrittenReport />} />

//           {/* ✅ LIVE INTERVIEW */}
//           <Route path="/mock/live/session/:sessionId" element={<LiveInterview />} />

//           {/* OTHER */}
//           <Route path="/chat" element={<ChatPage />} />
//           <Route path="/leaderboard" element={<LeaderboardPage />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route path="/credits" element={<Credits />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import React, { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";
// import ServerOffline from "./components/ServerOffline";

// /* 🌐 Public Pages */
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Careers from "./pages/Careers";

// /* 🔐 Protected Pages */
// import Dashboard from "./pages/Dashboard";
// import Activity from "./pages/Activity";
// import History from "./pages/History";
// import InterviewDetail from "./pages/InterviewDetail";
// import Questions from "./pages/Questions";
// import AddQuestion from "./pages/AddQuestion";
// import ChatPage from "./pages/ChatPage";
// import LeaderboardPage from "./pages/LeaderboardPage";
// import Profile from "./pages/Profile";
// import PublicProfile from "./pages/PublicProfile"; // ✅ ADDED
// import CreditHistory from "./pages/CreditHistory";
// import Settings from "./pages/Settings";
// import Notifications from "./pages/Notifications";
// import Credits from "./pages/Credits";
// import CompanyQuestions from "./pages/CompanyQuestions";
// import QuestionDetails from "./pages/QuestionDetails";

// /* 🎯 Mock Interview Flow */
// import MockInterview from "./pages/MockInterview";
// import WrittenInterview from "./pages/WrittenInterview";
// import MockWrittenInterview from "./pages/MockWrittenInterview";
// import MockWrittenReport from "./pages/MockWrittenReport";
// import LiveInterview from "./pages/LiveInterview";

// /* 🔒 Layout & Auth */
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProtectedLayout from "./components/layout/ProtectedLayout";
// import LearningRoadmap from "./components/dashboard/LearningRoadmap";

// export default function App() {
//   const { loading, isServerOff, loadUser } = useContext(AuthContext);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-950 flex items-center justify-center">
//         <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (isServerOff) {
//     return <ServerOffline onRetry={loadUser} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white">
//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/careers" element={<Careers />} />

//         {/* PROTECTED */}
//         <Route
//           element={
//             <ProtectedRoute>
//               <ProtectedLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/activity" element={<Activity />} />
//           <Route path="/history" element={<History />} />
//           <Route path="/history/:id" element={<InterviewDetail />} />

//           {/* ✅ OWN PROFILE */}
//           <Route path="/profile" element={<Profile />} />

//           {/* ✅ PUBLIC PROFILE FIX */}
//           <Route path="/profile/:username" element={<PublicProfile />} />

//           <Route path="/credit-history" element={<CreditHistory />} />
//           <Route path="/settings" element={<Settings />} />

//           <Route path="/questions" element={<Questions />} />
//           <Route path="/company/:company" element={<CompanyQuestions />} />
//           <Route path="/company/:company/:type" element={<CompanyQuestions />} />
//           <Route path="/question/:id" element={<QuestionDetails />} />
//           <Route path="/add-question" element={<AddQuestion />} />

//           {/* MOCK INTERVIEW */}
//           <Route path="/mock" element={<MockInterview />} />
//           <Route path="/mock/written" element={<WrittenInterview />} />
//           <Route path="/mock/written/interview/:sessionId" element={<MockWrittenInterview />} />
//           <Route path="/mock/written/report/:sessionId" element={<MockWrittenReport />} />
//           <Route path="/mock/live/session/:sessionId" element={<LiveInterview />} />

//           {/* OTHER */}
//           <Route path="/chat" element={<ChatPage />} />
//           <Route path="/leaderboard" element={<LeaderboardPage />} />
//           <Route path="/notifications" element={<Notifications />} />
//           <Route path="/credits" element={<Credits />} />
//           <Route path="/roadmap" element={<LearningRoadmap />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

//next acc claude code
import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ServerOffline from "./components/ServerOffline";

/* 🌐 Public Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Careers from "./pages/Careers";

/* 🔐 Protected Pages */
import Dashboard from "./pages/Dashboard";
import Activity from "./pages/Activity";
import History from "./pages/History";
import InterviewDetail from "./pages/InterviewDetail";
import Questions from "./pages/Questions";
import AddQuestion from "./pages/AddQuestion";
import ChatPage from "./pages/ChatPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile"; // ✅ ADDED
import CreditHistory from "./pages/CreditHistory";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Credits from "./pages/Credits";
import CompanyQuestions from "./pages/CompanyQuestions";
import QuestionDetails from "./pages/QuestionDetails";

/* 🎯 Mock Interview Flow */
import MockInterview from "./pages/MockInterview";
import WrittenInterview from "./pages/WrittenInterview";
import MockWrittenInterview from "./pages/MockWrittenInterview";
import MockWrittenReport from "./pages/MockWrittenReport";
import LiveInterview from "./pages/LiveInterview";

/* 🔒 Layout & Auth */
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import LearningRoadmap from "./components/dashboard/LearningRoadmap";

export default function App() {
  const { loading, isServerOff, loadUser } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isServerOff) {
    return <ServerOffline onRetry={loadUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/careers" element={<Careers />} />

        {/* PROTECTED */}
        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:id" element={<InterviewDetail />} />

          {/* ✅ OWN PROFILE */}
          <Route path="/profile" element={<Profile />} />

          {/* ✅ PUBLIC PROFILE FIX */}
          <Route path="/profile/:username" element={<PublicProfile />} />

          {/* <Route path="/credit-history" element={<CreditHistory />} /> */}
          <Route path="/credit-history" element={<Credits />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/questions" element={<Questions />} />
          <Route path="/company/:company" element={<CompanyQuestions />} />
          <Route path="/company/:company/:type" element={<CompanyQuestions />} />
          <Route path="/question/:id" element={<QuestionDetails />} />
          <Route path="/add-question" element={<AddQuestion />} />

          {/* MOCK INTERVIEW */}
          <Route path="/mock" element={<MockInterview />} />
          <Route path="/mock/written" element={<WrittenInterview />} />
          <Route path="/mock/written/interview/:sessionId" element={<MockWrittenInterview />} />
          <Route path="/mock/written/report/:sessionId" element={<MockWrittenReport />} />
          <Route path="/mock/live/session/:sessionId" element={<LiveInterview />} />

          {/* OTHER */}
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/roadmap" element={<LearningRoadmap />} />
        </Route>
      </Routes>
    </div>
  );
}