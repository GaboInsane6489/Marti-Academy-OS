"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function RootError({ error, reset }) {
  useEffect(() => {
    // Aquí se podrían enviar logs a un servicio tipo Sentry
    console.error("Critical System Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 p-6 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md space-y-8">
        <div className="h-20 w-20 mx-auto bg-red-500/10 rounded-3xl flex items-center justify-center border border-red-500/20">
          <AlertCircle className="h-10 w-10 text-red-500 animate-pulse" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-serif text-white italic">
            Fallo en el Sistema
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Hemos encontrado una anomalía inesperada. Los datos permanecen
            seguros, pero el módulo actual no puede continuar.
          </p>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <code className="text-[10px] font-mono text-zinc-500 break-all">
              {error?.message || "Error desconocido en el núcleo"}
            </code>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Reiniciar Módulo
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-white/10 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            <Home className="h-4 w-4" />
            Volver a Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
