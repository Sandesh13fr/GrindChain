import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";
import GroupChat from "./pages/GroupChat";
// import CreateGroup from "./pages/CreateGroup";
import JoinGroupPage from "./pages/JoinGroupPage";
import whiteOwl from "./assets/whiteOwl.png";
import Landing from "./pages/Landing";
import Upgrade from "./pages/Upgrade";
import CreatingGroup2 from "./pages/CreatingGroup2";

const Dashboard = lazy(() => import("./pages/Dashboard"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="flex flex-col items-center justify-center">
      <div className="w-40 h-40 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-2xl">
        <img
          src={whiteOwl}
          alt="Loading Owl"
          className="w-32 h-32 animate-rotate-slow drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 0 32px #fff8)" }}
        />
      </div>
      <p
        className="mt-6 text-4xl font-bold text-yellow-500 animate-pulse"
        style={{ fontFamily: "Harry-Potter, Inter, sans-serif" }}
      >
        Loading...
      </p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return authenticated ? children : <Navigate to="/landing" replace />;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  return !authenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route
        path="/landing"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />
      {/* Public join routes for invite links */}
      <Route path="/join/:groupId" element={<JoinGroupPage />} />
      <Route path="/join-group" element={<JoinGroupPage />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="chatroom" element={<GroupChat />} />
        <Route path="chatroom/:groupId" element={<GroupChat />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="upgrade" element={<Upgrade />} />
        {/* <Route path="create-group" element={<CreateGroup />} /> */}
        <Route path="create-group" element={<CreatingGroup2 />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;