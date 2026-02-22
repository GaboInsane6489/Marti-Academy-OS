"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/landing/Hero";
import Philosophy from "@/components/landing/Philosophy";
import Ecosystem from "@/components/landing/Ecosystem";
import CTA from "@/components/landing/CTA";

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
  const [philosophyRef, philosophyVisible] = useScrollReveal();
  const [inmersivaRef, inmersivaVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  return (
    <div className="relative w-full bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 overflow-x-hidden">
      <Hero scrollRef={heroRef} isVisible={heroVisible} />

      <Philosophy scrollRef={philosophyRef} isVisible={philosophyVisible} />

      <Ecosystem scrollRef={inmersivaRef} isVisible={inmersivaVisible} />

      <CTA scrollRef={ctaRef} isVisible={ctaVisible} />

      <footer className="py-12 border-t border-white/5 text-center bg-zinc-950">
        <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 font-bold">
          © 2026 Colegio José Martí • Academy OS
        </p>
      </footer>
    </div>
  );
}
