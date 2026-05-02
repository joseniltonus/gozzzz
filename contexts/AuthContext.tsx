import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, AUTH_CONFIG_INCOMPLETE } from '@/lib/supabase';
import { generateToken, setLocalToken, removeLocalToken } from '@/lib/sessionToken';
import { syncQuizCompletionFromServer } from '@/lib/syncQuizCompletion';

interface ConsentData {
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  sessionConflict: boolean;
  clearSessionConflict: () => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, consents: ConsentData, language?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  deleteAccount: (reason?: string) => Promise<{ error: any }>;
  requestDataExport: () => Promise<{ error: any }>;
  updateConsent: (type: 'marketing', granted: boolean) => Promise<{ error: any }>;
  getUserConsents: () => Promise<{ data: any; error: any }>;
  updateChronotype: (chronotype: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const BLOCKED_AUTH_EMAILS = new Set(['suporte@gozzzz.app', 'support@gozzzz.app']);

function isBlockedAuthEmail(email: string): boolean {
  return BLOCKED_AUTH_EMAILS.has(email.trim().toLowerCase());
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionConflict, setSessionConflict] = useState(false);
  const initialLoadDone = useRef(false);

  const clearSessionConflict = () => setSessionConflict(false);

  useEffect(() => {
    let isMounted = true;

    const validateAndInit = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (!isMounted) return;

        initialLoadDone.current = true;
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        setLoading(false);
      } catch {
        if (isMounted) {
          initialLoadDone.current = true;
          setLoading(false);
        }
      }
    };

    validateAndInit();

    let subscription: any = null;
    try {
      const authResult = supabase.auth.onAuthStateChange(async (event, newSession) => {
        if (!isMounted) return;
        try {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          if (!initialLoadDone.current) {
            initialLoadDone.current = true;
            setLoading(false);
          }
          if (
            newSession?.user &&
            (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'USER_UPDATED')
          ) {
            void syncQuizCompletionFromServer(newSession.user);
          }
        } catch {
          if (isMounted && !initialLoadDone.current) {
            initialLoadDone.current = true;
            setLoading(false);
          }
        }
      });
      subscription = authResult?.data?.subscription;
    } catch {
      if (isMounted && !initialLoadDone.current) {
        initialLoadDone.current = true;
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch {
          // silently fail on unsubscribe
        }
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured) {
        return { error: { message: AUTH_CONFIG_INCOMPLETE } as any };
      }
      if (isBlockedAuthEmail(email)) {
        return { error: new Error('This account is not allowed to access the app.') as any };
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error };

      if (data.session) {
        const token = generateToken();
        await setLocalToken(token);
        if (data.session.user) {
          void syncQuizCompletionFromServer(data.session.user);
        }
      }

      return { error: null };
    } catch (err) {
      return { error: err as any };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, consents: ConsentData, language?: string) => {
    try {
      if (!isSupabaseConfigured) {
        return { error: { message: AUTH_CONFIG_INCOMPLETE } as any };
      }
      if (isBlockedAuthEmail(email)) {
        return { error: new Error('This account is not allowed to access the app.') as any };
      }
      const origin = Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.origin : 'https://gozzzz.app';
      const normalizedLanguage = language === 'en' ? 'en' : 'pt';

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${origin}/login`,
          data: {
            full_name: fullName,
            language: normalizedLanguage,
            consent_terms: !!consents?.terms,
            consent_privacy: !!consents?.privacy,
            consent_marketing: !!consents?.marketing,
          },
        },
      });

      if (error) {
        return { error };
      }

      // If auto-confirm is disabled, Supabase returns null session and sends
      // confirmation email. If auto-confirm is enabled, keep behavior graceful.
      if (!data?.session) {
        return { error: null };
      }
      if (data.session.user) {
        void syncQuizCompletionFromServer(data.session.user);
      }
      return { error: null };
    } catch (err) {
      return { error: err as any };
    }
  };

  const signOut = async () => {
    try {
      await removeLocalToken();
      await supabase.auth.signOut();
    } catch {
    }
  };

  const deleteAccount = async (reason?: string) => {
    try {
      if (!user) return { error: new Error('No user logged in') };
      const { error } = await supabase.from('data_deletion_requests').insert({
        user_id: user.id,
        status: 'pending',
        reason: reason || '',
      } as any);
      if (error) return { error };

      await removeLocalToken();
      const signOutError = await supabase.auth.signOut();
      if (signOutError?.error) return { error: signOutError.error };

      return { error: null };
    } catch (err) {
      return { error: err as any };
    }
  };

  const requestDataExport = async () => {
    try {
      if (!user) return { error: new Error('No user logged in') };
      const { error } = await supabase.from('data_export_requests').insert({
        user_id: user.id,
        status: 'pending',
      } as any);
      return { error };
    } catch (err) {
      return { error: err as any };
    }
  };

  const updateConsent = async (type: 'marketing', granted: boolean) => {
    try {
      if (!user) return { error: new Error('No user logged in') };
      const { error } = await supabase.from('consent_records').insert({
        user_id: user.id,
        consent_type: type,
        granted,
        policy_version: '1.0',
      } as any);
      return { error };
    } catch (err) {
      return { error: err as any };
    }
  };

  const getUserConsents = async () => {
    try {
      if (!user) return { data: null, error: new Error('No user logged in') };
      const { data, error } = await supabase
        .from('consent_records')
        .select('*')
        .eq('user_id', user.id)
        .order('consent_at', { ascending: false });
      return { data, error };
    } catch (err) {
      return { data: null, error: err as any };
    }
  };

  const updateChronotype = async (chronotype: string) => {
    try {
      if (!user) return { error: new Error('No user logged in') };
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ chronotype })
        .eq('id', user.id);
      return { error };
    } catch (err) {
      return { error: err as any };
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, sessionConflict, clearSessionConflict, signIn, signUp, signOut, deleteAccount, requestDataExport, updateConsent, getUserConsents, updateChronotype }}>
      {children}
    </AuthContext.Provider>
  );
}

const defaultAuthContext: AuthContextType = {
  session: null,
  user: null,
  loading: false,
  sessionConflict: false,
  clearSessionConflict: () => {},
  signIn: async () => ({ error: new Error('AuthProvider not mounted') }),
  signUp: async (_e, _p, _n, _c, _l) => ({ error: new Error('AuthProvider not mounted') }),
  signOut: async () => {},
  deleteAccount: async () => ({ error: new Error('AuthProvider not mounted') }),
  requestDataExport: async () => ({ error: new Error('AuthProvider not mounted') }),
  updateConsent: async () => ({ error: new Error('AuthProvider not mounted') }),
  getUserConsents: async () => ({ data: null, error: new Error('AuthProvider not mounted') }),
  updateChronotype: async () => ({ error: new Error('AuthProvider not mounted') }),
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context ?? defaultAuthContext;
}
