import React from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { FiArrowRight, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setName: (value: string) => void;
  setBio: (value: string) => void;
  loading: boolean;
  onGoogleAuthSuccess: (
    credentialResponse: CredentialResponse,
  ) => Promise<void>;
  password: string;
  email: string;
  name: string;
  bio: string;
  error: string | null;
}
const SignupContainer = ({
  handleSubmit,
  loading,
  onGoogleAuthSuccess,
  setEmail,
  setPassword,
  email,
  password,
  error,
  name,
  setName,
  bio,
  setBio,
}: Props) => {
  return (
    <section className="flex items-center">
      <div className="w-full rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#0d1424]/84 p-5 shadow-xl shadow-black/20 sm:p-6 lg:p-8">
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-(--color-blue)">
            Create account
          </p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Set up your profile
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#9aa7bd]">
            Start with the essentials and you can refine the rest once you are
            inside.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
              Name
            </label>
            <div className="flex items-center gap-3 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 focus-within:border-[rgba(0,212,255,0.34)] focus-within:ring-2 focus-within:ring-[rgba(0,212,255,0.14)]">
              <FiUser className="h-4 w-4 shrink-0 text-(--color-blue)" />
              <input
                type="text"
                placeholder="Your display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-[#6f7d94]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
              Bio
            </label>
            <div className="rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 focus-within:border-[rgba(0,212,255,0.34)] focus-within:ring-2 focus-within:ring-[rgba(0,212,255,0.14)]">
              <textarea
                placeholder="Tell people what kinds of games you love, review, or keep coming back to."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="min-h-27 w-full resize-none bg-transparent text-white outline-none placeholder:text-[#6f7d94]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
              Email
            </label>
            <div className="flex items-center gap-3 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 focus-within:border-[rgba(0,212,255,0.34)] focus-within:ring-2 focus-within:ring-[rgba(0,212,255,0.14)]">
              <FiMail className="h-4 w-4 shrink-0 text-(--color-blue)" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-[#6f7d94]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold uppercase tracking-[0.12em] text-[#c8d3e4]">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/70 px-4 py-3 focus-within:border-[rgba(0,212,255,0.34)] focus-within:ring-2 focus-within:ring-[rgba(0,212,255,0.14)]">
              <FiLock className="h-4 w-4 shrink-0 text-(--color-blue)" />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white outline-none placeholder:text-[#6f7d94]"
                required
              />
            </div>
          </div>

          {error ? (
            <div className="rounded-[10px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-black transition ${
              loading
                ? "cursor-not-allowed border border-white/10 bg-white/6 text-[#7f8ca2]"
                : "border border-[rgba(182,255,59,0.18)] bg-[var(--color-lime)] text-[#07101a] shadow-lg shadow-[rgba(182,255,59,0.18)] hover:bg-[#ccff6f]"
            }`}
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading ? <FiArrowRight className="h-4 w-4" /> : null}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(0,212,255,0.12)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#0d1424] px-4 text-sm font-semibold text-[#7f8ca2]">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) =>
              onGoogleAuthSuccess(credentialResponse)
            }
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>

        <div className="mt-8 rounded-[10px] border border-[rgba(0,212,255,0.12)] bg-[#070b16]/55 px-4 py-4">
          <p className="text-sm text-[#c8d3e4]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-black text-(--color-blue) transition hover:text-(--color-lime)"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupContainer;
