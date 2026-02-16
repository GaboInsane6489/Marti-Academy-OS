-- Migrate: Leveling & Streaks Logic

-- 1. Function to calculate XP needed for a specific level
-- Formula: XP = level * 100 (Linear for initial phase)
CREATE OR REPLACE FUNCTION public.get_xp_for_level(lvl int)
RETURNS bigint AS $$
BEGIN
  RETURN lvl * 100;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2. Enhanced XP increment with automatic level up
CREATE OR REPLACE FUNCTION public.increment_student_xp(student_id_input uuid, xp_amount int)
RETURNS void AS $$
DECLARE
  current_xp bigint;
  current_lvl int;
  next_lvl_xp bigint;
BEGIN
  -- Get current stats
  SELECT xp_total, current_level INTO current_xp, current_lvl
  FROM public.gamification_profiles
  WHERE student_id = student_id_input;

  -- Increment XP
  current_xp := current_xp + xp_amount;

  -- Check for level up
  LOOP
    next_lvl_xp := public.get_xp_for_level(current_lvl);
    IF current_xp >= next_lvl_xp THEN
      current_lvl := current_lvl + 1;
      -- No restamos el XP, es acumulativo total. 
      -- El nivel se basa en el total histórico.
    ELSE
      EXIT;
    END IF;
  END LOOP;

  -- Update profile
  UPDATE public.gamification_profiles
  SET xp_total = current_xp,
      current_level = current_lvl,
      updated_at = now()
  WHERE student_id = student_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Daily Streak Logic
CREATE OR REPLACE FUNCTION public.check_in_streak(student_id_input uuid)
RETURNS void AS $$
DECLARE
  last_date date;
  current_streak int;
BEGIN
  SELECT last_activity_date, streak_days INTO last_date, current_streak
  FROM public.gamification_profiles
  WHERE student_id = student_id_input;

  IF last_date = current_date THEN
    -- Ya se hizo check-in hoy
    RETURN;
  ELSIF last_date = current_date - 1 THEN
    -- Racha mantenida
    UPDATE public.gamification_profiles
    SET streak_days = streak_days + 1,
        last_activity_date = current_date,
        updated_at = now()
    WHERE student_id = student_id_input;
  ELSE
    -- Racha rota o primera vez
    UPDATE public.gamification_profiles
    SET streak_days = 1,
        last_activity_date = current_date,
        updated_at = now()
    WHERE student_id = student_id_input;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
