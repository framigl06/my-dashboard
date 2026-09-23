import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md card p-8">
        <div className="mb-8">
          <p className="text-sm text-zinc-500">PERSONAL DASHBOARD</p>
          <h1 className="text-3xl font-semibold mt-2">Bentornato 👋</h1>
          <p className="muted mt-2">Accedi o crea il tuo account.</p>
        </div>
        <form className="space-y-4">
          <input name="email" type="email" required placeholder="Email"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 outline-none focus:border-zinc-500" />
          <input name="password" type="password" required minLength={6} placeholder="Password"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 outline-none focus:border-zinc-500" />
          <div className="grid grid-cols-2 gap-3">
            <button formAction={login} className="rounded-xl bg-white text-black p-3 font-medium">Accedi</button>
            <button formAction={signup} className="rounded-xl border border-zinc-700 p-3 font-medium">Registrati</button>
          </div>
        </form>
      </div>
    </main>
  );
}
