import { createClient } from "@/lib/supabase/server";
import { CheckSquare, CalendarDays, BookOpen, Wallet } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
  data: { user },
} = await supabase.auth.getUser();

  const { data: profile } = await supabase
  .from("profiles")
  .select("first_name, last_name")
  .eq("id", user?.id)
  .single();

  const [{ count: tasks }, { count: subjects }, { count: exams }] = await Promise.all([
    supabase.from("tasks").select("*", { count: "exact", head: true }),
    supabase.from("subjects").select("*", { count: "exact", head: true }),
    supabase.from("exams").select("*", { count: "exact", head: true })
  ]);

  const firstName = profile?.first_name || "Utente";

  const cards = [
    ["Tasks", tasks ?? 0, CheckSquare],
    ["Materie", subjects ?? 0, BookOpen],
    ["Esami", exams ?? 0, CalendarDays],
    ["Finanze", "—", Wallet]
  ] as const;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <header>
        <p className="text-sm text-zinc-500">OGGI · 23 SETTEMBRE 2026</p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-1">Buongiorno, {firstName} 👋</h1>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(([title, value, Icon]) => (
          <div className="card p-5" key={title}>
            <Icon size={20} className="text-zinc-400" />
            <div className="text-2xl font-semibold mt-5">{value}</div>
            <div className="text-sm text-zinc-500 mt-1">{title}</div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="card p-6 min-h-64">
          <h2 className="font-semibold">Prossimi impegni</h2>
          <p className="muted text-sm mt-2">Il calendario verrà collegato qui.</p>
        </div>
        <div className="card p-6 min-h-64">
          <h2 className="font-semibold">Attività recenti</h2>
          <p className="muted text-sm mt-2">I tuoi task compariranno qui.</p>
        </div>
      </section>
    </div>
  );
}
