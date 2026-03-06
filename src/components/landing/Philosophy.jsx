"use client";

import { Shield, Award, Users } from "lucide-react";

/**
 * PROTOCOLO NEXUS: Philosophy (Compact Bento Grid)
 * OPTIMIZACIÓN: Reducción de scroll vertical y compactación de elementos HUD.
 */

export default function Philosophy({ scrollRef, isVisible }) {
  const features = [
    {
      icon: Shield,
      title: "Seguridad",
      desc: "Arquitectura blindada con protocolos de cifrado y propiedad total de metadatos.",
      code: "PROT_01",
      span: "md:col-span-2 md:row-span-1",
    },
    {
      icon: Award,
      title: "Mérito",
      desc: "Gamificación que premia el esfuerzo real.",
      code: "RANK_02",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      icon: Users,
      title: "Unión",
      desc: "Sincronización total en toda la red institucional.",
      code: "NET_03",
      span: "md:col-span-2 md:row-span-1",
    },
  ];

  return (
    <section
      id="filosofia"
      ref={scrollRef}
      className="relative z-20 py-20 overflow-hidden"
    >
      {/* LÍNEA DE SEPARACIÓN HUD */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.3)]" />

      <div className="container mx-auto px-6">
        {/* HEADER COMPACTO */}
        <div
          className={`mb-10 space-y-3 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white font-black">
              Core_Logic // 02
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tighter leading-none">
            Nuestra{" "}
            <span className="text-white/30 italic font-light">Filosofía</span>
          </h2>
        </div>

        {/* GRID COMPACTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {features.map((feature, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`group relative bg-white/[0.03] backdrop-blur-2xl border-2 border-white/20 p-8 rounded-[1.5rem] hover:border-white transition-all duration-500 overflow-hidden ${feature.span} ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_10px] animate-[scan_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-6 right-8 opacity-40 font-mono text-[9px] tracking-[0.3em] text-white group-hover:opacity-100 transition-all font-black">
                {feature.code}
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between space-y-6">
                <div className="h-12 w-12 bg-white/[0.05] border-2 border-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <feature.icon size={22} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/70 leading-snug font-black group-hover:text-white transition-colors">
                    [ {feature.desc} ]
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
