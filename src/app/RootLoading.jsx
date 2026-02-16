"use client";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 p-6 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="relative h-20 w-20 mx-auto">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-blue-500 animate-spin" />
          {/* Inner Pulsing Circle */}
          <div className="absolute inset-4 rounded-full bg-blue-500/20 animate-pulse flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-blue-400" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-serif text-zinc-100 italic">
            Cargando Sistema Operativo
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
            Estableciendo conexión segura • Martí Academy
          </p>
        </div>
      </div>
    </div>
  );
}
