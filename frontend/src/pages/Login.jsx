import { useState } from "react";
import axios from "axios";

function Login() {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin}>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;