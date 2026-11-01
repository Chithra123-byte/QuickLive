
"use client";

import { motion } from "framer-motion";
import { GitBranch, Terminal, Globe } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "One-click Deploy",
    desc: "Connect your GitHub repository and deploy automatically."
  },
  {
    icon: Terminal,
    title: "Live Logs",
    desc: "Monitor builds in real time with streaming terminal output."
  },
  {
    icon: Globe,
    title: "Instant URLs",
    desc: "Get a secure HTTPS URL immediately after deployment."
  }
];

export default function FeatureCard() {
  return (
    <section className="relative z-10 py-24 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="inline-flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 font-bold text-black transition hover:bg-yellow-400">
            Features
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
            Everything you need to ship faster.
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            QuickLive removes deployment complexity so you can focus on building products.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{
                  y: -12,
                  boxShadow: "0px 0px 40px rgba(250,204,21,0.25)"
                }}
                className="rounded-3xl border border-yellow-300/20 bg-[#111111] p-8 transition"
              >
                <div className="inline-flex rounded-2xl bg-yellow-300/10 p-4">
                  <Icon className="h-8 w-8 text-yellow-300" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
