
"use client";

import { motion } from "framer-motion";
import { GitBranch, Package, Rocket } from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    title: "Connect GitHub",
    desc: "Import your repository with a single click.",
  },
  {
    icon: Package,
    title: "Build Automatically",
    desc: "QuickLive installs dependencies and builds your app.",
  },
  {
    icon: Rocket,
    title: "Go Live",
    desc: "Your project gets a secure live URL instantly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative z-10 pt-36 pb-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-5 py-2 font-semibold text-black transition hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/40">
            How it Works
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
            Deploy in 3 simple steps.
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            From pushing code to getting a live URL—everything happens automatically.
          </p>
        </motion.div>

        <div className="relative mt-20">

          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-yellow-300/20 lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex ${
                    index % 2 === 0
                      ? "lg:justify-start"
                      : "lg:justify-end"
                  }`}
                >
                  <div className="w-full lg:w-5/12 rounded-3xl border border-yellow-300/20 bg-[#111111] p-8">

                    <div className="inline-flex rounded-2xl bg-yellow-300/10 p-4">
                      <Icon className="h-8 w-8 text-yellow-300" />
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-gray-400">
                      {step.desc}
                    </p>

                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-10 hidden h-5 w-5 -translate-x-1/2 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.8)] lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
