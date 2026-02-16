"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function DocenteDashboard() {
  const { profile } = useSession();

  const todaysClasses = [
    {
      title: "Matemáticas Avanzadas",
      time: "08:00 AM",
      room: "Aula 402",
      status: "Completada",
    },
    {
      title: "Física Cuántica I",
      time: "10:30 AM",
      room: "Lab B",
      status: "En curso",
    },
    {
      title: "Pensamiento Crítico",
      time: "01:00 PM",
      room: "Sala Magna",
      status: "Pendiente",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Welcome Header */}
      <section className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif">
          Portal <span className="text-blue-400 italic">Académico</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          Gestión Docente • {profile?.full_name}
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column: Classes */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              Agenda de Hoy
            </h2>
            <Link
              href="/dashboard/docente/horario"
              className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              Ver Horario Completo
            </Link>
          </div>

          <div className="space-y-4">
            {todaysClasses.map((cls, i) => (
              <div
                key={i}
                className="group bg-zinc-900/40 border border-white/5 p-5 rounded-[2rem] flex items-center justify-between hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                    <Clock className="h-5 w-5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-100">{cls.title}</h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      {cls.time} • {cls.room}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                      cls.status === "Completada"
                        ? "bg-green-500/10 text-green-400"
                        : cls.status === "En curso"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {cls.status}
                  </span>
                  <Link
                    href="/dashboard/docente/asistencia"
                    className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 hover:bg-blue-600 hover:border-blue-500"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Column: Stats & Quick Actions */}
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-serif">Estadísticas</h2>
            <div className="grid gap-4">
              {[
                {
                  icon: GraduationCap,
                  label: "Mis Clases",
                  value: "8 Activas",
                  color: "text-blue-400",
                },
                {
                  icon: BookOpen,
                  label: "Evaluaciones",
                  value: "12 Pendientes",
                  color: "text-cyan-400",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-sm"
                >
                  <stat.icon className={`h-6 w-6 ${stat.color} mb-4`} />
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-serif mt-1">{stat.value}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-blue-600/10 border border-blue-500/20 p-8 rounded-[3rem] relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-serif mb-2">Pase de Lista</h3>
              <p className="text-sm text-zinc-400 mb-6 font-light">
                Comienza el control de asistencia para tu clase actual de forma
                rápida.
              </p>
              <Link
                href="/dashboard/docente/asistencia"
                className="inline-flex items-center justify-center w-full px-6 py-4 rounded-2xl bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
              >
                Iniciar Ahora
              </Link>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 bg-blue-500/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
          </section>
        </div>
      </div>
    </div>
  );
}
