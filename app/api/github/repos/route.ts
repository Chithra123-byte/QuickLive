export async function GET() {
  const res = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "QuickLive",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();
    console.log(error);
    return Response.json({ error }, { status: res.status });
  }

  const repos = await res.json();

  return Response.json(
  repos.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    private: repo.private,
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
  }))
)};