import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSwitchToLogin=() =>{
    navigate("/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    console.log(`${API_URL}`)

    try {
      
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "User registered successfully ✅");
        if (onSwitchToLogin) onSwitchToLogin(); // switch to login page
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Server error ❌");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our admin panel
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your full name"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700"
          >
            Create Account
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Already have an account? Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
