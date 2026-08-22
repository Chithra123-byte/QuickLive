"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "100K+", label: "Deployments" },
  { value: "99.99%", label: "Uptime" },
  { value: "1M+", label: "Build Minutes" },
  { value: "24/7", label: "Monitoring" },
];

export default function Stats() {
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
          <p className="text-yellow-300 font-semibold uppercase tracking-widest">
            Trusted by Developers
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
            Built for speed at every scale.
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(250,204,21,0.2)"
              }}
              className="rounded-3xl border border-yellow-300/20 bg-[#111111] p-8 text-center"
            >
              <h3 className="text-4xl lg:text-5xl font-bold text-yellow-300">
                {stat.value}
              </h3>

              <p className="mt-3 text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}