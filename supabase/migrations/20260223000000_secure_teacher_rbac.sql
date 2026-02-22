-- Migrate: Secure Teacher RBAC (The Great Wall)

-- 1. Eliminar políticas excesivamente permisivas
DROP POLICY IF EXISTS "Admins/Docentes can manage assignments." ON public.assignments;
DROP POLICY IF EXISTS "Admins/Docentes can manage schedules." ON public.schedules;
DROP POLICY IF EXISTS "Students can view assignments for their classroom." ON public.assignments;
DROP POLICY IF EXISTS "Students can view schedules for their classroom." ON public.schedules;

-- 2. Nuevas Políticas para ASSIGNMENTS
-- Estudiantes: Solo ver tareas de su aula
CREATE POLICY "Students can view classroom assignments." ON public.assignments
  FOR SELECT USING (
    classroom_id = (SELECT classroom_id FROM public.profiles WHERE id = auth.uid())
  );

-- Docentes: Gestionar solo tareas de sus propias materias
CREATE POLICY "Teachers can manage their own assignments." ON public.assignments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.subjects 
      WHERE subjects.id = assignments.subject_id 
      AND subjects.teacher_id = auth.uid()
    )
  );

-- Admins: Control total
CREATE POLICY "Admins have full control on assignments." ON public.assignments
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- 3. Nuevas Políticas para SCHEDULES
-- Estudiantes: Solo ver horarios de su aula
CREATE POLICY "Students can view classroom schedules." ON public.schedules
  FOR SELECT USING (
    classroom_id = (SELECT classroom_id FROM public.profiles WHERE id = auth.uid())
  );

-- Docentes: Gestionar solo sus propios horarios
CREATE POLICY "Teachers can manage their own schedules." ON public.schedules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.subjects 
      WHERE subjects.id = schedules.subject_id 
      AND subjects.teacher_id = auth.uid()
    )
  );

-- Admins: Control total
CREATE POLICY "Admins have full control on schedules." ON public.schedules
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );
