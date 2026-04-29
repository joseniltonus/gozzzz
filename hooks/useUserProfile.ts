import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useFocusEffect } from 'expo-router';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  chronotype: string;
  language: string;
  subscription_type: string;
  avatar_url: string | null;
  quiz_completed: boolean;
  quiz_progress: number | null;
  quiz_completed_at?: string | null;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const hasFetchedRef = useRef(false);

  const refetchProfile = useCallback(() => {
    console.log('[PROFILE:MANUAL_REFETCH] triggered');
    setRefreshKey((prev) => prev + 1);
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('[PROFILE:FOCUS] Screen focused - fresh fetch');
      setRefreshKey((prev) => prev + 1);
    }, [])
  );

  useEffect(() => {
    if (!user) {
      console.log('[PROFILE:EFFECT] No user, clearing profile');
      setProfile(null);
      setLoading(false);
      setHasFetched(false);
      hasFetchedRef.current = false;
      return;
    }

    let isMounted = true;
    let fetchAttempt = 0;

    const fetchProfile = async () => {
      if (!isMounted) return;

      fetchAttempt++;
      try {
        setLoading(true);
        console.log('[PROFILE:FETCH] attempt:', fetchAttempt, 'user:', user.id);

        const { data, error: err } = await supabase
          .from('profiles')
          .select('id, email, full_name, chronotype, language, subscription_type, avatar_url, quiz_completed, quiz_progress, quiz_completed_at')
          .eq('id', user.id)
          .maybeSingle();

        if (!isMounted) return;

        if (err) {
          console.error('[PROFILE:FETCH:ERROR]', err.message);
          throw err;
        }

        if (data) {
          const typedData = data as UserProfile;
          console.log('[PROFILE:FETCH:SUCCESS] quiz_completed:', typedData.quiz_completed);
          setProfile(typedData);
        } else {
          console.log('[PROFILE:FETCH:NO_DATA] New user - no profile yet');
          setProfile(null);
        }

        setError(null);
        hasFetchedRef.current = true;
      } catch (err) {
        if (isMounted) {
          console.error('[PROFILE:FETCH:EXCEPTION]', err);
          setError(err);
          setProfile(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user, refreshKey]);

  return { profile, loading, hasFetched, error, refetchProfile };
}
