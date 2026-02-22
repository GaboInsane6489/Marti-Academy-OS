"use client";

import {
  Book,
  FlaskConical,
  Calculator,
  Languages,
  Music,
  Palette,
  Activity,
  ChevronRight,
  User,
} from "lucide-react";

const iconMap = {
  matematica: Calculator,
  fisica: FlaskConical,
  quimica: FlaskConical,
  historia: Book,
  literatura: Book,
  ingles: Languages,
  musica: Music,
  arte: Palette,
  deportes: Activity,
  biologia: FlaskConical,
  geografia: Book,
  default: Book,
};

export default function SubjectCard({ subject }) {
  const name = subject.name.toLowerCase();

  // Encontrar el icono adecuado basado en el nombre
  const IconComponent =
    Object.entries(iconMap).find(([key]) => name.includes(key))?.[1] ||
    iconMap.default;

  const teacherName =
    subject.teacher?.first_name ||
    subject.teacher?.full_name?.split(" ")[0] ||
    "Docente";

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-6 backdrop-blur-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
      {/* Glossmorphism Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500">
            <IconComponent className="h-6 w-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
          </div>
          <button className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-500 hover:border-blue-400 group/btn shadow-lg">
            <ChevronRight className="h-4 w-4 text-white group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-serif italic text-white group-hover:text-blue-400 transition-colors drop-shadow-sm">
            {subject.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <User className="h-3 w-3 text-zinc-500" />
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
              Prof. {teacherName}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
          <span className="opacity-60">Actividad 4/5</span>
          <span className="text-blue-400 group-hover:animate-pulse drop-shadow-[0_0_5px_rgba(96,165,250,0.4)]">
            Activo
          </span>
        </div>
      </div>
    </div>
  );
}
