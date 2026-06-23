import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

/**
 * Returns a lazily-initialized Supabase Client using backend credentials.
 * Throws a clear error if environmental variables are missing.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    let supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Supabase is not configured yet. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your settings.'
      );
    }

    // Auto-expand raw Project ID if the user didn't enter the full https:// URL
    if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
      supabaseUrl = `https://${supabaseUrl.trim()}.supabase.co`;
    }

    supabaseInstance = createClient(supabaseUrl.trim(), supabaseServiceKey.trim(), {
      auth: {
        persistSession: false,
      },
    });
  }
  return supabaseInstance;
}
