"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA({ scrollRef, isVisible }) {
  return (
    <section
      ref={scrollRef}
      className="py-24 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-blue-900/10"
    >
      <div
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
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
  );
}
