"use client";

import { gamificationService } from "../services/gamification.service";
import { Sparkles, TrendingUp } from "lucide-react";

export default function LevelProgressBar({ xpTotal = 0, currentLevel = 1 }) {
  const { currentXP, requiredXP, percentage } =
    gamificationService.calculateLevelProgress(xpTotal, currentLevel);

  return (
    <div className="space-y-4 w-full animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
            <TrendingUp className="h-3 w-3 text-blue-400" />
            Progreso de Nivel
          </p>
          <h3 className="text-2xl font-serif text-white">
            Lvl <span className="text-blue-400">{currentLevel}</span>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-tighter text-zinc-400">
            {currentXP} / {requiredXP} XP
          </p>
          <p className="text-xl font-serif text-blue-200 italic">
            {percentage}%
          </p>
        </div>
      </div>

      <div className="relative h-4 w-full bg-zinc-900/60 border border-white/5 rounded-full overflow-hidden backdrop-blur-md">
        {/* Fill Background Glow */}
        <div
          className="absolute inset-y-0 left-0 bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(37,99,235,0.4)]"
          style={{ width: `${percentage}%` }}
        />

        {/* Animated Stripes */}
        <div
          className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-stripe_2s_linear_infinite]"
          style={{ width: `${percentage}%` }}
        />

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>

      <div className="flex items-center gap-2 text-[9px] text-zinc-500 font-bold uppercase tracking-widest bg-blue-500/5 py-2 px-4 rounded-xl border border-blue-500/10 w-fit">
        <Sparkles className="h-3 w-3 text-yellow-500" />
        Faltan {requiredXP - currentXP} XP para alcanzar el Nivel{" "}
        {currentLevel + 1}
      </div>

      <style jsx>{`
        @keyframes progress-stripe {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 40px 0;
          }
        }
      `}</style>
    </div>
  );
}
