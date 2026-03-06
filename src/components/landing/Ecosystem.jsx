"use client";

import Image from "next/image";

/**
 * PROTOCOLO NEXUS: Ecosystem Section
 * Theme: Monochrome High-Intensity HUD / Data Visualization
 * Layout: Split Lado A (Meta) / Lado B (Visual Chassis)
 */

export default function Ecosystem({ scrollRef, isVisible }) {
  const items = [
    { label: "Panel Central", code: "CTRL_01" },
    { label: "Recursos 4K", code: "RES_HD" },
    { label: "Smart Alerts", code: "PUSH_ACT" },
    { label: "Data Privacy", code: "SEC_ENC" },
  ];

  return (
    <section
      id="ecosistema"
      ref={scrollRef}
      className="py-32 relative overflow-hidden border-y border-white/10 bg-[#0A0908]"
    >
      {/* GRID DE DATOS DE FONDO (REGLA 1.2) */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* LADO A: TEXTO Y METADATOS (REGLA 5.2) */}
        <div
          className={`space-y-10 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-white/20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 font-black">
                System_Interface
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tighter leading-none">
              Experiencia <br />
              <span className="text-white/40 italic font-light tracking-tight">
                Inmersiva
              </span>
            </h2>

            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/50 max-w-sm leading-relaxed font-black">
              [ Interfaz pulida para reducir la fricción. Cada interacción está
              diseñada para el enfoque institucional total del usuario ]
            </p>
          </div>

          {/* GRID DE ITEMS HUD (REGLA 2.3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="group flex flex-col gap-2 p-4 border border-white/5 bg-white/[0.02] rounded-xl hover:bg-white/[0.05] transition-all cursor-crosshair"
              >
                <div className="flex justify-between items-center">
                  <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_5px_white]" />
                  <span className="font-mono text-[7px] text-white/20">
                    {item.code}
                  </span>
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LADO B: VISUAL CHASSIS (REGLA 4.1) */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* DECORACIÓN PERIMETRAL HUD */}
          <div className="absolute -inset-1 border border-white/10 rounded-[2.5rem] opacity-30" />

          <div className="relative group overflow-hidden rounded-[2.2rem] border border-white/20 bg-black shadow-2xl aspect-video">
            {/* SCANNER OVERLAY INDIVIDUAL (REGLA 4.1) */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[size:100%_4px] animate-[scan_7s_linear_infinite] z-20 pointer-events-none" />

            {/* IMAGE TREATMENT */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />

            <Image
              src="/images/EstudiantesCaminando.webp"
              alt="Estudiantes Martí"
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* OVERLAY DE DATOS (REGLA 2.3) */}
            <div className="absolute bottom-4 left-6 z-20">
              <span className="font-mono text-[8px] text-white/60 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                Live_Feed: Campus_A
              </span>
            </div>
          </div>

          {/* GLOW DE FONDO RECALIBRADO */}
          <div className="absolute -inset-10 bg-white/5 blur-[80px] rounded-full opacity-30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
