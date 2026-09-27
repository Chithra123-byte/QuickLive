"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import {
  ArrowLeft,
  FolderGit2,
  Globe,
  Trash2,
  CheckCircle2,
  CircleDot,
  LoaderCircle,
  XCircle,
} from "lucide-react";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [deployment, setDeployment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  async function loadProject() {
    setLoading(true);

    const { data, error } = await supabase
      .from("deployments")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setDeployment(data);
    }

    setLoading(false);
  }

  async function deleteProject() {
    if (!confirm("Delete this project?")) return;

    await supabase.from("deployments").delete().eq("id", id);

    router.push("/dashboard/projects");
  }

  function statusIcon(status: string) {
    switch (status) {
      case "Live":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "Deploying":
        return <LoaderCircle className="h-4 w-4 animate-spin text-blue-400" />;
      case "Building":
        return <CircleDot className="h-4 w-4 text-yellow-400" />;
      case "Failed":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <CircleDot className="h-4 w-4 text-gray-400" />;
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </main>
    );
  }

  if (!deployment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Project not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Projects
      </button>

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-5xl font-bold">{deployment.project_name}</h1>

          <div className="mt-5 flex items-center gap-3">
            <FolderGit2 className="h-5 w-5 text-yellow-300" />

            <div>
              <p className="text-sm text-gray-400">Repository</p>

              <a
                href={`https://github.com/${deployment.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:underline"
              >
                {deployment.repo}
              </a>
            </div>
          </div>
        </div>

        <span
          className={`flex items-center gap-2 rounded-full px-4 py-2 ${
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

      {/* Info Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 transition-all duration-300 hover:scale-[1.01] hover:border-yellow-300/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]">
          <p className="text-gray-400">Framework</p>
          <h3 className="mt-2 text-2xl font-bold">{deployment.framework}</h3>
        </div>

        <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 transition-all duration-300 hover:scale-[1.01] hover:border-yellow-300/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]">
          <p className="text-gray-400">Status</p>
          <h3 className="mt-2 text-2xl font-bold">{deployment.status}</h3>
        </div>

        <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 transition-all duration-300 hover:scale-[1.01] hover:border-yellow-300/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]">
          <p className="text-gray-400">Created</p>
          <h3 className="mt-2 text-lg font-bold">
            {new Date(deployment.created_at).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Deployment Timeline */}
      <div className="mt-10 rounded-2xl border border-yellow-300/20 bg-[#111111] p-8 transition-all duration-300 hover:scale-[1.01] hover:border-yellow-300/40 hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]">
        <h2 className="mb-6 text-2xl font-bold text-yellow-300">
          Deployment Timeline
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-400" />
            <span>Repository imported</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-400" />
            <span>Dependencies installed</span>
          </div>

          <div className="flex items-center gap-3">
            {deployment.status === "Building" ? (
              <LoaderCircle className="animate-spin text-yellow-400" />
            ) : (
              <CheckCircle2 className="text-green-400" />
            )}
            <span>Project built</span>
          </div>

          <div className="flex items-center gap-3">
            {deployment.status === "Live" ? (
              <CheckCircle2 className="text-green-400" />
            ) : (
              <CircleDot className="text-yellow-400" />
            )}
            <span>Deployment completed</span>
          </div>
        </div>
      </div>

      {/* Live URL */}
      {deployment.live_url && (
        <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-6 transition-all duration-300 hover:scale-[1.01]">
          <p className="text-sm text-gray-400">Live URL</p>

          <a
            href={deployment.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 text-xl text-green-400 hover:underline"
          >
            <Globe className="h-5 w-5" />
            {deployment.live_url}
          </a>
        </div>
      )}

      {/* Actions */}
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href={`https://github.com/${deployment.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-yellow-300/30 px-6 py-3 text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
        >
          GitHub Repository
        </a>

        {deployment.live_url && (
          <a
            href={deployment.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
          >
            Open Live Site
          </a>
        )}

        <button
          onClick={loadProject}
          className="rounded-full border border-yellow-300/30 px-6 py-3 text-yellow-300 transition hover:bg-yellow-300 hover:text-black"
        >
          Refresh
        </button>

        <button
          onClick={deleteProject}
          className="flex items-center gap-2 rounded-full border border-red-500/30 px-6 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-5 w-5" />
          Delete
        </button>
      </div>
    </main>
  );
}