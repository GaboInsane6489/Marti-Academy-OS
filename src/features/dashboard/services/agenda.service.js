import { supabase } from "@/config/supabase";

/**
 * Servicio para la gestión de la agenda académica (tareas y horarios).
 */
export const agendaService = {
  /**
   * Obtiene las tareas próximas para un aula específica.
   * Filtra por fecha de entrega >= ahora.
   * @param {string} classroomId - ID del aula.
   */
  async getUpcomingAssignments(classroomId) {
    const { data, error } = await supabase
      .from("assignments")
      .select(
        `
        *,
        subject:subjects(name)
      `,
      )
      .eq("classroom_id", classroomId)
      .gte("due_date", new Date().toISOString())
      .order("due_date", { ascending: true })
      .limit(5);

    if (error) throw error;
    return data;
  },

  /**
   * Obtiene el horario de clases semanal del aula.
   * @param {string} classroomId - ID del aula.
   */
  async getSchedules(classroomId) {
    const { data, error } = await supabase
      .from("schedules")
      .select(
        `
        *,
        subject:subjects(name)
      `,
      )
      .eq("classroom_id", classroomId)
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) throw error;
    return data;
  },
};
