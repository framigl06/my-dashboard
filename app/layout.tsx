import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Personal Dashboard",
  description: "Personal dashboard powered by Next.js and Supabase"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
