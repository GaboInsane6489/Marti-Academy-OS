"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { useSession } from "@/features/auth/hooks/useSession";

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
          ? "bg-zinc-950/70 backdrop-blur-xl border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-white font-serif text-lg font-bold tracking-tight">
              Martí Academy
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold">
              Operating System
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Filosofía", "Ecosistema", "Academia", "Soporte"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="group flex items-center gap-3 bg-white/5 border border-white/10 pl-4 pr-1.5 py-1.5 rounded-full hover:bg-white/10 transition-all"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                Dashboard
              </span>
              <div className="relative h-8 w-8 rounded-full overflow-hidden border border-blue-500/50">
                <Image
                  src={
                    user?.user_metadata?.avatar_url ||
                    "/images/LogoColegio.webp"
                  }
                  alt="Avatar"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="group flex items-center gap-2 bg-white text-zinc-950 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              Acceder
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-zinc-950 border-b border-white/5 p-6 space-y-4 md:hidden animate-in slide-in-from-top duration-300">
          {["Filosofía", "Ecosistema", "Academia", "Soporte"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-lg font-serif text-zinc-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="flex w-full items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl group active:bg-white/10 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-blue-500/50">
                  <Image
                    src={
                      user?.user_metadata?.avatar_url ||
                      "/images/LogoColegio.webp"
                    }
                    alt="Avatar"
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">
                    {profile?.full_name || "Mi Dashboard"}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">
                    {profile?.role ? `Portal de ${profile.role}` : "Ver Portal"}
                  </span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-zinc-500" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-blue-500/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Acceder al Sistema
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
