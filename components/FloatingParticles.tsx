"use client";

import { motion } from "framer-motion";

const particles = [
  { x: "5%", y: "10%", size: 6, delay: 0 },
  { x: "12%", y: "35%", size: 8, delay: 1 },
  { x: "20%", y: "70%", size: 5, delay: 2 },
  { x: "28%", y: "18%", size: 9, delay: 3 },
  { x: "35%", y: "55%", size: 7, delay: 4 },
  { x: "45%", y: "82%", size: 6, delay: 5 },
  { x: "55%", y: "28%", size: 10, delay: 6 },
  { x: "65%", y: "65%", size: 7, delay: 7 },
  { x: "75%", y: "12%", size: 8, delay: 8 },
  { x: "82%", y: "45%", size: 6, delay: 9 },
  { x: "90%", y: "75%", size: 9, delay: 10 },
  { x: "96%", y: "22%", size: 5, delay: 11 },
];

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
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
  y: [-25, 25, -25],
  x: [-8, 8, -8],
  opacity: [0.25, 1, 0.25],
  scale: [1, 1.3, 1],
}}

transition={{
  duration: 8,
  repeat: Infinity,
  delay: particle.delay,
  ease: "easeInOut",
}}
        />
      ))}
    </div>
  );
}