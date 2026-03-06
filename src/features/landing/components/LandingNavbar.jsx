"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useSession } from "@/features/auth/hooks/useSession";

const NAV_LINKS = [
  { id: "01", label: "Filosofía", href: "#filosofia" },
  { id: "02", label: "Ecosistema", href: "#ecosistema" },
  { id: "03", label: "Academia", href: "#academia" },
  { id: "04", label: "Soporte", href: "#soporte" },
];

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, isAuthenticated } = useSession();

  // 1. Definición de toggleMenu
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // 2. Gestión de Scroll (Header)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Bloqueo de Scroll del Body
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-[150] flex flex-col items-center justify-center bg-[#050505] transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />

        <div className="flex flex-col gap-8 relative z-10 w-full px-12">
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group flex items-center gap-6 font-sans text-4xl font-black tracking-widest text-white uppercase transition-all duration-500 ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <span className="font-mono text-lg text-white/30">
                {link.id}.
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* DESKTOP NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-4"
            : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* LOGO AREA */}
          <Link
            href="/"
            className="group flex items-center gap-4 relative z-[210]"
          >
            <div className="h-10 w-10 bg-white flex items-center justify-center rounded-sm transition-all duration-500 group-hover:bg-transparent group-hover:border group-hover:border-white">
              <span className="text-black font-black text-xl group-hover:text-white transition-colors">
                M
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-black tracking-[0.3em] text-white">
                MARTÍ ACADEMY
              </span>
              <span className="text-[7px] font-mono text-white/60 tracking-[0.2em] mt-1">
                {"CORE_OS // V1.0"}
              </span>
            </div>
          </Link>

          {/* NAV LINKS (INTENSIDAD ALTA + SEPARACIÓN) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 border-r border-white/10 pr-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="group relative px-6 py-2 font-mono text-[10px] font-bold tracking-[0.2em] text-white/80 transition-all duration-300 hover:text-white"
                >
                  <div className="relative flex items-center">
                    {/* Micro-HUD Indicator */}
                    <div className="absolute -left-6 flex items-center justify-center w-6">
                      <span className="h-[4px] w-[4px] rounded-full bg-white opacity-100 transition-all duration-300 group-hover:opacity-0 group-hover:scale-0" />
                      <span className="absolute font-bold text-white opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                        {"//"}
                      </span>
                    </div>

                    {/* Label con margen para evitar solapamiento */}
                    <span className="uppercase transition-transform duration-300 group-hover:translate-x-4">
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* AUTH SECTION */}
            <div className="flex items-center ml-2">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-3 border border-white/20 bg-white/5 pl-4 pr-1.5 py-1.5 rounded-xl hover:bg-white hover:text-black transition-all"
                >
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-[9px] font-black uppercase tracking-tighter">
                      Access_Granted
                    </span>
                    <span className="text-[8px] opacity-40">
                      ID_{profile?.id?.slice(0, 5)}
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-lg overflow-hidden border border-white/20">
                    <Image
                      src={
                        user?.user_metadata?.avatar_url ||
                        "/images/LogoColegio.webp"
                      }
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="bg-white text-black px-6 py-2.5 font-mono text-[9px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white border border-white transition-all active:scale-95"
                >
                  System_Auth
                </Link>
              )}
            </div>
          </div>

          {/* MOBILE BURGER BUTTON */}
          <button
            onClick={toggleMenu}
            className="group relative z-[210] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle Menu"
          >
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>
    </>
  );
}
