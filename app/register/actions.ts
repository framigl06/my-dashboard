"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const firstName = String(
    formData.get("first_name") || ""
  ).trim();

  const lastName = String(
    formData.get("last_name") || ""
  ).trim();

  const email = String(
    formData.get("email") || ""
  ).trim();

  const password = String(
    formData.get("password") || ""
  );

  if (!firstName || !lastName || !email || !password) {
    redirect(
      `/register?error=${encodeURIComponent(
        "Compila tutti i campi."
      )}`
    );
  }

  if (password.length < 6) {
    redirect(
      `/register?error=${encodeURIComponent(
        "La password deve contenere almeno 6 caratteri."
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
      `/register?error=${encodeURIComponent(
        error.message
      )}`
    );
  }

  redirect("/login?registered=1");
}
