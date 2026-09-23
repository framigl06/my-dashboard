"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/login?error=Credenziali%20non%20valide");
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const firstName = String(formData.get("first_name") || "");
  const lastName = String(formData.get("last_name") || "");
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

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
      "/login?error=Registrazione%20non%20riuscita"
    );
  }

  redirect(
    "/login?message=Controlla%20la%20tua%20email%20per%20confermare%20l%27account"
  );
}
