"use client";

import { useEffect, useState } from "react";

/**
 * PROTOCOLO NEXUS: CoreMetrics (v2 - High Contrast Telemetry)
 * Fix: Se aumentó la opacidad del fondo y se añadieron bordes de seguridad visual.
 */

const METRICS = [
  { label: "Active_Users", value: 1240, suffix: "+", sub: "Global_Access" },
  {
    label: "Success_Rate",
    value: 98.2,
    suffix: "%",
    sub: "Performance_Target",
  },
  { label: "Uptime_Core", value: 99.9, suffix: "%", sub: "System_Stability" },
  { label: "Resources_Index", value: 450, suffix: "GB", sub: "Cloud_Assets" },
];

export default function CoreMetrics({ scrollRef, isVisible }) {
  const [counts, setCounts] = useState(METRICS.map(() => 0));

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts(
          METRICS.map((m) => {
            const target = m.value;
            return progress === 1
              ? target
              : (target * progress).toFixed(target % 1 === 0 ? 0 : 1);
          }),
        );

        if (currentStep >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section
      ref={scrollRef}
      className={`relative py-32 transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <div className="container mx-auto px-6">
        {/* LÍNEA DE ENCABEZADO TÉCNICO */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-12 bg-white/20" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">
            Live_Telemetry_Stream
          </span>
        </div>

        {/* GRID DE TELEMETRÍA - Reforzado para visibilidad sobre video */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden shadow-2xl">
          {METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className="relative bg-black/60 backdrop-blur-md p-10 group hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
            >
              {/* Corner Indicators */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-white transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-white/40 transition-colors" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">
                    Unit_0{idx + 1}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-white/10 group-hover:bg-white/40 transition-colors" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-mono text-[10px] text-white/50 uppercase tracking-widest font-bold">
                    {metric.label}
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className="font-sans text-6xl font-black tracking-tighter text-white drop-shadow-md">
                      {counts[idx]}
                    </span>
                    <span className="font-mono text-xl text-white/20 font-bold uppercase">
                      {metric.suffix}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="font-mono text-[8px] text-emerald-400/60 uppercase tracking-widest font-black">
                    {metric.sub}
                  </span>
                  {/* Visualizer bars */}
                  <div className="flex gap-1 items-end h-5">
                    {[0.3, 0.8, 0.4, 0.6, 0.2].map((h, i) => (
                      <div
                        key={i}
                        className="w-[3px] bg-white/10 group-hover:bg-emerald-400/50 transition-all duration-700"
                        style={{ height: isVisible ? `${h * 100}%` : "0%" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Scanline Effect - Animación integrada */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.03] to-transparent h-1/3 w-full -translate-y-full group-hover:animate-scan" />
            </div>
          ))}
        </div>

        {/* DATA SOURCE FOOTER */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-2 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-emerald-500/30" />
            <span className="font-mono text-[9px] text-white uppercase tracking-[0.4em]">
              Real_Time_Status: Operational
            </span>
          </div>
          <span className="font-mono text-[9px] text-white uppercase tracking-widest">
            Protocol: Nexus_Auth_V2
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(300%);
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
