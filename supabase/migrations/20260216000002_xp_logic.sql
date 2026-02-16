-- Migrate: XP Increment Function

CREATE OR REPLACE FUNCTION public.increment_student_xp(student_id_input uuid, xp_amount int)
RETURNS void AS $$
BEGIN
  UPDATE public.gamification_profiles
  SET xp_total = xp_total + xp_amount,
      updated_at = now()
  WHERE student_id = student_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
