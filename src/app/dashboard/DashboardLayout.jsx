"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import {
  Shield,
  Users,
  Bell,
  LayoutDashboard,
  LogOut,
  Menu,
  BookOpen,
  Library,
  Trophy,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const { profile, loading, isAuthenticated, signOut } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const roleBase =
    profile?.role === "admin"
      ? "/dashboard/admin"
      : profile?.role === "docente"
        ? "/dashboard/docente"
        : "/dashboard/estudiante";

  const navItems = [
    { icon: LayoutDashboard, label: "Mi Portal", href: roleBase },
    ...(profile?.role === "docente"
      ? [
          {
            icon: Users,
            label: "Asistencia",
            href: "/dashboard/docente/asistencia",
          },
          {
            icon: BookOpen,
            label: "Evaluaciones",
            href: "/dashboard/docente/evaluaciones",
          }, // Added Evaluations link
          {
            icon: Library,
            label: "Contenidos",
            href: "/dashboard/docente/recursos",
          },
        ]
      : profile?.role === "estudiante"
        ? [
            {
              icon: Trophy,
              label: "Méritos",
              href: "/dashboard/estudiante/tienda",
            },
            {
              icon: Library,
              label: "Contenidos",
              href: "/dashboard/estudiante/recursos",
            },
          ]
        : []),
    { icon: Users, label: "Comunidad", href: "/dashboard/comunidad" },
    { icon: Bell, label: "Avisos", href: "/dashboard/notificaciones" },
    { icon: Shield, label: "Identidad", href: "/dashboard/ajustes" },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden w-72 flex-col border-r border-white/5 bg-zinc-900/10 backdrop-blur-3xl lg:flex z-20">
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
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 mb-4 items-center">
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
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold truncate">
                {profile?.full_name ||
                  user?.user_metadata?.full_name ||
                  "Gabor"}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

        {/* Navbar Superior */}
        <header className="relative z-10 flex h-20 items-center justify-between px-8 border-b border-white/5 bg-zinc-950/20 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-white/5 rounded-xl border border-white/5">
              <Menu className="h-6 w-6" />
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
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="relative z-10 flex-1 p-8 overflow-auto lg:p-12 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
