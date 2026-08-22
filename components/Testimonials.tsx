"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    text: "QuickLive reduced our deployment time from 30 minutes to under a minute.",
  },
  {
    name: "Sarah Chen",
    role: "Startup Founder",
    text: "The live logs and GitHub integration made deployments effortless.",
  },
  {
    name: "Rahul Kumar",
    role: "Full Stack Developer",
    text: "The UI feels as polished as Vercel while remaining incredibly simple.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-10 py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="text-yellow-300 font-semibold uppercase tracking-widest">
            Testimonials
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
            Loved by developers.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-yellow-300/20 bg-[#111111] p-8"
            >
              <p className="text-gray-300 italic">"{review.text}"</p>

              <div className="mt-8">
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}