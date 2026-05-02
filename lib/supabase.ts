import { createClient, SupabaseClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { Profile, UserProgress, Lesson, DailyTip } from '@/types/database';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

/** Expo inlines EXPO_PUBLIC_* at build time — placeholder values break auth in production. */
export const AUTH_CONFIG_INCOMPLETE = 'AUTH_CONFIG_INCOMPLETE';

function isUsableSupabaseUrl(url: string): boolean {
  const u = url.trim();
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname;
    if (!host.includes('.')) return false;
    if (/^xxxx\./i.test(host) || host === 'xxxx.supabase.co') return false;
    return true;
  } catch {
    return false;
  }
}

function isUsableSupabaseAnonKey(key: string): boolean {
  const k = key.trim();
  if (k.length < 120) return false;
  if (k.includes('...')) return false;
  return k.startsWith('eyJ');
}

export const isSupabaseConfigured =
  isUsableSupabaseUrl(supabaseUrl) && isUsableSupabaseAnonKey(supabaseAnonKey);

function authStorageKeyForUrl(url: string): string | null {
  try {
    const host = new URL(url.trim()).hostname;
    const ref = host.split('.')[0];
    return ref && ref !== 'xxxx' ? `sb-${ref}-auth-token` : null;
  } catch {
    return null;
  }
}

const storageAdapter = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') {
      try {
        const val = localStorage.getItem(key);
        return val;
      } catch {
        return null;
      }
    }
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, value);
      }
    } catch {}
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      } else {
        localStorage.removeItem(key);
      }
    } catch {}
  },
};

type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: { id?: string; email: string; full_name?: string | null; language?: string; subscription_type?: string; subscription_expires_at?: string | null; avatar_url?: string | null; chronotype?: string | null; quiz_completed?: boolean; session_token?: string | null };
        Update: { email?: string; full_name?: string | null; language?: string; subscription_type?: string; subscription_expires_at?: string | null; avatar_url?: string | null; chronotype?: string | null; quiz_completed?: boolean; session_token?: string | null };
      };
      user_progress: {
        Row: UserProgress;
        Insert: { user_id: string; lesson_id: string; completed?: boolean; completed_at?: string | null; notes?: string | null };
        Update: { completed?: boolean; completed_at?: string | null; notes?: string | null };
      };
      lessons: {
        Row: Lesson;
        Insert: Lesson;
        Update: Partial<Lesson>;
      };
      daily_tips: {
        Row: DailyTip;
        Insert: DailyTip;
        Update: Partial<DailyTip>;
      };
      consent_records: {
        Row: { id: string; user_id: string; consent_type: string; granted: boolean; consent_at: string; policy_version: string; created_at: string };
        Insert: { user_id: string; consent_type: string; granted?: boolean; policy_version?: string };
        Update: { granted?: boolean };
      };
      data_deletion_requests: {
        Row: { id: string; user_id: string; status: string; reason?: string; requested_at: string; completed_at?: string };
        Insert: { user_id: string; status?: string; reason?: string };
        Update: { status?: string };
      };
      data_export_requests: {
        Row: { id: string; user_id: string; status: string; requested_at: string; completed_at?: string };
        Insert: { user_id: string; status?: string };
        Update: { status?: string };
      };
      email_confirmations: {
        Row: any;
        Insert: any;
        Update: any;
      };
      email_tokens: {
        Row: any;
        Insert: any;
        Update: any;
      };
      password_reset_tokens: {
        Row: any;
        Insert: any;
        Update: any;
      };
      gift_codes: {
        Row: any;
        Insert: any;
        Update: any;
      };
      lesson_feedback: {
        Row: any;
        Insert: any;
        Update: any;
      };
      user_roles: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

let supabase: SupabaseClient<Database>;

try {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storage: storageAdapter,
    },
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'INITIAL_SESSION' && !session) {
      const key = authStorageKeyForUrl(supabaseUrl);
      if (key) storageAdapter.removeItem(key);
    }
  });
} catch {
  supabase = createClient<Database>('', '', {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

export { supabase };
