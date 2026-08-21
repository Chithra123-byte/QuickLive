"use client";

import { motion } from "framer-motion";

const particles = [
  { x: "10%", y: "20%", size: 8, delay: 0 },
  { x: "30%", y: "70%", size: 6, delay: 1 },
  { x: "55%", y: "35%", size: 10, delay: 2 },
  { x: "75%", y: "60%", size: 7, delay: 3 },
  { x: "90%", y: "15%", size: 9, delay: 4 },
];

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-yellow-300"
          style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                boxShadow: "0 0 30px rgba(250,204,21,1)",
        }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}