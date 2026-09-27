import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { repo, projectName, framework, userId } = await req.json();

    // Create deployment
    const { data, error } = await supabase
      .from("deployments")
      .insert({
        repo,
        project_name: projectName,
        framework,
        user_id: userId,
        status: "Building",
        step: "Cloning",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Fake deployment pipeline
    const steps = [
      { delay: 2000, step: "Installing" },
      { delay: 4000, step: "Building" },
      { delay: 6000, step: "Deploying" },
      {
        delay: 8000,
        step: "Live",
        status: "Live",
        live_url: `https://${projectName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-")}.quicklive.app`,
      },
    ];

    steps.forEach(({ delay, step, status, live_url }) => {
      setTimeout(async () => {
        await supabase
          .from("deployments")
          .update({
            step,
            ...(status && { status }),
            ...(live_url && { live_url }),
          })
          .eq("id", data.id);
      }, delay);
    });

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}