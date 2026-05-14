"use client"
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Lgdmn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const Data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        { email, password },
        { withCredentials: true }
      );
      if (Data.data == "success") {
        window.location.href = "/lgndmn/dashboard";
      } else {
        setError("Email atau password salah.");
      }
    } catch (err) {
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-b from-koreaBlue to-black flex-col items-center justify-center px-12 gap-6">
        <Image
          src="/logow.svg"
          alt="LUPIC Logo"
          width={80}
          height={80}
          className="opacity-90"
        />
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">LUPIC</h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Leading University for International Cooperation — Admin Panel
          </p>
        </div>
        <div className="w-12 h-px bg-white/20" />
        <p className="text-white/40 text-xs text-center max-w-xs">
          Restricted access. Authorized personnel only.
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm space-y-8">

          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sign in</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access the dashboard.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-koreaBlue/20 focus:border-koreaBlue transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-koreaBlue/20 focus:border-koreaBlue transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-koreaBlue hover:bg-koreaBlue/90 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}