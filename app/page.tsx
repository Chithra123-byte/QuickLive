import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />
      <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-yellow-300/10 blur-[150px]" />

      <Navbar />
      <Hero />
    </main>
  );
}