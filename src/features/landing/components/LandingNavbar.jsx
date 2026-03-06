"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useSession } from "@/features/auth/hooks/useSession";

/**
 * PROTOCOLO NEXUS: LandingNavbar Refactor
 * Theme: Monochrome High-Intensity HUD
 * Brand Color: white
 */

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, isAuthenticated } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* LOGO: DATA/LABELS REGLA 2.3 */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/20 bg-white/[0.03] p-1.5 transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/[0.08]">
            {/* SCANNER LINE OVERLAY (REGLA 4.1) */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[scan_3s_linear_infinite] opacity-0 group-hover:opacity-100" />
            <div className="relative flex h-full w-full items-center justify-center bg-white text-black font-black text-lg rounded-sm">
              M
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-white text-lg font-bold tracking-tight leading-none">
              Martí Academy
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-black text-white/50 group-hover:text-white transition-colors">
              Core_OS // v1.0
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS: DATA/LABELS REGLA 2.3 */}
        <div className="hidden md:flex items-center gap-1">
          {["Filosofía", "Ecosistema", "Academia", "Soporte"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 font-mono text-[10px] uppercase tracking-widest font-black text-white/40 hover:text-white transition-all relative group"
            >
              <span className="relative z-10">{item}</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
              <div className="absolute bottom-1 left-4 right-4 h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}

          <div className="h-4 w-px bg-white/10 mx-4" />

          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="group relative flex items-center gap-3 border border-white/10 bg-white/[0.03] backdrop-blur-md pl-4 pr-1.5 py-1.5 rounded-xl hover:border-white/40 hover:bg-white/[0.08] transition-all"
            >
              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] uppercase tracking-widest font-black text-white/40 group-hover:text-white">
                  Access_Granted
                </span>
                <span className="font-mono text-[8px] text-white/20">
                  ID: {profile?.id?.slice(0, 8) || "USER_01"}
                </span>
              </div>
              <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-white/20 group-hover:scale-[1.05] transition-transform">
                <Image
                  src={
                    user?.user_metadata?.avatar_url ||
                    "/images/LogoColegio.webp"
                  }
                  alt="Avatar"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  sizes="32px"
                />
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="group relative flex items-center gap-3 bg-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-black transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95"
            >
              <span className="relative z-10">System_Auth</span>
              <ArrowRight className="h-3 w-3 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* MOBILE TOGGLE: SYSTEM STATUS PULSE (REGLA 4.2) */}
        <button
          className="md:hidden flex items-center gap-2 border border-white/10 p-2 rounded-lg bg-white/5 active:bg-white/10 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_5px_white]" />
          {isMobileMenuOpen ? (
            <X size={20} className="text-white" />
          ) : (
            <Menu size={20} className="text-white" />
          )}
        </button>
      </div>

      {/* MOBILE MENU: COMPONENT CHASSIS REGLA 3.1 */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0A0908]/95 backdrop-blur-xl border-b border-white/10 p-8 space-y-6 md:hidden animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 gap-2">
            {["Filosofía", "Ecosistema", "Academia", "Soporte"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] font-mono text-xs uppercase tracking-[0.2em] font-black text-white/60"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
                <ArrowRight size={14} className="opacity-30" />
              </Link>
            ))}
          </div>

          <div className="pt-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex w-full items-center justify-between gap-4 border border-white/20 bg-white/5 p-4 rounded-2xl group transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/20">
                    <Image
                      src={
                        user?.user_metadata?.avatar_url ||
                        "/images/LogoColegio.webp"
                      }
                      alt="Avatar"
                      fill
                      className="object-cover grayscale"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-sm font-bold text-white leading-none mb-1">
                      {profile?.full_name || "User_Profile"}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                      {profile?.role
                        ? `Role // ${profile.role}`
                        : "Access_Auth"}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/20" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-3 bg-white text-black p-5 rounded-2xl font-mono text-xs font-black uppercase tracking-widest active:scale-[0.98] transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Execute_Login
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
