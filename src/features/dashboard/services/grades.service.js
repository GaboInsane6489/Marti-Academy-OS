import { supabase } from "@/config/supabase";

export const gradesService = {
  /**
   * Guarda una calificación para un alumno
   */
  async saveGrade(gradeData) {
    const { data, error } = await supabase
      .from("grades")
      .insert({
        student_id: gradeData.student_id,
        subject_id: gradeData.subject_id,
        grade_value: gradeData.grade_value,
        feedback_text: gradeData.feedback_text,
        teacher_id: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Obtiene las notas recientes de un alumno (para el portal estudiante)
   */
  async getStudentRecentGrades(studentId) {
    const { data, error } = await supabase
      .from("grades")
      .select("*, subjects(name)")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  },
};
