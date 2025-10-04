import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/Layout/MainLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Admin/Dashbord";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import Settings from "./pages/Admin/Settings";
import EditUser from "./pages/Admin/Edit"; // <-- new edit page we created

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    setUser({ name: credentials.name, email: credentials.email });
  };

  const handleRegister = (userData) => {
    setUser({ name: userData.name, email: userData.email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // wrapper to protect admin routes
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />

        {/* Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/edit/:id" element={<EditUser />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
