"use client";

import { useState } from "react";

type Project = {
  name: string;
  repo: string;
  framework: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (project: Project) => void;
};

export default function NewProjectModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const [name, setName] = useState("");
  const [repo, setRepo] = useState("");
  const [framework, setFramework] = useState("Next.js");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-yellow-300/20 bg-[#111111] p-8 shadow-2xl shadow-yellow-500/10">

        <h2 className="text-3xl font-bold text-yellow-300 mb-6">
          New Project
        </h2>

        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-xl border border-gray-700 bg-black p-4 text-white focus:border-yellow-300 outline-none"
        />

        <input
          placeholder="GitHub Repository"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="mb-4 w-full rounded-xl border border-gray-700 bg-black p-4 text-white focus:border-yellow-300 outline-none"
        />

        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-black p-4 text-white focus:border-yellow-300 outline-none"
        >
          <option>Next.js</option>
          <option>React</option>
          <option>Node.js</option>
        </select>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-full border border-gray-600 py-3 text-white hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onCreate({ name, repo, framework });
              setName("");
              setRepo("");
              setFramework("Next.js");
              onClose();
            }}
            className="flex-1 rounded-full bg-yellow-300 py-3 font-bold text-black hover:bg-yellow-400 transition"
          >
            Create
          </button>

        </div>

      </div>
    </div>
  );
}