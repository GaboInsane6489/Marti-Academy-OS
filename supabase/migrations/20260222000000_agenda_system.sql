-- Migrate: Agenda System (Assignments and Schedules)

-- 1. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
  classroom_id uuid REFERENCES public.classrooms(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  priority int DEFAULT 1, -- 1: Normal, 2: Alta, 3: Crítica
  xp_reward int DEFAULT 20,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Class Schedules Table
CREATE TABLE IF NOT EXISTS public.schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  classroom_id uuid REFERENCES public.classrooms(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES public.profiles(id),
  day_of_week int NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0: Domingo, 1: Lunes...
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Security: Enable RLS
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for Assignments
CREATE POLICY "Students can view assignments for their classroom." ON public.assignments
  FOR SELECT USING (
    classroom_id = (SELECT classroom_id FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins/Docentes can manage assignments." ON public.assignments
  FOR ALL USING (auth.role() = 'authenticated'); -- Simplified for now, filtering by role in future

-- 4. RLS Policies for Schedules
CREATE POLICY "Students can view schedules for their classroom." ON public.schedules
  FOR SELECT USING (
    classroom_id = (SELECT classroom_id FROM public.profiles WHERE id = auth.uid())
  );

CREATE POLICY "Admins/Docentes can manage schedules." ON public.schedules
  FOR ALL USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX idx_assignments_classroom_duedate ON public.assignments(classroom_id, due_date);
CREATE INDEX idx_schedules_classroom_day ON public.schedules(classroom_id, day_of_week);
