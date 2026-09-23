"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { register } from "./actions";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white text-black mb-4">
            <User size={22} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Crea il tuo account
          </h1>

          <p className="text-zinc-500 mt-2">
            Registrati al Personal Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">

          <form
            action={async (formData) => {
              setLoading(true);
              await register(formData);
            }}
            className="space-y-5"
          >

            {/* Nome */}
            <div>
              <label
                htmlFor="first_name"
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
                  id="first_name"
                  name="first_name"
                  type="text"
                  required
                  autoComplete="given-name"
                  placeholder="Nome"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
            </div>

            {/* Cognome */}
            <div>
              <label
                htmlFor="last_name"
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
                  id="last_name"
                  name="last_name"
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Cognome"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>
            </div>

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
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Almeno 6 caratteri"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-600"
                />
              </div>

              <p className="mt-2 text-xs text-zinc-600">
                La password deve contenere almeno 6 caratteri.
              </p>
            </div>

            {/* Error */}
            <div
              id="register-error"
              className="hidden"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3 text-sm font-semibold transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creazione account..." : "Crea account"}

              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
            <p className="text-sm text-zinc-500">
              Hai già un account?
            </p>

            <Link
              href="/login"
              className="inline-block mt-2 text-sm font-medium text-white hover:text-zinc-300 transition"
            >
              Accedi
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
