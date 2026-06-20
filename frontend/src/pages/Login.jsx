import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/login", formData);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md lg:max-w-5xl flex flex-col gap-4 lg:gap-0 lg:flex-row lg:overflow-hidden">
        {/* Left Section - Welcome (shown on top on mobile, left on desktop) */}
        <div className="flex lg:w-1/2 bg-linear-to-br from-blue-500 to-blue-700 text-white p-8 lg:p-12 flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
            Welcome to Mini HRMS
          </h2>
          <p className="text-base lg:text-lg mb-4 text-blue-50">
            Manage your human resources efficiently with our comprehensive HR
            Management System.
          </p>
          <ul className="space-y-3 text-blue-50">
            <li className="flex items-center gap-3">
              <span className="text-xl lg:text-2xl">✓</span>{" "}
              <span>Employee Management</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl lg:text-2xl">✓</span>{" "}
              <span>Attendance Tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl lg:text-2xl">✓</span>{" "}
              <span>Payroll Processing</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-xl lg:text-2xl">✓</span>{" "}
              <span>Salary Management</span>
            </li>
          </ul>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-6 sm:p-8 w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            HRMS Login
          </h1>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />

            <button
              type="submit"
              className="btn-primary w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 text-sm sm:text-base font-medium transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
