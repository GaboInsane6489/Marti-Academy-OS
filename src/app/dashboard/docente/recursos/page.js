"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/features/auth/hooks/useSession";
import { attendanceService } from "@/features/dashboard/services/attendance.service";
import { resourcesService } from "@/features/dashboard/services/resources.service";
import {
  Library,
  Plus,
  Video,
  FileText,
  Link as LinkIcon,
  Trash2,
  CheckCircle2,
  X,
} from "lucide-react";

export default function RecursosPage() {
  const { profile } = useSession();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [activeSubject, setActiveSubject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [message, setMessage] = useState(null);

  // Form State
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "video",
    url: "",
    xp_reward: 5,
  });

  useEffect(() => {
    async function loadData() {
      if (!profile?.id) return;
      try {
        const subject = await attendanceService.getActiveSubject(profile.id);
        setActiveSubject(subject);

        if (subject?.id) {
          const list = await resourcesService.getResourcesBySubject(subject.id);
          setResources(list);
        }
      } catch (error) {
        console.error("Error cargando recursos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [profile]);

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      const created = await resourcesService.createResource({
        ...newResource,
        subject_id: activeSubject.id,
      });
      setResources([created, ...resources]);
      setShowAddModal(false);
      setNewResource({
        title: "",
        description: "",
        type: "video",
        url: "",
        xp_reward: 5,
      });
      setMessage({ type: "success", text: "Recurso añadido exitosamente" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error guardando recurso:", error);
      setMessage({ type: "error", text: "Fallo al crear recurso" });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este recurso?")) return;
    try {
      await resourcesService.deleteResource(id);
      setResources(resources.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error eliminando recurso:", error);
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
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-white/5">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif">
            Biblioteca de{" "}
            <span className="text-blue-400 italic font-light">Contenidos</span>
          </h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Library className="h-3 w-3" />
            Gestión de Recursos • {activeSubject?.name || "Cargando materia..."}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          <Plus className="h-4 w-4" />
          Nuevo Recurso
        </button>
      </section>

      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      {/* Resources List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div
            key={res.id}
            className="group bg-zinc-900/40 border border-white/5 p-6 rounded-[2.5rem] hover:bg-white/5 transition-all flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                  {res.type === "video" && (
                    <Video className="h-5 w-5 text-red-400" />
                  )}
                  {res.type === "pdf" && (
                    <FileText className="h-5 w-5 text-blue-400" />
                  )}
                  {res.type === "link" && (
                    <LinkIcon className="h-5 w-5 text-cyan-400" />
                  )}
                </div>
                <button
                  onClick={() => handleDelete(res.id)}
                  className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded-full transition-all"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              <h3 className="text-lg font-serif text-white mb-2">
                {res.title}
              </h3>
              <p className="text-xs text-zinc-500 font-light line-clamp-2 md:line-clamp-3 mb-4">
                {res.description || "Sin descripción disponible."}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                +{res.xp_reward} XP
              </span>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                Ver recurso →
              </a>
            </div>
          </div>
        ))}

        {resources.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-20 bg-zinc-900/20 border border-dashed border-white/10 rounded-[3rem]">
            <Library className="h-12 w-12 text-zinc-700 mb-4" />
            <p className="text-zinc-500 font-serif italic text-lg text-center">
              No hay recursos publicados todavía.
              <br />
              <span className="text-sm font-sans not-italic">
                Empieza subiendo material para tus alumnos.
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Add Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif text-white">Nuevo Recurso</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/5 rounded-full"
              >
                <X className="h-6 w-6 text-zinc-500" />
              </button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Título del Recurso
                </label>
                <input
                  required
                  type="text"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  placeholder="Ej: Introducción a la Termodinámica"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Tipo
                  </label>
                  <select
                    value={newResource.type}
                    onChange={(e) =>
                      setNewResource({ ...newResource, type: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-zinc-100 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                  >
                    <option value="video">🎥 Video</option>
                    <option value="pdf">📄 PDF</option>
                    <option value="link">🔗 Link Externo</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Recompensa XP
                  </label>
                  <input
                    type="number"
                    value={newResource.xp_reward}
                    onChange={(e) =>
                      setNewResource({
                        ...newResource,
                        xp_reward: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-zinc-100 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  URL del Recurso
                </label>
                <input
                  required
                  type="url"
                  value={newResource.url}
                  onChange={(e) =>
                    setNewResource({ ...newResource, url: e.target.value })
                  }
                  placeholder="https://youtube.com/..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  Descripción (Breve)
                </label>
                <textarea
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 transition-colors h-24 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/20"
              >
                Publicar Recurso
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
