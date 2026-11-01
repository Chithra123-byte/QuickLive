
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 text-white">

      {/* Background Glow */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-yellow-300/10 blur-[150px]" />

      {/* Golden Glow Particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 35 }).map((_, i) => (
          <span
            key={i}
            className="quicklive-particle"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              width: `${4 + (i % 5) * 2}px`,
              height: `${4 + (i % 5) * 2}px`,
              animationDelay: `${(i % 9) * -1.3}s`,
              animationDuration: `${7 + (i % 6) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-yellow-300/20 bg-[#111111]/90 p-8 shadow-[0_0_50px_rgba(250,204,21,0.15)] backdrop-blur-xl">

        <h1 className="text-center text-4xl font-bold text-yellow-300">
          QuickLive
        </h1>

        <p className="mt-3 text-center text-gray-400">
          Welcome back! Login to continue.
        </p>

        {/* Email */}
        <input
          className="mt-8 w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none transition focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="mt-4 w-full rounded-xl border border-gray-700 bg-black p-4 text-white outline-none transition focus:border-yellow-300 focus:ring-1 focus:ring-yellow-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full rounded-full bg-yellow-300 py-3 font-bold text-black transition hover:scale-105 hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <div className="mt-6 space-y-4">
          <p className="text-center text-sm text-gray-400">
            Don't have an account?
          </p>

          <a
            href="/register"
            className="block rounded-xl border border-yellow-300/30 py-3 text-center font-medium text-yellow-300 transition-all duration-300 hover:bg-yellow-300 hover:text-black"
          >
            Create Free Account
          </a>
        </div>

      </div>
    </main>
  );
}
