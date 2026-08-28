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
  const [githubConnected, setGithubConnected] = useState(false);
 const [githubUsername, setGithubUsername] = useState("");
  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setEmail(data.user.email || "");
      const hasGithub = data.user.identities?.some(
  (identity) => identity.provider === "github"
);

setGithubConnected(!!hasGithub);
const githubIdentity = data.user.identities?.find(
  (identity) => identity.provider === "github"
);

setGithubUsername(
  githubIdentity?.identity_data?.user_name ||
  githubIdentity?.identity_data?.preferred_username ||
  ""
);
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
  async function connectGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/dashboard",
    },
  });

  if (error) {
    alert(error.message);
  }
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

            <div className="flex gap-4">
              <button
  onClick={!githubConnected ? connectGitHub : undefined}
  disabled={githubConnected}
  className={`rounded-full px-6 py-3 font-medium transition ${
    githubConnected
      ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
      : "border border-yellow-300/30 text-yellow-300 hover:bg-yellow-300 hover:text-black"
  }`}
>
  {githubConnected ? "GitHub Connected ✓" : "Connect GitHub"}
</button>

              <button
                onClick={() => setOpen(true)}
                className="rounded-full bg-yellow-300 px-6 py-3 font-bold text-black hover:bg-yellow-400 transition"
              >
                + New Project
              </button>
            </div>
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
          {/* GitHub Account Card */}

<div className="mt-10 rounded-2xl border border-yellow-300/20 bg-[#111111] p-6">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-white/5 p-3">
        <svg
          className="h-8 w-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.95c.6.1.82-.25.82-.57v-2.23c-3.26.7-3.95-1.57-3.95-1.57-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.39.97.1-.75.4-1.27.72-1.56-2.6-.3-5.34-1.3-5.34-5.78 0-1.28.46-2.32 1.2-3.14-.12-.3-.52-1.5.12-3.12 0 0 .98-.31 3.2 1.2a11.1 11.1 0 015.82 0c2.22-1.5 3.2-1.2 3.2-1.2.64 1.62.24 2.82.12 3.12.75.82 1.2 1.86 1.2 3.14 0 4.5-2.75 5.48-5.36 5.78.42.36.79 1.06.79 2.15v3.19c0 .32.22.68.83.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
        </svg>
      </div>

      <div>
        <h3 className="text-2xl font-bold">GitHub Account</h3>
        <p className="text-gray-400">
          Connected to QuickLive
        </p>
      </div>
    </div>

    <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
      Connected 
    </span>
  </div>
  <div className="mt-8 grid gap-6 md:grid-cols-2">
    <div>
      <p className="text-sm text-gray-500">Username</p>
      <p className="mt-1 text-lg font-semibold">
        {githubUsername || "Connected User"}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-500">Provider</p>
      <p className="mt-1 text-lg font-semibold">
        GitHub OAuth
      </p>
    </div>
  </div>
  <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-4 flex items-center justify-between">
    <div>
      <p className="font-semibold text-green-400">
        Repository Access
      </p>
      <p className="text-sm text-gray-400">
        Ready to import repositories
      </p>
    </div>
    <div className="text-green-400 text-xl">✓</div>
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