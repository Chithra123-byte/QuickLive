"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created! Check your email for verification.");
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-lg rounded-3xl border border-yellow-300/20 bg-[#111111] p-8 shadow-2xl shadow-yellow-500/10">

        <h1 className="text-4xl font-bold text-center text-yellow-300">
          Create Account
        </h1>

        <input
          className="mt-8 w-full rounded-xl border border-gray-700 bg-black p-4 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20 outline-none"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-4 w-full rounded-xl border border-gray-700 bg-black p-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="mt-6 w-full rounded-full bg-yellow-300 py-3 font-bold text-black hover:bg-yellow-400"
        >
          Create Account
        </button>
        <div className="mt-6 space-y-4">
  <p className="text-center text-sm text-gray-400">
    Already have an account?
  </p>

  <a
    href="/login"
    className="block text-center rounded-xl border border-yellow-300/30 py-3 text-yellow-300 font-medium transition-all duration-300 hover:bg-yellow-300 hover:text-black"
  >
    Login Instead
  </a>
</div>

      </div>
    </main>
  );
}