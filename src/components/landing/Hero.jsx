"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ scrollRef, isVisible }) {
  return (
    <section
      ref={scrollRef}
      className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 select-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.6] opacity-30"
        >
          <source src="/videos/Estudiantes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/40 to-zinc-950" />
      </div>

      <div
        className={`relative z-20 container mx-auto px-6 text-center space-y-6 max-w-4xl transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl text-blue-400 text-[9px] font-bold uppercase tracking-[0.3em]">
          <Sparkles className="h-3 w-3 animate-pulse" />
          Martí Academy OS v1.0
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-light tracking-tight leading-[1.1]">
            El Sistema{" "}
            <span className="font-serif italic text-zinc-400">Operativo</span>{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-black uppercase tracking-tighter">
              de la Excelencia
            </span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
            Ecosistema digital diseñado para potenciar el mérito y el futuro de
            nuestra comunidad.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="group flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
          >
            Acceso Institucional
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#filosofia"
            className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
          >
            Filosofía
          </Link>
        </div>
      </div>
    </section>
  );
}
