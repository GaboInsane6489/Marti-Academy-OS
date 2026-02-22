"use client";

import Image from "next/image";
import { Shield, LogOut } from "lucide-react";

export default function DashboardSidebar({ profile, user, navItems, signOut }) {
  return (
    <aside className="hidden w-72 flex-col border-r border-white/5 bg-zinc-900/95 lg:flex z-20">
      <div className="flex h-20 items-center gap-3 px-8 border-b border-white/5">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-sm font-bold tracking-tight">
            Martí Academy
          </span>
          <span className="text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold">
            Operating System
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4 pt-6">
        <p className="px-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
          Menú Académico
        </p>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all hover:bg-white/5 hover:text-blue-400"
          >
            <item.icon className="h-5 w-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 mb-4 shadow-sm">
          <div className="h-10 w-10 rounded-xl overflow-hidden border border-blue-500/30 relative shrink-0">
            <Image
              src={
                profile?.avatar_url ||
                user?.user_metadata?.avatar_url ||
                "/images/LogoColegio.webp"
              }
              alt="Profile"
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold truncate">
              {profile?.full_name || user?.user_metadata?.full_name || "Gabor"}
            </p>
            <p className="text-[9px] text-blue-400 font-bold uppercase tracking-wider truncate">
              {profile?.role || "Estudiante"}
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-500 transition-all hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          Salir del Portal
        </button>
      </div>
    </aside>
  );
}
