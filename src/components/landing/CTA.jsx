"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * PROTOCOLO NEXUS: CTA Module Refactor
 * Theme: Monochrome High-Intensity HUD / System Finalization
 * Color: White / Black High Contrast
 */

export default function CTA({ scrollRef, isVisible }) {
  return (
    <section
      ref={scrollRef}
      className="py-32 relative overflow-hidden bg-[#0A0908]"
    >
      {/* BACKGROUND ARCHITECTURE (REGLA 1.2) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        {/* GLOW DE CIERRE (REGLA 1.3) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-white/5 blur-[120px] rounded-full opacity-50" />
      </div>

      <div
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* COMPONENT CHASSIS: TERMINAL BOX (REGLA 3.1) */}
        <div className="max-w-4xl mx-auto border border-white/10 bg-white/[0.02] backdrop-blur-xl rounded-[2rem] p-12 md:p-20 text-center relative group">
          {/* SCANNER LINE OVERLAY (REGLA 4.1) */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_6s_linear_infinite] rounded-[2rem] pointer-events-none" />

          {/* DECORATIVE LABELS (REGLA 2.3) */}
          <div className="absolute top-6 left-10 hidden md:block">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/20 font-black">
              Final_Phase // Execute_Action
            </span>
          </div>

          <div className="space-y-8 relative z-10">
            {/* TYPOGRAPHY HIERARCHY (REGLA 2.1) */}
            <h2 className="text-4xl md:text-7xl font-serif text-white leading-[1.1] tracking-tighter">
              ¿Listo para la <br />
              <span className="text-white/40 italic font-light tracking-tight">
                nueva realidad
              </span>{" "}
              <span className="font-sans font-black uppercase text-white inline-block">
                ?
              </span>
            </h2>

            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/40 max-w-md mx-auto leading-relaxed font-black">
              [ Inicia sesión para acceder al ecosistema de alto rendimiento
              institucional ]
            </p>

            <div className="pt-6">
              <Link
                href="/login"
                className="group relative inline-flex items-center gap-6 bg-white text-black px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95"
              >
                <span className="relative z-10">Execute_System_Auth</span>
                <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          {/* SYSTEM STATUS PULSE (REGLA 4.2) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" />
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/20">
              Session_Status: Awaiting_Input
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER DECOR (IDS) */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 opacity-20">
        <div className="h-px w-20 bg-white" />
        <span className="font-mono text-[7px] text-white uppercase tracking-widest">
          End_Of_Transmission
        </span>
      </div>
    </section>
  );
}
