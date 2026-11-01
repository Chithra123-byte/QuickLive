
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  GitBranch,
  Lock,
  LogOut,
  Settings,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  LoaderCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

import { supabase } from "../../../lib/supabase";

export default function SettingsPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      const user = data.user;

      setEmail(user.email || "No email available");

      const githubIdentity = user.identities?.find(
        (identity) => identity.provider === "github"
      );

      setProvider(githubIdentity ? "GitHub" : "Email");

      setUsername(
        githubIdentity?.identity_data?.user_name ||
          githubIdentity?.identity_data?.preferred_username ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          "QuickLive User"
      );

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  async function updatePassword() {
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setUpdating(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully!");
      setPassword("");
      setConfirmPassword("");
    }

    setUpdating(false);
  }

  async function logout() {
    setLoggingOut(true);
    setError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoaderCircle className="animate-spin text-yellow-300" size={35} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-yellow-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300/10 blur-[150px] rounded-full pointer-events-none" />

{/* Flowing Yellow Glow Particles */}
<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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


      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto p-6 md:p-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10 animate-[fadeIn_0.6s_ease-out]">

          <button
            onClick={() => router.push("/dashboard")}
            className="p-3 rounded-xl border border-yellow-300/20 hover:bg-yellow-300 hover:text-black transition"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-4xl font-bold text-yellow-300">
              Settings
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your QuickLive account and preferences.
            </p>
          </div>

        </div>

        {/* Profile Information */}
        <section className="bg-[#111111]/90 backdrop-blur-sm border border-yellow-300/20 rounded-2xl p-6 md:p-8 mb-7 animate-[fadeIn_0.8s_ease-out]">

          <div className="flex items-center gap-3 mb-7">
            <div className="p-3 bg-yellow-300/10 rounded-xl">
              <User className="text-yellow-300" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Profile Information</h2>
              <p className="text-sm text-gray-400">
                Your QuickLive account details
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-black/70 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 text-gray-400 mb-3">
                <Mail size={18} />
                <span className="text-sm">Email Address</span>
              </div>
              <p className="font-semibold break-all">{email}</p>
            </div>

            <div className="bg-black/70 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-3 text-gray-400 mb-3">
                <User size={18} />
                <span className="text-sm">Username</span>
              </div>
              <p className="font-semibold">{username}</p>
            </div>

          </div>
        </section>

        {/* GitHub Connection */}
        <section className="bg-[#111111]/90 backdrop-blur-sm border border-yellow-300/20 rounded-2xl p-6 md:p-8 mb-7 animate-[fadeIn_1s_ease-out]">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-300/10 rounded-xl">
                <GitBranch className="text-yellow-300" size={25} />
              </div>

              <div>
                <h2 className="text-xl font-bold">Connected Account</h2>
                <p className="text-sm text-gray-400">
                  Authentication provider
                </p>
              </div>
            </div>

            <span className="flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-4 py-2 text-sm">
              <CheckCircle2 size={16} />
              {provider} Connected
            </span>

          </div>
        </section>

        {/* Change Password */}
        <section className="bg-[#111111]/90 backdrop-blur-sm border border-yellow-300/20 rounded-2xl p-6 md:p-8 mb-7 animate-[fadeIn_1.2s_ease-out]">

          <div className="flex items-center gap-3 mb-7">
            <div className="p-3 bg-yellow-300/10 rounded-xl">
              <Lock className="text-yellow-300" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Change Password</h2>
              <p className="text-sm text-gray-400">
                Update your account password.
              </p>
            </div>
          </div>

          <div className="space-y-5 max-w-xl">

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 pr-12 outline-none focus:border-yellow-300 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-yellow-300"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-300 transition"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {message && (
              <p className="text-green-400 text-sm">{message}</p>
            )}

            <button
              onClick={updatePassword}
              disabled={updating || !password || !confirmPassword}
              className="flex items-center gap-2 bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {updating ? (
                <LoaderCircle className="animate-spin" size={18} />
              ) : (
                <ShieldCheck size={18} />
              )}

              {updating ? "Updating..." : "Update Password"}
            </button>

          </div>
        </section>

        {/* Logout */}
        <section className="bg-[#111111]/90 backdrop-blur-sm border border-red-500/20 rounded-2xl p-6 md:p-8 animate-[fadeIn_1.4s_ease-out]">

          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <Settings className="text-red-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Account Actions</h2>
              <p className="text-sm text-gray-400">
                Sign out from your QuickLive account.
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            disabled={loggingOut}
            className="flex items-center gap-3 bg-red-500/10 text-red-400 border border-red-500/20 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition disabled:opacity-50"
          >
            {loggingOut ? (
              <LoaderCircle className="animate-spin" size={19} />
            ) : (
              <LogOut size={19} />
            )}
            {loggingOut ? "Logging out..." : "Logout"}
          </button>

        </section>

        <p className="text-center text-gray-600 text-sm mt-10">
          QuickLive © 2026 · Account Settings
        </p>

      </div>
    </main>
  );
}
