"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Award, Users, Sparkles } from "lucide-react";

// Hook para micro-animaciones al hacer scroll
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
      { threshold: 0.15 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

export default function LandingPage() {
  const [heroRef, heroVisible] = useScrollReveal();
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [inmersivaRef, inmersivaVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  return (
    <div className="relative w-full bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 overflow-x-hidden">
      {/* --- HERO SECTION --- (Reducido a h-[85vh] para mejor flujo) */}
      <section
        ref={heroRef}
        className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden border-b border-white/5"
      >
        <div className="absolute inset-0 select-none z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.6] opacity-30"
          >
            <source src="/videos/Estudiantes.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/40 to-zinc-950" />
        </div>

        <div
          className={`relative z-20 container mx-auto px-6 text-center space-y-6 max-w-4xl transition-all duration-1000 transform ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl text-blue-400 text-[9px] font-bold uppercase tracking-[0.3em]">
            <Sparkles className="h-3 w-3 animate-pulse" />
            Martí Academy OS v1.0
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-7xl font-light tracking-tight leading-[1.1]">
              El Sistema{" "}
              <span className="font-serif italic text-zinc-400">Operativo</span>{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 font-black uppercase tracking-tighter">
                de la Excelencia
              </span>
            </h1>
            <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Ecosistema digital diseñado para potenciar el mérito y el futuro
              de nuestra comunidad.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
            >
              Acceso Institucional
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#filosofia"
              className="flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              Filosofía
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS/FEATURES SECTION --- (Espaciado reducido) */}
      <section
        id="filosofia"
        ref={featuresRef}
        className="relative z-20 py-20 bg-zinc-950"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                icon: Shield,
                title: "Seguridad",
                desc: "Arquitectura blindada y propiedad de datos.",
              },
              {
                icon: Award,
                title: "Mérito",
                desc: "Gamificación que premia el esfuerzo real.",
              },
              {
                icon: Users,
                title: "Unión",
                desc: "Sincronización total en toda la institución.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`group relative bg-zinc-900/30 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all duration-700 transform ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              >
                <div className="h-12 w-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-all">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tighter">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INMERSIVA SECTION --- (Más compacta) */}
      <section
        id="ecosistema"
        ref={inmersivaRef}
        className="py-24 relative overflow-hidden border-y border-white/5"
      >
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${inmersivaVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
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
              {[
                "Panel Central",
                "Recursos 4K",
                "Smart Alerts",
                "Data Privacy",
              ].map((item, i) => (
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
            className={`relative transition-all duration-1000 delay-300 ${inmersivaVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
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

      {/* --- FINAL CTA --- (Menos altura, más impacto) */}
      <section
        ref={ctaRef}
        className="py-24 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-blue-900/10"
      >
        <div
          className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${ctaVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-light italic text-white leading-tight tracking-tight">
              ¿Listo para la{" "}
              <span className="text-blue-600 not-italic font-black uppercase">
                nueva realidad
              </span>
              ?
            </h2>
            <div className="pt-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-4 bg-white text-zinc-950 px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-xl hover:shadow-blue-500/40"
              >
                Entrar al Sistema
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center bg-zinc-950">
        <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 font-bold">
          © 2026 Colegio José Martí • Academy OS
        </p>
      </footer>
    </div>
  );
}
