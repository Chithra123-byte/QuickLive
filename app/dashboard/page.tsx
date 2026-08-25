"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import NewProjectModal from "../../components/NewProjectModal";

export default function Dashboard() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setEmail(data.user.email || "");

      const { data: projectData, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        setProjects(projectData || []);
      }

      setLoadingProjects(false);
    }

    checkUser();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleCreateProject(project: {
    name: string;
    repo: string;
    framework: string;
  }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("projects").insert({
      name: project.name,
      repo: project.repo,
      framework: project.framework,
      user_id: user.id,
    });

    if (error) {
      alert(error.message);
    } else {
      // Refresh project list immediately
      const { data: projectData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      setProjects(projectData || []);
      setOpen(false);

      alert("Project created successfully!");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-yellow-300/10 blur-[150px]" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-yellow-300/10 min-h-screen p-6">
          <h1 className="text-3xl font-bold text-yellow-300">QuickLive</h1>

          <nav className="mt-12 space-y-4">
            <div className="rounded-xl bg-yellow-300 text-black px-4 py-3 font-semibold">
              Dashboard
            </div>

            <div className="rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 cursor-pointer">
              Projects
            </div>

            <div className="rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 cursor-pointer">
              Deployments
            </div>

            <div className="rounded-xl px-4 py-3 text-gray-400 hover:bg-white/5 cursor-pointer">
              Settings
            </div>
          </nav>

          <button
            onClick={logout}
            className="mt-16 w-full rounded-full border border-yellow-300/30 py-3 text-yellow-300 hover:bg-yellow-300 hover:text-black transition"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-bold">Welcome back 👋</h2>
              <p className="text-gray-400 mt-2">{email}</p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-yellow-300 px-6 py-3 font-bold text-black hover:bg-yellow-400 transition"
            >
              + New Project
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6">
              <p className="text-gray-400">Projects</p>
              <h3 className="text-4xl font-bold mt-2">
                {loadingProjects ? "..." : projects.length}
              </h3>
            </div>

            <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6">
              <p className="text-gray-400">Deployments</p>
              <h3 className="text-4xl font-bold mt-2">24</h3>
            </div>

            <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6">
              <p className="text-gray-400">Success Rate</p>
              <h3 className="text-4xl font-bold mt-2 text-yellow-300">
                99%
              </h3>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mt-14">
            <h3 className="text-3xl font-bold mb-6">Recent Projects</h3>

            <div className="space-y-5">
              {loadingProjects ? (
                <p className="text-gray-400">Loading projects...</p>
              ) : projects.length === 0 ? (
                <p className="text-gray-500">No projects yet.</p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-xl font-bold">{project.name}</h4>
                      <p className="text-gray-400 mt-1">{project.repo}</p>

                      <div className="mt-3">
                        <span className="rounded-full bg-yellow-300/20 px-3 py-1 text-sm text-yellow-300">
                          {project.framework}
                        </span>
                      </div>
                    </div>

                    <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                      {project.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      <NewProjectModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateProject}
      />
    </main>
  );
}