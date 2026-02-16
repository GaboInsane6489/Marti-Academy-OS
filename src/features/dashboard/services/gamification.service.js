import { supabase } from "@/config/supabase";

export const gamificationService = {
  /**
   * Realiza el check-in diario para la racha
   */
  async checkInStreak(studentId) {
    const { error } = await supabase.rpc("check_in_streak", {
      student_id_input: studentId,
    });
    if (error) throw error;
  },

  /**
   * Obtiene la lista de insignias (badges) disponibles y ganadas
   */
  async getStoreBadges(studentId) {
    // 1. Obtener todas las insignias del catálogo
    const { data: allBadges, error: catalogError } = await supabase
      .from("badges")
      .select("*");

    if (catalogError) throw catalogError;

    // 2. Obtener las insignias ganadas por el alumno
    const { data: earnedBadges, error: earnedError } = await supabase
      .from("student_badges")
      .select("badge_id")
      .eq("student_id", studentId);

    if (earnedError) throw earnedError;

    const earnedIds = new Set(earnedBadges.map((b) => b.badge_id));

    // Marcar como ganadas
    return allBadges.map((badge) => ({
      ...badge,
      isEarned: earnedIds.has(badge.id),
    }));
  },

  /**
   * Calcula el progreso del nivel actual
   * XP total -> Lvl actual, XP acumulado en este nivel, XP total necesario para el siguiente nivel.
   */
  calculateLevelProgress(xpTotal, currentLevel) {
    // Según SQL: XP para nivel L es L * 100
    // El XP base del nivel actual es (L-1)*100
    const currentLvlXPBase = (currentLevel - 1) * 100;
    const nextLvlXPThreshold = currentLevel * 100;

    const xpInThisLevel = Math.max(0, xpTotal - currentLvlXPBase);
    const xpNeededForLevel = nextLvlXPThreshold - currentLvlXPBase;

    const percentage = Math.min(100, (xpInThisLevel / xpNeededForLevel) * 100);

    return {
      currentXP: xpInThisLevel,
      requiredXP: xpNeededForLevel,
      percentage: Math.round(percentage),
    };
  },
};
