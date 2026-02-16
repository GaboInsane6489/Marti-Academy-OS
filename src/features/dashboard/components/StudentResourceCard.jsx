"use client";

import { useState } from "react";
import { Video, FileText, LinkIcon, Sparkles, CheckCircle } from "lucide-react";

export default function StudentResourceCard({ resource, onClaimXP }) {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const handleClaim = async () => {
    if (claimed || claiming) return;
    setClaiming(true);
    try {
      if (onClaimXP) {
        await onClaimXP(resource.id, resource.xp_reward);
      }
      setClaimed(true);
    } catch (error) {
      console.error("Error reclamando XP:", error);
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="group bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] hover:bg-white/5 transition-all flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl -z-10" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
            {resource.type === "video" && (
              <Video className="h-5 w-5 text-red-400" />
            )}
            {resource.type === "pdf" && (
              <FileText className="h-5 w-5 text-blue-400" />
            )}
            {resource.type === "link" && (
              <LinkIcon className="h-5 w-5 text-cyan-400" />
            )}
          </div>
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
            {resource.type}
          </span>
        </div>

        <h3 className="text-lg font-serif text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
          {resource.title}
        </h3>
        <p className="text-xs text-zinc-500 font-light line-clamp-3 mb-6 leading-relaxed">
          {resource.description ||
            "Contenido académico preparado para tu formación."}
        </p>
      </div>

      <div className="space-y-4">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-4 bg-white/5 hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-300 rounded-2xl border border-white/5 transition-all active:scale-95"
          onClick={() => {
            // Aquí podríamos iniciar un timer para permitir reclamar XP sólo después de ver el contenido
          }}
        >
          Explorar Recurso
        </a>

        <button
          onClick={handleClaim}
          disabled={claimed || claiming}
          className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
            claimed
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-95"
          }`}
        >
          {claiming ? (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : claimed ? (
            <>
              <CheckCircle className="h-3 w-3" />
              Obtenido
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3" />
              Reclamar {resource.xp_reward} XP
            </>
          )}
        </button>
      </div>
    </div>
  );
}
