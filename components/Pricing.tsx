"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1 Project", "Live Logs", "HTTPS URL"],
  },
  {
    name: "Pro",
    price: "$19",
    featured: true,
    features: ["Unlimited Projects", "Custom Domains", "Priority Builds"],
  },
  {
    name: "Team",
    price: "$49",
    features: ["Team Workspaces", "Analytics", "Advanced Deployments"],
  },
];

export default function Pricing() {
  return (
    <section className="relative z-10 py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <p className="text-yellow-300 font-semibold uppercase tracking-widest">
            Pricing
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold">
            Choose your plan.
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`rounded-3xl border p-8 ${
                plan.featured
                  ? "border-yellow-300 bg-yellow-300/10"
                  : "border-yellow-300/20 bg-[#111111]"
              }`}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>

              <p className="mt-4 text-5xl font-bold text-yellow-300">
                {plan.price}
              </p>

              <div className="mt-8 space-y-3 text-gray-300">
                {plan.features.map((feature) => (
                  <p key={feature}>✔ {feature}</p>
                ))}
              </div>

              <button className="mt-8 w-full rounded-full bg-yellow-300 py-3 font-bold text-black">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}