"use client";

import { useState, useEffect } from "react";
import { Check, X, Clock as ClockIcon, Users, User } from "lucide-react";
import { attendanceService } from "../services/attendance.service";

/**
 * Componente QuickAttendance: Gestión de asistencia ultra-rápida por excepción.
 * Glassmorphism 2.0 y respuesta visual inmediata.
 */
export default function QuickAttendance({ classroomId, teacherId, subjectId }) {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({}); // { studentId: status }
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    async function initAttendance() {
      if (!classroomId || !subjectId) return;
      try {
        setLoading(true);
        const [studentList, currentSessionId] = await Promise.all([
          attendanceService.getStudentsByClassroom(classroomId),
          attendanceService.getOrCreateTodaySession(subjectId, teacherId),
        ]);

        setStudents(studentList);
        setSessionId(currentSessionId);

        // Inicializar todos como 'presente' (Gestión por Excepción)
        const initialRecords = {};
        studentList.forEach((s) => {
          initialRecords[s.id] = "presente";
        });
        setAttendanceRecords(initialRecords);
      } catch (error) {
        console.error("Error initializing attendance:", error);
      } finally {
        setLoading(false);
      }
    }
    initAttendance();
  }, [classroomId, subjectId, teacherId]);

  const handleStatusChange = async (studentId, status) => {
    try {
      // Optimistic update
      setAttendanceRecords((prev) => ({ ...prev, [studentId]: status }));

      if (sessionId) {
        await attendanceService.updateAttendanceRecord(
          sessionId,
          studentId,
          status,
        );
      }
    } catch (error) {
      console.error("Error updating record:", error);
      // Rollback on error if needed (omitted for brevity)
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
          <Users className="h-3 w-3" />
          Control de Asistencia
        </h3>
        <span className="text-[9px] font-mono text-zinc-600 bg-white/5 px-2 py-1 rounded-md border border-white/5">
          {students.length} Alumnos
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
        {students.map((student) => {
          const status = attendanceRecords[student.id] || "presente";
          const isAbsent = status === "falta";
          const isLate = status === "tarde";
          const isPresent = status === "presente";

          return (
            <div
              key={student.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                isAbsent
                  ? "bg-red-500/5 border-red-500/20 opacity-60"
                  : isLate
                    ? "bg-orange-500/5 border-orange-500/20"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                  {student.avatar_url ? (
                    <img
                      src={student.avatar_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-zinc-600" />
                  )}
                </div>
                <span className="text-[11px] font-serif text-zinc-300 truncate max-w-[100px]">
                  {student.first_name || student.full_name.split(" ")[0]}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleStatusChange(student.id, "presente")}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${
                    isPresent
                      ? "bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                      : "bg-white/5 text-zinc-600 hover:bg-white/10"
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleStatusChange(student.id, "tarde")}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${
                    isLate
                      ? "bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                      : "bg-white/5 text-zinc-600 hover:bg-white/10"
                  }`}
                >
                  <ClockIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleStatusChange(student.id, "falta")}
                  className={`h-7 w-7 rounded-lg flex items-center justify-center transition-all ${
                    isAbsent
                      ? "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                      : "bg-white/5 text-zinc-600 hover:bg-white/10"
                  }`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
