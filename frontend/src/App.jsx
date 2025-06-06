import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User:", authUser);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/'/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};

export default App;
