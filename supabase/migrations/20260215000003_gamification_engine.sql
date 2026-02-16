-- Migrate: Gamification Engine

-- 1. Student XP & Merits (One record per student)
CREATE TABLE IF NOT EXISTS public.gamification_profiles (
  student_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  xp_total bigint DEFAULT 0,
  merits_balance int DEFAULT 0,
  current_level int DEFAULT 1,
  streak_days int DEFAULT 0,
  last_activity_date date,
  updated_at timestamptz DEFAULT now()
);

-- 2. Badges Catalog
CREATE TABLE IF NOT EXISTS public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  icon_url text,
  criteria_json jsonb,
  created_at timestamptz DEFAULT now()
);

-- 3. Student Badges (Awarded)
CREATE TABLE IF NOT EXISTS public.student_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id uuid REFERENCES public.badges(id) ON DELETE CASCADE,
  awarded_at timestamptz DEFAULT now(),
  UNIQUE(student_id, badge_id)
);

-- Security: Enable RLS
ALTER TABLE public.gamification_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Everyone can view gamification profiles." ON public.gamification_profiles FOR SELECT USING (true);
CREATE POLICY "Badges are public." ON public.badges FOR SELECT USING (true);
CREATE POLICY "Everyone can view student badges." ON public.student_badges FOR SELECT USING (true);

-- Trigger to create gamification profile automatically when a user profile is created
CREATE OR REPLACE FUNCTION public.handle_new_gamification_profile()
RETURNS trigger AS $$
BEGIN
  IF NEW.role = 'estudiante' THEN
    INSERT INTO public.gamification_profiles (student_id)
    VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_profile_created_gamification
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_gamification_profile();
