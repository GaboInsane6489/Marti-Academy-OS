"use client";

import Image from "next/image";

/**
 * PROTOCOLO NEXUS: Ecosystem Section (Compact & High-Contrast)
 * OPTIMIZACIÓN: Reducción de aire vertical y maximización de legibilidad HUD.
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
      className="py-20 relative overflow-hidden border-y-2 border-white/20"
    >
      {/* GRID DE DATOS DE FONDO - Mayor Opacidad */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* LADO A: TEXTO Y METADATOS (High Intensity) */}
        <div
          className={`space-y-8 transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-white" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white font-black">
                System_Interface // 03
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tighter leading-[0.9]">
              Experiencia <br />
              <span className="text-white/40 italic font-light tracking-tight">
                Inmersiva
              </span>
            </h2>

            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 max-w-sm leading-relaxed font-black">
              [ Interfaz de baja fricción diseñada para el enfoque institucional
              total ]
            </p>
          </div>

          {/* GRID DE ITEMS HUD - Compacto y Visible */}
          <div className="grid grid-cols-2 gap-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="group flex flex-col gap-2 p-3 border-2 border-white/10 bg-white/[0.04] rounded-lg hover:border-white hover:bg-white/[0.08] transition-all cursor-crosshair"
              >
                <div className="flex justify-between items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                  <span className="font-mono text-[8px] text-white/40 font-black">
                    {item.code}
                  </span>
                </div>
                <span className="font-mono text-[10px] font-black uppercase tracking-tighter text-white/70 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LADO B: VISUAL CHASSIS (Compact Frame) */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Marco exterior más fuerte */}
          <div className="absolute -inset-2 border-2 border-white/10 rounded-[1.8rem] opacity-50" />

          <div className="relative group overflow-hidden rounded-[1.5rem] border-2 border-white/30 bg-black shadow-[0_0_50px_rgba(0,0,0,1)] aspect-[16/10]">
            {/* SCANNER OVERLAY */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)] bg-[size:100%_8px] animate-[scan_5s_linear_infinite] z-20 pointer-events-none" />

            {/* IMAGE TREATMENT */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10" />

            <Image
              src="/images/EstudiantesCaminando.webp"
              alt="Estudiantes Martí"
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* LIVE FEED TAG */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/80 border-2 border-white/20 px-3 py-1 rounded-md">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[9px] text-white font-black uppercase tracking-widest">
                Live_Feed
              </span>
            </div>
          </div>

          {/* Glow de fondo reducido para no "ensuciar" el negro */}
          <div className="absolute -inset-10 bg-white/5 blur-[60px] rounded-full opacity-20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
