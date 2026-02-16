"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { attendanceService } from "@/features/dashboard/services/attendance.service";
import { gradesService } from "@/features/dashboard/services/grades.service";
import QuickGrade from "@/features/dashboard/components/QuickGrade";
import { BookOpen, Users, CheckCircle2, Search } from "lucide-react";
import Image from "next/image";

export default function EvaluacionesPage() {
  const { profile } = useSession();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
        }
      } catch (error) {
        console.error("Error cargando datos de evaluación:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [profile]);

  const handleSaveGrade = async (gradeData) => {
    try {
      await gradesService.saveGrade(gradeData);
      setMessage({
        type: "success",
        text: `Evaluación guardada para ${selectedStudent.full_name}`,
      });
      setSelectedStudent(null);
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error guardando evaluación:", error);
      setMessage({ type: "error", text: "Fallo al guardar evaluación" });
    }
  };

  const filteredStudents = students.filter((s) =>
    s.full_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000 relative">
      {/* Header */}
      <section className="space-y-2 pb-2 border-b border-white/5">
        <h1 className="text-4xl md:text-5xl font-serif">
          Centro de{" "}
          <span className="text-blue-400 italic font-light">Evaluación</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
          <BookOpen className="h-3 w-3" />
          Calificaciones Rápidas •{" "}
          {activeSubject?.name || "Cargando materia..."}
        </p>
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

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-900/40 p-4 rounded-3xl border border-white/5">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar estudiante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          {filteredStudents.length} Estudiantes encontrados
        </p>
      </div>

      {/* List Overlay for QuickGrade Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm">
          <QuickGrade
            student={selectedStudent}
            subjectId={activeSubject?.id}
            onSave={handleSaveGrade}
            onClose={() => setSelectedStudent(null)}
          />
        </div>
      )}

      {/* Student List Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="group bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] hover:bg-white/5 transition-all flex flex-col items-center text-center cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <div className="relative h-20 w-20 mb-4">
              <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-all">
                <Image
                  src={student.avatar_url || "/images/LogoColegio.webp"}
                  alt={student.full_name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="font-bold text-zinc-100 mb-1 group-hover:text-blue-400 transition-colors">
              {student.full_name}
            </h3>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-6">
              Estudiante
            </p>

            <button className="w-full py-3 bg-white/5 group-hover:bg-blue-600 text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white rounded-2xl border border-white/5 group-hover:border-blue-500 transition-all">
              Evaluar Ahora
            </button>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="flex flex-col items-center justify-center p-20 bg-zinc-900/20 border border-dashed border-white/10 rounded-[3rem]">
          <Users className="h-12 w-12 text-zinc-700 mb-4" />
          <p className="text-zinc-500 font-serif italic text-lg text-center">
            No se encontraron estudiantes.
            <br />
          </p>
        </div>
      )}
    </div>
  );
}
