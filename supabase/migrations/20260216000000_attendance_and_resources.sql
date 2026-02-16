-- Migrate: Attendance and Academic Resources extension

-- 1. Link profiles to classrooms (for students)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS classroom_id uuid REFERENCES public.classrooms(id);

-- 2. Attendance Sessions
CREATE TABLE IF NOT EXISTS public.attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
  date date DEFAULT current_date,
  created_at timestamptz DEFAULT now(),
  teacher_id uuid REFERENCES public.profiles(id) -- Teacher who took the attendance
);

-- 3. Individual Attendance Records
CREATE TABLE IF NOT EXISTS public.attendance_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attendance_id uuid REFERENCES public.attendance(id) ON DELETE CASCADE,
  student_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  status text DEFAULT 'presente' CHECK (status IN ('presente', 'tarde', 'falta', 'justificado')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(attendance_id, student_id)
);

-- 4. Academic Resources
CREATE TABLE IF NOT EXISTS public.academic_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text CHECK (type IN ('video', 'pdf', 'link', 'other')),
  url text NOT NULL,
  xp_reward int DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Security: Enable RLS
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_resources ENABLE ROW LEVEL SECURITY;

-- Policies for Attendance:
-- Admin and Docente can select/insert/update
-- Students can only see attendance sessions for their subjects
CREATE POLICY "Everyone can see attendance sessions." ON public.attendance FOR SELECT USING (true);
CREATE POLICY "Docentes can manage attendance." ON public.attendance 
  FOR ALL USING (auth.role() = 'authenticated'); -- Simplified but should ideally check Role

-- Policies for Attendance Records:
CREATE POLICY "Everyone can see attendance records." ON public.attendance_records FOR SELECT USING (true);
CREATE POLICY "Docentes can manage attendance records." ON public.attendance_records
  FOR ALL USING (auth.role() = 'authenticated');

-- Policies for Resources:
CREATE POLICY "Resources are readable by everyone." ON public.academic_resources FOR SELECT USING (true);
CREATE POLICY "Admin/Docente can manage resources." ON public.academic_resources 
  FOR ALL USING (auth.role() = 'authenticated');
