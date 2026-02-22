"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { gamificationService } from "@/features/dashboard/services/gamification.service";
import { supabase } from "@/config/supabase";

/**
 * Hook semántico para centralizar los datos del estudiante en el Dashboard.
 * Gestiona estadísticas de gamificación, medallas y conteo de cursos.
 */
export const useStudentData = () => {
  const { profile, loading: authLoading } = useSession();

  const [data, setData] = useState({
    stats: {
      xp_total: 0,
      current_level: 1,
      streak_days: 0,
      merits_balance: 0,
      coursesCount: 0,
    },
    badges: [],
    loading: true,
    error: null,
  });

  const loadStudentDashboardData = useCallback(async () => {
    if (!profile?.id) return;

    try {
      // 1. Fetch de Medallas
      const allBadges = await gamificationService.getStoreBadges(profile.id);
      const earnedBadges = allBadges.filter((b) => b.isEarned);

      // 2. Fetch de Conteo de Cursos (Subjects)
      // Se basa en el classroom_id del perfil del estudiante
      const { count, error: subjectsError } = await supabase
        .from("subjects")
        .select("*", { count: "exact", head: true })
        .eq("classroom_id", profile.classroom_id);

      if (subjectsError) {
        console.error("⚠️ Error fetching subjects count:", subjectsError);
        // No bloqueamos todo el dashboard si fallan solo los cursos
      }

      setData((prev) => ({
        ...prev,
        stats: {
          xp_total: profile.xp_total || 0,
          current_level: profile.current_level || 1,
          streak_days: profile.streak_days || 0,
          merits_balance: profile.merits_balance || 0,
          coursesCount: count || 0,
        },
        badges: earnedBadges,
        loading: false,
        error: null,
      }));
    } catch (err) {
      console.error("❌ Error critical in useStudentData:", err);
      setData((prev) => ({
        ...prev,
        loading: false,
        error: "No se pudo sincronizar el ADN del estudiante",
      }));
    }
  }, [profile]);

  useEffect(() => {
    if (!authLoading && profile) {
      loadStudentDashboardData();
    } else if (!authLoading && !profile) {
      setData((prev) => ({ ...prev, loading: false }));
    }
  }, [authLoading, profile, loadStudentDashboardData]);

  return { ...data, profile };
};
