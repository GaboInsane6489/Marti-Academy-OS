import { supabase } from "@/config/supabase";

export const resourcesService = {
  /**
   * Obtiene los recursos de una materia
   */
  async getResourcesBySubject(subjectId) {
    const { data, error } = await supabase
      .from("academic_resources")
      .select("*")
      .eq("subject_id", subjectId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Crea un nuevo recurso académico
   */
  async createResource(resourceData) {
    const { data, error } = await supabase
      .from("academic_resources")
      .insert(resourceData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Elimina un recurso
   */
  async deleteResource(resourceId) {
    const { error } = await supabase
      .from("academic_resources")
      .delete()
      .eq("id", resourceId);

    if (error) throw error;
  },

  /**
   * Reclama la recompensa de XP por ver un recurso
   */
  async claimResourceXP(studentId, xpAmount) {
    const { data, error } = await supabase.rpc("increment_student_xp", {
      student_id_input: studentId,
      xp_amount: xpAmount,
    });

    if (error) throw error;
    return data;
  },
};
