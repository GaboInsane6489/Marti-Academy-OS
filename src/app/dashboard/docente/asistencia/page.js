"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { attendanceService } from "@/features/dashboard/services/attendance.service";
import AttendanceGrid from "@/features/dashboard/components/AttendanceGrid";
import { Users, Save, CheckCircle2 } from "lucide-react";

export default function AsistenciaPage() {
  const { profile } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [students, setStudents] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!profile?.id) return;
      try {
        const subject = await attendanceService.getActiveSubject(profile.id);
        setActiveSubject(subject);

        if (subject?.classroom_id) {
          const list = await attendanceService.getStudentsByClassroom(
            subject.classroom_id,
          );
          setStudents(list);
          // Inicializar asistencia en 'presente'
          setAttendanceData(
            list.reduce((acc, s) => ({ ...acc, [s.id]: "presente" }), {}),
          );
        }
      } catch (error) {
        console.error("Error cargando datos de asistencia:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [profile]);

  const handleUpdate = (studentId, status) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    if (!activeSubject) return;
    setSaving(true);
    try {
      await attendanceService.saveAttendance(
        activeSubject.id,
        profile.id,
        attendanceData,
      );
      setMessage({ type: "success", text: "Asistencia guardada exitosamente" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error guardando asistencia:", error);
      setMessage({ type: "error", text: "Fallo al guardar asistencia" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif">
            Pase de{" "}
            <span className="text-blue-400 italic font-light">Lista</span>
          </h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Users className="h-3 w-3" />
            Control de Asistencia •{" "}
            {activeSubject?.name || "Cargando materia..."}
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || students.length === 0}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          {saving ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Guardando..." : "Guardar Asistencia"}
        </button>
      </section>

      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: students.length, color: "text-white" },
          {
            label: "Presentes",
            value: Object.values(attendanceData).filter((v) => v === "presente")
              .length,
            color: "text-green-400",
          },
          {
            label: "Tardes",
            value: Object.values(attendanceData).filter((v) => v === "tarde")
              .length,
            color: "text-yellow-400",
          },
          {
            label: "Faltas",
            value: Object.values(attendanceData).filter((v) => v === "falta")
              .length,
            color: "text-red-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl backdrop-blur-sm"
          >
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
              {stat.label}
            </p>
            <p className={`text-2xl font-serif ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Grid */}
      {students.length > 0 ? (
        <AttendanceGrid students={students} onUpdate={handleUpdate} />
      ) : (
        <div className="flex flex-col items-center justify-center p-20 bg-zinc-900/20 border border-dashed border-white/10 rounded-[3rem]">
          <Users className="h-12 w-12 text-zinc-700 mb-4" />
          <p className="text-zinc-500 font-serif italic text-lg text-center">
            No se encontraron estudiantes para esta clase.
            <br />
            <span className="text-sm font-sans not-italic">
              Asegúrate de que el aula tenga alumnos asignados.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
