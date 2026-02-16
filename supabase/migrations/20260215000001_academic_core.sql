-- Migrate: Academic Core Structure

-- 1. Academic Years (1ro to 5to)
CREATE TABLE IF NOT EXISTS public.academic_years (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE, -- '1ro', '2do', etc.
  created_at timestamptz DEFAULT now()
);

-- 2. Sections (A, B)
CREATE TABLE IF NOT EXISTS public.sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE, -- 'A', 'B'
  created_at timestamptz DEFAULT now()
);

-- 3. Classrooms (Year + Section join)
CREATE TABLE IF NOT EXISTS public.classrooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  academic_year_id uuid REFERENCES public.academic_years(id) ON DELETE CASCADE,
  section_id uuid REFERENCES public.sections(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(academic_year_id, section_id)
);

-- 4. Subjects
CREATE TABLE IF NOT EXISTS public.subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  classroom_id uuid REFERENCES public.classrooms(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES public.profiles(id), -- Assigned teacher
  created_at timestamptz DEFAULT now()
);

-- Security: Enable RLS
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Security: Basic Read Policies (Readable by all authenticated users)
CREATE POLICY "Academic years are readable by everyone." ON public.academic_years FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Sections are readable by everyone." ON public.sections FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Classrooms are readable by everyone." ON public.classrooms FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Subjects are readable by everyone." ON public.subjects FOR SELECT USING (auth.role() = 'authenticated');

-- Seed Data (Optional but recommended for setup)
INSERT INTO public.academic_years (name) VALUES ('1ro'), ('2do'), ('3ro'), ('4to'), ('5to') ON CONFLICT DO NOTHING;
INSERT INTO public.sections (name) VALUES ('A'), ('B') ON CONFLICT DO NOTHING;
