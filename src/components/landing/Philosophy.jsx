"use client";

import { Shield, Award, Users } from "lucide-react";

export default function Philosophy({ scrollRef, isVisible }) {
  const features = [
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
  ];

  return (
    <section
      id="filosofia"
      ref={scrollRef}
      className="relative z-20 py-20 bg-zinc-950"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${i * 150}ms` }}
              className={`group relative bg-zinc-900/30 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
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
  );
}
