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

      <div className="relative h-4 w-full bg-white/5 border border-white/10 rounded-full overflow-hidden backdrop-blur-2xl shadow-inner">
        {/* Fill Background Glow */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(59,130,246,0.5)]"
          style={{ width: `${percentage}%` }}
        >
          {/* Animated Shine Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
        </div>

        {/* Animated Stripes (Subtle) */}
        <div
          className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-stripe_4s_linear_infinite]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center gap-2 text-[9px] text-zinc-400 font-bold uppercase tracking-widest bg-white/5 py-2 px-4 rounded-xl border border-white/5 w-fit backdrop-blur-md">
        <Sparkles className="h-3 w-3 text-yellow-500 animate-pulse" />
        Faltan{" "}
        <span className="text-white mx-1">
          {requiredXP - currentXP} XP
        </span>{" "}
        para alcanzar el Nivel{" "}
        <span className="text-blue-400 ml-1">{currentLevel + 1}</span>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
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
