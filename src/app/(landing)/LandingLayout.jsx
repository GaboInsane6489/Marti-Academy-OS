"use client";
import LandingNavbar from "@/features/landing/components/LandingNavbar";

/**
 * PROTOCOLO NEXUS: LandingLayout Refactor (v2 - Monochrome White)
 * Theme: High-Intensity HUD / Industrial Terminal
 * Primary Color: white
 */

export default function LandingLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#0A0908] selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* HUD HEADER LAYER */}
      <LandingNavbar />

      {/* SYSTEM MAIN CONTENT */}
      <main className="relative z-10 w-full">{children}</main>

      {/* NEXUS BACKGROUND ARCHITECTURE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* GRID HOLOGRÁFICO (REGLA 1.2) */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 shadow-inner" />

        {/* RADIAL GLOWS (REGLA 1.3) */}
        <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-white/5 blur-[120px] rounded-full opacity-30 mix-blend-screen" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[50vw] h-[50vw] bg-white/5 blur-[100px] rounded-full opacity-20" />

        {/* SCANNER LINE GLOBAL (REGLA 4.1) */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_10s_linear_infinite] opacity-30" />
      </div>

      {/* SYSTEM STATUS LABELS (DATA/LABELS REGLA 2.3) */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none hidden md:block">
        <div className="flex items-center gap-3 border-l border-white/30 pl-4 py-2 bg-black/40 backdrop-blur-md rounded-r-lg">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-black text-white/70">
            System_Core: Online // OS.Marti_v1.0
          </span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(100%);
          }
        }

        html {
          scroll-behavior: smooth;
        }

        /* Estilización de scrollbar estilo HUD (Monochrome) */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0908;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
