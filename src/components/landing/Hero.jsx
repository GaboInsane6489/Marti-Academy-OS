"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * PROTOCOLO NEXUS: Hero Section (Pure Transparent Layer)
 * Calibración: Ajuste de PT (Padding Top) para equilibrio con Navbar.
 */

export default function Hero({ scrollRef, isVisible }) {
  return (
    <section
      ref={scrollRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent"
    >
      {/* CONTENIDO PRINCIPAL: Ajuste de pt-32 a pt-20 para evitar exageración */}
      <div
        className={`relative z-40 container mx-auto px-6 pt-20 pb-12 flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* SYSTEM STATUS BADGE */}
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border-2 border-white/20 bg-black/40 backdrop-blur-md">
          <div className="h-2 w-2 animate-pulse rounded-full bg-white shadow-[0_0_8px_white]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-black text-white">
            Nexus_Initiated // Terminal_01
          </span>
        </div>

        {/* TEXTO DE ALTO IMPACTO */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            El Sistema <br />
            <span className="text-white/40 italic font-light tracking-tight text-4xl md:text-6xl">
              Operativo
            </span>{" "}
            <br />
            <span className="font-sans font-black uppercase text-white text-5xl md:text-[85px] leading-none">
              de la Excelencia
            </span>
          </h1>

          <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/90 max-w-lg mx-auto leading-relaxed font-black drop-shadow-md">
            [ Protocolo de alto rendimiento diseñado para
            <br className="hidden md:block" />
            potenciar el mérito institucional ]
          </p>
        </div>

        {/* ACCIONES */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link
            href="/login"
            className="group relative flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 w-full sm:w-auto"
          >
            Access_System
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href="#filosofia"
            className="group relative flex items-center justify-center gap-3 border-2 border-white/30 bg-black/40 text-white px-12 py-5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-md hover:bg-white hover:text-black w-full sm:w-auto"
          >
            View_Logic
          </Link>
        </div>
      </div>

      {/* ELEMENTOS HUD LATERALES (Z-50) */}
      <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-4 z-50">
        <div className="w-12 h-[2px] bg-white shadow-[0_0_10px_white]" />
        <span className="font-mono text-[10px] text-white font-black uppercase tracking-[0.4em]">
          Core_Status: Online
        </span>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block z-50">
        <span className="font-mono text-[9px] text-white/60 text-right block tracking-widest leading-loose font-black">
          AUTH_LEVEL: INSTITUTIONAL <br />
          LAT_LONG: 10.4806° N, 66.9036° W
        </span>
      </div>
    </section>
  );
}
