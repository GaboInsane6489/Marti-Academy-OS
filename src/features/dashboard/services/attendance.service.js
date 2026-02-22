import { supabase } from "@/config/supabase";

export const attendanceService = {
  /**
   * Obtiene los alumnos de un aula específica
   */
  async getStudentsByClassroom(classroomId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, first_name, avatar_url")
      .eq("classroom_id", classroomId)
      .eq("role", "estudiante");

    if (error) throw error;
    return data;
  },

  /**
   * Obtiene el horario actual y materia para un docente
   */
  async getActiveSubject(teacherId) {
    // Por ahora devolvemos un mock o la primera materia asignada
    const { data, error } = await supabase
      .from("subjects")
      .select("*, classrooms(academic_year_id, section_id)")
      .eq("teacher_id", teacherId)
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Registra una sesión de asistencia y sus registros individuales
   */
  async saveAttendance(subjectId, teacherId, records) {
    // 1. Crear la sesión de asistencia
    const { data: session, error: sessError } = await supabase
      .from("attendance")
      .insert({
        subject_id: subjectId,
        teacher_id: teacherId,
        date: new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (sessError) throw sessError;

    // 2. Crear los registros individuales
    const attendanceRecords = Object.entries(records).map(
      ([studentId, status]) => ({
        attendance_id: session.id,
        student_id: studentId,
        status: status,
      }),
    );

    const { error: recordsError } = await supabase
      .from("attendance_records")
      .insert(attendanceRecords);

    if (recordsError) throw recordsError;

    return session;
  },

  /**
   * Actualiza un registro individual de asistencia (Gestión por excepción)
   */
  async updateAttendanceRecord(attendanceId, studentId, status) {
    const { data, error } = await supabase
      .from("attendance_records")
      .upsert(
        {
          attendance_id: attendanceId,
          student_id: studentId,
          status: status,
        },
        { onConflict: "attendance_id, student_id" },
      )
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Crea o recupera la sesión de asistencia del día para una materia
   */
  async getOrCreateTodaySession(subjectId, teacherId) {
    const today = new Date().toISOString().split("T")[0];

    // Buscar si ya existe
    const { data: existing, error: findError } = await supabase
      .from("attendance")
      .select("id")
      .eq("subject_id", subjectId)
      .eq("date", today)
      .single();

    if (!findError && existing) return existing.id;

    // Si no existe, crearla
    const { data: session, error: createError } = await supabase
      .from("attendance")
      .insert({
        subject_id: subjectId,
        teacher_id: teacherId,
        date: today,
      })
      .select("id")
      .single();

    if (createError) throw createError;
    return session.id;
  },
};
