import { supabase } from "@/config/supabase";

export const adminService = {
  /**
   * Obtiene todos los estudiantes pendientes de aprobación (sin classroom_id asignado)
   */
  async getPendingStudents() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "estudiante")
      .is("classroom_id", null)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Aprueba un estudiante asignándolo a un aula específica
   */
  async approveStudent(studentId, classroomId) {
    const { error } = await supabase
      .from("profiles")
      .update({ classroom_id: classroomId })
      .eq("id", studentId);

    if (error) throw error;
  },

  /**
   * Obtiene todas las aulas disponibles para asignación
   */
  async getClassrooms() {
    const { data, error } = await supabase
      .from("classrooms")
      .select(
        `
        *,
        academic_years(name),
        sections(name)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Crea un nuevo docente con contraseña temporal
   */
  async createTeacher(email, fullName, temporaryPassword) {
    // Este endpoint requeriría una función de Supabase Edge Function
    // o un endpoint de API personalizado para crear usuarios con contraseña
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: temporaryPassword,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role: "docente",
      },
    });

    if (error) throw error;

    // Crear perfil asociado
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      email,
      full_name: fullName,
      role: "docente",
    });

    if (profileError) throw profileError;
    return data;
  },

  /**
   * Obtiene todos los docentes
   */
  async getTeachers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "docente")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};
