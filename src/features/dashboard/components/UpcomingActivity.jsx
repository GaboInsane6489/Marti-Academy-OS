"use client";

import {
  Clock,
  Book,
  Link as LinkIcon,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

/**
 * Componente para mostrar actividades próximas (tareas/clases).
 * Estilo ultra-compacto y Glassmorphism según Martí OS.
 */
export default function UpcomingActivity({ activities = [], loading = false }) {
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 w-full bg-white/[0.02] border border-white/5 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="h-44 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2rem] bg-white/[0.02] text-center p-6">
        <Clock className="h-6 w-6 text-zinc-600 mb-2" />
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
          Agenda Despejada
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const isCritical = activity.priority >= 3;
        const isClass = activity.category === "clase";

        // Colores de borde y sombra según prioridad/tipo
        const borderColor = isCritical
          ? "border-red-500/30"
          : isClass
            ? "border-blue-500/30"
            : "border-white/10";
        const accentColor = isCritical
          ? "bg-red-500"
          : isClass
            ? "bg-blue-500"
            : "bg-zinc-500";
        const iconColor = isCritical
          ? "text-red-400"
          : isClass
            ? "text-blue-400"
            : "text-zinc-400";

        return (
          <div
            key={activity.id}
            className={`group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border ${borderColor} backdrop-blur-2xl hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] transition-all duration-500 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.1)]`}
          >
            {/* Indicador Lateral */}
            <div
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${accentColor} opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
            />

            {/* Icono de Tipo */}
            <div
              className={`h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors`}
            >
              {isClass ? (
                <LinkIcon
                  className={`h-5 w-5 ${iconColor} drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]`}
                />
              ) : isCritical ? (
                <AlertCircle
                  className={`h-5 w-5 ${iconColor} drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]`}
                />
              ) : (
                <Book
                  className={`h-5 w-5 ${iconColor} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`}
                />
              )}
            </div>

            {/* Detalles */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[11px] font-serif italic text-white truncate group-hover:text-blue-400 transition-colors">
                {activity.title}
              </h4>
              <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">
                {activity.date}
              </p>
            </div>

            {/* Accionador */}
            <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        );
      })}
    </div>
  );
}
