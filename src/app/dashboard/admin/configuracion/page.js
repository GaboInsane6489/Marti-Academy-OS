"use client";

import { useState } from "react";
import { Settings, Calendar, Award, Save, TrendingUp } from "lucide-react";

export default function ConfiguracionPage() {
  const [config, setConfig] = useState({
    // Períodos Académicos
    currentAcademicYear: "2024-2025",
    bimesterDuration: 60, // días

    // Gamificación
    xpPerAttendance: 10,
    xpPerGrade20: 50,
    xpPerResourceView: 5,
    levelFormula: "linear", // linear o exponential

    // Escalas de Notas
    passingGrade: 10,
    maxGrade: 20,

    // Rachas
    streakBonusMultiplier: 1.5,
    minStreakForBonus: 5,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Aquí iría la llamada al servicio para guardar la configuración
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulación
      alert("Configuración guardada exitosamente");
    } catch (error) {
      console.error("Error guardando configuración:", error);
      alert("Error al guardar configuración");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Header */}
      <section className="space-y-2 pb-2 border-b border-white/5">
        <h1 className="text-4xl md:text-5xl font-serif">
          Configuración{" "}
          <span className="text-blue-400 italic">Institucional</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
          <Settings className="h-3 w-3" />
          Parámetros Globales del Sistema
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Períodos Académicos */}
        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-serif">Períodos Académicos</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Año Académico Actual
              </label>
              <input
                type="text"
                value={config.currentAcademicYear}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    currentAcademicYear: e.target.value,
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Duración de Bimestre (días)
              </label>
              <input
                type="number"
                value={config.bimesterDuration}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    bimesterDuration: parseInt(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Escalas de Notas */}
        <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-[3rem] space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-serif">Escalas de Notas</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Nota Mínima Aprobatoria
              </label>
              <input
                type="number"
                value={config.passingGrade}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    passingGrade: parseInt(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Nota Máxima
              </label>
              <input
                type="number"
                value={config.maxGrade}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    maxGrade: parseInt(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Gamificación */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 border border-blue-500/20 p-8 rounded-[3rem] space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <Award className="h-6 w-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-serif">Parámetros de Gamificación</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                XP por Asistencia
              </label>
              <input
                type="number"
                value={config.xpPerAttendance}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    xpPerAttendance: parseInt(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                XP por Nota Perfecta (20)
              </label>
              <input
                type="number"
                value={config.xpPerGrade20}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    xpPerGrade20: parseInt(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                XP por Visualización de Recurso
              </label>
              <input
                type="number"
                value={config.xpPerResourceView}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    xpPerResourceView: parseInt(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Fórmula de Niveles
              </label>
              <select
                value={config.levelFormula}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    levelFormula: e.target.value,
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="linear">Lineal (Nivel × 100)</option>
                <option value="exponential">Exponencial (Nivel² × 50)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Multiplicador de Racha
              </label>
              <input
                type="number"
                step="0.1"
                value={config.streakBonusMultiplier}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    streakBonusMultiplier: parseFloat(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-[9px] text-zinc-600 italic">
                XP × {config.streakBonusMultiplier} cuando hay racha activa
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Días Mínimos para Bonus de Racha
              </label>
              <input
                type="number"
                value={config.minStreakForBonus}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    minStreakForBonus: parseInt(e.target.value),
                  }))
                }
                className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-5 w-5" />
          {saving ? "Guardando..." : "Guardar Configuración"}
        </button>
      </div>
    </div>
  );
}
