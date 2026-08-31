"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  open: boolean;
  repo: any;
  onClose: () => void;
};

export default function DeployModal({ open, repo, onClose }: Props) {
  const [framework, setFramework] = useState("Next.js");
  const [deploying, setDeploying] = useState(false);

  if (!open || !repo) return null;

  const handleDeploy = async () => {
    try {
      setDeploying(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        return;
      }

      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo: repo.full_name,
          projectName: repo.name,
          framework,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Deployment failed");
      }

      alert("Deployment started!");
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-yellow-300/20 bg-[#111111] p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-yellow-300">
            Deploy Repository
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-400">Repository</p>
            <p className="font-semibold">{repo.full_name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Project Name</p>
            <p className="font-semibold">{repo.name}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">Framework</label>

            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="mt-2 w-full rounded-lg border border-yellow-300/20 bg-black p-3 text-white outline-none focus:border-yellow-300"
            >
              <option>Next.js</option>
              <option>React</option>
              <option>Node.js</option>
              <option>Python</option>
            </select>
          </div>

          <button
            onClick={handleDeploy}
            disabled={deploying}
            className="w-full rounded-xl bg-yellow-300 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deploying ? "Deploying..." : "Deploy"}
          </button>
        </div>
      </div>
    </div>
  );
}