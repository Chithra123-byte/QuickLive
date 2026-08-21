import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AnimatedGrid from "../components/AnimatedGrid";
import FloatingParticles from "../components/FloatingParticles";
import FeatureCard from "../components/FeatureCard";
import HowItWorks from "../components/HowItWorks";
import LiveTerminal from "../components/LiveTerminal";

export default function Home() {
  return (
  <main className="min-h-screen bg-black text-white relative overflow-hidden">
  <AnimatedGrid />
  <FloatingParticles />
  <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-[120px]" />
  <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-yellow-300/10 blur-[150px]" />

  <Navbar />
  <Hero />
  <FeatureCard/>
  <HowItWorks/>
  <LiveTerminal/>
</main>
  );
}