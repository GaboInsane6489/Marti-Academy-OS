"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/landing/Hero";
import Philosophy from "@/components/landing/Philosophy";
import Ecosystem from "@/components/landing/Ecosystem";
import CTA from "@/components/landing/CTA";
import Link from "next/link";

/**
 * PROTOCOLO NEXUS: LandingPage Entry Point (v5 - Zero-Opacity Architecture)
 * Logic: Elimina bgs locales para permitir que el Layout Video sea el entorno único.
 */

function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    /* ELIMINADO: bg-[#030303] -> Ahora es bg-transparent */
    <div className="relative w-full bg-transparent text-white selection:bg-white/30 overflow-x-hidden font-sans">
      {/* SECCIONES: Deben ser bg-transparent en sus definiciones internas */}
      <Hero scrollRef={heroRef} isVisible={heroVisible} />
      <Philosophy scrollRef={philosophyRef} isVisible={philosophyVisible} />
      <Ecosystem scrollRef={inmersivaRef} isVisible={inmersivaVisible} />
      <CTA scrollRef={ctaRef} isVisible={ctaVisible} />

      {/* FOOTER: Mantenemos bg-black/80 para dar peso al final, pero permitiendo ver el video sutilmente */}
      <footer className="relative pt-24 pb-12 border-t-2 border-white/20 bg-black/80 backdrop-blur-lg overflow-hidden">
        {/* HUD Decoration Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            {/* COL 1: BRAND ID & STATUS */}
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 border-2 border-white flex items-center justify-center rounded-sm">
                  <div className="h-2.5 w-2.5 bg-white animate-pulse shadow-[0_0_8px_white]" />
                </div>
                <span className="font-mono text-base uppercase tracking-[0.4em] font-black text-white">
                  Martí_Academy
                </span>
              </div>
              <p className="font-mono text-[11px] text-white/70 uppercase leading-relaxed tracking-widest max-w-[300px] font-black">
                [ Terminal de acceso institucional para la gestión de alto
                rendimiento académico y administrativo ]
              </p>

              {/* SYSTEM STATUS */}
              <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-emerald-500/40 bg-emerald-500/5 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-black">
                  System_Status: Operational
                </span>
              </div>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="space-y-6">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 font-black italic">
                Navegación
              </h4>
              <ul className="space-y-4">
                {["Dashboard", "Ecosistema", "Filosofía", "Protocolos"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="font-mono text-[12px] uppercase tracking-widest text-white/60 hover:text-white transition-all flex items-center gap-2 group font-black"
                      >
                        <span className="h-[2px] w-0 bg-white group-hover:w-5 transition-all duration-300 shadow-[0_0_8px_white]" />
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* SOPORTE */}
            <div className="space-y-6">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 font-black italic">
                Soporte
              </h4>
              <ul className="space-y-4">
                {["Manuales", "Seguridad", "Privacidad", "Contacto"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="font-mono text-[12px] uppercase tracking-widest text-white/60 hover:text-white transition-all flex items-center gap-2 group font-black"
                      >
                        <span className="h-[2px] w-0 bg-white group-hover:w-5 transition-all duration-300 shadow-[0_0_8px_white]" />
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* EXTERNAL */}
            <div className="space-y-6">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 font-black italic">
                External
              </h4>
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-11 w-11 border-2 border-white/20 flex items-center justify-center rounded-xl hover:bg-white transition-all cursor-pointer group"
                  >
                    <div className="h-2.5 w-2.5 bg-white/40 group-hover:bg-black transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM METADATA */}
          <div className="pt-8 border-t-2 border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/80 font-black">
                © 2026 Martí_Academy
              </p>
              <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest font-black">
                Lat_Long: 10.4806° N, 66.9036° W
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.5em] text-white font-black">
                Build: 0.9.4-Stable
              </span>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
