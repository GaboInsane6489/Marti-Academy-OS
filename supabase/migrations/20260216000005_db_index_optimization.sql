-- =====================================================
-- Database Index Optimization for Martí Academy OS
-- =====================================================
-- Fecha: 2026-02-16
-- Propósito: Mejorar el rendimiento de consultas frecuentes
-- mediante la creación de índices estratégicos en tablas nucleares.

-- =====================================================
-- PROFILES TABLE
-- =====================================================

-- Índice para búsquedas por rol (usado en admin dashboard)
CREATE INDEX IF NOT EXISTS idx_profiles_role 
ON public.profiles(role);

-- Índice para búsquedas por classroom_id (usado en asistencia y reportes)
CREATE INDEX IF NOT EXISTS idx_profiles_classroom 
ON public.profiles(classroom_id) 
WHERE classroom_id IS NOT NULL;

-- Índice compuesto para filtros combinados (rol + aula)
CREATE INDEX IF NOT EXISTS idx_profiles_role_classroom 
ON public.profiles(role, classroom_id);

-- =====================================================
-- ATTENDANCE_RECORDS TABLE
-- =====================================================

-- Índice para consultas por estudiante (historial de asistencia)
CREATE INDEX IF NOT EXISTS idx_attendance_student 
ON public.attendance_records(student_id);

-- Índice para consultas por sesión de asistencia
CREATE INDEX IF NOT EXISTS idx_attendance_session 
ON public.attendance_records(attendance_id);

-- Índice compuesto para reportes por estado
CREATE INDEX IF NOT EXISTS idx_attendance_status 
ON public.attendance_records(status, student_id);

-- =====================================================
-- GRADES TABLE
-- =====================================================

-- Índice para consultas por estudiante (boletín de notas)
CREATE INDEX IF NOT EXISTS idx_grades_student 
ON public.grades(student_id);

-- Índice para consultas por materia (estadísticas de materia)
CREATE INDEX IF NOT EXISTS idx_grades_subject 
ON public.grades(subject_id);

-- =====================================================
-- GAMIFICATION_PROFILES TABLE
-- =====================================================
-- Columnas reales: student_id, xp_total, merits_balance, current_level, streak_days, last_activity_date

-- Índice para ordenamiento por nivel (leaderboards)
CREATE INDEX IF NOT EXISTS idx_gamification_level 
ON public.gamification_profiles(current_level DESC);

-- Índice para ordenamiento por XP total (rankings)
CREATE INDEX IF NOT EXISTS idx_gamification_xp 
ON public.gamification_profiles(xp_total DESC);

-- Índice para consultas por racha activa
CREATE INDEX IF NOT EXISTS idx_gamification_streak 
ON public.gamification_profiles(streak_days DESC) 
WHERE streak_days > 0;

-- =====================================================
-- ACADEMIC_RESOURCES TABLE
-- =====================================================
-- Nota: No existe teacher_id en esta tabla según la migración original

-- Índice para consultas por materia
CREATE INDEX IF NOT EXISTS idx_resources_subject 
ON public.academic_resources(subject_id);

-- Índice para búsquedas por tipo de recurso
CREATE INDEX IF NOT EXISTS idx_resources_type 
ON public.academic_resources(type);

-- =====================================================
-- ANÁLISIS DE RENDIMIENTO
-- =====================================================

-- Para verificar el uso de índices, ejecutar:
-- EXPLAIN ANALYZE SELECT * FROM profiles WHERE role = 'estudiante';
-- EXPLAIN ANALYZE SELECT * FROM attendance_records WHERE student_id = 'uuid' ORDER BY created_at DESC;
-- EXPLAIN ANALYZE SELECT * FROM gamification_profiles ORDER BY xp_total DESC LIMIT 10;
