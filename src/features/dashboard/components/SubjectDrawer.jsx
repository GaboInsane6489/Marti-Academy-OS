"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

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

  return (
    <>
      {/* Overlay - Bloquea interacciones y oscurece el fondo */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950/80 border-l border-white/5 backdrop-blur-2xl z-[70] shadow-2xl transition-transform duration-300 ease-in-out animate-in slide-in-from-right`}
      >
        {/* Superior Reflection Light (Glassmorphism highlight) */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col h-full p-8 relative">
          {/* Close Button Inside Drawer */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
          >
            <X className="h-5 w-5 text-zinc-400 group-hover:text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Drawer Content */}
          <div className="mt-12 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
            <header className="space-y-4">
              <div className="inline-flex px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                Detalles de Asignatura
              </div>
              <h2 className="text-3xl font-serif">
                {subject?.name || "Sin Nombre"}
              </h2>
            </header>

            <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
              <p className="text-zinc-400 text-sm font-light leading-relaxed italic">
                Cargando módulos y recursos académicos para esta materia...
              </p>

              <div className="h-32 flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] animate-pulse">
                  Desplegando Cartografía...
                </p>
              </div>
            </div>
          </div>

          {/* Footer of Drawer */}
          <div className="mt-auto pt-8 border-t border-white/5">
            <button
              disabled
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-500 text-xs font-bold uppercase tracking-widest cursor-not-allowed"
            >
              Próxima Clase: Pendiente
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
