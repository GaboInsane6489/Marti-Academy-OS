"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { gamificationService } from "@/features/dashboard/services/gamification.service";
import BadgeCard from "@/features/dashboard/components/BadgeCard";
import { Trophy, Star, Sparkles, ShoppingBag } from "lucide-react";

export default function TiendaPage() {
  const { profile } = useSession();
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    async function loadBadges() {
      if (!profile?.id) return;
      try {
        const list = await gamificationService.getStoreBadges(profile.id);
        setBadges(list);
      } catch (error) {
        console.error("Error cargando insignias:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBadges();
  }, [profile]);

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const earnedCount = badges.filter((b) => b.isEarned).length;

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header Overlay */}
      <section className="relative overflow-hidden bg-zinc-900 border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Trophy className="h-64 w-64 text-blue-400 rotate-12" />
        </div>

        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
            <Star className="h-3 w-3 fill-current" />
            Salón de Méritos
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
            Tus Logros e{" "}
            <span className="text-blue-400 italic">Identidad.</span>
          </h1>

          <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed">
            Cada acción cuenta. Tu asistencia, calificaciones y participación
            desbloquean méritos únicos que definen tu estatus en la comunidad de
            Martí Academy.
          </p>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
                Insignias Obtenidas
              </p>
              <p className="text-3xl font-serif text-white">
                {earnedCount}{" "}
                <span className="text-zinc-700">/ {badges.length}</span>
              </p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
                Méritos de Honor
              </p>
              <p className="text-3xl font-serif text-blue-400">
                {profile?.merits_balance || 0}{" "}
                <Sparkles className="inline h-5 w-5 mb-1" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Badges */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-zinc-500" />
          <h2 className="text-xl font-serif text-zinc-300">
            Catálogo Institucional
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}
