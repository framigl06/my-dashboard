import Link from "next/link";
import { LayoutDashboard, BookOpen, CalendarDays, CheckSquare, Wallet, Link2, Settings } from "lucide-react";
import { logout } from "./actions";

const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/dashboard/university", "Università", BookOpen],
  ["/dashboard/calendar", "Calendario", CalendarDays],
  ["/dashboard/tasks", "Tasks", CheckSquare],
  ["/dashboard/finance", "Finanze", Wallet],
  ["/dashboard/links", "Link", Link2],
  ["/dashboard/settings", "Impostazioni", Settings]
] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-64 shrink-0 border-r border-zinc-900 p-5 flex-col">
        <div className="mb-8">
          <div className="text-xs text-zinc-500 tracking-widest">PERSONAL</div>
          <div className="text-xl font-semibold">Dashboard</div>
        </div>
        <nav className="space-y-1">
          {items.map(([href, label, Icon]) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-zinc-300 hover:bg-zinc-900 hover:text-white">
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="mt-auto">
          <button className="w-full rounded-xl border border-zinc-800 px-3 py-2 text-sm text-zinc-400 hover:text-white">
            Esci
          </button>
        </form>
      </aside>
      <main className="flex-1 min-w-0 p-5 md:p-8">{children}</main>
    </div>
  );
}
