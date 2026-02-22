"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import {
  Flame,
  Trophy,
  Sparkles,
  Medal,
  Calendar,
  ChevronRight,
} from "lucide-react";
import LevelProgressBar from "@/features/dashboard/components/LevelProgressBar";
import { gamificationService } from "@/features/dashboard/services/gamification.service";
import Image from "next/image";

export default function StudentDashboardPage() {
  const { profile, user } = useSession();
  const [badges, setBadges] = useState([]);
  const [loadingBadges, setLoadingBadges] = useState(true);

  useEffect(() => {
    async function loadBadges() {
      if (profile?.id) {
        try {
          const allBadges = await gamificationService.getStoreBadges(
            profile.id,
          );
          setBadges(allBadges.filter((b) => b.isEarned).slice(0, 4));
        } catch (error) {
          console.error("Error loading badges:", error);
        } finally {
          setLoadingBadges(false);
        }
      }
    }
    loadBadges();
  }, [profile?.id]);

  const firstName =
    profile?.first_name || profile?.full_name?.split(" ")[0] || "Guerrero";

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header de Identidad */}
      <section className="space-y-2 pb-2 border-b border-white/5">
        <h1 className="text-4xl md:text-6xl font-serif">
          Hágase la luz,{" "}
          <span className="text-blue-400 italic font-light">{firstName}.</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
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
        <div className="lg:col-span-2 bg-zinc-900/40 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl relative overflow-hidden group">
          <LevelProgressBar
            xpTotal={profile?.xp_total || 0}
            currentLevel={profile?.current_level || 1}
          />
          <div className="absolute -bottom-12 -right-12 h-40 w-40 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
          {/* Card A: Streak */}
          <div className="bg-zinc-900/40 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl flex flex-col justify-between group hover:border-orange-500/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                <Flame className="h-5 w-5 text-orange-500 animate-pulse" />
              </div>
              <span className="text-[10px] font-bold text-orange-500/50 uppercase tracking-widest">
                Streak
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-serif leading-none">
                {profile?.streak_days || 0}
              </h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                Días de Racha
              </p>
            </div>
          </div>

          {/* Card B: Wallet */}
          <div className="bg-zinc-900/40 border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-xl flex flex-col justify-between group hover:border-blue-500/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                <Trophy className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-[10px] font-bold text-blue-500/50 uppercase tracking-widest">
                Wallet
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-serif leading-none">
                {profile?.merits_balance || 0}
              </h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                Méritos Acumulados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card C: Badges & Activites Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/40 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
              <Medal className="h-4 w-4 text-yellow-500" />
              Tus Medallas Recientes
            </h3>
            <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors">
              Ver Todas <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {loadingBadges ? (
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 w-20 rounded-2xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          ) : badges.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {badges.map((badge) => (
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

        {/* Calendar/Next Event placeholder */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-8 rounded-[2.5rem] shadow-xl shadow-blue-500/10 flex flex-col justify-between text-white relative overflow-hidden group">
          <Calendar className="absolute -top-6 -right-6 h-32 w-32 opacity-10 group-hover:rotate-12 transition-transform duration-700" />
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">
              Próximo Hito
            </p>
            <h4 className="text-2xl font-serif">Examen Bimestral</h4>
            <p className="text-xs opacity-80 mt-2 font-light">
              Faltan 4 días para evaluar tu dominio en Matemáticas.
            </p>
          </div>
          <button className="relative z-10 w-full mt-6 py-3 rounded-2xl bg-white text-blue-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-100 transition-colors">
            Preparar Módulo
          </button>
        </div>
      </div>
    </div>
  );
}
