"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { teacherService } from "@/features/dashboard/services/teacher.service";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  AlertCircle,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import QuickAttendance from "@/features/dashboard/components/QuickAttendance";

export default function DocenteDashboard() {
  const { profile } = useSession();
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classrooms, setClassrooms] = useState([]);
  const [stats, setStats] = useState({
    activeSubjects: 0,
    pendingGrades: 0,
    nextClass: null,
  });

  useEffect(() => {
    async function loadDashboardData() {
      if (!profile?.id) return;
      try {
        setLoading(true);
        const [statsData, classroomsData] = await Promise.all([
          teacherService.getTeacherStats(profile.id, selectedClass),
          teacherService.getTeacherClassrooms(profile.id),
        ]);
        setStats(statsData);
        setClassrooms(classroomsData);
      } catch (error) {
        console.error("Error loading teacher dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, [profile?.id, selectedClass]);

  if (loading && !selectedClass) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif">
            Panel de <span className="text-blue-400 italic">Control</span>
          </h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            <GraduationCap className="h-3 w-3" />
            {selectedClass ? "Modo Aula Activo" : "Gestión Académica"} • Prof.{" "}
            {profile?.full_name}
          </p>
        </div>

        {selectedClass && (
          <button
            onClick={() => setSelectedClass(null)}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 animate-in slide-in-from-right-4"
          >
            <AlertCircle className="h-3 w-3 rotate-45" />
            Limpiar Filtro
          </button>
        )}
      </section>

      {/* Bento Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SLOT 1: Estado de la Clase Actual (2/3) */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-2xl relative overflow-hidden group hover:bg-white/10 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                  Próxima Sesión
                </span>
                <h2 className="text-3xl font-serif mt-2">
                  {stats.nextClass?.subject?.name || "Sin clases programadas"}
                </h2>
                <p className="text-sm text-zinc-400 font-light italic">
                  {stats.nextClass?.classroom?.academic_year?.name}{" "}
                  {stats.nextClass?.classroom?.section?.name} •{" "}
                  {stats.nextClass?.start_time}
                </p>
              </div>
              <div className="h-16 w-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-tighter">
                  Tiempo Restante
                </span>
                <span className="text-2xl font-mono text-white">00:45:00</span>
              </div>
              <Link
                href="/dashboard/docente/asistencia"
                className="ml-auto px-6 py-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-500/10"
              >
                Tomar Asistencia
              </Link>
            </div>
          </div>
        </div>

        {/* SLOT 2: Métricas o QuickAttendance (1/3) */}
        <div className="space-y-6">
          {selectedClass ? (
            <div className="h-full bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-500">
              <QuickAttendance
                classroomId={selectedClass}
                teacherId={profile?.id}
                subjectId={stats.nextClass?.subject_id}
              />
            </div>
          ) : (
            <>
              <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-2xl group hover:bg-white/10 transition-all">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">
                  Materias Activas
                </h3>
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-serif text-white">
                    {stats.activeSubjects}
                  </span>
                  <BookOpen className="h-5 w-5 text-blue-400 mb-2 opacity-50" />
                </div>
              </div>

              <div
                className={`bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-2xl group hover:bg-white/10 transition-all ${stats.pendingGrades > 0 ? "border-orange-500/30" : ""}`}
              >
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                  Tareas Pendientes
                  {stats.pendingGrades > 0 && (
                    <AlertCircle className="h-3 w-3 text-orange-400 animate-pulse" />
                  )}
                </h3>
                <div className="flex items-end gap-3">
                  <span
                    className={`text-4xl font-serif ${stats.pendingGrades > 0 ? "text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.3)]" : "text-white"}`}
                  >
                    {stats.pendingGrades}
                  </span>
                  <ChevronRight className="h-5 w-5 text-zinc-600 mb-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* SLOT 3: Acceso Rápido a Grupos (Full Width) */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-serif italic text-zinc-400 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mis Aulas Asignadas
            </h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {classrooms.map((cls) => (
              <div
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`bg-white/5 border ${selectedClass === cls.id ? "border-blue-500 bg-blue-500/5" : "border-white/10"} p-4 rounded-2xl backdrop-blur-md flex items-center justify-between hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-widest ${selectedClass === cls.id ? "text-blue-400" : "text-zinc-300"}`}
                >
                  {cls.academic_year?.name} - {cls.section?.name}
                </span>
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <ChevronRight
                    className={`h-4 w-4 ${selectedClass === cls.id ? "text-blue-400" : "text-white"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
