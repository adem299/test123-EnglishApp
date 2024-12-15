import AuthLayouts from "../components/Layouts/AuthLayouts";
import FormLogin from "../components/Fragments/FormLogin";
import { Link } from "react-router-dom";

// const LoginPage = () => {
//   return (
//     <AuthLayouts title="Login">
//       <FormLogin />
//       <p className="text-sm mt-5 text-center">
//         Don't have an account? <Link to="/register" className="font-bold text-blue-600">Register</Link>
//       </p>
//     </AuthLayouts>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import loginImage from '../assets/login-1.png';

function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(
        "https://toeflify-service-473598678247.asia-southeast2.run.app/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            interests: [],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed.");
      }

      const data = await response.json();
      console.log("Login Success:", data);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 flex flex-col justify-center items-center text-white">
        <img
          src={loginImage}
          alt="Illustration"
          className="mb-8"
        />
        <h2 className="text-2xl font-bold">Stay Curious</h2>
        <p className="mt-4 text-center px-8">
          Learn English easily and effectively, anytime and anywhere.
        </p>
        <div className="flex space-x-2 mt-8">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">Welcome Back!</h2>
        <p className="text-slate-600 mt-2 mb-8">
          Learn English Anytime, Anywhere.
        </p>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
        )}
        <form className="w-2/3" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              placeholder="Your Username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="*********"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              name="password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          <p className="text-slate-600 text-center mt-4">
            Don’t you have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

