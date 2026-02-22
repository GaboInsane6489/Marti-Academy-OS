"use client";

import {
  X,
  ExternalLink,
  FolderOpen,
  User,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";

const categoryMap = {
  matematica: "Ciencias Exactas",
  fisica: "Ciencias",
  quimica: "Ciencias",
  biologia: "Ciencias Naturales",
  historia: "Humanidades",
  literatura: "Letras",
  ingles: "Idiomas",
  musica: "Artes",
  arte: "Artes",
  deportes: "Educación Física",
  default: "Académico",
};

export default function SubjectDrawer({ subject, isOpen, onClose }) {
  // Bloquear scroll del body al estar abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const name = subject?.name?.toLowerCase() || "";
  const category =
    Object.entries(categoryMap).find(([key]) => name.includes(key))?.[1] ||
    categoryMap.default;
  const teacherName = subject?.teacher?.full_name || "Docente por asignar";
  const teacherFirstName =
    subject?.teacher?.first_name || teacherName.split(" ")[0];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950/90 border-l border-white/5 backdrop-blur-2xl z-[70] shadow-2xl transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col h-full p-8 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group z-20"
          >
            <X className="h-5 w-5 text-zinc-400 group-hover:text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Drawer Content */}
          <div className="mt-12 space-y-8 overflow-y-auto pr-2 custom-scrollbar pb-24">
            {/* Header Section */}
            <header className="space-y-4 pb-6 border-b border-white/5">
              <div className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                {category}
              </div>
              <h2 className="text-3xl font-serif italic text-white leading-tight">
                {subject?.name || "Asignatura"}
              </h2>
              <div className="flex items-center gap-3 text-zinc-400">
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                    Docente responsable
                  </p>
                  <p className="text-sm font-medium text-zinc-300">
                    Prof. {teacherName}
                  </p>
                </div>
              </div>
            </header>

            {/* Description Section */}
            <section className="space-y-4">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <BookOpen className="h-3 w-3" />
                Descripción del Curso
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {subject?.description ||
                  "Esta asignatura forma parte del mapa curricular troncal de la academia. Explora los fundamentos teóricos y prácticos diseñados para potenciar tu ADN académico."}
              </p>
            </section>

            {/* Information Grid */}
            <section className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/5">
                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
                  Aula Virtual
                </p>
                <p className="text-xs text-blue-400 font-mono">
                  v-class-{subject?.id?.slice(0, 4) || "00"}
                </p>
              </div>
              <div className="p-4 rounded-3xl bg-white/[0.02] border border-white/5">
                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mb-1">
                  Estado
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-zinc-300 uppercase font-bold tracking-tighter">
                    En Curso
                  </p>
                </div>
              </div>
            </section>

            {/* Coming Soon Resources Placeholder */}
            <section className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/5 to-indigo-900/5 border border-blue-500/10 flex flex-col items-center text-center space-y-3">
              <Sparkles className="h-6 w-6 text-blue-400 opacity-50" />
              <p className="text-xs font-serif italic text-blue-300">
                &ldquo;El conocimiento es la única antorcha que no se
                apaga&rdquo;
              </p>
              <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.2em]">
                Próxima actualización de temario disponible
              </p>
            </section>
          </div>

          {/* Quick Actions Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-zinc-950/80 backdrop-blur-md border-t border-white/5 grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-4 rounded-3xl bg-blue-600 text-white hover:bg-blue-500 transition-all group active:scale-95">
              <ExternalLink className="h-5 w-5 mb-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="text-[8px] font-bold uppercase tracking-widest">
                Acceder al Aula
              </span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-3xl bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95">
              <FolderOpen className="h-5 w-5 mb-1" />
              <span className="text-[8px] font-bold uppercase tracking-widest">
                Recursos
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
