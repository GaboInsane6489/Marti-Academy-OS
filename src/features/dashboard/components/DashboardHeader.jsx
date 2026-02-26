"use client";

import Image from "next/image";
import { Menu, Bell, LogOut } from "lucide-react";
import { useSession } from "@/features/auth/hooks/useSession";
import { useRouter } from "next/navigation";

export default function DashboardHeader({ profile, user }) {
  const { signOut } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/login");
    }
  };
  return (
    <header className="relative z-50 flex h-20 items-center justify-between px-8 border-b border-white/5 bg-black/40 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-white/5 rounded-xl border border-white/5">
          <Menu className="h-6 w-6 text-zinc-400" />
        </button>
        <div className="hidden lg:flex flex-col">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            Ubicación Actual
          </h2>
          <p className="text-xs font-bold text-zinc-300">
            {profile?.role === "admin"
              ? "Panel de Administración"
              : profile?.role === "docente"
                ? "Gestión Académica"
                : "Portal del Estudiante"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("Logout Triggered Manual");
            handleLogout();
          }}
          title="Cerrar Sesión"
          className="z-50 cursor-pointer relative p-2 hover:bg-red-500/10 rounded-xl transition-colors group"
        >
          <LogOut className="h-5 w-5 text-zinc-400 group-hover:text-red-400 transition-colors" />
        </button>

        <button className="relative p-2 hover:bg-white/5 rounded-xl transition-colors">
          <Bell className="h-5 w-5 text-zinc-400" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 ring-4 ring-zinc-950" />
        </button>

        <div className="h-8 w-px bg-white/5" />

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">
              Puntaje Global
            </p>
            <p className="text-sm font-bold text-white leading-none">
              {profile?.xp || 0} <span className="text-blue-400">XP</span>
            </p>
          </div>
          <div className="h-10 w-10 lg:hidden rounded-full border-2 border-blue-500/50 bg-zinc-800 overflow-hidden relative">
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
            />
          </div>
        </div>
      </div>
    </header>
  );
}
