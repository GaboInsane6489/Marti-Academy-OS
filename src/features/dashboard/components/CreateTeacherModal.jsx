"use client";

import { useState } from "react";
import { X, UserPlus, Mail, User, Key } from "lucide-react";

export default function CreateTeacherModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    temporaryPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, temporaryPassword: password }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Aquí iría la llamada al servicio
      // await adminService.createTeacher(formData.email, formData.fullName, formData.temporaryPassword);

      alert(
        `Docente creado exitosamente.\nEmail: ${formData.email}\nContraseña temporal: ${formData.temporaryPassword}\n\nEnvía esta información al docente de forma segura.`,
      );

      setFormData({ email: "", fullName: "", temporaryPassword: "" });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error creando docente:", error);
      alert("Error al crear docente");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-900 border border-white/10 rounded-[3rem] p-8 max-w-md w-full shadow-2xl shadow-blue-500/10 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-blue-400" />
            Crear Docente
          </h2>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <User className="h-3 w-3" />
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Prof. María González"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Mail className="h-3 w-3" />
              Email Institucional
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="profesor@martiacademy.edu"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
              <Key className="h-3 w-3" />
              Contraseña Temporal
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.temporaryPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    temporaryPassword: e.target.value,
                  }))
                }
                className="flex-1 bg-zinc-800 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                placeholder="Generar automáticamente"
                required
              />
              <button
                type="button"
                onClick={generatePassword}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors"
              >
                Generar
              </button>
            </div>
            <p className="text-[9px] text-zinc-600 italic">
              El docente deberá cambiar esta contraseña en su primer acceso.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creando..." : "Crear Docente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
