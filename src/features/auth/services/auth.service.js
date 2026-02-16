import { supabase } from "@/config/supabase";

export const authService = {
  /**
   * Inicia sesión con Google OAuth
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Cierra la sesión actual
   */
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  /**
   * Obtiene la sesión actual
   */
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  /**
   * Obtiene el perfil del usuario actual incluyendo datos de gamificación
   */
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        *,
        gamification_profiles(xp_total, current_level, merits_balance)
      `,
      )
      .eq("id", userId)
      .single();

    if (error) throw error;

    // Aplanar objeto para facilidad de uso
    if (data.gamification_profiles) {
      data.xp_total = data.gamification_profiles.xp_total;
      data.current_level = data.gamification_profiles.current_level;
      data.merits_balance = data.gamification_profiles.merits_balance;
    }

    return data;
  },

  /**
   * Suscribe a cambios en el estado de autenticación
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
