"use client";

import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm({ signInWithGoogle, loading }) {
  return (
    <div className="bg-zinc-900/40 border border-white/10 backdrop-blur-2xl rounded-[1.5rem] lg:rounded-[1.8rem] p-5 lg:p-8 shadow-2xl relative overflow-hidden group w-full max-w-[320px] lg:max-w-[360px] mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 space-y-5 lg:space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg lg:text-xl font-serif text-white">
            Inicia Sesión
          </h2>
          <p className="text-zinc-500 text-[10px] lg:text-xs">
            Usa tu cuenta institucional para comenzar
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full h-10 lg:h-12 bg-white text-black rounded-xl font-bold text-[10px] lg:text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin shrink-0" />
              Accediendo...
            </>
          ) : (
            <>
              <Image
                src="https://www.google.com/favicon.ico"
                width={16}
                height={16}
                className="grayscale"
                alt="Google"
              />
              Acceder con Google
            </>
          )}
        </button>

        <div className="relative py-1 lg:py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center uppercase">
            <span className="bg-zinc-900/40 lg:bg-zinc-900/60 px-2 text-[9px] lg:text-[10px] text-zinc-600 tracking-[0.4em] font-bold backdrop-blur-md">
              Portal Estudiantil
            </span>
          </div>
        </div>

        <p className="text-[9px] lg:text-[10px] text-center text-zinc-600 leading-relaxed font-medium">
          Al acceder, aceptas los términos de uso y las políticas de privacidad
          institucional del Colegio José Martí.
        </p>

        <div className="flex justify-center pt-1">
          <button className="flex items-center gap-2 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-blue-400 transition-colors group/btn">
            Ayuda Técnica{" "}
            <ArrowRight className="h-2.5 w-2.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
