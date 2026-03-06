"use client";
import LandingNavbar from "@/features/landing/components/LandingNavbar";

export default function LandingLayout({ children }) {
  return (
    /* Cambiamos el bg-[#050505] por black puro para mejor contraste de profundidad */
    <div className="relative min-h-screen bg-black selection:bg-white/20 overflow-x-hidden">
      {/* 1. EL VIDEO: Ahora con opacidad alta y sin filtros que lo opaquen */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-70">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        >
          <source src="/videos/Estudiantes.mp4" type="video/mp4" />
        </video>

        {/* CAPA ÚNICA DE TINTE: Si la quitas, el video se ve al 100%, pero el texto podría sufrir */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* 2. HUD ESTÁTICO: Muy sutil para no tapar el video */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      </div>

      <div className="relative z-50">
        <LandingNavbar />
      </div>

      {/* 3. EL CONTENEDOR HIJO (HERO, ETC): DEBE SER TRANSPARENTE */}
      <main className="relative z-30 w-full bg-transparent">{children}</main>

      {/* STATUS LABELS */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none hidden md:block">
        <div className="flex items-center gap-3 border-l border-white/50 pl-4 py-1.5 bg-black/20 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_white]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-black text-white/90">
            System_Live // Video_Active
          </span>
        </div>
      </div>
    </div>
  );
}
