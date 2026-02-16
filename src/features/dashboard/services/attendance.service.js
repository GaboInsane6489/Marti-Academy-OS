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
};
