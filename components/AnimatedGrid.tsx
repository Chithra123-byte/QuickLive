"use client";

import { motion } from "framer-motion";

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250,204,21,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250,204,21,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated Glow Circle */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-300/10 blur-[120px]"
      />
    </div>
  );
}