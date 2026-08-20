export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-6 border-b border-yellow-300/20 bg-black/70 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-yellow-300">QuickLive</h1>

      <div className="hidden md:flex gap-8 text-gray-300">
        <a href="#" className="hover:text-yellow-300 transition">
          Features
        </a>
        <a href="#" className="hover:text-yellow-300 transition">
          Pricing
        </a>
        <a href="#" className="hover:text-yellow-300 transition">
          Docs
        </a>
      </div>

      <button className="rounded-full bg-yellow-300 px-5 py-2 font-semibold text-black hover:shadow-lg hover:shadow-yellow-300/40 transition">
        Deploy Now
      </button>
    </nav>
  );
}