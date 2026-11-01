import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-yellow-300/20 bg-black/70 px-8 py-6 backdrop-blur-md">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-yellow-300 transition hover:text-yellow-200"
      >
        QuickLive
      </Link>

      {/* Navigation */}
      <div className="hidden gap-8 text-gray-300 md:flex">
        <a href="#features" className="transition hover:text-yellow-300">
          Features
        </a>

        <a href="#pricing" className="transition hover:text-yellow-300">
          Pricing
        </a>

        <a href="#how-it-works" className="transition hover:text-yellow-300">
          How It Works
        </a>
      </div>

      {/* Deploy Button */}
      <Link
        href="/login"
        className="rounded-full bg-yellow-300 px-5 py-2 font-semibold text-black transition hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/40"
      >
        Deploy Now
      </Link>
    </nav>
  );
}