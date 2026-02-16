"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { adminService } from "@/features/dashboard/services/admin.service";
import {
  Users,
  UserCheck,
  GraduationCap,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const { profile } = useSession();
  const [pendingStudents, setPendingStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassroom, setSelectedClassroom] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const [students, rooms] = await Promise.all([
          adminService.getPendingStudents(),
          adminService.getClassrooms(),
        ]);
        setPendingStudents(students);
        setClassrooms(rooms);
      } catch (error) {
        console.error("Error cargando datos administrativos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleApprove = async (studentId) => {
    const classroomId = selectedClassroom[studentId];
    if (!classroomId) {
      alert("Selecciona un aula primero");
      return;
    }

    try {
      await adminService.approveStudent(studentId, classroomId);
      setPendingStudents((prev) => prev.filter((s) => s.id !== studentId));
    } catch (error) {
      console.error("Error aprobando estudiante:", error);
      alert("Error al aprobar estudiante");
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
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header */}
      <section className="space-y-2 pb-2 border-b border-white/5">
        <h1 className="text-4xl md:text-5xl font-serif">
          Panel de <span className="text-blue-400 italic">Administración</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
          <Shield className="h-3 w-3" />
          Control Institucional • {profile?.full_name}
        </p>
      </section>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Users,
            label: "Estudiantes Pendientes",
            value: pendingStudents.length,
            color: "text-yellow-400",
            bg: "bg-yellow-500/10",
          },
          {
            icon: GraduationCap,
            label: "Docentes Activos",
            value: "12",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            icon: UserCheck,
            label: "Aulas Configuradas",
            value: classrooms.length,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-sm group hover:border-white/10 transition-all"
          >
            <div
              className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
              {stat.label}
            </p>
            <h3 className="text-3xl font-serif mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Pending Students Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif flex items-center gap-2">
            <Users className="h-6 w-6 text-yellow-400" />
            Estudiantes Pendientes de Aprobación
          </h2>
        </div>

        <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Fecha Registro
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Asignar Aula
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {pendingStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {student.full_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-400">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-500 font-mono">
                      {new Date(student.created_at).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={selectedClassroom[student.id] || ""}
                        onChange={(e) =>
                          setSelectedClassroom((prev) => ({
                            ...prev,
                            [student.id]: e.target.value,
                          }))
                        }
                        className="bg-zinc-800 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seleccionar...</option>
                        {classrooms.map((classroom) => (
                          <option key={classroom.id} value={classroom.id}>
                            {classroom.academic_years?.name} -{" "}
                            {classroom.sections?.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleApprove(student.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Aprobar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pendingStudents.length === 0 && (
              <div className="p-12 text-center">
                <UserCheck className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500 font-serif italic">
                  No hay estudiantes pendientes de aprobación.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
