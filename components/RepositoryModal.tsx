"use client";

type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
};

type Props = {
  open: boolean;
  repos: Repo[];
  onClose: () => void;
  onSelect: (repo: Repo) => void;
};

export default function RepositoryModal({
  open,
  repos,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-yellow-300/20 bg-[#111111] p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-300">
            Import Repository
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {repos.length === 0 ? (
            <p className="text-gray-400">
              No repositories found.
            </p>
          ) : (
            repos.map((repo) => (
              <button
                key={repo.id}
                onClick={() => onSelect(repo)}
                className="w-full rounded-xl border border-yellow-300/20 bg-black p-4 text-left hover:bg-yellow-300/10 transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {repo.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {repo.full_name}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-300/20 px-3 py-1 text-xs text-yellow-300">
                    {repo.private ? "Private" : "Public"}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}