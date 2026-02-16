"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { resourcesService } from "@/features/dashboard/services/resources.service";
import StudentResourceCard from "@/features/dashboard/components/StudentResourceCard";
import { Library, Sparkles, CheckCircle2 } from "lucide-react";

export default function EstudianteRecursosPage() {
  const { profile } = useSession();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadResources() {
      if (!profile?.classroom_id) {
        // Si no tiene classroom_id, cargamos recursos generales o nada por ahora
        setLoading(false);
        return;
      }
      try {
        // En un escenario real, filtraríamos por materias del alumno.
        // Por ahora cargamos todos los recursos disponibles para demostración.
        const { data: subjects } = await resourcesService.supabase
          .from("subjects")
          .select("id")
          .eq("classroom_id", profile.classroom_id);

        if (subjects?.length > 0) {
          const subjectIds = subjects.map((s) => s.id);
          const { data: list } = await resourcesService.supabase
            .from("academic_resources")
            .select("*")
            .in("subject_id", subjectIds)
            .order("created_at", { ascending: false });
          setResources(list || []);
        }
      } catch (error) {
        console.error("Error cargando recursos para el alumno:", error);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, [profile]);

  const handleClaimXP = async (resourceId, xpAmount) => {
    try {
      await resourcesService.claimResourceXP(profile.id, xpAmount);
      setMessage({ type: "success", text: `¡Has ganado ${xpAmount} XP!` });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error reclamando XP:", error);
      setMessage({ type: "error", text: "No se pudo procesar la recompensa" });
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header */}
      <section className="space-y-2 pb-2 border-b border-white/5">
        <h1 className="text-4xl md:text-5xl font-serif">
          Recursos de{" "}
          <span className="text-blue-400 italic font-light">Estudio</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
          <Library className="h-3 w-3" />
          Material Académico • Sube de Nivel
        </p>
      </section>

      {message && (
        <div className="fixed top-8 right-8 z-50 p-4 rounded-2xl bg-zinc-900 border border-blue-500/30 text-blue-400 shadow-2xl shadow-blue-500/20 animate-in slide-in-from-right-4 duration-500 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">
            {message.text}
          </span>
        </div>
      )}

      {/* Resources Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <StudentResourceCard
            key={res.id}
            resource={res}
            onClaimXP={handleClaimXP}
          />
        ))}

        {resources.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-20 bg-zinc-900/20 border border-dashed border-white/10 rounded-[3rem]">
            <Library className="h-12 w-12 text-zinc-700 mb-4" />
            <p className="text-zinc-500 font-serif italic text-lg text-center">
              Aún no hay recursos disponibles para tu sección.
              <br />
              <span className="text-sm font-sans not-italic">
                Vuelve más tarde para ver nuevos materiales.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
