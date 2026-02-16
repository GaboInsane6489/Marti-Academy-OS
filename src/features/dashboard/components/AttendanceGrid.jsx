"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Clock, X, AlertCircle } from "lucide-react";

const ATTENDANCE_STATES = {
  presente: {
    icon: Check,
    color: "bg-green-500",
    text: "Presente",
    border: "border-green-500/50",
  },
  tarde: {
    icon: Clock,
    color: "bg-yellow-500",
    text: "Tarde",
    border: "border-yellow-500/50",
  },
  falta: {
    icon: X,
    color: "bg-red-500",
    text: "Falta",
    border: "border-red-500/50",
  },
  justificado: {
    icon: AlertCircle,
    color: "bg-blue-500",
    text: "Justificado",
    border: "border-blue-500/50",
  },
};

const STATE_ORDER = ["presente", "falta", "tarde", "justificado"];

export default function AttendanceGrid({ students = [], onUpdate }) {
  const [attendance, setAttendance] = useState(
    students.reduce((acc, s) => ({ ...acc, [s.id]: "presente" }), {}),
  );

  const toggleState = (studentId) => {
    setAttendance((prev) => {
      const currentState = prev[studentId];
      const currentIndex = STATE_ORDER.indexOf(currentState);
      const nextIndex = (currentIndex + 1) % STATE_ORDER.length;
      const nextState = STATE_ORDER[nextIndex];

      const newState = { ...prev, [studentId]: nextState };
      if (onUpdate) onUpdate(studentId, nextState);
      return newState;
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {students.map((student) => {
        const stateKey = attendance[student.id] || "presente";
        const state = ATTENDANCE_STATES[stateKey];
        const Icon = state.icon;

        return (
          <button
            key={student.id}
            onClick={() => toggleState(student.id)}
            className={`group relative flex flex-col items-center p-4 rounded-[2rem] bg-zinc-900/40 border transition-all duration-300 hover:scale-105 active:scale-95 ${state.border} border-white/5`}
          >
            {/* Avatar Container */}
            <div className="relative h-20 w-20 mb-3">
              <div
                className={`absolute inset-0 rounded-full blur-md opacity-20 transition-all duration-500 ${state.color}`}
              />
              <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/20 transition-colors">
                <Image
                  src={student.avatar_url || "/images/LogoColegio.webp"}
                  alt={student.full_name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Status Badge */}
              <div
                className={`absolute -bottom-1 -right-1 h-7 w-7 rounded-full flex items-center justify-center text-zinc-950 shadow-lg transition-transform duration-500 border-2 border-zinc-950 ${state.color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center">
              <p className="text-xs font-bold text-zinc-100 truncate w-full max-w-[100px]">
                {student.first_name || student.full_name?.split(" ")[0]}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-tighter text-zinc-500 mt-0.5">
                {state.text}
              </p>
            </div>

            {/* Interaction Glow */}
            <div
              className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${state.color}`}
            />
          </button>
        );
      })}
    </div>
  );
}
