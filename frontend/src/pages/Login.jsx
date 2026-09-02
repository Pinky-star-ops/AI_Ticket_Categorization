import { useState } from "react";
import axios from "axios";

function Login({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;

      localStorage.setItem("access_token", token);

      alert("Login successful!");

      window.location.href = "/tickets";
    } catch (error) {
      console.error("Login failed:", error);
      console.error("Backend response:", error.response?.data);

      alert("Invalid email or password");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-gray-100"
      }`}
    >
      {/* Theme Toggle */}
      <button
        type="button"
        onClick={() => setDarkMode((prev) => !prev)}
        className={`fixed top-5 right-5 px-4 py-2 rounded-lg shadow-md border transition-all duration-200 hover:scale-105 ${
          darkMode
            ? "bg-slate-800 text-white border-slate-700"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      {/* Login Card */}
      <div
        className={`w-full max-w-md p-6 sm:p-8 rounded-xl shadow-md transition-colors duration-300 ${
          darkMode
            ? "bg-slate-800 border border-slate-700"
            : "bg-white border border-gray-100"
        }`}
      >
        <h1
          className={`text-2xl sm:text-3xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Login
        </h1>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className={`block mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-lg px-4 py-2.5 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              }`}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;