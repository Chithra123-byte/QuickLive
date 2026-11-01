
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { FolderGit2, ExternalLink } from "lucide-react";
import FloatingParticles from "../../../components/FloatingParticles";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
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
      setProjects(data || []);
    } else {
      console.error("Failed to load projects:", error);
      setProjects([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
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
              Projects
            </h1>

            <p className="mt-2 text-gray-400">
              Manage all your QuickLive projects.
            </p>
          </div>

          <button
            onClick={loadProjects}
            className="rounded-full border border-yellow-300/30 px-5 py-2 text-yellow-300 hover:bg-yellow-300 hover:text-black transition"
          >
            Refresh
          </button>
        </div>

        {/* Projects Content */}
        {loading ? (
          <p className="text-gray-400">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-10 text-center">
            <FolderGit2 className="mx-auto mb-4 h-12 w-12 text-yellow-300" />

            <p className="text-gray-500">
              No projects found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
              >
                <div className="cursor-pointer rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 transition-all duration-300 hover:scale-[1.02] hover:border-yellow-300/50 hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]">

                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                      {project.project_name}
                    </h2>

                    <ExternalLink className="h-5 w-5 text-yellow-300" />
                  </div>

                  <p className="mt-3 text-gray-400 line-clamp-2">
                    {project.repo}
                  </p>

                  <div className="mt-5 flex items-center justify-between">

                    <span className="rounded-full bg-yellow-300/20 px-3 py-1 text-sm text-yellow-300">
                      {project.framework}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        project.status === "Live"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {project.status || "Created"}
                    </span>

                  </div>

                  <p className="mt-4 text-xs text-gray-500">
                    Click to view details →
                  </p>

                </div>
              </Link>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
