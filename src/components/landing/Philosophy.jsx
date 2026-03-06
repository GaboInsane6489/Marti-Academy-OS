"use client";

import { Shield, Award, Users } from "lucide-react";

/**
 * PROTOCOLO NEXUS: Philosophy (Asymmetric Bento Grid)
 * Theme: Monochrome High-Intensity HUD
 * Feature: Glassmorphism Chassis & Data Labels
 */

export default function Philosophy({ scrollRef, isVisible }) {
  const features = [
    {
      icon: Shield,
      title: "Seguridad",
      desc: "Arquitectura blindada con protocolos de cifrado institucional y propiedad total de metadatos.",
      code: "PROT_01",
      span: "md:col-span-2 md:row-span-1", // Tarjeta ancha
    },
    {
      icon: Award,
      title: "Mérito",
      desc: "Gamificación de alto rendimiento que premia el esfuerzo real.",
      code: "RANK_02",
      span: "md:col-span-1 md:row-span-2", // Tarjeta alta
    },
    {
      icon: Users,
      title: "Unión",
      desc: "Sincronización total en toda la red de la institución.",
      code: "NET_03",
      span: "md:col-span-2 md:row-span-1", // Tarjeta ancha
    },
  ];

  return (
    <section
      id="filosofia"
      ref={scrollRef}
      className="relative z-20 py-32 bg-[#0A0908] overflow-hidden"
    >
      {/* DECORACIÓN DE FONDO HUD */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-auto">
          {/* HEADER DEL BENTO (LADO A: CONTEXTO) */}
          <div
            className={`md:col-span-3 mb-12 space-y-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_5px_white]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 font-black">
                Core_Logic // Values
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tighter leading-none">
              Nuestra{" "}
              <span className="text-white/40 italic font-light">Filosofía</span>
            </h2>
          </div>

          {/* GRID DE TARJETAS (LADO B: COMPONENTES) */}
          {features.map((feature, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`group relative bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] hover:border-white/30 transition-all duration-700 overflow-hidden ${feature.span} ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              {/* SCANNER OVERLAY INDIVIDUAL */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_8px] animate-[scan_10s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* METADATOS DE ESQUINA */}
              <div className="absolute top-6 right-8 opacity-20 font-mono text-[8px] tracking-[0.3em] text-white group-hover:opacity-100 transition-opacity">
                {feature.code}
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                <div className="h-14 w-14 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <feature.icon
                    size={24}
                    strokeWidth={1.5}
                    className="group-hover:stroke-[2px]"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-black text-white uppercase tracking-[0.1em]">
                    {feature.title}
                  </h3>
                  <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/40 leading-relaxed font-black max-w-sm group-hover:text-white/70 transition-colors">
                    [ {feature.desc} ]
                  </p>
                </div>
              </div>

              {/* HOVER GLOW EFFECT */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
