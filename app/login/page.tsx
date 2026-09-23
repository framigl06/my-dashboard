"use client";

import { useState } from "react";
import { login, signup } from "./actions";
import { Lock, Mail, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / titolo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-black mb-4">
            <Lock size={22} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Personal Dashboard
          </h1>

          <p className="text-zinc-500 mt-2">
            {mode === "login"
              ? "Accedi al tuo spazio personale"
              : "Crea il tuo account personale"}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl">
          {/* Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-zinc-900 p-1 mb-6">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                mode === "login"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Accedi
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-lg py-2.5 text-sm font-medium transition ${
                mode === "signup"
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Registrati
            </button>
          </div>

          {mode === "login" ? (
            <form action={login} className="space-y-4">
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
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
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nome@email.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
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
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3 text-sm font-semibold transition hover:bg-zinc-200"
              >
                Accedi
                <ArrowRight size={17} />
              </button>
            </form>
          ) : (
            <form action={signup} className="space-y-4">
              {/* Nome */}
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm text-zinc-300 mb-2"
                >
                  Nome
                </label>

                <div className="relative">
                  <User
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    id="first-name"
                    name="first_name"
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="Francesco"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>
              </div>

              {/* Cognome */}
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm text-zinc-300 mb-2"
                >
                  Cognome
                </label>

                <div className="relative">
                  <User
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  />

                  <input
                    id="last-name"
                    name="last_name"
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Miglienti"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="signup-email"
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
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nome@email.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="signup-password"
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
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Almeno 6 caratteri"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3 text-sm font-semibold transition hover:bg-zinc-200"
              >
                Crea account
                <ArrowRight size={17} />
              </button>
            </form>
          )}

          <p className="text-center text-xs text-zinc-600 mt-6">
            I tuoi dati vengono utilizzati esclusivamente per il tuo account.
          </p>
        </div>
      </div>
    </main>
  );
}
