"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/landing/Hero";
import Philosophy from "@/components/landing/Philosophy";
import Ecosystem from "@/components/landing/Ecosystem";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import CoreMetrics from "@/components/landing/CoreMetrics";
import Link from "next/link";

/**
 * PROTOCOLO NEXUS: LandingPage (v7 - Full System Integration)
 * Logic: Orquestación de scroll reveals y terminal HUD.
 */

function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Mantenemos el observe si queremos re-animar,
          // o unobserve para disparar solo una vez.
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default function LandingPage() {
  // Hooks de Visibilidad
  const [heroRef, heroVisible] = useScrollReveal();
  const [philosophyRef, philosophyVisible] = useScrollReveal();
  const [inmersivaRef, inmersivaVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [metricsRef, metricsVisible] = useScrollReveal(); // Metric integration
  const [ctaRef, ctaVisible] = useScrollReveal();

  const [sysTime, setSysTime] = useState("");

  // System Clock Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-transparent text-white selection:bg-white/30 overflow-x-hidden font-sans">
      {/* SECCIÓN 01: HERO ENTRY */}
      <Hero scrollRef={heroRef} isVisible={heroVisible} />

      {/* SECCIÓN 02: FILOSOFÍA */}
      <Philosophy scrollRef={philosophyRef} isVisible={philosophyVisible} />

      {/* HUD DIVIDER: Separador de telemetría sutil */}
      <div className="container mx-auto px-6 opacity-20">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      {/* SECCIÓN 03: ECOSISTEMA */}
      <Ecosystem scrollRef={inmersivaRef} isVisible={inmersivaVisible} />

      {/* SECCIÓN 04: FEATURES (BENTO) */}
      <Features scrollRef={featuresRef} isVisible={featuresVisible} />

      {/* SECCIÓN 05: TELEMETRÍA (CORE METRICS) */}
      {/* Aquí pasamos las refs correctamente para que se disparen las animaciones de los números */}
      <CoreMetrics scrollRef={metricsRef} isVisible={metricsVisible} />

      {/* SECCIÓN 06: CALL TO ACTION */}
      <CTA scrollRef={ctaRef} isVisible={ctaVisible} />

      {/* FOOTER: ULTRA-HIGH TIER HUD TERMINAL */}
      <footer className="relative pt-32 pb-12 border-t border-white/10 bg-[#050505]/40 backdrop-blur-2xl overflow-hidden">
        {/* TEXTURE LAYERS */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.03]" />
        </div>

        {/* HUD Decoration Lines */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
            {/* BRAND ID */}
            <div className="lg:col-span-2 space-y-10">
              <div className="group cursor-default">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-8 w-8 border border-white/40 flex items-center justify-center rounded-sm group-hover:border-white transition-colors duration-500">
                    <div className="h-3 w-3 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
                  </div>
                  <h2 className="font-sans text-3xl font-black uppercase tracking-tighter text-white/90">
                    MARTÍ<span className="text-white/20">.</span>AC
                  </h2>
                </div>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.4em] mb-8 font-bold">
                  Institutional_Access_v1.0
                </p>
              </div>

              <div className="space-y-4">
                <div className="inline-flex flex-col gap-1 p-4 border border-white/5 bg-white/[0.02] rounded-sm w-full max-w-[320px]">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
                    System_Log
                  </span>
                  <p className="font-mono text-[11px] text-white/70 leading-relaxed uppercase italic">
                    La arquitectura de la educación, reimaginada para el alto
                    rendimiento.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="px-4 py-2 border border-emerald-500/20 bg-emerald-500/5 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-black">
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 border border-white/10 bg-white/5 rounded-md">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/80 font-black">
                      {sysTime || "00:00:00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* NAV LINKS */}
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">
                Sistemas
              </h4>
              <ul className="space-y-4">
                {["Dashboard", "Ecosistema", "Filosofía", "Academia"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all flex items-center gap-3 group font-bold"
                      >
                        <span className="h-px w-0 bg-white group-hover:w-4 transition-all duration-300" />
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* PROTOCOLOS */}
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">
                Protocolos
              </h4>
              <ul className="space-y-4">
                {["Seguridad", "Privacidad", "Soporte", "Legal"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all flex items-center gap-3 group font-bold"
                    >
                      <span className="h-px w-0 bg-white group-hover:w-4 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONNECTION SQUARES */}
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.6em] text-white/30 font-black">
                Conexión
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-12 w-12 border border-white/10 bg-white/[0.02] flex items-center justify-center rounded-sm hover:bg-white hover:text-black transition-all cursor-pointer group"
                  >
                    <div className="h-1.5 w-1.5 bg-white/40 group-hover:bg-black transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* METADATA BAR */}
          <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col lg:flex-row items-center gap-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 font-black">
                © 2026 Martí_Academy
              </p>
              <div className="hidden lg:block h-4 w-px bg-white/10" />
              <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
                Geo_Loc: 10.4806 N // 66.9036 W
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex border border-white/10 rounded-sm overflow-hidden">
                <span className="px-3 py-1 bg-white/5 font-mono text-[9px] text-white/40 border-r border-white/10">
                  V_0.9.4
                </span>
                <span className="px-3 py-1 font-mono text-[9px] text-emerald-500/60 uppercase font-black">
                  Stable_Build
                </span>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center justify-center h-10 w-10 border border-white/10 hover:bg-white transition-all"
              >
                <div className="w-2 h-2 border-t-2 border-l-2 border-white group-hover:border-black rotate-45 translate-y-0.5 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
