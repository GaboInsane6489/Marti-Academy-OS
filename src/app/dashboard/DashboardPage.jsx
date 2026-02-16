"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import { Sparkles, GraduationCap, Layout, Users, Shield } from "lucide-react";
import LevelProgressBar from "@/features/dashboard/components/LevelProgressBar";

export default function DashboardPage() {
  const { profile, user } = useSession();

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif">
            Hola,{" "}
            <span className="text-blue-400 italic font-light">
              {profile?.first_name ||
                profile?.full_name?.split(" ")[0] ||
                user?.user_metadata?.full_name?.split(" ")[0] ||
                "Guerrero"}
            </span>
          </h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Sistema Operativo Martí Activo •{" "}
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
          <div className="px-4 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter leading-none mb-1">
              Tu Rango
            </p>
            <p className="text-xs font-bold text-white leading-none">Honor</p>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Progress Bar Column (Main) */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] backdrop-blur-md relative overflow-hidden group">
          <LevelProgressBar
            xpTotal={profile?.xp_total}
            currentLevel={profile?.current_level}
          />

          {/* Subtle Background Decor */}
          <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-blue-500/5 blur-3xl rounded-full" />
        </div>

        {/* Quick Stats sidebar */}
        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] space-y-8 flex flex-col justify-center">
          <div className="flex items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <Sparkles className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                Méritos Creados
              </p>
              <h3 className="text-2xl font-serif mt-0.5">
                {profile?.merits_balance || 0}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Shield className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                Racha Actual
              </p>
              <h3 className="text-2xl font-serif mt-0.5">
                {profile?.streak_days || 0}{" "}
                <span className="text-xs text-zinc-500 not-italic ml-1">
                  Días
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Placeholder */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <GraduationCap className="w-48 h-48" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="h-3 w-3 text-yellow-400" />
                Evento Próximo: Examen Bimestral
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-serif leading-none tracking-tighter">
                  Continúa forjando <br />
                  tu <span className="italic text-blue-200">Camino.</span>
                </h2>
                <p className="text-blue-100/70 text-sm md:text-base max-w-md font-light leading-relaxed">
                  Has completado el 65% de tus objetivos semanales. Sigue así
                  para mantener tu racha y ganar el emblema de &quot;Guerrero
                  Constante&quot;.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-4">
                <button className="bg-white text-blue-900 px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
                  Ver Mis Tareas
                </button>
                <button className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                  Horario
                </button>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
                <Layout className="h-4 w-4 text-blue-400" />
                Clases de Hoy
              </h3>
              <div className="space-y-6">
                {[
                  {
                    time: "07:00",
                    subject: "Matemáticas Avanzadas",
                    room: "Aula A-12",
                  },
                  {
                    time: "08:30",
                    subject: "Física Cuántica",
                    room: "Laboratorio",
                  },
                  {
                    time: "10:00",
                    subject: "Historia Universal",
                    room: "Aula B-4",
                  },
                ].map((clase, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group"
                  >
                    <div className="flex flex-col items-center justify-center h-12 w-12 rounded-2xl bg-zinc-800 border border-white/5 text-[10px] font-bold group-hover:bg-blue-600 transition-colors">
                      <span className="text-blue-400 group-hover:text-white">
                        {clase.time}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate group-hover:text-blue-400 transition-colors">
                        {clase.subject}
                      </p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                        {clase.room}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Proyectos Activos
              </h3>
              <div className="space-y-8">
                {[
                  {
                    name: "Feria de Ciencias",
                    progress: 80,
                    color: "bg-blue-500",
                  },
                  {
                    name: "Ensayo Literario",
                    progress: 45,
                    color: "bg-cyan-500",
                  },
                ].map((project, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="text-sm font-bold">{project.name}</p>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${project.color} transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform">
              <Users className="h-20 w-20" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8 flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-400" />
              Profesores de Turno
            </h3>
            <div className="space-y-5">
              {[
                { name: "Lic. Rodolfo Martí", role: "Director", image: "RM" },
                {
                  name: "Prof. Elena Vera",
                  role: "Coord. Académica",
                  image: "EV",
                },
                {
                  name: "Ing. Carlos Ruiz",
                  role: "Docente Titular",
                  image: "CR",
                },
              ].map((prof, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group/item cursor-pointer"
                >
                  <div className="h-10 w-10 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center text-[10px] font-bold text-zinc-500 group-hover/item:border-purple-500/50 transition-colors">
                    {prof.image}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-300 group-hover/item:text-white transition-colors">
                      {prof.name}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">
                      {prof.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
              <Layout className="h-4 w-4 text-blue-400" />
              Estado del Sistema
            </h3>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
                <span className="text-zinc-500">Conexión VPN</span>
                <span className="text-green-500">Estable</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full">
                <div className="h-full w-full bg-green-500/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
