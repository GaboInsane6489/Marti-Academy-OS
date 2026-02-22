"use client";

import { useSession } from "@/features/auth/hooks/useSession";
import Image from "next/image";
import Link from "next/link";
import { Shield, Sparkles, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, isAuthenticated, loading } = useSession();

  // Redirección automática si ya está logueado
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-zinc-950 flex flex-col items-center justify-center p-4 sm:p-6 text-zinc-100 selection:bg-blue-500/30">
      {/* Global Background Elements (OS Consistency) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Volver al Inicio
      </Link>

      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl 2xl:max-w-4xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:text-left text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Narrativa Institucional */}
        <div className="space-y-4 lg:space-y-5 flex flex-col items-center lg:items-start px-4 sm:px-0">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 lg:h-8 lg:w-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Shield className="h-4 w-4 lg:h-4.5 lg:w-4.5 text-white" />
            </div>
            <span className="font-serif text-sm lg:text-base font-bold tracking-tight uppercase bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Martí Academy OS
            </span>
          </div>

          <div className="space-y-2 lg:space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-none tracking-tighter mx-auto lg:mx-0">
              El futuro de la <br />
              <span className="italic font-light text-blue-400">
                Excelencia.
              </span>
            </h1>
            <p className="text-zinc-400 text-[11px] md:text-xs lg:text-sm leading-relaxed max-w-xs lg:max-w-sm font-light text-center lg:text-left mx-auto lg:mx-0">
              Tu portal oficial al ecosistema digital del Colegio José Martí.
              Gestión, comunidad y mérito en un solo lugar.
            </p>
          </div>

          <div className="grid gap-2 lg:gap-2.5 pt-1 lg:pt-2 w-full max-w-[280px] sm:max-w-none">
            {[
              {
                icon: Sparkles,
                title: "Identidad Digital",
                desc: "Forja tu camino y sube de nivel.",
              },
              {
                icon: Shield,
                title: "Seguridad Institucional",
                desc: "Datos protegidos bajo estándares globales.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-2.5 lg:p-3 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors w-full text-center sm:text-left"
              >
                <item.icon className="h-3.5 w-3.5 text-cyan-400 shrink-0 sm:mt-1" />
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[10px] lg:text-[11px] uppercase tracking-wider">
                    {item.title}
                  </h4>
                  <p className="text-[9px] lg:text-[9.5px] text-zinc-500 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de Acceso */}
        <LoginForm signInWithGoogle={signInWithGoogle} loading={loading} />
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2">
        <p className="text-[9px] lg:text-[9.5px] font-bold uppercase tracking-[0.5em] text-zinc-700">
          Powered by Institutional Tech Infrastructure
        </p>
      </div>
    </div>
  );
}
