"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-[85vh] items-center px-6 lg:px-12">
      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
            Deploy.
            <span className="text-yellow-300"> Build.</span>
            Scale.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-400">
            Connect your GitHub repository, deploy instantly, and monitor
            live builds with a beautiful DevOps platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/login"
              className="rounded-full bg-yellow-300 px-8 py-3 font-bold text-black transition hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.6)]"
            >
              Start Free
            </Link>

            <a
              href="#how-it-works"
              className="rounded-full border border-yellow-300/30 px-8 py-3 transition hover:bg-yellow-300/10"
            >
              Watch Demo
            </a>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md rounded-3xl border border-yellow-300/20 bg-[#111111]/80 p-6 shadow-[0_0_50px_rgba(250,204,21,0.15)] backdrop-blur">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Repository</p>
                <h3 className="font-semibold">quicklive/main</h3>
              </div>

              <span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-bold text-black">
                LIVE
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-400">Building...</p>

                <div className="h-3 overflow-hidden rounded-full bg-gray-800">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="h-full rounded-full bg-yellow-300"
                  />
                </div>
              </div>

              <div className="rounded-xl bg-black p-4 font-mono text-sm">
                <p className="text-green-400">✔ Cloning repository...</p>
                <p className="text-green-400">✔ Installing packages...</p>
                <p className="text-green-400">✔ Building Docker image...</p>
                <p className="text-yellow-300">→ Deploying...</p>
              </div>

              <div className="rounded-xl border border-yellow-300/20 bg-yellow-300/10 p-3">
                <p className="text-xs text-gray-400">Live URL</p>
                <p className="font-semibold text-yellow-300">
                  quicklive.app/demo
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}