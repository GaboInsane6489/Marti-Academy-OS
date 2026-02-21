-- =====================================================
-- SEED: Estructura Académica y Materias de Deglis García
-- =====================================================
-- Propósito:
-- 1. Crear todas las Aulas (Classrooms) combinando Años y Secciones.
-- 2. Asignar las materias de Historia, Geografía y Proyecto a Deglis García.

-- =====================================================
-- 1. Generar Aulas (Classrooms)
-- =====================================================
-- Crea combinaciones de todos los años con todas las secciones (ej: 1ro A, 1ro B, etc.)

INSERT INTO public.classrooms (academic_year_id, section_id)
SELECT y.id, s.id
FROM public.academic_years y
CROSS JOIN public.sections s
ON CONFLICT (academic_year_id, section_id) DO NOTHING;

-- =====================================================
-- 2. Asignar Materias a Deglis García
-- =====================================================

DO $$
DECLARE
  teacher_id_var uuid;
  year_1 uuid; year_2 uuid; year_3 uuid; year_4 uuid; year_5 uuid;
  sec_a uuid; sec_b uuid;
BEGIN
  -- Obtener ID de Deglis
  SELECT id INTO teacher_id_var FROM public.profiles WHERE full_name = 'Deglis García' LIMIT 1;

  -- Si no existe el usuario, salir
  IF teacher_id_var IS NULL THEN
    RAISE NOTICE 'Usuario Deglis García no encontrado. No se asignaron materias.';
    RETURN;
  END IF;

  -- Obtener IDs de Años
  SELECT id INTO year_1 FROM public.academic_years WHERE name = '1ro';
  SELECT id INTO year_2 FROM public.academic_years WHERE name = '2do';
  SELECT id INTO year_3 FROM public.academic_years WHERE name = '3ro';
  SELECT id INTO year_4 FROM public.academic_years WHERE name = '4to';
  SELECT id INTO year_5 FROM public.academic_years WHERE name = '5to';

  -- Obtener IDs de Secciones
  SELECT id INTO sec_a FROM public.sections WHERE name = 'A';
  SELECT id INTO sec_b FROM public.sections WHERE name = 'B';

  -- -----------------------------------------------------
  -- Historia (1ro a 5to, A y B)
  -- -----------------------------------------------------
  INSERT INTO public.subjects (name, description, classroom_id, teacher_id)
  SELECT 'Historia', 'Historia Universal y de Venezuela', c.id, teacher_id_var
  FROM public.classrooms c
  WHERE c.academic_year_id IN (year_1, year_2, year_3, year_4, year_5)
  AND c.section_id IN (sec_a, sec_b)
  AND NOT EXISTS (
    SELECT 1 FROM public.subjects s 
    WHERE s.classroom_id = c.id AND s.name = 'Historia'
  );

  -- -----------------------------------------------------
  -- Geografía (1ro a 5to, A y B)
  -- -----------------------------------------------------
  INSERT INTO public.subjects (name, description, classroom_id, teacher_id)
  SELECT 'Geografía', 'Geografía General', c.id, teacher_id_var
  FROM public.classrooms c
  WHERE c.academic_year_id IN (year_1, year_2, year_3, year_4, year_5)
  AND c.section_id IN (sec_a, sec_b)
  AND NOT EXISTS (
    SELECT 1 FROM public.subjects s 
    WHERE s.classroom_id = c.id AND s.name = 'Geografía'
  );

  -- -----------------------------------------------------
  -- Proyecto (Solo 5to, A y B)
  -- -----------------------------------------------------
  INSERT INTO public.subjects (name, description, classroom_id, teacher_id)
  SELECT 'Proyecto', 'Proyecto de Investigación', c.id, teacher_id_var
  FROM public.classrooms c
  WHERE c.academic_year_id = year_5
  AND c.section_id IN (sec_a, sec_b)
  AND NOT EXISTS (
    SELECT 1 FROM public.subjects s 
    WHERE s.classroom_id = c.id AND s.name = 'Proyecto'
  );

  RAISE NOTICE 'Materias asignadas correctamente a Deglis García.';
END $$;
