# Personal Dashboard

Dashboard personale pronta per Vercel + Supabase.

## Stack
- Next.js
- TypeScript
- Supabase Auth + PostgreSQL
- Tailwind CSS
- Lucide

## Avvio locale

```bash
npm install
cp .env.example .env.local
npm run dev
```

Apri http://localhost:3000

## Supabase

1. Crea un progetto su Supabase.
2. Vai in SQL Editor.
3. Incolla `supabase/schema.sql` ed eseguilo.
4. Copia URL progetto e anon key in `.env.local`.

## Vercel

Importa il repository GitHub in Vercel e aggiungi:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Poi fai Deploy.

## Prossimi moduli consigliati
- CRUD completo per materie, lezioni e task
- calendario interattivo
- Google Calendar
- grafici finanze
- quick links gestibili dalla UI
- profilo/avatar
- mobile bottom navigation
