"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * PROTOCOLO NEXUS: Hero Section (Final High-Fidelity)
 * Feature: Native Color Video + Backdrop Gaussian Blur
 * Adjustment: Compact layout with zero-scroll footprint
 */

export default function Hero({ scrollRef, isVisible }) {
  return (
    <section
      ref={scrollRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/10 bg-[#0A0908]"
    >
      {/* LADO A: VISUAL VIEWER (COLOR NATIVO + BLUR) */}
      <div className="absolute inset-0 select-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/Estudiantes.mp4" type="video/mp4" />
        </video>

        {/* CAPA DE BLUR GAUSSIANO PARA ENFOQUE EN CONTENIDO */}
        <div className="absolute inset-0 backdrop-blur-[2px] z-10" />

        {/* SCANNER LINE OVERLAY (PROTOCOLO 4.1) */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[size:100%_4px] animate-[scan_10s_linear_infinite] z-20" />

        {/* MÁSCARAS DE GRADIENTE PARA INTEGRACIÓN NEGRA */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908] via-transparent to-[#0A0908] z-30" />
        <div className="absolute inset-0 bg-black/30 z-20" />
      </div>

      {/* LADO B: METADATOS & MODULES */}
      <div
        className={`relative z-40 container mx-auto px-6 flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* SYSTEM STATUS BADGE */}
        <div className="mb-4 md:mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl">
          <div className="h-1 w-1 animate-pulse rounded-full bg-white shadow-[0_0_5px_white]" />
          <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black text-white/90">
            Nexus_Initiated // v1.0
          </span>
        </div>

        {/* TEXTO DE ALTO IMPACTO (CONTRASTE MEJORADO) */}
        <div className="text-center space-y-2 md:space-y-3 mb-8 md:mb-10">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tighter leading-none drop-shadow-2xl">
            El Sistema <br />
            <span className="text-white/40 italic font-light tracking-tight text-3xl md:text-5xl">
              Operativo
            </span>{" "}
            <br />
            <span className="font-sans font-black uppercase text-white text-5xl md:text-[80px] leading-tight">
              de la Excelencia
            </span>
          </h1>

          <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/50 max-w-lg mx-auto leading-relaxed font-black">
            [ Protocolo de alto rendimiento diseñado para{" "}
            <br className="hidden md:block" />
            potenciar el mérito institucional ]
          </p>
        </div>

        {/* ACCIONES (OPTIMIZADAS PARA NO SOBREPASAR VIEWPORT) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/login"
            className="group relative flex items-center justify-center gap-3 bg-white text-[#0A0908] px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 w-full sm:w-auto"
          >
            Access_System
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href="#filosofia"
            className="group relative flex items-center justify-center gap-3 border border-white/20 bg-white/[0.05] text-white/80 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all backdrop-blur-xl hover:bg-white/10 hover:text-white w-full sm:w-auto overflow-hidden"
          >
            View_Logic
          </Link>
        </div>
      </div>

      {/* DECORACIONES LATERALES HUD (REGLA 2.3) */}
      <div className="absolute bottom-8 left-8 hidden lg:flex items-center gap-4 z-40">
        <div className="w-10 h-[1px] bg-white/20" />
        <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.5em]">
          Core_Status: Online
        </span>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block z-40">
        <div className="text-right border-r-2 border-white/20 pr-4">
          <p className="font-mono text-[8px] text-white/40 font-black uppercase tracking-[0.2em]">
            Auth_Level: Institutional <br />
            <span className="text-[7px] text-white/20">
              © 2026 Martí Academy
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
