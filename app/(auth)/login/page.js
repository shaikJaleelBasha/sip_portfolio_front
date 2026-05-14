"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/app/components/InputField";
import { useAuth } from "@/app/core/context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  // Submit Function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
     const response = await axios.post(
  "http://localhost:3000/api/auth/login",
  {
    email,
    password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },

    // Since you're not using cookies now:
    withCredentials: false,
  }
);

      console.log(response.data);
      if (response.data.success) {
        // Save using context
        login(response.data.data.investor, response.data.data.token);
        alert("Login Successful");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-gray-700 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
      >
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Login
        </h1>

        {/* Email */}
        <div className="mb-5">
          <InputField
            placeholder="Enter your email"
            type="email"
            inputValue={(value) => setEmail(value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <InputField
            placeholder="Enter your password"
            type="password"
            inputValue={(value) => setPassword(value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-500 py-3 text-lg font-semibold text-white transition hover:bg-cyan-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;