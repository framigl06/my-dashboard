"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { login } from "./actions";

export default function LoginPage() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  const registered = searchParams.get("registered");

  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-black mb-4">
            <Lock size={22} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Personal Dashboard
          </h1>

          <p className="text-zinc-500 mt-2">
            Accedi al tuo spazio personale
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">

          <form
            action={async (formData) => {
              setLoading(true);
              await login(formData);
            }}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-zinc-300 mb-2"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="nome@email.com"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-zinc-300 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* Registration success */}
            {registered === "1" && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-400">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  Account creato. Controlla la tua email per confermare
                  l&apos;account prima di effettuare l&apos;accesso.
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3 text-sm font-semibold transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Accesso..." : "Accedi"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-500">
              Non hai ancora un account?
            </p>

            <Link
              href="/register"
              className="inline-block mt-2 text-sm font-medium text-white hover:text-zinc-300 transition"
            >
              Crea un account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
