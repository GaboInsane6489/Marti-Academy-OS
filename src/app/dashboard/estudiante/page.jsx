"use client";

import { useStudentData } from "@/features/dashboard/hooks/useStudentData";
import {
  Flame,
  Trophy,
  Sparkles,
  Medal,
  Calendar,
  ChevronRight,
} from "lucide-react";
import LevelProgressBar from "@/features/dashboard/components/LevelProgressBar";
import SubjectCard from "@/features/dashboard/components/SubjectCard";
import UpcomingActivity from "@/features/dashboard/components/UpcomingActivity";
import Image from "next/image";

export default function StudentDashboardPage() {
  const { stats, badges, loading, error, subjects, profile, activities } =
    useStudentData();

  if (error) {
    return (
      <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-3xl text-center">
        <p className="text-red-400 font-bold uppercase tracking-widest text-xs">
          {error}
        </p>
      </div>
    );
  }

  const firstName =
    profile?.first_name || profile?.full_name?.split(" ")[0] || "Guerrero";

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header de Identidad */}
      <section
        className="space-y-2 pb-2 border-b border-white/5 animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        <h1 className="text-4xl md:text-6xl font-serif">
          Hágase la luz,{" "}
          <span className="text-blue-400 italic font-light drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]">
            {firstName}.
          </span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          Terminal Académica Activa •{" "}
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
      </section>

      {/* Main Stats Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Level & Progress (Span 2) */}
        <div
          className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-2xl relative overflow-hidden group hover:bg-white/10 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.02)] animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          <LevelProgressBar
            xpTotal={stats.xp_total}
            currentLevel={stats.current_level}
          />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 bg-blue-600/10 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors" />
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          {/* Card A: Streak */}
          <div
            className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-2xl flex flex-col justify-between group hover:bg-white/10 hover:border-orange-500/40 hover:scale-[1.02] transition-all duration-500 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-bold text-orange-500/50 uppercase tracking-widest">
                Streak
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-serif leading-none text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.4)] animate-pulse [animation-duration:3s]">
                {stats.streak_days}
              </h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                Días de Racha
              </p>
            </div>
          </div>

          {/* Card B: Wallet */}
          <div
            className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-2xl flex flex-col justify-between group hover:bg-white/10 hover:border-blue-500/40 hover:scale-[1.02] transition-all duration-500 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Trophy className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-[10px] font-bold text-blue-500/50 uppercase tracking-widest">
                Wallet
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-serif leading-none text-blue-300 drop-shadow-[0_0_15px_rgba(147,197,253,0.4)]">
                {stats.merits_balance}
              </h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                Méritos Acumulados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card C: Badges & Activities Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div
          className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-2xl animate-fade-up"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
              <Medal className="h-4 w-4 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
              Tus Medallas Recientes (
              <span className="text-blue-400">{badges.length}</span>)
            </h3>
            <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors">
              Ver Todas <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {badges.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {badges.slice(0, 4).map((badge) => (
                <div key={badge.id} className="group relative">
                  <div className="h-20 w-20 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center group-hover:border-yellow-500/30 transition-all p-4">
                    {badge.icon_url ? (
                      <Image
                        src={badge.icon_url}
                        alt={badge.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    ) : (
                      <Medal className="h-8 w-8 text-zinc-600" />
                    )}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-zinc-950 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[8px] font-bold text-white whitespace-nowrap">
                      {badge.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-24 flex items-center justify-center border border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                No hay medallas aún • Sigue esforzándote
              </p>
            </div>
          )}
        </div>

        {/* Agenda & System Area */}
        <div
          className="space-y-6 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          <header className="flex justify-between items-center">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Agenda Inminente
            </h3>
            <span className="text-[10px] font-mono text-blue-400/50">
              Next Events
            </span>
          </header>

          <UpcomingActivity activities={activities} loading={loading} />

          <div className="bg-gradient-to-br from-blue-600/20 to-indigo-900/40 border border-white/10 p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/5 flex flex-col justify-between text-white relative overflow-hidden group backdrop-blur-2xl hover:bg-white/5 transition-all duration-700">
            <Sparkles className="absolute -top-6 -right-6 h-32 w-32 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-700" />
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">
                Mapa Curricular
              </p>
              <h4 className="text-3xl font-serif italic drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                ADN Académico
              </h4>
              <p className="text-xs opacity-80 mt-2 font-light">
                {stats.coursesCount} materias vinculadas a tu sección.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mis Asignaturas Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-serif">
          Mis{" "}
          <span className="text-blue-400 italic font-light">Asignaturas.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton State
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] animate-pulse"
              />
            ))
          ) : subjects && subjects.length > 0 ? (
            subjects.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))
          ) : (
            <div className="col-span-full h-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.02] text-center p-6">
              <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">
                No se encontraron materias asignadas
              </p>
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-2">
                Por favor, contacta con administración para verificar tu
                matrícula.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
