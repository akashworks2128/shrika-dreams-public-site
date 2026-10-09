import { getProjectsFromSupabase } from "../lib/data/projectsSupabase";

export default async function SupabaseTest() {
  const projects = await getProjectsFromSupabase();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Supabase Projects</h1>

      <pre className="mt-6 whitespace-pre-wrap text-sm">
        {JSON.stringify(projects, null, 2)}
      </pre>
    </main>
  );
}
