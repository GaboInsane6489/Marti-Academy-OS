"use client";

import React from "react";

/**
 * Layout inmersivo para el Dashboard del Estudiante.
 * Implementa el fondo de video cinematográfico y la atmósfera "Martí OS".
 */
export default function StudentDashboardLayout({ children }) {
  return (
    <div className="relative w-full">
      {/* Cinematic Background Video */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-60 transition-opacity duration-1000"
        >
          <source src="/videos/Estudioencasa.mp4" type="video/mp4" />
        </video>

        {/* Vignette Overlay & Deep Dark Filter */}
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full">{children}</main>
    </div>
  );
}
