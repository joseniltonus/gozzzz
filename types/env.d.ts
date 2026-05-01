declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_SUPABASE_URL: string;
      EXPO_PUBLIC_SUPABASE_ANON_KEY: string;
      EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
      /** Comma-separated; empty disables client-side email allowlist override. */
      EXPO_PUBLIC_PROGRAM_ACCESS_EMAILS?: string;
    }
  }
}

export {};
