import { createClient } from "@/lib/supabase/server";

export default async function TasksPage() {
  const supabase = await createClient();
  const { data: tasks } = await supabase.from("tasks").select("*").order("due_date");
  return <div className="max-w-6xl mx-auto space-y-6">
    <div><p className="text-sm text-zinc-500">ATTIVITÀ</p><h1 className="text-3xl font-semibold">Tasks</h1></div>
    <div className="space-y-2">
      {(tasks ?? []).map((t: any) => <div className="card p-4 flex justify-between" key={t.id}><span>{t.title}</span><span className="text-zinc-500 text-sm">{t.completed ? "Completato" : t.due_date ?? ""}</span></div>)}
      {(!tasks || tasks.length === 0) && <div className="card p-6 muted">Nessun task.</div>}
    </div>
  </div>;
}
