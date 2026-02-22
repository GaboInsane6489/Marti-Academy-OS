"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Shield,
  Users,
  Bell,
  LayoutDashboard,
  BookOpen,
  Library,
  Trophy,
  Settings,
} from "lucide-react";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader";

export default function DashboardLayout({ children }) {
  const { user, profile, loading, isAuthenticated, signOut } = useSession();
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
    ...(profile?.role === "admin"
      ? [
          {
            icon: Shield,
            label: "Gestión de Usuarios",
            href: "/dashboard/admin",
          },
          {
            icon: Settings,
            label: "Configuración",
            href: "/dashboard/admin/configuracion",
          },
          {
            icon: Users,
            label: "Asistencia",
            href: "/dashboard/docente/asistencia",
          },
          {
            icon: BookOpen,
            label: "Evaluaciones",
            href: "/dashboard/docente/evaluaciones",
          },
          {
            icon: Library,
            label: "Contenidos",
            href: "/dashboard/docente/recursos",
          },
        ]
      : profile?.role === "docente"
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
            },
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
      <DashboardSidebar
        profile={profile}
        user={user}
        navItems={navItems}
        signOut={signOut}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />

        <DashboardHeader profile={profile} user={user} />

        {/* Page Content */}
        <div className="relative z-10 flex-1 p-8 overflow-y-auto lg:p-12 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
