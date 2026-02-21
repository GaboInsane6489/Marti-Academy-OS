"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Award, Users, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative w-full">
      {/* --- HERO SECTION --- (Height: Screen, Flex: Center) */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-28">
        {/* Background Image */}
        <div className="absolute inset-0 select-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.2]"
          >
            <source src="/videos/Estudiantes.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950" />
        </div>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 text-center space-y-10 max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 mt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
            <Sparkles className="h-3 w-3" />
            Nueva Identidad Digital • Martí v1.0
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-7xl font-serif text-white italic font-light leading-[1.1]">
              El Sistema Operativo de la <br />
              <span className="text-blue-500 not-italic font-bold tracking-tighter">
                Excelencia Académica
              </span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Más que una plataforma, es un ecosistema diseñado para potenciar
              el mérito, la transparencia y el futuro de nuestra comunidad
              institucional.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              href="/login"
              className="group flex items-center justify-center gap-3 bg-white text-zinc-950 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-blue-500/20"
            >
              Acceso Institucional
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-400" />
            </Link>

            <Link
              href="#filosofia"
              className="flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-300"
            >
              Nuestra Filosofía
            </Link>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-20" />
      </section>

      {/* --- STATS SECTION --- (Padding Top: Important to separate from Hero) */}
      <section
        id="filosofia"
        className="relative z-20 md:-mt-16 pt-24 pb-8 mb-2"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Shield,
                title: "Seguridad Robusta",
                desc: "Arquitectura blindada basada en roles y propiedad de datos.",
              },
              {
                icon: Award,
                title: "Módulo de Mérito",
                desc: "Sistema de gamificación que premia el esfuerzo y la constancia.",
              },
              {
                icon: Users,
                title: "Comunidad Unida",
                desc: "Conexiones seguras entre alumnos, docentes y la institución.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-zinc-900/60 backdrop-blur-2xl border border-white/5 p-10 rounded-[2.5rem] hover:border-blue-500/20 transition-all group flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-4 italic">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMAGE SECTION --- (Ecosistema) */}
      <section
        id="ecosistema"
        className="py-40 bg-zinc-900/60 backdrop-blur-2xl border-y border-white/5 relative overflow-hidden mb-10"
      >
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 order-2 lg:order-1">
            <h2 className="text-4xl md:text-6xl font-serif text-white italic leading-tight">
              Una experiencia{" "}
              <span className="text-blue-500 not-italic font-bold uppercase tracking-tighter">
                Inmersiva
              </span>{" "}
              para el aprendizaje.
            </h2>
            <p className="text-zinc-400 leading-relaxed text-lg md:text-xl font-light">
              Nuestra interfaz ha sido pulida para reducir la fricción. Desde el
              pase de lista hasta la entrega de recursos, todo sucede en un
              entorno diseñado para el enfoque.
            </p>
            <div
              id="academia"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
            >
              {[
                "Panel Administrativo Centralizado",
                "Recursos Académicos 4K",
                "Notificaciones Inteligentes",
                "Propiedad Total de Datos",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-zinc-100">
                  <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                  <span className="text-sm font-medium tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2.6rem] opacity-20 blur group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src="/images/EstudiantesCaminando.webp"
                alt="Estudiantes Martí"
                width={800}
                height={600}
                className="relative z-10 w-full rounded-[2.5rem] border border-white/20 shadow-2xl grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- (Increased Padding Bottom) */}
      <section className="py-20 text-center container mx-auto px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
          <div className="inline-block h-24 w-px bg-gradient-to-b from-zinc-900 via-blue-500/20 to-zinc-900" />
          <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
            ¿Estás listo para entrar en la <br />
            <span className="text-blue-500 not-italic font-bold">
              nueva realidad
            </span>{" "}
            institucional?
          </h2>
          <Link
            href="/login"
            className="inline-flex items-center gap-4 bg-blue-600 text-white px-12 py-6 rounded-full text-base font-bold uppercase tracking-[0.2em] hover:bg-blue-500 hover:scale-105 transition-all shadow-2xl shadow-blue-500/40"
          >
            Acceder al Sistema
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="soporte"
        className="py-20 border-t border-white/5 text-center bg-zinc-950/50 backdrop-blur-md"
      >
        <p className="text-[11px] uppercase tracking-[0.5em] text-zinc-500 font-bold">
          © 2026 Colegio José Martí • Martí Academy Operating System
        </p>
      </footer>
    </div>
  );
}
