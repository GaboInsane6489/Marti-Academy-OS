import { supabase } from "@/config/supabase";

/**
 * Service for managing teacher-specific dashboard data and actions.
 */
export const teacherService = {
  /**
   * Retrieves aggregated stats for the teacher dashboard.
   * @param {string} teacherId - The ID of the teacher.
   */
  async getTeacherStats(teacherId) {
    try {
      // 1. Fetch Active Subjects
      const { count: activeSubjects, error: subjectsError } = await supabase
        .from("subjects")
        .select("*", { count: "exact", head: true })
        .eq("teacher_id", teacherId);

      if (subjectsError) throw subjectsError;

      // 2. Fetch Pending Grades
      // Logical interpretation: Count assignments for teacher's subjects
      // that don't have a corresponding grade for all students in the classroom.
      // For simplicity in this demo, we'll count assignments for the teacher's subjects.
      // In a real scenario, this would query a submissions table.
      const { data: teacherSubjects, error: tSubjectsError } = await supabase
        .from("subjects")
        .select("id")
        .eq("teacher_id", teacherId);

      if (tSubjectsError) throw tSubjectsError;
      const subjectIds = teacherSubjects.map((s) => s.id);

      const { count: pendingGrades, error: assignmentsError } = await supabase
        .from("assignments")
        .select("*", { count: "exact", head: true })
        .in("subject_id", subjectIds);

      if (assignmentsError) throw assignmentsError;

      // 3. Fetch Next Class
      const now = new Date();
      const currentDay = now.getDay();
      const currentTime = now.toLocaleTimeString("en-US", { hour12: false });

      const { data: scheduleData, error: scheduleError } = await supabase
        .from("schedules")
        .select(
          `
          *,
          subject:subjects(name),
          classroom:classrooms(
            academic_year:academic_years(name),
            section:sections(name)
          )
        `,
        )
        .in("subject_id", subjectIds)
        .gte("day_of_week", currentDay)
        .order("day_of_week", { ascending: true })
        .order("start_time", { ascending: true })
        .limit(1);

      if (scheduleError) throw scheduleError;

      return {
        activeSubjects: activeSubjects || 0,
        pendingGrades: pendingGrades || 0,
        nextClass: scheduleData?.[0] || null,
      };
    } catch (error) {
      console.error("Error fetching teacher stats:", error);
      throw error;
    }
  },

  /**
   * Retrieves the student roster for a specific classroom.
   * @param {string} classroomId - The ID of the classroom.
   */
  async getClassroomRoster(classroomId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, first_name, xp_total, current_level, avatar_url")
      .eq("classroom_id", classroomId)
      .eq("role", "estudiante")
      .order("xp_total", { ascending: false });

    if (error) throw error;
    return data;
  },
};
