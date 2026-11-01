
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import FloatingParticles from "../../../components/FloatingParticles";

import {
  CheckCircle2,
  LoaderCircle,
  CircleDot,
  XCircle,
  Globe,
} from "lucide-react";

function timeAgo(dateString: string) {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );

  if (seconds < 60) return `${seconds} sec ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return new Date(dateString).toLocaleDateString();
}

function statusIcon(status: string) {
  switch (status) {
    case "Live":
      return <CheckCircle2 className="h-4 w-4 text-green-400" />;

    case "Deploying":
      return <LoaderCircle className="h-4 w-4 text-blue-400 animate-spin" />;

    case "Building":
      return <CircleDot className="h-4 w-4 text-yellow-400" />;

    case "Failed":
      return <XCircle className="h-4 w-4 text-red-400" />;

    default:
      return <CircleDot className="h-4 w-4 text-gray-400" />;
  }
}

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDeployments = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("deployments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setDeployments(data || []);
    } else {
      console.error("Failed to load deployments:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDeployments();

    const interval = setInterval(loadDeployments, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden p-10">

      {/* Golden Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FloatingParticles />
      </div>

      {/* Background Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px] pointer-events-none" />

      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-yellow-300/10 blur-[150px] pointer-events-none" />

      {/* Main Page Content */}
      <div className="relative z-10">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-yellow-300">
              Deployments
            </h1>

            <p className="mt-2 text-gray-400">
              Manage and monitor all deployments.
            </p>
          </div>

          <button
            onClick={loadDeployments}
            className="rounded-full border border-yellow-300/30 px-5 py-2 text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
          >
            Refresh
          </button>
        </div>

        {/* Deployments Content */}
        {loading ? (
          <p className="text-gray-400">
            Loading deployments...
          </p>
        ) : deployments.length === 0 ? (
          <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-10 text-center">
            <p className="text-gray-500">
              No deployments yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {deployments.map((deployment) => (
              <div
                key={deployment.id}
                className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 transition hover:border-yellow-300/40"
              >

                <div className="flex items-start justify-between">

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold">
                      {deployment.project_name}
                    </h2>

                    <p className="mt-1 text-gray-400">
                      {deployment.repo}
                    </p>

                    <div className="mt-4 flex gap-3">
                      <span className="rounded-full bg-yellow-300/20 px-3 py-1 text-sm text-yellow-300">
                        {deployment.framework}
                      </span>
                    </div>

                    {/* Deployment Timeline */}
                    <div className="mt-5 rounded-xl border border-yellow-300/10 bg-black p-4 font-mono text-sm">

                      <p className="text-green-400">
                        ✓ Cloning repository...
                      </p>

                      <p
                        className={
                          ["Installing", "Building", "Deploying", "Live"].includes(
                            deployment.step
                          )
                            ? "text-green-400"
                            : "text-gray-500"
                        }
                      >
                        ✓ Installing packages...
                      </p>

                      <p
                        className={
                          ["Building", "Deploying", "Live"].includes(
                            deployment.step
                          )
                            ? "text-green-400"
                            : "text-gray-500"
                        }
                      >
                        ✓ Building project...
                      </p>

                      <p
                        className={
                          deployment.step === "Deploying"
                            ? "text-yellow-300"
                            : deployment.step === "Live"
                            ? "text-green-400"
                            : "text-gray-500"
                        }
                      >
                        → Deploying...
                      </p>

                    </div>

                    {/* Live URL */}
                    {deployment.live_url && (
                      <a
                        href={deployment.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center gap-2 text-yellow-300 transition hover:underline"
                      >
                        <Globe className="h-4 w-4" />
                        {deployment.live_url}
                      </a>
                    )}

                    {/* Deployment Time */}
                    <p className="mt-4 text-sm text-gray-500">
                      {timeAgo(deployment.created_at)}
                    </p>

                  </div>

                  {/* Deployment Status */}
                  <span
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
                      deployment.status === "Live"
                        ? "bg-green-500/20 text-green-400"
                        : deployment.status === "Deploying"
                        ? "bg-blue-500/20 text-blue-400"
                        : deployment.status === "Building"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {statusIcon(deployment.status)}
                    {deployment.status}
                  </span>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
