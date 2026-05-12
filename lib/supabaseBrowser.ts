import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

/** Browser Supabase client when env is set; otherwise null (assessment still works, persistence skipped). */
export const supabaseBrowser: SupabaseClient | null =
  url && anon ? createClient(url, anon) : null
