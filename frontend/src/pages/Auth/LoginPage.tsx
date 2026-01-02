import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { googleAuth, loginUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      setEmail("");
      setPassword("");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-3">
            Welcome back
          </h1>
          <p className="text-gray-400 text-base">
            Log in to your GameVerse account
          </p>
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-0 mb-6">
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark text-white placeholder-gray-400 px-5 py-4 rounded-t-lg border border-[#3d2f5a] border-b-0 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark text-white placeholder-gray-400 px-5 py-4 rounded-b-lg border border-[#3d2f5a] focus:outline-none focus:ring-2 focus:ring-[#7c3aed] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right pt-4 pb-6">
            <button
              type="button"
              className="text-[#a855f7] hover:text-[#9333ea] text-sm font-medium transition-colors"
              onClick={() => console.log("Forgot password clicked")}
            >
              Forgot your password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-4 rounded-lg transition-colors duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        {error && (
          <div className="mt-4 rounded-md border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}
        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#3d2f5a]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#1a1625] text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        {/* Google Login Button */}
        <div className="flex items-center justify-center gap-3">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              const resultAction = await dispatch(
                googleAuth({ token: credentialResponse.credential })
              );
              if (googleAuth.fulfilled.match(resultAction)) {
                navigate("/", { replace: true });
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        ;{/* Sign Up Link */}
        <div className="text-center mt-8">
          <span className="text-gray-400">Don't have an account? </span>
          <Link
            to="/signup"
            className="text-[#a855f7] hover:text-[#9333ea] font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
