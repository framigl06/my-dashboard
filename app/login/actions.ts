"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    redirect("/login?error=Inserisci%20email%20e%20password");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/login?error=${encodeURIComponent(
        "Email o password non corretti"
      )}`
    );
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!firstName || !lastName || !email || !password) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        "Compila tutti i campi"
      )}`
    );
  }

  if (password.length < 6) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        "La password deve contenere almeno 6 caratteri"
      )}`
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    redirect(
      `/login?mode=signup&error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  redirect(
    `/login?message=${encodeURIComponent(
      "Account creato! Controlla la tua email per confermare l'account."
    )}`
  );
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}
