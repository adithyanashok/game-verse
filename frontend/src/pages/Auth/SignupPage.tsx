import React, { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted");
  };

  const handleGoogleSignup = () => {
    console.log("Google Signup clicked");
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-3">
            Create account.
          </h1>
          <p className="text-gray-400 text-base">
            Create your GameVerse account
          </p>
        </div>

        {/* Signup Form */}
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
            <a
              href="#"
              className="text-[#a855f7] hover:text-[#9333ea] text-sm font-medium transition-colors"
            >
              Forgot your password?
            </a>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            Log In
          </button>
        </form>

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

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-dark hover:bg-[#342847] text-white font-medium py-4 rounded-lg border border-[#3d2f5a] transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <span className="text-gray-400">already have an account? </span>
          <a
            href="#"
            className="text-[#a855f7] hover:text-[#9333ea] font-medium transition-colors"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
