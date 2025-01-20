"use client"
import React, { useState } from "react";

export default function Lgdmn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
    // Tambahkan logika autentikasi di sini
    window.location.href = "/lgndmn/dashboard"
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-koreaBlue">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

