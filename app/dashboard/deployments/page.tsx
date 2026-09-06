"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
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
      return "🟢";
    case "Deploying":
      return "🔵";
    case "Building":
      return "🟡";
    case "Failed":
      return "🔴";
    default:
      return "⚪";
  }
}
export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDeployments = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setLoading(true);

    const { data, error } = await supabase
      .from("deployments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setDeployments(data || []);
    }

    setLoading(false);
  };

 useEffect(() => {
  loadDeployments();

  const interval = setInterval(() => {
    loadDeployments();
  }, 5000); // refresh every 5 seconds

  return () => clearInterval(interval);
}, []);
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-yellow-300">
            Deployments
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and monitor all deployments.
          </p>
        </div>

        <button
          onClick={loadDeployments}
          className="rounded-full border border-yellow-300/30 px-5 py-2 text-yellow-300 hover:bg-yellow-300 hover:text-black transition"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading deployments...</p>
      ) : deployments.length === 0 ? (
        <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-10 text-center">
          <p className="text-gray-500">No deployments yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 hover:border-yellow-300/40 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {deployment.project_name}
                  </h2>

                  <p className="mt-1 text-gray-400">
                    {deployment.repo}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-yellow-300/20 px-3 py-1 text-sm text-yellow-300">
                      {deployment.framework}
                    </span>
                  </div>
<p className="mt-3 text-sm text-gray-500">
  {timeAgo(deployment.created_at)}
</p>
                </div>

                <span
  className={`rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 ${
    deployment.status === "Live"
      ? "bg-green-500/20 text-green-400"
      : deployment.status === "Deploying"
      ? "bg-blue-500/20 text-blue-400"
      : deployment.status === "Building"
      ? "bg-yellow-500/20 text-yellow-300"
      : "bg-red-500/20 text-red-400"
  }`}
>
  <span>{statusIcon(deployment.status)}</span>
  <>
  {statusIcon(deployment.status)} {deployment.status}
</>
</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}