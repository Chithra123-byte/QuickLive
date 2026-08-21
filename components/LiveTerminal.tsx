"use client";

import { motion } from "framer-motion";

const logs = [
  "Cloning repository...",
  "Installing dependencies...",
  "Running npm install...",
  "Building application...",
  "Creating Docker image...",
  "Deploying to production...",
];

export default function LiveTerminal() {
  return (
    <section className="relative z-10 py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-yellow-300 font-semibold uppercase tracking-widest">
            Live Deployment
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
            Watch your build happen live.
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Real-time deployment logs make it easy to monitor every step.
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-yellow-300/20 bg-[#0a0a0a] overflow-hidden shadow-[0_0_60px_rgba(250,204,21,0.08)]"
        >

          {/* Header */}
          <div className="flex items-center gap-2 border-b border-yellow-300/10 bg-[#111111] px-5 py-4">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />

            <span className="ml-4 text-sm text-gray-400">
              Deployment Terminal
            </span>
          </div>

          {/* Body */}
          <div className="space-y-3 p-6 font-mono text-sm lg:text-base">
            {logs.map((log, index) => (
              <motion.div
                key={log}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.25 }}
                className="text-green-400"
              >
                ✔ {log}
              </motion.div>
            ))}

            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-yellow-300"
            >
              ➜ Deployment Complete
            </motion.div>

            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block h-5 w-2 bg-yellow-300"
            />
          </div>
        </motion.div>

        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-6"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-sm text-gray-400">Production URL</p>
              <p className="text-xl font-bold text-yellow-300">
                quicklive.app/demo
              </p>
            </div>

            <div className="self-start lg:self-auto rounded-full bg-green-500/20 px-4 py-2 text-green-400 whitespace-nowrap">
                ● Deployment Successful
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}