export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  language: 'pt' | 'en';
  subscription_type: 'free' | 'premium' | 'gift';
  subscription_expires_at: string | null;
  avatar_url: string | null;
  chronotype: string | null;
  quiz_completed: boolean;
  created_at: string;
  updated_at: string;
  session_token: string | null;
}

export interface Lesson {
  id: string;
  step_number: number;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  duration_minutes: number | null;
  is_premium: boolean;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface DailyTip {
  id: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  content_pt?: string;
  content_en?: string;
  scientific_source?: string | null;
  category?: 'sleep_hygiene' | 'circadian_rhythm' | 'mental_health' | 'nutrition' | 'exercise' | 'environment';
  is_premium?: boolean;
  step_number?: number;
  created_at: string;
}
