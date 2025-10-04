import React from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = ({ user, onLogout }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link to="/users" className="block hover:bg-gray-700 p-2 rounded">Users</Link>
          <Link to="/products" className="block hover:bg-gray-700 p-2 rounded">Products</Link>
          <Link to="/settings" className="block hover:bg-gray-700 p-2 rounded">Settings</Link>
        </nav>
        <button
          onClick={onLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 p-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
