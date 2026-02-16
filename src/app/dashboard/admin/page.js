"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import { Shield, Users, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { profile } = useSession();

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <section className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif">
          Panel de <span className="text-blue-400 italic">Administración</span>
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          Control Central • {profile?.full_name}
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Users,
            label: "Usuarios",
            value: "1,204",
            color: "text-blue-400",
          },
          {
            icon: Shield,
            label: "Seguridad",
            value: "Óptima",
            color: "text-green-400",
          },
          {
            icon: Settings,
            label: "Sistemas",
            value: "Activo",
            color: "text-purple-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-900/40 border border-white/5 p-6 rounded-[2rem] backdrop-blur-sm"
          >
            <stat.icon className={`h-6 w-6 ${stat.color} mb-4`} />
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
              {stat.label}
            </p>
            <h3 className="text-2xl font-serif mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
