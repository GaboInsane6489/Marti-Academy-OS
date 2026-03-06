"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/landing/Hero";
import Philosophy from "@/components/landing/Philosophy";
import Ecosystem from "@/components/landing/Ecosystem";
import CTA from "@/components/landing/CTA";

/**
 * PROTOCOLO NEXUS: LandingPage Entry Point
 * Theme: Monochrome High-Intensity HUD
 * Feature: Intersection Observer Sync
 */

function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Mantenemos la observación si queremos animaciones de salida,
          // pero para HUD Performance, unobserve es mejor.
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default function LandingPage() {
  const [heroRef, heroVisible] = useScrollReveal();
  const [philosophyRef, philosophyVisible] = useScrollReveal();
  const [inmersivaRef, inmersivaVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  return (
    <div className="relative w-full bg-[#0A0908] text-slate-300 selection:bg-white/20 overflow-x-hidden">
      {/* SECTION 01: EXTERNAL COMMAND CENTER */}
      <Hero scrollRef={heroRef} isVisible={heroVisible} />

      {/* SECTION 02: CORE PHILOSOPHY (BENTO READY) */}
      <Philosophy scrollRef={philosophyRef} isVisible={philosophyVisible} />

      {/* SECTION 03: ECOSYSTEM VIEWER */}
      <Ecosystem scrollRef={inmersivaRef} isVisible={inmersivaVisible} />

      {/* SECTION 04: TERMINAL ACTION (CTA) */}
      <CTA scrollRef={ctaRef} isVisible={ctaVisible} />

      {/* INDUSTRIAL FOOTER (REGLA 2.3 & 3.1) */}
      <footer className="relative py-16 border-t border-white/10 bg-[#0A0908] overflow-hidden">
        {/* Decoración de fondo HUD */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1300px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Lado A: Metadatos del Sistema */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white/40" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-black text-white/80">
                  Martí_Academy // Final_Node
                </span>
              </div>
              <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
                Deployment_Year: 2026 // Location: Caracas_VZLA
              </p>
            </div>

            {/* Lado B: Copyright Label */}
            <div className="relative group cursor-crosshair">
              <div className="absolute -inset-4 bg-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="relative font-mono text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">
                © {new Date().getFullYear()} Colegio José Martí{" "}
                <span className="text-white/20 px-2">•</span> Academy_OS
              </p>
            </div>
          </div>
        </div>

        {/* Scanner line sutil en el footer */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 opacity-20" />
      </footer>
    </div>
  );
}
