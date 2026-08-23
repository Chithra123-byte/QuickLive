return (
  <main className="min-h-screen bg-black text-white relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />
    <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-yellow-300/10 blur-[150px]" />

    <div className="flex">

      {/* Sidebar */}
      <aside className="w-64 border-r border-yellow-300/10 min-h-screen p-6">

        <h1 className="text-3xl font-bold text-yellow-300">
          QuickLive
        </h1>

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

        {/* Header */}
        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-4xl font-bold">
              Welcome back 👋
            </h2>

            <p className="text-gray-400 mt-2">
              {email}
            </p>
          </div>

          <button className="rounded-full bg-yellow-300 px-6 py-3 font-bold text-black hover:bg-yellow-400 transition">
            + New Project
          </button>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

          <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6">
            <p className="text-gray-400">Projects</p>
            <h3 className="text-4xl font-bold mt-2">3</h3>
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

          <h3 className="text-3xl font-bold mb-6">
            Recent Projects
          </h3>

          <div className="space-y-5">

            <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 flex justify-between items-center">

              <div>
                <h4 className="text-xl font-bold">
                  quicklive-landing
                </h4>

                <p className="text-gray-400 mt-1">
                  Last deployed 2 minutes ago
                </p>
              </div>

              <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400">
                Live
              </span>

            </div>

            <div className="rounded-2xl border border-yellow-300/20 bg-[#111111] p-6 flex justify-between items-center">

              <div>
                <h4 className="text-xl font-bold">
                  portfolio-site
                </h4>

                <p className="text-gray-400 mt-1">
                  Last deployed yesterday
                </p>
              </div>

              <span className="rounded-full bg-yellow-300/20 px-4 py-2 text-yellow-300">
                Building
              </span>

            </div>

          </div>

        </div>

      </section>

    </div>

  </main>
);