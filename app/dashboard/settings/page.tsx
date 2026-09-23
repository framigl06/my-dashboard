"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Mail,
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Profile = {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

export default function SettingsPage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Impossibile recuperare l'utente.");
      setLoading(false);
      return;
    }

    setEmail(user.email ?? "");

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, first_name, last_name, avatar_url")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      setError("Impossibile recuperare il profilo.");
      setLoading(false);
      return;
    }

    if (data) {
      setProfile(data);

      setFirstName(data.first_name ?? "");
      setLastName(data.last_name ?? "");
      setUsername(data.username ?? "");
    } else {
      // Fallback nel caso il profilo non esista ancora.
      const metadata = user.user_metadata;

      setFirstName(metadata?.first_name ?? "");
      setLastName(metadata?.last_name ?? "");
      setUsername(user.email?.split("@")[0] ?? "");
    }

    setLoading(false);
  }

  async function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Sessione utente non valida.");
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          username: username.trim(),
        },
        {
          onConflict: "id",
        }
      );

    if (updateError) {
      setError(
        updateError.message || "Impossibile salvare il profilo."
      );
      setSaving(false);
      return;
    }

    // Manteniamo aggiornati anche i metadata dell'utente Auth.
    const { error: metadataError } = await supabase.auth.updateUser({
      data: {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      },
    });

    if (metadataError) {
      console.warn(
        "Profilo salvato, ma metadata Auth non aggiornati:",
        metadataError
      );
    }

    setProfile((current) =>
      current
        ? {
            ...current,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            username: username.trim(),
          }
        : current
    );

    setMessage("Profilo aggiornato correttamente.");
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="max-w-3xl">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-sm text-zinc-500">
            Caricamento profilo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Profilo
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Gestisci le informazioni del tuo account.
        </p>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800">
            <User size={24} className="text-zinc-300" />
          </div>

          <div>
            <h2 className="text-lg font-medium text-white">
              Informazioni personali
            </h2>

            <p className="text-sm text-zinc-500">
              Queste informazioni vengono utilizzate nel dashboard.
            </p>
          </div>
        </div>

        <form onSubmit={saveProfile} className="space-y-5">
          {/* Nome + Cognome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="profile-first-name"
                className="mb-2 block text-sm text-zinc-300"
              >
                Nome
              </label>

              <input
                id="profile-first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                placeholder="Nome"
              />
            </div>

            <div>
              <label
                htmlFor="profile-last-name"
                className="mb-2 block text-sm text-zinc-300"
              >
                Cognome
              </label>

              <input
                id="profile-last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                placeholder="Cognome"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="profile-username"
              className="mb-2 block text-sm text-zinc-300"
            >
              Username
            </label>

            <div className="relative">
              <User
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                id="profile-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                placeholder="username"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="profile-email"
              className="mb-2 block text-sm text-zinc-300"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                id="profile-email"
                type="email"
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-sm text-zinc-500"
              />
            </div>

            <p className="mt-2 text-xs text-zinc-600">
              L'indirizzo email dell'account non può essere modificato da
              questa sezione.
            </p>
          </div>

          {/* Messages */}
          {message && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-400">
              <CheckCircle2 size={17} />
              {message}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              <AlertCircle size={17} />
              {error}
            </div>
          )}

          {/* Save */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />

              {saving ? "Salvataggio..." : "Salva modifiche"}
            </button>
          </div>
        </form>
      </div>

      {/* Account information */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <h2 className="text-lg font-medium text-white">
          Account
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Informazioni tecniche relative al tuo account.
        </p>

        <div className="mt-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <div className="text-xs text-zinc-500 mb-1">
            ID utente
          </div>

          <div className="font-mono text-xs text-zinc-400 break-all">
            {profile?.id}
          </div>
        </div>
      </div>
    </div>
  );
}
