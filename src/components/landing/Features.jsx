"use client";

/**
 * PROTOCOLO NEXUS: Features Section
 * Arquitectura: Grid modular con glassmorphism sutil.
 */

export default function Features({ scrollRef, isVisible }) {
  const modules = [
    {
      id: "01",
      title: "Gestión Académica",
      desc: "Control total de expedientes y rendimiento en tiempo real.",
    },
    {
      id: "02",
      title: "Motor de Análisis",
      desc: "Algoritmos predictivos para la optimización del mérito.",
    },
    {
      id: "03",
      title: "Seguridad Nexus",
      desc: "Cifrado de grado institucional en cada flujo de datos.",
    },
  ];

  return (
    <section
      ref={scrollRef}
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-center py-24 bg-transparent"
    >
      <div
        className={`container mx-auto px-6 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* HEADER DE SECCIÓN */}
        <div className="mb-16 border-l-2 border-white pl-6">
          <h2 className="font-sans font-black uppercase text-4xl md:text-5xl tracking-tighter text-white">
            Protocolos_ <br />
            <span className="text-white/30 italic font-serif lowercase text-3xl md:text-4xl">
              integrados
            </span>
          </h2>
        </div>

        {/* GRID DE MÓDULOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((item) => (
            <div
              key={item.id}
              className="group relative p-8 border border-white/10 bg-black/20 backdrop-blur-md hover:bg-white/5 transition-all duration-500"
            >
              {/* ID DE PROTOCOLO */}
              <span className="font-mono text-[10px] text-white/40 mb-4 block tracking-[0.4em]">
                MOD_ID: {item.id}
              </span>

              <h3 className="font-sans font-bold text-xl text-white mb-4 uppercase tracking-tight">
                {item.title}
              </h3>

              <p className="font-mono text-[12px] text-white/60 leading-relaxed uppercase">
                {item.desc}
              </p>

              {/* DECORACIÓN HUD INTERNA */}
              <div className="absolute bottom-4 right-4 h-1 w-8 bg-white/10 group-hover:bg-white/40 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
