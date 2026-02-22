"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { gamificationService } from "@/features/dashboard/services/gamification.service";
import { supabase } from "@/config/supabase";
import { agendaService } from "@/features/dashboard/services/agenda.service";

/**
 * @typedef {Object} StudentStats
 * @property {number} xp_total - Total historical XP
 * @property {number} current_level - Current academic level
 * @property {number} streak_days - Current consecutive activity days
 * @property {number} merits_balance - Current currency/merits balance
 * @property {number} coursesCount - Count of subjects in student's classroom
 *
 * @typedef {Object} UseStudentDataReturn
 * @property {StudentStats} stats - Aggregated student statistics
 * @property {Array} badges - List of earned badges
 * @property {Array} subjects - List of enrolled subjects with teacher info
 * @property {Array} activities - Top 3 upcoming activities (assignments/classes)
 * @property {boolean} loading - Loading state
 for gamification and courses data
 * @property {string|null} error - Error message if sync fails
 * @property {Object|null} profile - The raw auth profile object
 */

/**
 * Hook semántico para centralizar los datos del estudiante en el Dashboard.
 * Gestiona estadísticas de gamificación, medallas y conteo de cursos.
 *
 * @returns {UseStudentDataReturn}
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
    courses: [],
    activities: [],
    loading: true,
    error: null,
  });

  const profileId = profile?.id;
  const classroomId = profile?.classroom_id;

  const loadStudentDashboardData = useCallback(async () => {
    if (!profileId) return;

    try {
      // 1. Fetch de Medallas
      const allBadges = await gamificationService.getStoreBadges(profileId);
      const studentBadges = allBadges.filter((b) => b.isEarned);

      // 2. Fetch de Materias (Subjects) con información del docente
      const { data: subjectsData, error: subjectsError } = await supabase
        .from("subjects")
        .select(
          `
          *,
          teacher:profiles(full_name, first_name)
        `,
        )
        .eq("classroom_id", classroomId);

      if (subjectsError) {
        console.error("⚠️ Error fetching subjects:", subjectsError);
      }

      // 3. Fetch Agenda Data
      const [assignments, schedules] = await Promise.all([
        agendaService.getUpcomingAssignments(profile.classroom_id),
        agendaService.getSchedules(profile.classroom_id),
      ]);

      // Orchestrate "Top 3" Upcoming Activities
      const today = new Date();
      const currentDay = today.getDay(); // 0-6

      // Filter next 3 classes for today/tomorrow
      const upcomingClasses = schedules
        .filter((s) => s.day_of_week >= currentDay)
        .slice(0, 3)
        .map((s) => ({
          id: s.id,
          title: `Clase: ${s.subject?.name}`,
          type: "link",
          date: `Día ${s.day_of_week} - ${s.start_time.slice(0, 5)}`,
          priority: 1,
          category: "clase",
        }));

      const upcomingAssignments = assignments.map((a) => ({
        id: a.id,
        title: a.title,
        type: "assignment",
        date: new Date(a.due_date).toLocaleDateString(),
        priority: a.priority,
        category: "tarea",
      }));

      // Combine and take top 3
      const activities = [...upcomingAssignments, ...upcomingClasses]
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 3);

      setData((prev) => ({
        ...prev,
        stats: {
          xp_total: profile.xp_total || 0,
          current_level: profile.current_level || 1,
          streak_days: profile.streak_days || 0,
          merits_balance: profile.merits_balance || 0,
          coursesCount: subjectsData?.length || 0,
        },
        badges: studentBadges,
        courses: subjectsData || [],
        activities,
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
  }, [profileId, classroomId, profile]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!authLoading && profileId) {
        await loadStudentDashboardData();
      } else if (!authLoading && !profileId) {
        if (isMounted) {
          setData((prev) => ({ ...prev, loading: false }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [authLoading, profileId, loadStudentDashboardData]);

  return { ...data, profile };
};
