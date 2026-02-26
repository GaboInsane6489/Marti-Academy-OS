-- Migrate: The Grade-to-Gold Engine (Delta 2.0)
-- Descripción: Convierte calificaciones (0-20) en poder adquisitivo (merits_balance).
-- Idempotencia: Calcula la diferencia exacta si la nota es actualizada.

-- 1. Función Auxiliar: Calcula los méritos en base a la escala
CREATE OR REPLACE FUNCTION public.calculate_grade_merits(grade numeric)
RETURNS int AS $$
DECLARE
    merits int;
BEGIN
    IF grade >= 18 THEN
        merits := ROUND(grade * 3);
    ELSIF grade >= 14 THEN
        merits := ROUND(grade * 2);
    ELSE
        merits := ROUND(grade * 1);
    END IF;
    RETURN merits;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2. Función del Trigger: Evalúa y transfiere los méritos
CREATE OR REPLACE FUNCTION public.handle_grade_merits_reward()
RETURNS TRIGGER AS $$
DECLARE
    new_merits int;
    old_merits int := 0;
    merit_diff int;
BEGIN
    -- Determinar los méritos de la nota entrante
    new_merits := public.calculate_grade_merits(NEW.grade_value);

    -- Si es una corrección (UPDATE), calcular lo que ya se había entregado
    IF TG_OP = 'UPDATE' THEN
        old_merits := public.calculate_grade_merits(OLD.grade_value);
    END IF;

    -- Calcular la diferencia estricta
    merit_diff := new_merits - old_merits;

    -- Solo impactar la DB si hay una diferencia real
    IF merit_diff != 0 THEN
        UPDATE public.gamification_profiles
        SET merits_balance = merits_balance + merit_diff,
            updated_at = now()
        WHERE student_id = NEW.student_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Asignación del Trigger a la tabla 'grades'
DROP TRIGGER IF EXISTS tr_grade_merits_reward ON public.grades;
CREATE TRIGGER tr_grade_merits_reward
    AFTER INSERT OR UPDATE OF grade_value ON public.grades
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_grade_merits_reward();
