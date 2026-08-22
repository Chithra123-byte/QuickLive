export default function Footer() {
  return (
    <footer className="border-t border-yellow-300/20 py-12 px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-yellow-300">
            QuickLive
          </h2>

          <p className="mt-3 text-gray-400">
            Deploy. Build. Scale.
          </p>
        </div>

        <div className="flex gap-8 text-gray-400">
          <a href="#">Docs</a>
          <a href="#">Pricing</a>
          <a href="#">GitHub</a>
          <a href="#">Privacy</a>
        </div>

      </div>
    </footer>
  );
}