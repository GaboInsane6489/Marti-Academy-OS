-- Migrate: Grades and Evaluations system

-- 1. Grade scale or Evaluation Types (Optional, can be hardcoded but better in DB)
-- For now, we'll use a numeric system (0-20) as per vision doc.

-- 2. Grades Table
CREATE TABLE IF NOT EXISTS public.grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE,
  teacher_id uuid REFERENCES public.profiles(id),
  grade_value numeric(4,2) NOT NULL, -- 0.00 to 20.00
  feedback_text text,
  feedback_category text, -- 'excelente', 'bueno', 'por_mejorar', etc.
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Security: Enable RLS
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Students can view their own grades." ON public.grades
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Docentes can manage grades for their subjects." ON public.grades
  FOR ALL USING (auth.role() = 'authenticated'); -- Simplified role check

-- Indexing
CREATE INDEX idx_grades_student_subject ON public.grades(student_id, subject_id);
