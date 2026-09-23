import { createClient } from "@/lib/supabase/server";

export default async function UniversityPage() {
  const supabase = await createClient();
  const { data: subjects } = await supabase.from("subjects").select("*").order("name");
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div><p className="text-sm text-zinc-500">UNIVERSITÀ</p><h1 className="text-3xl font-semibold">Materie</h1></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(subjects ?? []).map((s: any) => (
          <div className="card p-5" key={s.id}><div className="font-medium">{s.name}</div><div className="text-sm muted mt-2">{s.color}</div></div>
        ))}
        {(!subjects || subjects.length === 0) && <div className="card p-6 muted">Nessuna materia. Inseriscila dal database Supabase o aggiungi il form in seguito.</div>}
      </div>
    </div>
  );
}
