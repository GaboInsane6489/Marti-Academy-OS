"use client";

import { useState } from "react";
import { Star, MessageSquare, Save, X } from "lucide-react";

const FEEDBACK_PRESETS = [
  { label: "Excelente análisis", category: "excelente" },
  { label: "Gran participación", category: "excelente" },
  { label: "Buen progreso", category: "bueno" },
  { label: "Cuidar ortografía", category: "por_mejorar" },
  { label: "Reforzar conceptos base", category: "por_mejorar" },
];

export default function QuickGrade({ student, subjectId, onSave, onClose }) {
  const [grade, setGrade] = useState(15);
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      if (onSave) {
        await onSave({
          student_id: student.id,
          subject_id: subjectId,
          grade_value: grade,
          feedback_text: feedback,
        });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-serif text-white">{student.full_name}</h3>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            Evaluación de Desempeño
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-zinc-500" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Grade Selector */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-zinc-400">
              Calificación (0-20)
            </label>
            <span className="text-3xl font-serif text-blue-400">{grade}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            step="1"
            value={grade}
            onChange={(e) => setGrade(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between px-1">
            {[0, 5, 10, 15, 20].map((v) => (
              <span key={v} className="text-[10px] text-zinc-600 font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Feedback Presets */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-400" />
            Feedback Institucional
          </label>
          <div className="flex flex-wrap gap-2">
            {FEEDBACK_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setFeedback(p.label)}
                className={`text-[10px] px-3 py-1.5 rounded-full border transition-all ${
                  feedback === p.label
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-white/5 border-white/5 text-zinc-400 hover:border-white/20"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Feedback */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-400 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            Comentarios Adicionales
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Escribe un feedback personalizado..."
            className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors h-24 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
        >
          {saving ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Guardando..." : "Confirmar Evaluación"}
        </button>
      </div>
    </div>
  );
}
