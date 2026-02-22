"use client";

import Image from "next/image";

export default function Ecosystem({ scrollRef, isVisible }) {
  const items = [
    "Panel Central",
    "Recursos 4K",
    "Smart Alerts",
    "Data Privacy",
  ];

  return (
    <section
      id="ecosistema"
      ref={scrollRef}
      className="py-24 relative overflow-hidden border-y border-white/5"
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div
          className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-light leading-tight text-white">
              Experiencia{" "}
              <span className="text-blue-500 font-black uppercase italic tracking-tighter">
                Inmersiva
              </span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed max-w-md">
              Interfaz pulida para reducir la fricción. Cada interacción está
              diseñada para el enfoque institucional total.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 group cursor-default"
              >
                <div className="h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-blue-400 transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <div className="absolute -inset-4 bg-blue-600/10 blur-3xl rounded-[3rem] opacity-50" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-900 shadow-2xl aspect-video">
            <Image
              src="/images/EstudiantesCaminando.webp"
              alt="Estudiantes Martí"
              fill
              className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
